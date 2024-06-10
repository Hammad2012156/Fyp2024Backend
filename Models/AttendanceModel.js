const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const AttendanceModel = sequelize.define(
    "AttendanceModel",
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
          notNull: { msg: "Please Add Employee Of Attendance" },
          notEmpty: {
            msg: "Without Employee Attendance Will Not Get Generated"
          }
        }
      },
      Day: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Day Of Attendance" },
          notEmpty: {
            msg: "Without Day Attendance Will Not Get Generated"
          }
        }
      },
      Arrival: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Arrival Of Attendance" },
          notEmpty: {
            msg: "Without Arrival Attendance Will Not Get Generated"
          }
        }
      },
      Departure: {
        type: DataTypes.DATE,
        allowNull: true
        // validate: {
        //   notNull: { msg: "Please Add Departure Of Attendance" },
        //   notEmpty: {
        //     msg: "Without Departure Attendance Will Not Get Generated"
        //   }
        // }
      },
      AttendanceStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [["Present", "Leave", "Absent", "LeaveEarlier"]],
        defaultValue: "Absent",
        validate: {
          notNull: { msg: "Please Add AttendanceStatus Of Attendance" },
          notEmpty: {
            msg: "Without AttendanceStatus Attendance Will Not Get Generated"
          }
        }
      },
      LeaveApprovalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },
      Approver: {
        type: DataTypes.UUID
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
  return AttendanceModel;
};
