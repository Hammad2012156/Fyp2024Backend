const db = require("../config/Connection");
const CeoModel = db.CeoModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const TokenCreation = require("../Utils/TokenCreation");
exports.LoginCeo = Trackerror(async (req, res, next) => {
  const { Email, password } = req.body;
  if (!Email || !password) {
    return next(new HandlerCallBack("Please enter password and Email", 400));
  }
  const user = await CeoModel.findOne({
    where: { UserId: Email },
  });
  if (!user) {
    return next(new HandlerCallBack("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new HandlerCallBack("Email or password is incorrect", 401));
  }
  const data = await CeoModel.findOne({
    where: {
      _id: user._id,
    },
  });
  TokenCreation(data, 200, res);
});
exports.CreateCeo = Trackerror(async (req, res, next) => {
  const { UserId, Password, CompanyId } = req.body;

  const data = await CeoModel.create({
    UserId: UserId,
    CompanyId: CompanyId,
    Password: Password,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditCeo = Trackerror(async (req, res, next) => {
  const { UserId, Password, CompanyId } = req.body;

  let data = await CeoModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    UserId: UserId || data.UserId,
    Password: Password || data.Password,
    CompanyId: CompanyId || data.CompanyId,
  };
  data = await CeoModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await CeoModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteCeo = Trackerror(async (req, res, next) => {
  const data = await CeoModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CeoModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteCeo = Trackerror(async (req, res, next) => {
  const data = await CeoModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CeoModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});

exports.GetCeoListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CeoModel.count({});
  await CeoModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          UserId: {
            [Op.like]: `%${req.query.UserId || ""}%`,
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
exports.GetSingleCeo = Trackerror(async (req, res, next) => {
  const data = await CeoModel.findOne({
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
exports.RestoreSoftDeleteCeo = Trackerror(async (req, res, next) => {
  const data = await CeoModel.findOne({
    paranoid: false,
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await CeoModel.restore({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata,
  });
});
exports.GetDeletedCeo = Trackerror(async (req, res, next) => {
  const data = await CeoModel.findAll({
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
