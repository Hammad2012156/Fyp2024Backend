const db = require("../config/Connection");
const AttendanceModel = db.AttendanceModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op, literal } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const moment = require("moment");
exports.EmployeeAttendanceCalender = Trackerror(async (req, res, next) => {
  const { StartDate, EndDate } = req.query;
  const startTimeFrom = moment(StartDate || "1990-12-01 00:00:00").format(
    "YYYY-MM-DD 00:00:00"
  );
  const startTimeTo = moment(EndDate || "4030-12-01 00:00:00").format(
    "YYYY-MM-DD 23:59:59"
  );
  const data = await db.AttendanceModel.findAll({
    where: {
      [Op.and]: [
        {
          Day: { [Op.between]: [startTimeFrom, startTimeTo] }
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    attributes: [
      "_id",
      "Day",
      "Arrival",
      "Departure",
      "AttendanceStatus",
      "LeaveApprovalStatus"
    ],
    order: [["Day", "ASC"]]
  });
  const [result] = await db.sequelize.query(`(
    SELECT
    SUM(TIMESTAMPDIFF(MINUTE, Arrival, Departure)) AS TimeCompleted,
    COUNT(CASE WHEN LeaveApprovalStatus = true THEN 1 END) AS LeaveApprovedCount,
    COUNT(CASE WHEN AttendanceStatus = 'Present' THEN 1 END) AS PresentCount,
    COUNT(CASE WHEN AttendanceStatus = 'LeaveEarlier' THEN 1 END) AS LeaveEarlierCount,
    COUNT(CASE WHEN AttendanceStatus = 'Leave' THEN 1 END) AS LeaveCount
    FROM
    AttendanceModel
WHERE
    Employee = "${req.user.Employee}"
    AND Day BETWEEN "${startTimeFrom}" AND "${startTimeTo}"
  )`);
  res.status(200).json({
    success: true,
    data,
    AttendanceSummary: result[0]
  });
});
exports.MarkAttendance = Trackerror(async (req, res, next) => {
  const { Arrival, Departure } = req.body;
  const date = moment(Arrival);
  const startOfDay = date.startOf("day").utc().format("YYYY-MM-DD HH:mm:ss");
  const endOfDay = date.endOf("day").utc().format("YYYY-MM-DD HH:mm:ss");
  if (!Arrival || !Departure) {
    return next(
      new HandlerCallBack("Kindly Provide Arrival And Departure Both", 401)
    );
  }
  const start = moment(Arrival, "YYYY-MM-DD HH:mm:ss");
  const end = moment(Departure, "YYYY-MM-DD HH:mm:ss");

  // Calculate the difference in hours
  const duration = moment.duration(end.diff(start));
  const hoursDifference = duration.asHours();
  console.log(hoursDifference);
  let AttendanceStatus = "Present";
  if (hoursDifference < 9) {
    AttendanceStatus = "LeaveEarlier";
  }

  const EmployeeAttendance = await db.AttendanceModel.findOne({
    where: {
      [Op.and]: [
        {
          Arrival: { [Op.between]: [startOfDay, endOfDay] }
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    raw: true
  });
  if (EmployeeAttendance) {
    return next(new HandlerCallBack("Attendance Has Already Done ", 401));
  }

  const data = await db.AttendanceModel.create({
    Arrival: moment(Arrival).utc().format(),
    Departure: moment(Departure).utc().format(),
    Day: startOfDay,
    AttendanceStatus: AttendanceStatus,
    LeaveApprovalStatus: null,
    Ceo: req.user.Ceo,
    Employee: req.user.Employee
  });
  res.status(200).json({
    success: true,
    data,
    message: "Attendance Has Been Marked"
  });
});
exports.RejectLeave = Trackerror(async (req, res, next) => {
  const { id } = req.params;
  const data = await db.AttendanceModel.update(
    { LeaveApprovalStatus: false, Approver: req.user.Employee },
    {
      where: {
        _id: id
      }
    }
  );
  res.status(200).json({
    success: true,
    data
  });
});
exports.ApproveLeave = Trackerror(async (req, res, next) => {
  const { id } = req.params;
  const data = await db.AttendanceModel.update(
    { LeaveApprovalStatus: true, Approver: req.user.Employee },
    {
      where: {
        _id: id
      }
    }
  );
  res.status(200).json({
    success: true,
    data
  });
});
exports.EmployeeTime = Trackerror(async (req, res, next) => {
  const { Arrival } = req.body;
  const date = moment(Arrival);
  console.log(date.utc().format());
  const startOfDay = date.startOf("day").utc().format();
  const endOfDay = date.endOf("day").utc().format();
  const EmployeeAttendance = await db.AttendanceModel.findOne({
    where: {
      [Op.and]: [
        {
          Arrival: { [Op.between]: [startOfDay, endOfDay] }
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    raw: true
  });

  res.status(200).json({
    success: true,
    data: EmployeeAttendance
  });
});
exports.EmployeeLeaveRequested = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.AttendanceModel.count({
    where: {
      [Op.and]: [
        {
          Employee: req.user.Employee
        },
        {
          AttendanceStatus: "Leave"
        }
      ]
    }
  });
  await db.AttendanceModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          Employee: req.user.Employee
        },
        {
          AttendanceStatus: "Leave"
        }
      ]
    },
    order: [["createdAt", "DESC"]],
    attributes: [
      "_id",
      "Day",
      "createdAt",
      "LeaveApprovalStatus",
      "AttendanceStatus"
    ],
    include: [
      {
        model: db.EmployeeModel,
        as: "EmployeeAttendanceData",
        attributes: ["_id", "Name", "Email", "Image"]
      }
    ],
    limit,
    offset
    // include: { all: true }
  })
    .then((data) => {
      const response = getPagingData1(data, page, limit, totalCount);
      res.status(200).json({
        success: true,
        data: {
          items: response.data,
          pageNumber: response.currentPage,
          pageSize: size || 11,
          totalCount: response.totalcount,
          totalPages: response.totalPages
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Subscriptions."
      });
    });
});
exports.LeaveToBeApprove = Trackerror(async (req, res, next) => {
  const EmployeesData = await db.EmployeeModel.findAll({
    where: {
      ReportingAuthority: req.user.Employee
    },
    raw: true
  });
  const Employees = ["123"];
  for (let i = 0; i < EmployeesData.length; i++) {
    Employees.push(EmployeesData[i]._id);
  }
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.AttendanceModel.count({
    where: {
      [Op.and]: [
        {
          Employee: Employees
        },
        {
          AttendanceStatus: "Leave"
        }
      ]
    }
  });
  await db.AttendanceModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          Employee: Employees
        },
        {
          AttendanceStatus: "Leave"
        }
      ]
    },
    order: [["createdAt", "DESC"]],
    attributes: [
      "_id",
      "Day",
      "createdAt",
      "LeaveApprovalStatus",
      "AttendanceStatus"
    ],
    include: [
      {
        model: db.EmployeeModel,
        as: "EmployeeAttendanceData",
        attributes: ["_id", "Name", "Email", "Image"]
      }
    ],
    limit,
    offset
    // include: { all: true }
  })
    .then((data) => {
      const response = getPagingData1(data, page, limit, totalCount);
      res.status(200).json({
        success: true,
        data: {
          items: response.data,
          pageNumber: response.currentPage,
          pageSize: size || 11,
          totalCount: response.totalcount,
          totalPages: response.totalPages
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Subscriptions."
      });
    });
});
exports.ApplyLeave = Trackerror(async (req, res, next) => {
  const { Day } = req.body;
  const date = moment(Day);
  console.log(date.utc().format());
  const startOfDay = date.startOf("day").utc().format();
  const endOfDay = date.endOf("day").utc().format();
  const EmployeeAttendance = await db.AttendanceModel.findOne({
    where: {
      [Op.and]: [
        {
          Arrival: { [Op.between]: [startOfDay, endOfDay] }
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    raw: true
  });
  if (EmployeeAttendance) {
    if (EmployeeAttendance.AttendanceStatus == "Leave") {
      return next(
        new HandlerCallBack(
          "Leave is Already Been Applied",
          401
        )
      );
    } else {
      return next(
        new HandlerCallBack(
          "You Cant Apply Leave Your Attendance is Already Marked",
          401
        )
      );
    }
  }
  const Arrival = moment(Day).utc().format("YYYY-MM-DD[T]10:00:00[Z]");
  const Departure = moment(Day).utc().format("YYYY-MM-DD[T]19:00:00[Z]");
  console.log(Arrival);
  console.log(Departure);
  const data = await db.AttendanceModel.create({
    Arrival: Arrival,
    Departure: Departure,
    Day: startOfDay,
    AttendanceStatus:"Leave",
    LeaveApprovalStatus: null,
    Ceo: req.user.Ceo,
    Employee: req.user.Employee
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.TimeOut = Trackerror(async (req, res, next) => {
  const { id } = req.params;
  // const { Departure } = req.body;
  // if (!Departure) {
  //   return next(new HandlerCallBack("Kindly Provide Departure ", 401));
  // }
  const EmployeeAttendance = await db.AttendanceModel.findOne({
    where: {
      [Op.and]: [
        {
          _id: id
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    raw: true
  });

  if (!EmployeeAttendance) {
    return next(new HandlerCallBack("First Time In", 401));
  }
  const start = moment(EmployeeAttendance.Arrival, "YYYY-MM-DD HH:mm:ss");
  const end = moment(Date.now(), "YYYY-MM-DD HH:mm:ss");

  // Calculate the difference in hours
  const duration = moment.duration(end.diff(start));
  const hoursDifference = duration.asHours();
  console.log(hoursDifference);
  let AttendanceStatus = "Present";
  if (hoursDifference < 9) {
    AttendanceStatus = "LeaveEarlier";
  }
  const data = await db.AttendanceModel.update(
    {
      Departure: moment(Date.now()).utc().format(),
      AttendanceStatus: AttendanceStatus
    },
    {
      where: {
        [Op.and]: [
          {
            _id: id
          },
          {
            Employee: req.user.Employee
          }
        ]
      }
    }
  );
  res.status(200).json({
    success: true,
    data
  });
});
exports.TimeIn = Trackerror(async (req, res, next) => {
  const { Arrival } = req.body;
  const date = moment(Arrival);
  console.log(date.utc().format());
  const startOfDay = date.startOf("day").utc().format();
  const endOfDay = date.endOf("day").utc().format();
  if (!Arrival) {
    return next(new HandlerCallBack("Kindly Provide Arrival ", 401));
  }
  console.log(startOfDay);
  console.log(endOfDay);
  const EmployeeAttendance = await db.AttendanceModel.findOne({
    where: {
      [Op.and]: [
        {
          Arrival: { [Op.between]: [startOfDay, endOfDay] }
        },
        {
          Employee: req.user.Employee
        }
      ]
    },
    raw: true
  });
  console.log(EmployeeAttendance);
  if (EmployeeAttendance) {
    return next(new HandlerCallBack("You Already Time In", 401));
  }
  const data = await db.AttendanceModel.create({
    Arrival: moment(Arrival).utc().format(),
    // Departure: moment(Departure).utc().format(),
    Day: startOfDay,
    // AttendanceStatus: AttendanceStatus,
    LeaveApprovalStatus: null,
    Ceo: req.user.Ceo,
    Employee: req.user.Employee
  });
  res.status(200).json({
    success: true,
    data,
    message: "Attendance Has Been Marked"
  });
});
exports.CreateAttendance = Trackerror(async (req, res, next) => {
  const { Name, Employee, Day, Arrival, Departure } = req.body;

  const data = await AttendanceModel.create({
    Name: Name,
    Day: Day,
    Arrival: Arrival,
    Departure: Departure,
    Employee: Employee
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully"
  });
});
exports.EditAttendance = Trackerror(async (req, res, next) => {
  const { Name, Employee, Day, Arrival, Departure } = req.body;

  let data = await AttendanceModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    Employee: Employee || data.Employee,
    Day: Day || data.Day,
    Arrival: Arrival || data.Arrival,
    Departure: Departure || data.Departure
  };
  data = await AttendanceModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  const sendData = await AttendanceModel.findOne({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.SoftDeleteAttendance = Trackerror(async (req, res, next) => {
  const data = await AttendanceModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await AttendanceModel.destroy({
    where: { _id: req.params.id }
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteAttendance = Trackerror(async (req, res, next) => {
  const data = await AttendanceModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await AttendanceModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});

exports.GetAttendanceListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.AttendanceModel.count({});
  await AttendanceModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          Name: {
            [Op.like]: `%${req.query.Name || ""}%`
          }
        }
      ]
    },
    limit,
    offset
  })
    .then((data) => {
      const response = getPagingData1(data, page, limit, totalCount);
      res.status(200).json({
        success: true,
        data: {
          items: response.data,
          pageNumber: response.currentPage,
          pageSize: size || 11,
          totalCount: response.totalcount,
          totalPages: response.totalPages
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Subscriptions."
      });
    });
});
exports.GetSingleAttendance = Trackerror(async (req, res, next) => {
  const data = await AttendanceModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("Data is Not Available", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Data Retrieve",
      data
    });
  }
});
exports.RestoreSoftDeleteAttendance = Trackerror(async (req, res, next) => {
  const data = await AttendanceModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await AttendanceModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedAttendance = Trackerror(async (req, res, next) => {
  const data = await AttendanceModel.findAll({
    paranoid: false,
    where: {
      [Op.not]: { deletedAt: null }
    }
  });
  res.status(200).json({
    success: true,
    message: "Data Retrieve",
    data
  });
});
