const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  const CompanyDetail = sequelize.define(
    "CompanyDetail",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Name Of Company" },
          notEmpty: {
            msg: "Without Name Company Will Not Get Generated",
          },
        },
      },
      // UserId: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Please Add UserId Of Company" },
      //     notEmpty: {
      //       msg: "Without UserId Company Will Not Get Generated"
      //     }
      //   }
      // },
      // Password: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Please Add Password Of Company" },
      //     notEmpty: {
      //       msg: "Without Password Company Will Not Get Generated"
      //     }
      //   }
      // },
      OrganizationName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Organization Name Of Company" },
          notEmpty: {
            msg: "Without Organization Name Company Will Not Get Generated",
          },
        },
      },
      OrganizationType: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Organization Type Of Company" },
          notEmpty: {
            msg: "Without Organization Type Company Will Not Get Generated",
          },
        },
      },
      EmailVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Email Of Company" },
          notEmpty: {
            msg: "Without Email Company Will Not Get Generated",
          },
        },
      },
      PrimaryMobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add PrimaryMobileNo Of Company" },
          notEmpty: {
            msg: "Without PrimaryMobileNo Company Will Not Get Generated",
          },
        },
      },
      SecondaryMobileNo: {
        type: DataTypes.BIGINT,
      },
      // image: {
      //   type: DataTypes.STRING
      //   // allowNull: false,
      //   // validate: {
      //   //   notNull: { msg: "Please Add Image Of Brands" },
      //   //   notEmpty: {
      //   //     msg: "Without Image Brands Will Not Get Generated"
      //   //   }
      //   // }
      // },
      CompanyTheme: {
        type: DataTypes.UUID
      },
      // CardNumber: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Please Add CardNumber Of Company" },
      //     notEmpty: {
      //       msg: "Without CardNumber Company Will Not Get Generated"
      //     }
      //   }
      // }
      EmailVerficationCode: {
        type: DataTypes.STRING,
      },
      EmailVerficationCodeTime: {
        type: DataTypes.DATE,
      },
      // Ceo:{
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // }
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  CompanyDetail.prototype.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  // CompanyDetail.prototype.comparePassword = async function (enteredPassword) {
  //   return await bcrypt.compare(enteredPassword, this.password);
  // };

  // CompanyDetail.prototype.getResetPasswordToken = function () {
  //   const resetToken = crypto.randomBytes(20).toString("hex");
  //   this.resetPasswordToken = crypto
  //     .createHash("sha256")
  //     .update(resetToken)
  //     .digest("hex");

  //   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  //   return resetToken;
  // };
  // {
  //   Hooks: {
  //     beforeCreate: async (user) => {
  //       if (user.password) {
  //         const salt = await bcrypt.genSaltSync(10, "a");
  //         user.password = bcrypt.hashSync(user.password, salt);
  //       }
  //     };
  //   }
  // }
  return CompanyDetail;
};
