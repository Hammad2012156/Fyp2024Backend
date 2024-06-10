const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const EmployeeTaskModel = sequelize.define(
    "EmployeeTaskModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      TaskDetail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add TaskDetail Of EmployeeTask" },
          notEmpty: {
            msg: "Without TaskDetail EmployeeTask Will Not Get Generated"
          }
        }
      },
      ProjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add AssignBy Of EmployeeTask" },
          notEmpty: {
            msg: "Without AssignBy EmployeeTask Will Not Get Generated"
          }
        }
      },
      ProjectSection: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add Project Section Of Project" },
          notEmpty: {
            msg: "Without Project Section Project Will Not Get Generated"
          }
        }
      },
      AssignBy: {
        type: DataTypes.UUID,
        // allowNull: false,
        // validate: {
        //   notNull: { msg: "Please Add AssignBy Of EmployeeTask" },
        //   notEmpty: {
        //     msg: "Without AssignBy EmployeeTask Will Not Get Generated"
        //   }
        // }
      },
      AssignTo: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add AssignTo Of EmployeeTask" },
          notEmpty: {
            msg: "Without AssignTo EmployeeTask Will Not Get Generated"
          }
        }
      },
      DueDate: {
        type: DataTypes.DATE
      },
      // DueDate: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: "Please Add AssignTo Of EmployeeTask" },
      //     notEmpty: {
      //       msg: "Without AssignTo EmployeeTask Will Not Get Generated",
      //     },
      //   },
      // },
      TaskSubject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Add TaskSubject Of EmployeeTask" },
          notEmpty: {
            msg: "Without TaskSubject EmployeeTask Will Not Get Generated"
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
  return EmployeeTaskModel;
};
