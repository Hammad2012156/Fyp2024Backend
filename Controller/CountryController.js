const db = require("../config/Connection");
const CountryModel = db.CountryModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateCountry = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude } = req.body;

  const data = await CountryModel.create({
    name: name,
    longitude: longitude,
    latitude: latitude,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditCountry = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude } = req.body;
  let data = await CountryModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    name: name || data.name,
    longitude: longitude || data.longitude,
    latitude: latitude || data.latitude,
  };
  data = await CountryModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await CountryModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteCountry = Trackerror(async (req, res, next) => {
  const data = await CountryModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CountryModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteCountry = Trackerror(async (req, res, next) => {
  const data = await CountryModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CountryModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});

exports.GetCountryListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CountryModel.count({});
  await CountryModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          name: {
            [Op.like]: `%${req.query.name || ""}%`,
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
exports.GetSingleCountry = Trackerror(async (req, res, next) => {
  const data = await CountryModel.findOne({
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
exports.RestoreSoftDeleteCountry = Trackerror(async (req, res, next) => {
  const data = await CountryModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await CountryModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    restoredata,
  });
});
exports.GetDeletedCountry = Trackerror(async (req, res, next) => {
  const data = await CountryModel.findAll({
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
