const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const OrganizationDetailModel = sequelize.define(
    "OrganizationDetailModel",
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
          notNull: { msg: "Please Add Name Of Organization Detail" },
          notEmpty: {
            msg: "Without Name Organization Detail Will Not Get Generated",
          },
        },
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Image Of Organization Detail" },
          notEmpty: {
            msg: "Without Image Organization Detail Will Not Get Generated",
          },
        },
      },
      DisplayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Organization Detail" },
          notEmpty: {
            msg: "Without Description Organization Detail Will Not Get Generated",
          },
        },
      },
      NoOfEmployees: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add NoOfEmployees Of Organization Detail" },
          notEmpty: {
            msg: "Without NoOfEmployees Organization Detail Will Not Get Generated",
          },
        },
      },

      CompanyTheme: {
        type: DataTypes.UUID,
      },
      Ceo: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );
  return OrganizationDetailModel;
};
