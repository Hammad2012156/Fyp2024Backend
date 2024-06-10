// const Sequelize = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   const EmployeeModel = sequelize.define(
//     "EmployeeModel",
//     {
//       _id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//       },
//       Name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Name Of Employee" },
//           notEmpty: {
//             msg: "Without Name Employee Will Not Get Generated"
//           }
//         }
//       },
//       Image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Image Of Employee" },
//           notEmpty: {
//             msg: "Without Image Employee Will Not Get Generated"
//           }
//         }
//       },
//       Mobile: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Mobile Of Employee" },
//           notEmpty: {
//             msg: "Without Mobile Employee Will Not Get Generated"
//           }
//         }
//       },
//       IdentityNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Identity Number Of Employee" },
//           notEmpty: {
//             msg: "Without Identity Number Employee Will Not Get Generated"
//           }
//         }
//       },
//       DOB: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add DOB Of Employee" },
//           notEmpty: {
//             msg: "Without DOB Employee Will Not Get Generated"
//           }
//         }
//       },
//       DateOfJoining: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add DateOfJoining Of Employee" },
//           notEmpty: {
//             msg: "Without DateOfJoining Employee Will Not Get Generated"
//           }
//         }
//       },
//       MartialStatus: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Martial Status Of Employee" },
//           notEmpty: {
//             msg: "Without Martial Status Employee Will Not Get Generated"
//           }
//         }
//       },
//       Designation: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Designation Of Employee" },
//           notEmpty: {
//             msg: "Without Designation Employee Will Not Get Generated"
//           }
//         }
//       },
//       ReportingAuthority: {
//         type: DataTypes.UUID
//       },
//       City: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add City Of Employee" },
//           notEmpty: {
//             msg: "Without City Employee Will Not Get Generated"
//           }
//         }
//       },
//       Address: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add Address Of Employee" },
//           notEmpty: {
//             msg: "Without Address Employee Will Not Get Generated"
//           }
//         }
//       },
//       PermanentAddress: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add PermanentAddress Of Employee" },
//           notEmpty: {
//             msg: "Without PermanentAddress Employee Will Not Get Generated"
//           }
//         }
//       },
//       ZipCode: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//         validate: {
//           notNull: { msg: "Please Add ZipCode Of Employee" },
//           notEmpty: {
//             msg: "Without ZipCode Employee Will Not Get Generated"
//           }
//         }
//       }
//     },
//     {
//       freezeTableName: true,
//       paranoid: true
//     }
//   );
//   return EmployeeModel;
// };
