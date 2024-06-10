const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const DesignationModel = sequelize.define(
    "DesignationModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Name Of Designation" },
          notEmpty: {
            msg: "Without Name Designation Will Not Get Generated"
          }
        }
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Designation" },
          notEmpty: {
            msg: "Without Description Designation Will Not Get Generated"
          }
        }
      },
      // Ceo:{
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
  );
  return DesignationModel;
};
