const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ProjectModel = sequelize.define(
    "ProjectModel",
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
          notNull: { msg: "Please Add Name Of Project" },
          notEmpty: {
            msg: "Without Name Project Will Not Get Generated"
          }
        }
      },
      Description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Description Of Project" },
          notEmpty: {
            msg: "Without Description Project Will Not Get Generated"
          }
        }
      },
      RecurringMeetingDay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Project Should have RecurringMeetingDay" },
          notEmpty: { msg: "RecurringMeetingDay  will not be empty" }
        },
        isIn: [
          [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
          ]
        ]
      },
      RecurringMeeting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      ProjectCreatedBy: {
        type: DataTypes.UUID

        // validate: {
        //   notNull: { msg: "Please Add ProjectCreatedBy Of Project" },
        //   notEmpty: {
        //     msg: "Without ProjectCreatedBy Project Will Not Get Generated",
        //   },
        // },
      },
      Deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Deadline Of Project" },
          notEmpty: {
            msg: "Without Deadline Project Will Not Get Generated"
          }
        }
      },
      ProjectAssignTo: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add ProjectAssignTo Of Project" },
          notEmpty: {
            msg: "Without ProjectAssignTo Project Will Not Get Generated"
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
  return ProjectModel;
};
