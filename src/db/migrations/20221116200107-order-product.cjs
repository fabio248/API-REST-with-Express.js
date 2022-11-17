"use strict";

const { ORDER_PRODUCT_TABLE } = require("../models/order-producto.model.cjs");
const { ORDER_TABLE } = require("../models/order.model.cjs");
const { PRODUCT_TABLE } = require("../models/product.model.cjs");
const { DataTypes, Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: "created_at",
      },
      orderId: {
        field: "order_id",
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: ORDER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      productId: {
        field: "product_id",
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: PRODUCT_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
