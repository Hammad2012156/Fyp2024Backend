const db = require("../config/Connection");
const EmployeeDocumentModel = db.EmployeeDocumentModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { generateFileName } = require("../Utils/FileNameGeneration");
const { Document } = require("../Utils/Path");
const { uploadFile } = require("../Utils/s3");
exports.CreateEmployeeDocumentbytoken = Trackerror(async (req, res, next) => {
  const { DocumentName, DocumentId } = req.body;
  const Image = generateFileName();

  if (req.files == null) {
    return next(new HandlerCallBack("kindly provide Employee Image ", 400));
  }
  const file = req.files.image;
  await uploadFile(req.files.image.data, `${Document}/${Image}`, file.mimetype);
  const data = await EmployeeDocumentModel.create({
    EmployeeId: req.user.Employee,
    Ceo: req.user.Ceo,
    DocumentId: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Document}/${Image}`,
    DocumentName: DocumentName,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
})
exports.CreateEmployeeDocument = Trackerror(async (req, res, next) => {
  const { DocumentName, DocumentId } = req.body;
  const Image = generateFileName();

  if (req.files == null) {
    return next(new HandlerCallBack("kindly provide Employee Image ", 400));
  }
  const file = req.files.image;
  await uploadFile(req.files.image.data, `${Document}/${Image}`, file.mimetype);
  const data = await EmployeeDocumentModel.create({
    EmployeeId: req.params.id,
    DocumentId: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Document}/${Image}`,
    DocumentName: DocumentName,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditEmployeeDocument = Trackerror(async (req, res, next) => {
  const { EmployeeId, DocumentName, DocumentId } = req.body;

  let data = await EmployeeDocumentModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    EmployeeId: EmployeeId || data.EmployeeId,
    DocumentName: DocumentName || data.DocumentName,
    DocumentId: DocumentId || data.DocumentId,
  };
  data = await EmployeeDocumentModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await EmployeeDocumentModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteEmployeeDocument = Trackerror(async (req, res, next) => {
  const data = await EmployeeDocumentModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeDocumentModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteEmployeeDocument = Trackerror(async (req, res, next) => {
  const data = await EmployeeDocumentModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeDocumentModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.GetEmployeeDocumentListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.EmployeeDocumentModel.count({});
  await EmployeeDocumentModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          EmployeeId: {
            [Op.like]: `%${req.query.EmployeeId || ""}%`,
          },
        },
      ],
    },
    limit,
    offset,
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
          totalPages: response.totalPages,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Subscriptions.",
      });
    });
});
exports.GetSingleEmployeeDocument = Trackerror(async (req, res, next) => {
  const data = await EmployeeDocumentModel.findOne({
    where: { EmployeeId: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("Data is Not Available", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Data Retrieve",
      data,
    });
  }
});
exports.RestoreSoftDeleteEmployeeDocument = Trackerror(
  async (req, res, next) => {
    const data = await EmployeeDocumentModel.findOne({
      paranoid: false,
      where: { _id: req.params.id },
    });
    if (!data) {
      return next(new HandlerCallBack("data not found", 404));
    }
    const restoredata = await EmployeeDocumentModel.restore({
      where: { _id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Data Restore",
      restoredata,
    });
  }
);
exports.GetDeletedEmployeeDocument = Trackerror(async (req, res, next) => {
  const data = await EmployeeDocumentModel.findAll({
    paranoid: false,
    where: {
      [Op.not]: { deletedAt: null },
    },
  });
  res.status(200).json({
    success: true,
    message: "Data Retrieve",
    data,
  });
});
