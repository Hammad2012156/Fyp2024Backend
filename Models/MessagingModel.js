const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MessagingModel = sequelize.define(
    "MessagingModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      SenderId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add SenderId Of Message" },
          notEmpty: {
            msg: "Without SenderId Message Will Not Get Generated"
          }
        }
      },
      ReceiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add ReceiverId Of Message" },
          notEmpty: {
            msg: "Without ReceiverId Message Will Not Get Generated"
          }
        }
      },
      ConversationId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add ReceiverId Of Message" },
          notEmpty: {
            msg: "Without ReceiverId Message Will Not Get Generated"
          }
        }
      },
      Body: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Body Of Message" },
          notEmpty: {
            msg: "Without Body Message Will Not Get Generated"
          }
        }
      },
      Ceo: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
  );
  return MessagingModel;
};
