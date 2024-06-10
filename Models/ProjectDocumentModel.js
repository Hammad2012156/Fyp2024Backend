const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  const ProjectDocumentModel = sequelize.define(
    "ProjectDocumentModel",
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
      },
      Document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ceo:{
        type: DataTypes.UUID,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  return ProjectDocumentModel;
};
