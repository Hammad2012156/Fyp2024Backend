const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MessagingGroupModel = sequelize.define(
    "MessagingGroupModel",
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
          notNull: { msg: "Please Add Type Of Message" },
          notEmpty: {
            msg: "Without Type Message Will Not Get Generated",
          },
        },
      },
      Description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Message" },
          notEmpty: {
            msg: "Without Description Message Will Not Get Generated",
          },
        },
      },
      ProjectId: {
        type: DataTypes.UUID,
      },
      CreatedBy: {
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
  return MessagingGroupModel;
};
