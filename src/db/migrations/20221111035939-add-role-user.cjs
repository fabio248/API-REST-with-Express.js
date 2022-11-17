"use strict";
const { USER_TABLE } = require("../models/user.model.cjs");
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, "role", {
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, "role");
  },
};
