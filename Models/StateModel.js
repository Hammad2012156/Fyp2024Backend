const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const StateModel = sequelize.define(
    "StateModel",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "State Should have name" },
          notEmpty: { msg: "name  will not be empty" }
        }
      },
      longitude: {
        type: DataTypes.DOUBLE(11, 8),
        allowNull: false,
        validate: {
          LongitudeAndLatitudeVerification() {
            if (this.longitude == "") {
              throw new Error("Please Enter longitude ");
            }
            if (
              /^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,15})$/.test(
                this.longitude
              )
            ) {
            } else {
              throw new Error("longitude Verification Failed");
            }
          }
        }
      },
      latitude: {
        type: DataTypes.DOUBLE(11, 8),
        allowNull: false,
        validate: {
          LongitudeAndLatitudeVerification() {
            if (this.latitude == "") {
              throw new Error("Please Enter latitude");
            }
            if (/^-?([0-8]?[0-9]|90)(.[0-9]{1,15})$/.test(this.latitude)) {
            } else {
              throw new Error("Latitude Verification Failed");
            }
          }
        }
      },
      country_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      paranoid: true,
      initialAutoIncrement: 10
    }
  );
  return StateModel;
};
