const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const CompanyThemeModel = sequelize.define(
    "CompanyThemeModel",
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
          notNull: { msg: "Please Add Name Of Company Theme" },
          notEmpty: {
            msg: "Without Name Company Theme Will Not Get Generated",
          },
        },
      },
      PrimaryDayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Primary Day Color Of Company Theme" },
          notEmpty: {
            msg: "Without Primary Day Color Company Theme Will Not Get Generated",
          },
        },
      },
      SecondaryDayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Secondary Day Color Of Company Theme" },
          notEmpty: {
            msg: "Without Secondary Day Color Company Theme Will Not Get Generated",
          },
        },
      },
      PrimaryDayFontColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Primary Day Font Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Primary Day Font Color Company Theme Will Not Get Generated",
          },
        },
      },
      SecondaryDayFontColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Secondary Day Font Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Secondary Day Font Color Company Theme Will Not Get Generated",
          },
        },
      },
      PrimaryNightColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Primary Night Color Of Company Theme" },
          notEmpty: {
            msg: "Without Primary Night Color Company Theme Will Not Get Generated",
          },
        },
      },
      SecondaryNightColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Secondary Night Color Of Company Theme" },
          notEmpty: {
            msg: "Without Secondary Night Color Company Theme Will Not Get Generated",
          },
        },
      },
      PrimaryNightFontColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Primary Night Font Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Primary Night Font Color Company Theme Will Not Get Generated",
          },
        },
      },
      SecondaryNightFontColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Secondary Night Font Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Secondary Night Font Color Company Theme Will Not Get Generated",
          },
        },
      },
      SuccessDayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Success Day  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Success Day  Color Company Theme Will Not Get Generated",
          },
        },
      },
      SuccessNightColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Success Night  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Success Night  Color Company Theme Will Not Get Generated",
          },
        },
      },
      WarningDayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Warning Day  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Warning Day  Color Company Theme Will Not Get Generated",
          },
        },
      },
      WarningNightColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Warning Night  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Warning Night  Color Company Theme Will Not Get Generated",
          },
        },
      },
      ErrorDayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Error Day  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Error Day  Color Company Theme Will Not Get Generated",
          },
        },
      },
      ErrorNightColor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add Error Night  Color Of Company Theme",
          },
          notEmpty: {
            msg: "Without Error Night  Color Company Theme Will Not Get Generated",
          },
        },
      },

      Status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: "Please Add Status  Of Company Theme"
        //   },
        //   notEmpty: {
        //     msg: "Without Status  Company Theme Will Not Get Generated"
        //   }
        // }
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );
  return CompanyThemeModel;
};
