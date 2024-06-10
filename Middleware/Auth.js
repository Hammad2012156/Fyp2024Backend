const db = require("../config/Connection");
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const jwt = require("jsonwebtoken");
exports.CeoVerify = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const Data = await db.EmployeeModel.findOne({
    where: {
      _id: decodedData.id,
    },

    attributes: ["_id"],
  });

  if (!Data) {
    return next(
      new HandlerCallBack(
        "Invalid Token Kindly Login Again Or Enter Correct Credentials",
        401
      )
    );
  }
  //   const CompanyDetail=await db.CompanyDetailModel.findOne({
  //     where:{
  //         _id:
  //     },
  //     attributes:["_id"]
  //   })
  req.user = {
    Employee: null,
    Ceo: Data._id,
    CompanyDetail: Data.CompanyId,
  };
  next();
});
exports.EmployeeVerify = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const Data = await db.EmployeeModel.findOne({
    where: {
      _id: decodedData.id,
    },

    attributes: ["_id", "Ceo", "CompanyId"],
  });
  if (!Data) {
    return next(
      new HandlerCallBack(
        "Invalid Token Kindly Login Again Or Enter Correct Credentials",
        401
      )
    );
  }
  req.user = {
    Employee: Data._id,
    Ceo: Data.Ceo,
    CompanyDetail: Data.CompanyId,
  };
  next();
});
exports.CheckUser = Trackerror(async (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return next(
      new HandlerCallBack("Please login to access this resource", 401)
    );
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);

    const Ceo = await db.CeoModel.findOne({
      where: {
        _id: decodedData.id,
      },
      attributes: ["_id", "CompanyId"],
      // attributes: ["Status", "Ceo"],
    });

    if (Ceo) {
      req.user = {
        Company: Ceo.CompanyId,
        Employee: null,
        Ceo: Ceo._id,
      };
      next();
    } else {
      const user = await db.EmployeeModel.findOne({
        where: {
          _id: decodedData.id,
        },
        attributes: ["Ceo", "_id"],
      });

      const Company = await db.CeoModel.findOne({
        where: {
          _id: JSON.parse(JSON.stringify(user.Ceo)),
        },
        attributes: ["_id", "CompanyId"],
      });
      console.log(JSON.parse(JSON.stringify(user.Ceo)), "user");
      if (user) {
        req.user = {
          Employee: user._id,
          Ceo: user.Ceo,
          Company: Company.CompanyId,
        };
        next();
      } else {
        return next(
          new HandlerCallBack(
            "Invalid Token Kindly Login Again Or Enter Correct Credentials",
            401
          )
        );
      }
    }
  } catch (err) {
    console.log(err);
    return next(new HandlerCallBack("Invalid Token", 401));
  }
});
