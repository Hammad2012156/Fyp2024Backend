const db = require("../config/Connection");
const DesignationModel = db.DesignationModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateDesignation = Trackerror(async (req, res, next) => {
  const { Name, Description } = req.body;

  const data = await DesignationModel.create({
    Name: Name,

    Description: Description,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditDesignation = Trackerror(async (req, res, next) => {
  const { Name, Description } = req.body;

  let data = await DesignationModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    Description: Description || data.Description,
  };
  data = await DesignationModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await DesignationModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteDesignation = Trackerror(async (req, res, next) => {
  const data = await DesignationModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await DesignationModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteDesignation = Trackerror(async (req, res, next) => {
  const data = await DesignationModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await DesignationModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});

exports.GetDesignationListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.DesignationModel.count({});
  await DesignationModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          Name: {
            [Op.like]: `%${req.query.Name || ""}%`,
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
exports.GetSingleDesignation = Trackerror(async (req, res, next) => {
  const data = await DesignationModel.findOne({
    where: { _id: req.params.id },
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
exports.RestoreSoftDeleteDesignation = Trackerror(async (req, res, next) => {
  const data = await DesignationModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await DesignationModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata,
  });
});
exports.GetDeletedDesignation = Trackerror(async (req, res, next) => {
  const data = await DesignationModel.findAll({
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
