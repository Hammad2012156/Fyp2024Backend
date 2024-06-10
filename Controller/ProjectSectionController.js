const db = require("../config/Connection");
const ProjectSectionModel = db.ProjectSectionModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateProjectSection = Trackerror(async (req, res, next) => {
  const { ProjectId, Title } = req.body;

  const data = await ProjectSectionModel.create({
    ProjectId: ProjectId,
    Title: Title
  })
    .then(async (data) => {
      const ProjectData = await db.ProjectSectionModel.findAll({
        where: {
          ProjectId: data.ProjectId
        },
        include: [
          {
            model: db.EmployeeTaskModel,
            as: "ProjectSectionData",
            attributes: [
              "_id",
              "TaskDetail",
              "DueDate",
              "DueDate",
              "TaskSubject"
            ],
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
      res.status(201).json({
        success: true,
        data: ProjectData,
        message: "Data Created Successfully"
      });
    })
    .catch((err) => {
      res.status(201).json({
        success: true,
        err,
        data: [],
        message: "Data Created Successfully"
      });
    });
});
exports.EditProjectSection = Trackerror(async (req, res, next) => {
  const { ProjectId, Title } = req.body;

  let data = await ProjectSectionModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const ParseData = JSON.parse(JSON.stringify(data));
  const updateddata = {
    ProjectId: ProjectId || data.ProjectId,
    Title: Title || data.Title
  };
  data = await ProjectSectionModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
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
        ] // include:[
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
exports.SoftDeleteProjectSection = Trackerror(async (req, res, next) => {
  const data = await ProjectSectionModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await ProjectSectionModel.destroy({
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
    message: "Data Delete Successfully",
    data: sendData
  });
});
exports.HardDeleteProjectSection = Trackerror(async (req, res, next) => {
  const data = await ProjectSectionModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await ProjectSectionModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});

exports.GetProjectSectionListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.ProjectSectionModel.count({});
  await ProjectSectionModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          ProjectId: {
            [Op.like]: `%${req.query.ProjectId || ""}%`
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
exports.GetSingleProjectSection = Trackerror(async (req, res, next) => {
  const data = await ProjectSectionModel.findOne({
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
exports.RestoreSoftDeleteProjectSection = Trackerror(async (req, res, next) => {
  const data = await ProjectSectionModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await ProjectSectionModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedProjectSection = Trackerror(async (req, res, next) => {
  const data = await ProjectSectionModel.findAll({
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
