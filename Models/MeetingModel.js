const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MeetingModel = sequelize.define(
    "MeetingModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      Employee: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Employee Of Meeting" },
          notEmpty: {
            msg: "Without Employee Meeting Will Not Get Generated"
          }
        }
      },
      MeetingCreatedBy: {
        type: DataTypes.UUID
      },
      ProjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add ProjectId Of Meeting" },
          notEmpty: {
            msg: "Without ProjectId Meeting Will Not Get Generated"
          }
        }
      },
      Time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Time Of Meeting" },
          notEmpty: {
            msg: "Without Time Meeting Will Not Get Generated"
          }
        }
      },
      Agenda: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Agenda Of Meeting" },
          notEmpty: {
            msg: "Without Agenda Meeting Will Not Get Generated"
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
  return MeetingModel;
};
