const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MessageMediaModel = sequelize.define(
    "MessageMediaModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      MessageId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add MessagingGroupId Of Message" },
          notEmpty: {
            msg: "Without MessagingGroupId Message Will Not Get Generated",
          },
        },
      },
      Media: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Media Of Message" },
          notEmpty: {
            msg: "Without Media Message Will Not Get Generated",
          },
        },
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Body Of Message" },
          notEmpty: {
            msg: "Without Body Message Will Not Get Generated",
          },
        },
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
  return MessageMediaModel;
};
