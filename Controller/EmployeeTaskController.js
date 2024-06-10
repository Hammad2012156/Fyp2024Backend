const db = require("../config/Connection");
const EmployeeTaskModel = db.EmployeeTaskModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
// exports.SwapTask=Trackerror(async(req,res,next)=>{
// })
exports.CreateEmployeeTask = Trackerror(async (req, res, next) => {
  const {
    TaskDetail,
    ProjectSection,
    ProjectId,
    AssignBy,
    DueDate,
    AssignTo,
    TaskSubject
  } = req.body;
  const ProjectData = await db.ProjectModel.findOne({
    where: {
      _id: req.params.id
    }
  });
  if (!ProjectData) {
    return next(new HandlerCallBack("Project not found", 404));
  }
  const data = await EmployeeTaskModel.create({
    TaskDetail: TaskDetail,
    ProjectSection: ProjectSection,
    AssignBy: req.user.Employee,
    DueDate: DueDate,
    AssignTo: AssignTo,
    TaskSubject: TaskSubject,
    ProjectId: req.params.id,
    Ceo: req.user.Ceo
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully"
  });
});
exports.EditEmployeeTask = Trackerror(async (req, res, next) => {
  const {
    TaskDetail,
    ProjectId,
    ProjectSection,
    AssignBy,
    DueDate,
    AssignTo,
    TaskSubject
  } = req.body;

  let data = await EmployeeTaskModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const ParseData = JSON.parse(JSON.stringify(data));
  const updateddata = {
    ProjectSection: ProjectSection || data.ProjectSection,
    TaskDetail: TaskDetail || data.TaskDetail,
    ProjectId: ProjectId || data.ProjectId,
    AssignBy: AssignBy || data.AssignBy,
    DueDate: DueDate || data.DueDate,
    AssignTo: AssignTo || data.AssignTo,
    TaskSubject: TaskSubject || data.TaskSubject
  };
  data = await EmployeeTaskModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  // const sendData = await EmployeeTaskModel.findOne({
  //   where: { _id: req.params.id }
  // });
  const sendData = await db.ProjectSectionModel.findAll({
    where: {
      ProjectId: ParseData.ProjectId
    },
    include: [
      {
        model: db.EmployeeTaskModel,
        as: "ProjectSectionData",
        attributes: ["_id", "TaskDetail", "DueDate", "DueDate", "TaskSubject"],
        include: [
          {
            model: db.EmployeeModel,
            as: "AssignToData",
            attributes: ["_id", "Name", "Email", "Image"]
          }
        ]
        // include:[
        //   {
        //     model:db.EmployeeModel,
        //     as:""
        //   }
        // ]
        // include: { all: true },
      }
    ]
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.MyTask = Trackerror(async (req, res, next) => {
  const user = req.user.Employee;
  const data = await db.EmployeeTaskModel.findAll({
    where: {
      AssignTo: user
    },
    attributes: ["_id", "TaskDetail", "TaskSubject", "DueDate"],
    // include: { all: true }
    include: [
      {
        model: db.ProjectSectionModel,
        as: "ProjectSectionData",
        attributes: ["_id", "Title"]
      },
      {
        model: db.EmployeeModel,
        as: "AssignByData",
        attributes: ["_id", "Name", "Email", "Image"]
      },
      {
        model: db.ProjectModel,
        as: "ProjectTaskData",
        attributes: ["_id", "Name", "Deadline"]
      }
    ]
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.SoftDeleteEmployeeTask = Trackerror(async (req, res, next) => {
  const data = await EmployeeTaskModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeTaskModel.destroy({
    where: { _id: req.params.id }
  });
  const ParseData = JSON.parse(JSON.stringify(data));
  const sendData = await db.ProjectSectionModel.findAll({
    where: {
      ProjectId: ParseData.ProjectId
    },
    include: [
      {
        model: db.EmployeeTaskModel,
        as: "ProjectSectionData",
        attributes: ["_id", "TaskDetail", "DueDate", "DueDate", "TaskSubject"],
        
        include: [
          {
            model: db.EmployeeModel,
            as: "AssignToData",
            attributes: ["_id", "Name", "Email", "Image"]
          }
        ]
        // include:[
        //   {
        //     model:db.EmployeeModel,
        //     as:""
        //   }
        // ]
        // include: { all: true },
      }
    ]
  });
  res.status(200).json({
    success: true,
    data: sendData,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteEmployeeTask = Trackerror(async (req, res, next) => {
  const data = await EmployeeTaskModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeTaskModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});

exports.GetEmployeeTaskListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.EmployeeTaskModel.count({});
  await EmployeeTaskModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          TaskDetail: {
            [Op.like]: `%${req.query.TaskDetail || ""}%`
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
exports.GetSingleEmployeeTask = Trackerror(async (req, res, next) => {
  const data = await EmployeeTaskModel.findOne({
    where: { _id: req.params.id },
    include: { all: true }
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
exports.RestoreSoftDeleteEmployeeTask = Trackerror(async (req, res, next) => {
  const data = await EmployeeTaskModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await EmployeeTaskModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedEmployeeTask = Trackerror(async (req, res, next) => {
  const data = await EmployeeTaskModel.findAll({
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
