const db = require("../config/Connection");
const CityModel = db.CityModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
exports.CityWithRespectToCountry = Trackerror(async (req, res, next) => {
  const CountryData = await db.CountryModel.findOne({
    where: {
      name: "United States",
    },
  });
  const States = await db.StateModel.findAll({
    where: {
      country_id: CountryData._id,
    },
    attributes: ["_id"],
  });
  const ParseStates = JSON.parse(JSON.stringify(States));
  const StatesId = [];
  for (let i = 0; i < ParseStates.length; i++) {
    StatesId.push(ParseStates[i]._id);
  }
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CityModel.count({
    where: {
      [Op.and]: [
        {
          state_id: StatesId,
        },
        {
          name: {
            [Op.like]: `%${req.query.name || ""}%`,
          },
        },
      ],

      // state_id: {
      //   [Op.like]: `%${req.query.state_id || ""}%`,
      // },
    },
  });
  await CityModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          state_id: StatesId,
        },
        {
          name: {
            [Op.like]: `%${req.query.name || ""}%`,
          },
        },
      ],

      // state_id: {
      //   [Op.like]: `%${req.query.state_id || ""}%`,
      // },
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
        message: "All Cities Retrives Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Subscriptions.",
      });
    });
});
exports.CreateCity = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude, state_id } = req.body;

  const data = await CityModel.create({
    name: name,
    longitude: longitude,
    latitude: latitude,
    state_id: state_id,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditCity = Trackerror(async (req, res, next) => {
  const { name, longitude, latitude, state_id } = req.body;
  let data = await CityModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    name: name || data.name,
    longitude: longitude || data.longitude,
    latitude: latitude || data.latitude,
    state_id: state_id || data.state_id,
  };
  data = await CityModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await CityModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    data: sendData,
    message: "Data Updated Successfully",
  });
});
exports.SoftDeleteCity = Trackerror(async (req, res, next) => {
  const data = await CityModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CityModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteCity = Trackerror(async (req, res, next) => {
  const data = await CityModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CityModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    message: "Data Delete Successfully",
  });
});

exports.GetCityListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CityModel.count({
    where: {
      name: {
        [Op.like]: `%${req.query.name || ""}%`,
      },
      state_id: {
        [Op.like]: `%${req.query.state_id || ""}%`,
      },
    },
  });
  await CityModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      name: {
        [Op.like]: `%${req.query.name || ""}%`,
      },
      state_id: {
        [Op.like]: `%${req.query.state_id || ""}%`,
      },
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
exports.GetSingleCity = Trackerror(async (req, res, next) => {
  const data = await CityModel.findOne({
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
exports.RestoreSoftDeleteCity = Trackerror(async (req, res, next) => {
  const data = await CityModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await CityModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    restoredata,
  });
});
exports.GetDeletedCity = Trackerror(async (req, res, next) => {
  const data = await CityModel.findAll({
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
