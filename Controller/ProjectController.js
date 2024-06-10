const db = require("../config/Connection");
const ProjectModel = db.ProjectModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { generateFileName } = require("../Utils/FileNameGeneration");
const { ProjectDocument, Employee } = require("../Utils/Path");
const { uploadFile } = require("../Utils/s3");
exports.CreateProject = Trackerror(async (req, res, next) => {
  const {
    Name,
    Description,
    RecurringMeetingDay,
    RecurringMeeting,
    ProjectCreatedBy,
    Deadline,
    ProjectAssignTo
  } = req.body;
  console.log(req.user);
  const data = await ProjectModel.create({
    Name: Name,
    RecurringMeetingDay: RecurringMeetingDay,
    RecurringMeeting: RecurringMeeting,
    ProjectCreatedBy: req.user.Employee,
    Deadline: Deadline,
    ProjectAssignTo: ProjectAssignTo,
    Description: Description,
    Ceo: req.user.Ceo
  });
  // .then(async (data) => {})
  // .catch((err) => {
  //   res.status(201).json({
  //     success: true,
  //     err,
  //     data: null,
  //     message: "Data Created Successfully"
  //   });
  // });
  if (req.files != null) {
    if (Array.isArray(req.files.Document) === false) {
      const file = req.files.Document;
      const Image = generateFileName();
      await uploadFile(
        req.files.Document.data,
        `${ProjectDocument}/${Image}`,
        file.mimetype
      );
      await db.ProjectDocumentModel.create({
        ProjectId: data._id,
        Document: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${ProjectDocument}/${Image}`
      });
    }
    if (Array.isArray(req.files.Document) === true) {
      let file = req.files.Document;
      await file.map(async (singleimage) => {
        let SingleImage = generateFileName();
        console.log(singleimage);
        await uploadFile(
          singleimage.data,
          `${ProjectDocument}/${SingleImage}`,
          singleimage.mimetype
        );
        await db.ProjectDocumentModel.create({
          ProjectId: data._id,
          Document: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${ProjectDocument}/${SingleImage}`
        });
      });
    }
  }
  const ProjectDetails = await db.MessagingGroupModel.create({
    Name: Name,
    Description: Description,
    ProjectId: data._id,
    Ceo: req.user.Ceo
  });
  const AllEmployees = await db.EmployeeModel.findAll({
    where: {
      Ceo: req.user.Ceo
    },
    attributes: ["_id"]
  });
  const AllEmployeesId = [];
  for (let i = 0; i < AllEmployees.length; i++) {
    let Type = "Participant";
    if (AllEmployees[i]._id == ProjectAssignTo) {
      Type = "Admin";
    }
    AllEmployeesId.push({
      MessagingGroupId: ProjectDetails._id,
      ParticipantId: AllEmployees[i]._id,
      Type: Type,
      Ceo: req.user.Ceo
    });
  }
  console.log(AllEmployees);
  await db.GroupMessageParticipantModel.bulkCreate(AllEmployeesId);
  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully"
  });
});
exports.EditProject = Trackerror(async (req, res, next) => {
  const {
    Name,
    Description,
    RecurringMeetingDay,
    RecurringMeeting,
    ProjectCreatedBy,
    Deadline,
    ProjectAssignTo
  } = req.body;

  let data = await ProjectModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    Description: Description || data.Description,
    ProjectCreatedBy: ProjectCreatedBy || data.ProjectCreatedBy,
    Deadline: Deadline || data.Deadline,
    ProjectAssignTo: ProjectAssignTo || data.ProjectAssignTo
  };
  data = await ProjectModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  const sendData = await ProjectModel.findOne({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.SoftDeleteProject = Trackerror(async (req, res, next) => {
  const data = await ProjectModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await ProjectModel.destroy({
    where: { _id: req.params.id }
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteProject = Trackerror(async (req, res, next) => {
  const data = await ProjectModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await ProjectModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});

exports.GetProjectListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.ProjectModel.count({});
  await ProjectModel.findAndCountAll({
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
exports.GetSingleProject = Trackerror(async (req, res, next) => {
  const data = await ProjectModel.findOne({
    where: { _id: req.params.id },
    include: [
      {
        model: db.ProjectDocumentModel,
        as: "ProjectDocumentData",
        attributes: ["_id", "ProjectId", "Document"]
      },
      {
        model: db.ProjectDocumentModel,
        as: "ProjectDocumentData",
        attributes: ["_id", "ProjectId", "Document"]
      },
      {
        model: db.EmployeeModel,
        as: "ProjectAssignToData",
        attributes: ["_id", "Name", "Email", "Image"]
      },
      {
        model: db.EmployeeModel,
        as: "ProjectCreatedByData",
        attributes: ["_id", "Name", "Email", "Image"]
      },
      {
        model: db.ProjectSectionModel,
        as: "CompanyProjectSectionData",
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
      }
    ]
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
exports.RestoreSoftDeleteProject = Trackerror(async (req, res, next) => {
  const data = await ProjectModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await ProjectModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedProject = Trackerror(async (req, res, next) => {
  const data = await ProjectModel.findAll({
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
