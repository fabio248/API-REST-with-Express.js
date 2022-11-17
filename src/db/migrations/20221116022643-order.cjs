"use strict";

const { ORDER_TABLE } = require("../models/order.model.cjs");
const { DataTypes, Sequelize } = require("sequelize");
const { CUSTOMER_TABLE } = require("../models/customer.model.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      customerId: {
        field: "customer_id",
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: CUSTOMER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: "created_at",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
