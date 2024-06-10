const db = require("../config/Connection");
const CompanyThemeModel = db.CompanyThemeModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateCompanyTheme = Trackerror(async (req, res, next) => {
  const {
    Name,
    PrimaryDayColor,
    SecondaryDayColor,
    PrimaryDayFontColor,
    SecondaryDayFontColor,
    PrimaryNightColor,
    SecondaryNightColor,
    PrimaryFontNightColor,
    SecondaryFontNightColor,
    SuccessDayColor,
    SuccessNightColor,
    WarningDayColor,
    WarningNightColor,
    Status,
  } = req.body;

  const data = await CompanyThemeModel.create({
    Name: Name,
    SecondaryDayColor: SecondaryDayColor,
    PrimaryDayFontColor: PrimaryDayFontColor,
    SecondaryDayFontColor: SecondaryDayFontColor,
    SecondaryNightColor: SecondaryNightColor,
    PrimaryFontNightColor: PrimaryFontNightColor,
    SecondaryFontNightColor: SecondaryFontNightColor,
    PrimaryNightColor: PrimaryNightColor,
    PrimaryDayColor: PrimaryDayColor,
    SuccessDayColor: SuccessDayColor,
    WarningNightColor: WarningNightColor,
    SuccessNightColor: SuccessNightColor,
    WarningDayColor: WarningDayColor,
    Status: Status,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditCompanyTheme = Trackerror(async (req, res, next) => {
  const {
    Name,
    PrimaryDayColor,
    SecondaryDayColor,
    PrimaryDayFontColor,
    SecondaryDayFontColor,
    PrimaryNightColor,
    SecondaryNightColor,
    PrimaryFontNightColor,
    SecondaryFontNightColor,
    SuccessDayColor,
    SuccessNightColor,
    WarningDayColor,
    WarningNightColor,
    Status,
  } = req.body;

  let data = await CompanyThemeModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    PrimaryDayColor: PrimaryDayColor || data.PrimaryDayColor,
    SecondaryDayColor: SecondaryDayColor || data.SecondaryDayColor,
    PrimaryDayFontColor: PrimaryDayFontColor || data.PrimaryDayFontColor,
    SecondaryDayFontColor: SecondaryDayFontColor || data.SecondaryDayFontColor,
    PrimaryNightColor: PrimaryNightColor || data.PrimaryNightColor,
    SecondaryNightColor: SecondaryNightColor || data.SecondaryNightColor,
    SuccessDayColor: SuccessDayColor || data.SuccessDayColor,
    PrimaryFontNightColor: PrimaryFontNightColor || data.PrimaryFontNightColor,
    SuccessNightColor: SuccessNightColor || data.SuccessNightColor,
    WarningNightColor: WarningNightColor || data.WarningNightColor,
    WarningDayColor: WarningDayColor || data.WarningDayColor,
    SecondaryFontNightColor:
      SecondaryFontNightColor || data.SecondaryFontNightColor,
    Status: Status || data.Status,
  };
  data = await CompanyThemeModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await CompanyThemeModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteCompanyTheme = Trackerror(async (req, res, next) => {
  const data = await CompanyThemeModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CompanyThemeModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteCompanyTheme = Trackerror(async (req, res, next) => {
  const data = await CompanyThemeModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CompanyThemeModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});

exports.GetCompanyThemeListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CompanyThemeModel.count({});
  await CompanyThemeModel.findAndCountAll({
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
exports.GetSingleCompanyTheme = Trackerror(async (req, res, next) => {
  const data = await CompanyThemeModel.findOne({
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
exports.RestoreSoftDeleteCompanyTheme = Trackerror(async (req, res, next) => {
  const data = await CompanyThemeModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await CompanyThemeModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata,
  });
});
exports.GetDeletedCompanyTheme = Trackerror(async (req, res, next) => {
  const data = await CompanyThemeModel.findAll({
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
