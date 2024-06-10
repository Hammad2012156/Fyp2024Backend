const db = require("../config/Connection");
const OrganizationDetailModel = db.OrganizationDetailModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { generateFileName } = require("../Utils/FileNameGeneration");
const { Logo } = require("../Utils/Path");
const { uploadFile } = require("../Utils/s3");
exports.CreateOrganizationDetail = Trackerror(async (req, res, next) => {
  const { Name, DisplayName, CompanyTheme, NoOfEmployees } = req.body;
  const Image = generateFileName();

  if (req.files == null) {
    return next(
      new HandlerCallBack("kindly provide Logo Of Organization", 400)
    );
  }
  const file = req.files.image;
  await uploadFile(req.files.image.data, `${Logo}/${Image}`, file.mimetype);
  const data = await OrganizationDetailModel.create({
    Name: Name,
    CompanyTheme: CompanyTheme,
    Ceo:req.user.Ceo,
    Image: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Logo}/${Image}`,
    NoOfEmployees: NoOfEmployees,
    DisplayName: DisplayName,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditOrganizationDetail = Trackerror(async (req, res, next) => {
  const { Name, DisplayName, CompanyTheme, NoOfEmployees } = req.body;

  let data = await OrganizationDetailModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    DisplayName: DisplayName || data.DisplayName,
    NoOfEmployees: NoOfEmployees || data.NoOfEmployees,
    CompanyTheme: CompanyTheme || data.CompanyTheme,
  };
  data = await OrganizationDetailModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await OrganizationDetailModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteOrganizationDetail = Trackerror(async (req, res, next) => {
  const data = await OrganizationDetailModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await OrganizationDetailModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteOrganizationDetail = Trackerror(async (req, res, next) => {
  const data = await OrganizationDetailModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await OrganizationDetailModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});

exports.GetOrganizationDetailListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.OrganizationDetailModel.count({});
  await OrganizationDetailModel.findAndCountAll({
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
exports.GetSingleOrganizationDetail = Trackerror(async (req, res, next) => {
  const data = await OrganizationDetailModel.findOne({
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
exports.RestoreSoftDeleteOrganizationDetail = Trackerror(
  async (req, res, next) => {
    const data = await OrganizationDetailModel.findOne({
      paranoid: false,
      where: { _id: req.params.id },
    });
    if (!data) {
      return next(new HandlerCallBack("data not found", 404));
    }
    const restoredata = await OrganizationDetailModel.restore({
      where: { _id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Data Restore",
      restoredata,
    });
  }
);
exports.GetDeletedOrganizationDetail = Trackerror(async (req, res, next) => {
  const data = await OrganizationDetailModel.findAll({
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
