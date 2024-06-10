const db = require("../config/Connection");
const EmployeeModel = db.EmployeeModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op, where } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { generateFileName } = require("../Utils/FileNameGeneration");
const { Employee } = require("../Utils/Path");
const { uploadFile } = require("../Utils/s3");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokenCreation = require("../Utils/TokenCreation");
exports.MainLogin = Trackerror(async (req, res, next) => {
  const { UserId, password } = req.body;
  if (!UserId || !password) {
    return next(new HandlerCallBack("Please enter password and Email", 400));
  }
  const user = await EmployeeModel.findOne({
    where: { Email: UserId }
  });
  if (user) {
    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
      return next(new HandlerCallBack("Email or password is incorrect", 401));
    }
    const data = await EmployeeModel.findOne({
      where: {
        _id: user._id
      }
    });
    TokenCreation(data, 200, res);
  } else if (!user) {
    const Ceo = await db.CeoModel.findOne({
      where: {
        UserId: UserId
      }
    });
    if (!Ceo) {
      return next(new HandlerCallBack("Invalid Email/UserId or Password", 401));
    }
    const isPasswordMatched = await Ceo.comparePassword(password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      return next(new HandlerCallBack("Email or password is incorrect", 401));
    }
    const data = await db.CeoModel.findOne({
      where: {
        _id: Ceo._id
      }
    });
    const CompanyDetailData = await db.CompanyDetailModel.findOne({
      where: {
        _id: data.CompanyId
      }
    });
    const OrganizationDetail = await db.OrganizationDetailModel.findOne({
      where: {
        Ceo: data._id
      }
    });
    // const UserData = {
    //   _id: data._id,
    //   UserId: data.UserId,
    //   CompanyName: CompanyDetailData.Name,
    //   Password: data.Password,
    //   Image: OrganizationDetail?.Image,
    // };
    TokenCreation(data, 200, res);
  } else {
    return next(new HandlerCallBack("Invalid Email or Password", 401));
  }
});
exports.UserDetail = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const EmployeeData = await db.EmployeeModel.findOne({
    where: {
      _id: decodedData.id
    },

    attributes: ["_id", "Ceo"]
  });
  if (!EmployeeData) {
    const Data = await db.CeoModel.findOne({
      where: {
        _id: decodedData.id
      }
      // attributes: ["Status", "Ceo"],
    });
    const CompanyDetailData = await db.CompanyDetailModel.findOne({
      where: {
        _id: Data.CompanyId
      }
    });
    const OrganizationDetail = await db.OrganizationDetailModel.findOne({
      where: {
        Ceo: Data._id
      },
      include: [
        {
          model: db.CompanyThemeModel,
          as: "CompanyThemeData",
          attributes: [
            "_id",
            "Name",
            "PrimaryDayColor",
            "SecondaryDayColor",
            "PrimaryDayFontColor",
            "SecondaryDayFontColor",
            "PrimaryNightColor",
            "SecondaryNightColor",
            "PrimaryNightFontColor",
            "SecondaryNightFontColor",
            "SuccessDayColor",
            "SuccessNightColor",
            "WarningDayColor",
            "WarningNightColor"
          ]
        }
      ]
    });
    const UserData = {
      _id: Data._id,
      UserId: Data.Email,
      Type: "Ceo",
      CompanyName: CompanyDetailData.Name,
      Image: OrganizationDetail?.Image,
      Theme: OrganizationDetail?.CompanyThemeData
    };
    res.status(200).json({
      success: true,
      data: UserData
    });
  } else if (EmployeeData) {
    const Data = await db.CeoModel.findOne({
      where: {
        _id: EmployeeData.Ceo
      }
    });

    const CompanyDetailData = await db.CompanyDetailModel.findOne({
      where: {
        _id: Data.CompanyId
      }
    });
    const OrganizationDetail = await db.OrganizationDetailModel.findOne({
      where: {
        Ceo: Data._id
      },
      include: [
        {
          model: db.CompanyThemeModel,
          as: "CompanyThemeData",
          attributes: [
            "_id",
            "Name",
            "PrimaryDayColor",
            "SecondaryDayColor",
            "PrimaryDayFontColor",
            "SecondaryDayFontColor",
            "PrimaryNightColor",
            "SecondaryNightColor",
            "PrimaryNightFontColor",
            "SecondaryNightFontColor",
            "SuccessDayColor",
            "SuccessNightColor",
            "WarningDayColor",
            "WarningNightColor"
          ]
        }
      ]
    });
    const UserData = {
      _id: EmployeeData._id,
      UserId: Data.Email,
      Type: "Employee",
      CompanyName: CompanyDetailData.Name,
      Image: OrganizationDetail?.Image,
      Theme: OrganizationDetail?.CompanyThemeData
    };
    res.status(200).json({
      success: true,
      data: UserData
    });
  } else {
    return next(
      new HandlerCallBack(
        "Invalid Token Kindly Login Again Or Enter Correct Credentials",
        401
      )
    );
  }
});
exports.VerifyEmployee = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const data = await db.EmployeeModel.findOne({
    where: {
      _id: decodedData.id
    }

    // attributes: ["_id"],
  });
  if (!data) {
    return next(
      new HandlerCallBack(
        "Invalid Token Kindly Login Again Or Enter Correct Credentials",
        401
      )
    );
  }
  res.status(200).json({
    success: true,
    data
  });
});
exports.CreateEmployee = Trackerror(async (req, res, next) => {
  const {
    Name,
    CompanyId,
    Mobile,
    Email,
    IdentityNumber,
    DOB,
    DateOfJoining,
    MartialStatus,
    Designation,
    ReportingAuthority,
    City,
    Address,
    PermanentAddress,
    ZipCode,
    Password
  } = req.body;
  const Image = generateFileName();
  console.log(req.user);

  if (req.files == null) {
    return next(new HandlerCallBack("kindly provide Employee Image ", 400));
  }
  const file = req.files.image;
  await uploadFile(req.files.image.data, `${Employee}/${Image}`, file.mimetype);
  const data = await EmployeeModel.create({
    Name: Name,
    Email: Email,
    Password: await bcrypt.hash(Password, 10),
    Mobile: Mobile,
    IdentityNumber: IdentityNumber,
    DOB: DOB,
    DateOfJoining: DateOfJoining,
    MartialStatus: MartialStatus,
    CompanyId: req.user.Company,
    Ceo: req.user.Ceo,
    Designation: Designation,
    ReportingAuthority: ReportingAuthority,
    City: City,
    Image: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Employee}/${Image}`,
    Address: Address,
    Designation: Designation,
    PermanentAddress: PermanentAddress,
    // Ceo: req.user.Ceo,
    ZipCode: ZipCode
  });
  TokenCreation(data, 200, res);
  // res.status(201).json({
  //   success: true,
  //   data,
  //   message: "Data Created Successfully"
  // });
});
exports.EditEmployeeById = Trackerror(async (req, res, next) => {
  const {
    Name,
    CompanyId,
    Mobile,
    Email,
    IdentityNumber,
    DOB,
    DateOfJoining,
    MartialStatus,
    Designation,
    ReportingAuthority,
    City,
    Address,
    PermanentAddress,
    ZipCode,
    Password
  } = req.body;

  let data = await EmployeeModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    CompanyId: CompanyId || data.CompanyId,
    Mobile: Mobile || data.Mobile,
    Email: Email || data.Email,
    Password: Password || data.Password,
    IdentityNumber: IdentityNumber || data.IdentityNumber,
    DOB: DOB || data.DOB,
    DateOfJoining: DateOfJoining || data.DateOfJoining,
    Designation: Designation || data.Designation,
    ReportingAuthority: ReportingAuthority || data.ReportingAuthority,
    City: City || data.City,
    Address: Address || data.Address,
    PermanentAddress: PermanentAddress || data.PermanentAddress,
    ZipCode: ZipCode || data.ZipCode
  };
  data = await EmployeeModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  const sendData = await EmployeeModel.findOne({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.EditEmployeeByToken = Trackerror(async (req, res, next) => {
  const {
    Name,
    CompanyId,
    Mobile,
    Email,
    IdentityNumber,
    DOB,
    DateOfJoining,
    MartialStatus,
    Designation,
    ReportingAuthority,
    City,
    Address,
    PermanentAddress,
    ZipCode,
    Password
  } = req.body;

  let data = await EmployeeModel.findOne({
    where: { _id: req.user.Employee }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    CompanyId: CompanyId || data.CompanyId,
    Mobile: Mobile || data.Mobile,
    Email: Email || data.Email,
    Password: Password || data.Password,
    IdentityNumber: IdentityNumber || data.IdentityNumber,
    DOB: DOB || data.DOB,
    DateOfJoining: DateOfJoining || data.DateOfJoining,
    Designation: Designation || data.Designation,
    ReportingAuthority: ReportingAuthority || data.ReportingAuthority,
    City: City || data.City,
    Address: Address || data.Address,
    PermanentAddress: PermanentAddress || data.PermanentAddress,
    ZipCode: ZipCode || data.ZipCode
  };
  data = await EmployeeModel.update(updateddata, {
    where: {
      _id: req.user.Employee
    }
  });
  const sendData = await EmployeeModel.findOne({
    where: { _id: req.user.Employee }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.SoftDeleteEmployee = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeModel.destroy({
    where: { _id: req.params.id }
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteEmployee = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await EmployeeModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});
exports.GetEmployeeListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.EmployeeModel.count({
    where: {
      [Op.and]: [
        {
          Name: {
            [Op.like]: `%${req.query.Name || ""}%`
          }
        }
      ]
    }
  });
  await EmployeeModel.findAndCountAll({
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
exports.GetSingleEmployeeByToken = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findOne({
    where: { _id: req.user.Employee },
    include: [
      {
        model: db.CompanyDetailModel,
        as: "CompanyIdData",
        attributes: ["_id", "Name", "OrganizationName"]
      },
      {
        model: db.EmployeeModel,
        as: "ReportingAuthorityData",
        attributes: ["_id", "Name", "Email", "Image"]
      },
      {
        model: db.CityModel,
        as: "CityData",
        attributes: ["_id", "name"]
      },
      {
        model: db.MartialStatusModel,
        as: "MartialStatusData",
        attributes: ["_id", "name"]
      }
    ],
    attributes: [
      "_id",
      "Name",
      "Email",
      "Image",
      "Mobile",
      "IdentityNumber",
      "DOB",
      "DateOfJoining",
      "MartialStatus",
      "Designation",
      "Address",
      "PermanentAddress",
      "ZipCode"
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
exports.GetSingleEmployeeByID = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findOne({
    where: { _id: req.params.id },
    include: [
      {
        model: db.CompanyDetailModel,
        as: "CompanyIdData",
        attributes: ["_id", "Name", "OrganizationName"]
      },
      {
        model: db.EmployeeModel,
        as: "ReportingAuthorityData",
        attributes: ["_id", "Name", "Email", "Image"]
      },
      {
        model: db.CityModel,
        as: "CityData",
        attributes: ["_id", "name"]
      },
      {
        model: db.MartialStatusModel,
        as: "MartialStatusData",
        attributes: ["_id", "name"]
      }
    ],
    attributes: [
      "_id",
      "Name",
      "Email",
      "Image",
      "Mobile",
      "IdentityNumber",
      "DOB",
      "DateOfJoining",
      "MartialStatus",
      "Designation",
      "Address",
      "PermanentAddress",
      "ZipCode"
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
exports.RestoreSoftDeleteEmployee = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await EmployeeModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedEmployee = Trackerror(async (req, res, next) => {
  const data = await EmployeeModel.findAll({
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
exports.CheckEmployee = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  const data = await db.EmployeeModel.findOne({
    where: {
      where: {
        _id: decodedData.id
      },
      include: { all: true }
    }
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.LoginEmployee = Trackerror(async (req, res, next) => {
  const { Email, password } = req.body;
  if (!Email || !password) {
    return next(new HandlerCallBack("Please enter password and Email", 400));
  }
  const user = await EmployeeModel.findOne({
    where: { Email: Email }
  });
  if (!user) {
    return next(new HandlerCallBack("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new HandlerCallBack("Email or password is incorrect", 401));
  }
  const data = await EmployeeModel.findOne({
    where: {
      _id: user._id
    }
  });
  TokenCreation(data, 200, res);
});
