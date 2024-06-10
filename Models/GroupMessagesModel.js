const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const GroupMessagesModel = sequelize.define(
    "GroupMessagesModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      MessagingGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add MessagingGroupId Of Message" },
          notEmpty: {
            msg: "Without MessagingGroupId Message Will Not Get Generated",
          },
        },
      },
      SenderId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add MessagingGroupId Of Message" },
          notEmpty: {
            msg: "Without MessagingGroupId Message Will Not Get Generated",
          },
        },
      },
      Body: {
        type: DataTypes.TEXT("long"),
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
  return GroupMessagesModel;
};
