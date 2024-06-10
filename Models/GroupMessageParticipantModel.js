const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const GroupMessageParticipantModel = sequelize.define(
    "GroupMessageParticipantModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      MessagingGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add MessagingGroupId Of GroupMessageParticipant"
          },
          notEmpty: {
            msg: "Without MessagingGroupId GroupMessageParticipant Will Not Get Generated"
          }
        }
      },
      ParticipantId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Add ParticipantId Of GroupMessageParticipant"
          },
          notEmpty: {
            msg: "Without ParticipantId GroupMessageParticipant Will Not Get Generated"
          }
        }
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [["Admin", "Participant"]],
        validate: {
          notNull: { msg: "Please Add Type Of GroupMessageParticipant" },
          notEmpty: {
            msg: "Without Type GroupMessageParticipant Will Not Get Generated"
          }
        }
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
  return GroupMessageParticipantModel;
};
