const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  const EmployeeModel = sequelize.define(
    "EmployeeModel",
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
          notNull: { msg: "Please Add Name Of Employee" },
          notEmpty: {
            msg: "Without Name Employee Will Not Get Generated",
          },
        },
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Name Of Employee" },
          notEmpty: {
            msg: "Without Name Employee Will Not Get Generated",
          },
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Password Of Ceo" },
          notEmpty: {
            msg: "Without Password Ceo Will Not Get Generated",
          },
        },
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Image Of Employee" },
          notEmpty: {
            msg: "Without Image Employee Will Not Get Generated",
          },
        },
      },
      CompanyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Mobile Of Employee" },
          notEmpty: {
            msg: "Without Mobile Employee Will Not Get Generated",
          },
        },
      },
      IdentityNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Identity Number Of Employee" },
          notEmpty: {
            msg: "Without Identity Number Employee Will Not Get Generated",
          },
        },
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add DOB Of Employee" },
          notEmpty: {
            msg: "Without DOB Employee Will Not Get Generated",
          },
        },
      },
      DateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add DateOfJoining Of Employee" },
          notEmpty: {
            msg: "Without DateOfJoining Employee Will Not Get Generated",
          },
        },
      },
      MartialStatus: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Martial Status Of Employee" },
          notEmpty: {
            msg: "Without Martial Status Employee Will Not Get Generated",
          },
        },
      },
      Designation: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Designation Of Employee" },
          notEmpty: {
            msg: "Without Designation Employee Will Not Get Generated",
          },
        },
      },
      ReportingAuthority: {
        type: DataTypes.UUID,
      },
      City: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add City Of Employee" },
          notEmpty: {
            msg: "Without City Employee Will Not Get Generated",
          },
        },
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Address Of Employee" },
          notEmpty: {
            msg: "Without Address Employee Will Not Get Generated",
          },
        },
      },
      PermanentAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add PermanentAddress Of Employee" },
          notEmpty: {
            msg: "Without PermanentAddress Employee Will Not Get Generated",
          },
        },
      },
      ZipCode: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add ZipCode Of Employee" },
          notEmpty: {
            msg: "Without ZipCode Employee Will Not Get Generated",
          },
        },
      },
      Ceo:{
        type: DataTypes.UUID,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  EmployeeModel.prototype.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  EmployeeModel.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
  };

  EmployeeModel.prototype.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
  };
  {
    Hooks: {
      beforeCreate: async (user) => {
        if (user.Password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.Password = bcrypt.hashSync(user.Password, salt);
        }
      };
    }
  }
  return EmployeeModel;
};
