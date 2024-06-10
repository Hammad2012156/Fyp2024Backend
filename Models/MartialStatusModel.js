const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MartialStatusModel = sequelize.define(
    "MartialStatusModel",
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
          notNull: { msg: "Please Add Name Of OrganizationType" },
          notEmpty: {
            msg: "Without Name OrganizationType Will Not Get Generated",
          },
        },
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of OrganizationType" },
          notEmpty: {
            msg: "Without Description OrganizationType Will Not Get Generated",
          },
        },
      },
      // Ceo: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );
  return MartialStatusModel;
};
