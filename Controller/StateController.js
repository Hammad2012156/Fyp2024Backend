const db = require("../config/Connection");
const StateModel = db.StateModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateState = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude, country_id } = req.body;

  const data = await StateModel.create({
    name: name,
    longitude: longitude,
    latitude: latitude,
    country_id: country_id,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditState = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude, country_id } = req.body;
  let data = await StateModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    name: name || data.name,
    longitude: longitude || data.longitude,
    latitude: latitude || data.latitude,
    country_id: country_id || data.country_id,
  };
  data = await StateModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await StateModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteState = Trackerror(async (req, res, next) => {
  const data = await StateModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await StateModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteState = Trackerror(async (req, res, next) => {
  const data = await StateModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await StateModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});

exports.GetStateListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.StateModel.count({
    where: {
      [Op.and]: [
        {
          country_id: {
            [Op.like]: `%${req.query.country_id || ""}%`,
          },
        },
      ],
    },
  });
  await StateModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          country_id: {
            [Op.like]: `%${req.query.country_id || ""}%`,
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
exports.GetSingleState = Trackerror(async (req, res, next) => {
  const data = await StateModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("Data is Not Available", 404));
  } else {
    res.status(200).json({
      success: true,
      data,
    });
  }
});
exports.RestoreSoftDeleteState = Trackerror(async (req, res, next) => {
  const data = await StateModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await StateModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    restoredata,
  });
});
exports.GetDeletedState = Trackerror(async (req, res, next) => {
  const data = await StateModel.findAll({
    paranoid: false,
    where: {
      [Op.not]: { deletedAt: null },
    },
  });
  res.status(200).json({
    success: true,
    data,
  });
});
