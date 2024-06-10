const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ProjectSectionModel = sequelize.define(
    "ProjectSectionModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ProjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Project Section Should have ProjectId" },
          notEmpty: { msg: "name  will not be empty" },
        },
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Project Section Should have Title" },
          notEmpty: { msg: "Title  will not be empty" },
        },
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      initialAutoIncrement: 10,
    }
  );
  return ProjectSectionModel;
};
