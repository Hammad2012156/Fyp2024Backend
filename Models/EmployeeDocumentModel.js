const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const EmployeeDocumentModel = sequelize.define(
    "EmployeeDocumentModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EmployeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Name Of Employee Document" },
          notEmpty: {
            msg: "Without Name Employee Document Will Not Get Generated",
          },
        },
      },
      DocumentId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Employee Document" },
          notEmpty: {
            msg: "Without Description Employee Document Will Not Get Generated",
          },
        },
      },
      DocumentName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Employee Document" },
          notEmpty: {
            msg: "Without Description Employee Document Will Not Get Generated",
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
  return EmployeeDocumentModel;
};
