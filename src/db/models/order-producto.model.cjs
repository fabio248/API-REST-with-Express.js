const { Model, Sequelize, DataTypes } = require("sequelize");
const { ORDER_TABLE } = require("./order.model.cjs");
const { PRODUCT_TABLE } = require("./product.models.cjs");

const ORDER_PRODUCT_TABLE = "orders_products";

const OrderProductSchema = {
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
};

class OrderProduct extends Model {
  static assocciate() {
    // this.hasMany(models.Order,)
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: "OrderProduct",
      tableName: ORDER_PRODUCT_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE,
  OrderProduct,
  OrderProductSchema,
};
