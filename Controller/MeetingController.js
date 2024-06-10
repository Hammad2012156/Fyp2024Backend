const db = require("../config/Connection");
const MeetingModel = db.MeetingModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op, literal } = require("sequelize");
const crypto = require("crypto");
const base64 = require("base64-js");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
exports.MeetingSchedule = Trackerror(async (req, res, next) => {
  const data = await db.MeetingModel.findAll({
    where: {
      Employee: req.user.Employee
    },
    attributes: ["_id", "Agenda", "Time"],
    include: [
      {
        model: db.EmployeeModel,
        as: "MeetingCreatedByData",
        attributes: ["_id", "Name", "Email", "Image"]
      },

      {
        model: db.ProjectModel,
        as: "ProjectIdMeetingData",
        attributes: ["_id", "Name", "Description", "Deadline"]
      },

      {
        model: db.EmployeeModel,
        as: "EmployeeMeetingData",
        attributes: ["_id", "Name", "Email", "Image"]
      }
    ]
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.QuickMeeting = Trackerror(async (req, res, next) => {
  const { Employees, ProjectId, Time, Agenda } = req.body;
  const ProjectData = await db.ProjectModel.findOne({
    where: {
      _id: ProjectId
    }
  });
  if (!ProjectData) {
    return next(new HandlerCallBack("Project not found", 404));
  }
  if (Array.isArray(Employees) === false) {
    await db.MeetingModel.findOrCreate({
      where: {
        Employee: Employees,
        ProjectId: ProjectId,
        Time: Time,
        Agenda: Agenda,
        MeetingCreatedBy: req.user.Employee,
        Ceo: req.user.Ceo
      },
      default: {
        Employee: Employees,
        ProjectId: ProjectId,
        Time: Time,
        Agenda: Agenda,
        MeetingCreatedBy: req.user.Employee,
        Ceo: req.user.Ceo
      }
    });
  }
  if (Array.isArray(Employees) === true) {
    Employees.map(async (SingleEmployee) => {
      await db.MeetingModel.findOrCreate({
        where: {
          Employee: SingleEmployee,
          ProjectId: ProjectId,
          Time: Time,
          Agenda: Agenda,
          MeetingCreatedBy: req.user.Employee,
          Ceo: req.user.Ceo
        },
        default: {
          Employee: SingleEmployee,
          ProjectId: ProjectId,
          Time: Time,
          Agenda: Agenda,
          MeetingCreatedBy: req.user.Employee,
          Ceo: req.user.Ceo
        }
      });
    });
  }
  // Employees.map(async (SingleEmployee) => {
  //   await db.MeetingModel.findOrCreate({
  //     where: {
  //       Employee: SingleEmployee,
  //       ProjectId: ProjectId,
  //       Time: Time,
  //       Agenda: Agenda,
  //       MeetingCreatedBy: req.user.Employee,
  //       Ceo: req.user.Ceo
  //     },
  //     default: {
  //       Employee: SingleEmployee,
  //       ProjectId: ProjectId,
  //       Time: Time,
  //       Agenda: Agenda,
  //       MeetingCreatedBy: req.user.Employee,
  //       Ceo: req.user.Ceo
  //     }
  //   });
  // });
  res.status(200).json({
    success: true,
    message: "Added Successfully"
  });
});
exports.JoinMeeting = Trackerror(async (req, res, next) => {
  const { id } = req.params;
  const data = await db.MeetingModel.findOne({
    where: {
      _id: id
    },
    attributes: [
      "_id",
      ["ProjectId", "RecordId"],
      "Agenda",
      "Time",
      "MeetingCreatedBy",
      "Employee",
      [
        literal(
          `(select Name from EmployeeModel where _id=MeetingModel.Employee)`
        ),
        "EmployeeName"
      ],
      [
        literal(
          `(select Name from ProjectModel where _id=MeetingModel.ProjectId)`
        ),
        "ProjectName"
      ],
      [
        literal(
          `(select Name from EmployeeModel where _id=MeetingModel.MeetingCreatedBy)`
        ),
        "HostedBy"
      ]
    ]
    // include: [
    //   {
    //     model: db.EmployeeModel,
    //     as: "MeetingCreatedByData",
    //     attributes: ["_id", "Name", "Email", "Image"]
    //   },

    //   {
    //     model: db.ProjectModel,
    //     as: "ProjectIdMeetingData",
    //     attributes: ["_id", "Name", "Description", "Deadline"]
    //   },

    //   {
    //     model: db.EmployeeModel,
    //     as: "EmployeeMeetingData",
    //     attributes: ["_id", "Name", "Email", "Image"]
    //   }
    // ]
  });
  // console.log(data);
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const ParseData = JSON.parse(JSON.stringify(data));
  const plaintext = `&Hostingss=${ParseData.MeetingCreatedBy}&Hosting=${
    ParseData.MeetingCreatedBy
  }&Type=${
    ParseData.MeetingCreatedBy === ParseData.Employee ? "Host" : "Employee"
  }&Employee=${ParseData.Employee}&EmployeeName=${
    ParseData.EmployeeName
  }&ProjectName=${ParseData.ProjectName}&HostedBy=${
    ParseData.HostedBy
  }&RecordId=${ParseData.RecordId}`;
  console.log(process.env.ENCRYPTION_KEY_BASE64);

  const cryptoKey = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.ENCRYPTION_KEY_BASE64, "base64"),
    crypto.randomBytes(16)
  );

  let encryptedData = cryptoKey.update(plaintext, "utf-8", "base64");
  encryptedData += cryptoKey.final("base64");

  // Ensure the encoded string length is a multiple of 4 by adding '=' characters
  const paddingLength = 4 - (encryptedData.length % 4);
  const paddedEncryptedDataBase64 = encryptedData + "Z".repeat(paddingLength);

  res.status(200).json({
    success: true,
    data: {
      link: `${process.env.VIDEO_URL}/?${paddedEncryptedDataBase64}`
    }
  });
});
exports.CreateMeeting = Trackerror(async (req, res, next) => {
  const { Employee, ProjectId, Time, Agenda } = req.body;

  const data = await MeetingModel.create({
    Employee: Employee,
    ProjectId: ProjectId,
    Time: Time,
    Agenda: Agenda,
    MeetingCreatedBy: req.user.Employee,
    Ceo: req.user.Ceo
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully"
  });
});
exports.EditMeeting = Trackerror(async (req, res, next) => {
  const { Employee, ProjectId, Time, Agenda } = req.body;
  let data = await MeetingModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Employee: Employee || data.Employee,
    ProjectId: ProjectId || data.ProjectId,
    Time: Time || data.Time,
    Agenda: Agenda || data.Agenda
  };
  data = await MeetingModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  const sendData = await MeetingModel.findOne({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.SoftDeleteMeeting = Trackerror(async (req, res, next) => {
  const data = await MeetingModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await MeetingModel.destroy({
    where: { _id: req.params.id }
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteMeeting = Trackerror(async (req, res, next) => {
  const data = await MeetingModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await MeetingModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully"
  });
});

exports.GetMeetingListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.MeetingModel.count({
    where: {
      [Op.and]: [
        {
          Agenda: {
            [Op.like]: `%${req.query.Agenda || ""}%`
          }
        }
      ]
    }
  });
  await MeetingModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          Agenda: {
            [Op.like]: `%${req.query.Agenda || ""}%`
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
exports.GetSingleMeeting = Trackerror(async (req, res, next) => {
  const data = await MeetingModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("Data is Not Available", 404));
  } else {
    res.status(200).json({
      success: true,
      data
    });
  }
});
exports.RestoreSoftDeleteMeeting = Trackerror(async (req, res, next) => {
  const data = await MeetingModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await MeetingModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    restoredata
  });
});
exports.GetDeletedMeeting = Trackerror(async (req, res, next) => {
  const data = await MeetingModel.findAll({
    paranoid: false,
    where: {
      [Op.not]: { deletedAt: null }
    }
  });
  res.status(200).json({
    success: true,
    data
  });
});
