const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  const CeoModel = sequelize.define(
    "CeoModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },

      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add UserId Of Ceo" },
          notEmpty: {
            msg: "Without UserId Ceo Will Not Get Generated"
          }
        }
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Password Of Ceo" },
          notEmpty: {
            msg: "Without Password Ceo Will Not Get Generated"
          }
        }
      },
      CompanyId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add CompanyId Of Ceo" },
          notEmpty: {
            msg: "Without CompanyId Ceo Will Not Get Generated"
          }
        }
      }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
  );

  CeoModel.prototype.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };

  CeoModel.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
  };

  CeoModel.prototype.getResetPasswordToken = function () {
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
  return CeoModel;
};
