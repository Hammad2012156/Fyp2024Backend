const db = require("../config/Connection");
const CompanyDetailModel = db.CompanyDetailModel;
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { EmailNotification } = require("../Utils/Email");
const TokenCreation = require("../Utils/TokenCreation");
const TokenCreationCode = require("../Utils/TokenCreationCode");
const { replacePlaceholders } = require("../Utils/DynamicTemplate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function generateUniqueNumber() {
  const generatedNumbers = new Set();

  while (true) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    if (!generatedNumbers.has(randomNumber)) {
      generatedNumbers.add(randomNumber);
      return randomNumber;
    }
  }
}
exports.CreateCompanyDetail = Trackerror(async (req, res, next) => {
  const {
    Name,
    OrganizationName,
    OrganizationType,
    Email,
    PrimaryMobileNo,
    SecondaryMobileNo,
    CardNumber
  } = req.body;

  const data = await CompanyDetailModel.create({
    Name: Name,
    OrganizationType: OrganizationType,
    Email: Email,
    PrimaryMobileNo: PrimaryMobileNo,
    SecondaryMobileNo: SecondaryMobileNo,
    CardNumber: CardNumber,
    OrganizationName: OrganizationName,
  });

  const uniqueNumber = generateUniqueNumber();
  console.log(uniqueNumber);
  let numberStr = uniqueNumber.toString().padStart(4, "0");
  let firstPart = numberStr.slice(0, 2);
  let secondPart = numberStr.slice(2);
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_API_AUTH_TOKEN;
  // const client = require("twilio")(accountSid, authToken);

  // // Split the string into two parts
  // console.log(firstPart);
  // console.log(secondPart);
  // client.messages.create({
  //   body: `2nd Part of 2FA CODE  ${secondPart} From Workies`,
  //   from: process.env.PHONENO,
  //   to: PrimaryMobileNo
  // });

  let email = {
    to: Email,
    from: process.env.SENDGRIDMAIL,
    subject: "Email 2fa",
    html: replacePlaceholders(
      `  <p>Dear [Name],</p>
       <p>Your [Otp],</p>
       <p>Your ${uniqueNumber},</p>
    `,
      {
        Name: Name,
        Otp: firstPart
      }
    )
  };
  const updatedata = {
    EmailVerficationCode: uniqueNumber,
    EmailVerficationCodeTime: new Date(Date.now())
  };

  await EmailNotification(email);
  await CompanyDetailModel.update(updatedata, {
    where: {
      _id: data._id
    }
  });
  TokenCreationCode(uniqueNumber, data, 200, res);
  // res.status(201).json({
  //   success: true,
  //   data,
  //   uniqueNumber,
  //   message: "Data Created Successfully",
  // });
});
exports.VerifyEmail = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const { Code } = req.body;
  const data = await db.CompanyDetailModel.findOne({
    where: {
      [Op.and]: [
        {
          _id: decodedData.id
        },
        {
          EmailVerficationCode: Code
        }
      ]
    }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CompanyDetailModel.update(
    { EmailVerify: 1 },
    {
      where: {
        [Op.and]: [
          {
            _id: decodedData.id
          },
          {
            EmailVerficationCode: Code
          }
        ]
      }
    }
  );
  const uniqueNumber = generateUniqueNumber();
  console.log(uniqueNumber);
  const CeoData = await db.CeoModel.create({
    UserId: data.Email,
    Password: await bcrypt.hash(uniqueNumber.toString(), 10),
    CompanyId: data._id
  });
  let email = {
    to: data.Email,
    from: process.env.SENDGRIDMAIL,
    subject: "Complete Account",
    html: replacePlaceholders(
      `  <p>Dear [Name],</p>
       <p>Your User Id is  [UserId],</p>
       <p>Your pass [Password],</p>
    `,
      {
        Name: data.Name,
        UserId: CeoData.UserId,
        Password: uniqueNumber
      }
    )
  };
  await EmailNotification(email);

  TokenCreationCode(uniqueNumber, CeoData, 200, res);
  // TokenCreation(CeoData, 200, res);
});
exports.EditCompanyDetail = Trackerror(async (req, res, next) => {
  const {
    Name,
    OrganizationName,
    OrganizationType,
    Email,
    PrimaryMobileNo,
    SecondaryMobileNo,
    CardNumber
  } = req.body;

  let data = await CompanyDetailModel.findOne({
    where: { _id: req.params.id }
  });
  if (data === null) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const updateddata = {
    Name: Name || data.Name,
    OrganizationName: OrganizationName || data.OrganizationName,
    OrganizationType: OrganizationType || data.OrganizationType,
    Email: Email || data.Email,
    PrimaryMobileNo: PrimaryMobileNo || data.PrimaryMobileNo,
    SecondaryMobileNo: SecondaryMobileNo || data.SecondaryMobileNo,
    CardNumber: CardNumber || data.CardNumber
  };
  data = await CompanyDetailModel.update(updateddata, {
    where: {
      _id: req.params.id
    }
  });
  const sendData = await CompanyDetailModel.findOne({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: sendData
  });
});
exports.SoftDeleteCompanyDetail = Trackerror(async (req, res, next) => {
  const data = await CompanyDetailModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CompanyDetailModel.destroy({
    where: { _id: req.params.id }
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});
exports.HardDeleteCompanyDetail = Trackerror(async (req, res, next) => {
  const data = await CompanyDetailModel.findOne({
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  await CompanyDetailModel.destroy({
    where: { _id: req.params.id },
    force: true
  });

  res.status(200).json({
    success: true,
    data,
    message: "Data Delete Successfully"
  });
});

exports.GetCompanyDetailListing = Trackerror(async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page - 1, size);
  const totalCount = await db.CompanyDetailModel.count({});
  await CompanyDetailModel.findAndCountAll({
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
exports.GetSingleCompanyDetail = Trackerror(async (req, res, next) => {
  const data = await CompanyDetailModel.findOne({
    where: { _id: req.params.id }
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
exports.RestoreSoftDeleteCompanyDetail = Trackerror(async (req, res, next) => {
  const data = await CompanyDetailModel.findOne({
    paranoid: false,
    where: { _id: req.params.id }
  });
  if (!data) {
    return next(new HandlerCallBack("data not found", 404));
  }
  const restoredata = await CompanyDetailModel.restore({
    where: { _id: req.params.id }
  });
  res.status(200).json({
    success: true,
    message: "Data Restore",
    restoredata
  });
});
exports.GetDeletedCompanyDetail = Trackerror(async (req, res, next) => {
  const data = await CompanyDetailModel.findAll({
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
