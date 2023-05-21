"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User);
      UserRole.belongsTo(models.Role);
    }
  }

  UserRole.init(
    {},
    {
      sequelize,
      modelName: "UserRole",
      tableName: "UserRoles",
      timestamps: false,
    }
  );

  return UserRole;
};
