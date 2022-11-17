"use strict";
const { CUSTOMER_TABLE } = require("../models/customer.model.cjs");
const { DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("../models/user.model.cjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
      },
      fistName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name",
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "create_at",
        defaultValue: Sequelize.NOW,
      },
      userId: {
        allowNull: false,
        field: "user_id",
        type: DataTypes.UUID,
        unique: true,
        references: {
          model: USER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
