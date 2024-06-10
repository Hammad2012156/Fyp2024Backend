const db = require("../config/Connection");
const OrganizationTypeModel = db.OrganizationTypeModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");

exports.CreateOrganizationType = Trackerror(async (req, res, next) => {
  const { Name, Description } = req.body;

  const data = await OrganizationTypeModel.create({
    Name: Name,

    Description: Description,
  });

  res.status(201).json({
    success: true,
    data,
    message: "Data Created Successfully",
  });
});
exports.EditOrganizationType = Trackerror(async (req, res, next) => {
  const { Name, Description } = req.body;

  let data = await OrganizationTypeModel.findOne({
    where: { _id: req.params.id },
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    Description: Description || data.Description,
  };
  data = await OrganizationTypeModel.update(updateddata, {
    where: {
      _id: req.params.id,
    },
  });
  const sendData = await OrganizationTypeModel.findOne({
    where: { _id: req.params.id },
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData,
  });
});
exports.SoftDeleteOrganizationType = Trackerror(async (req, res, next) => {
  const data = await OrganizationTypeModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await OrganizationTypeModel.destroy({
    where: { _id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});
exports.HardDeleteOrganizationType = Trackerror(async (req, res, next) => {
  const data = await OrganizationTypeModel.findOne({
    where: { _id: req.params.id },
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await OrganizationTypeModel.destroy({
    where: { _id: req.params.id },
    force: true,
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully",
  });
});

exports.GetOrganizationTypeListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.OrganizationTypeModel.count({});
  await OrganizationTypeModel.findAndCountAll({
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
exports.GetSingleOrganizationType = Trackerror(async (req, res, next) => {
  const data = await OrganizationTypeModel.findOne({
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
exports.RestoreSoftDeleteOrganizationType = Trackerror(
  async (req, res, next) => {
    const data = await OrganizationTypeModel.findOne({
      paranoid: false,
      where: { _id: req.params.id },
    });
    if (!data) {
      return next(new HandlerCallBack("data not found", 404));
    }
    const restoredata = await OrganizationTypeModel.restore({
      where: { _id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Data Restore",
      restoredata,
    });
  }
);
exports.GetDeletedOrganizationType = Trackerror(async (req, res, next) => {
  const data = await OrganizationTypeModel.findAll({
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
