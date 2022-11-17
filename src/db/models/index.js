import { User, UserSchema } from './user.model.cjs';
import { Customer, CustomerSchema } from './customer.model.cjs';
import { Product, ProductSchema } from './product.models.cjs';
import { Category, CategorySchema } from './category.models.cjs';
import { Order, OrderSchema } from './order.model.cjs';
import { OrderProduct, OrderProductSchema } from './order-producto.model.cjs';

function setUpModels(sequilize) {
  User.init(UserSchema, User.config(sequilize));
  Customer.init(CustomerSchema, Customer.config(sequilize));
  Product.init(ProductSchema, Product.config(sequilize));
  Category.init(CategorySchema, Category.config(sequilize));
  Order.init(OrderSchema, Order.config(sequilize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequilize));

  User.assocciate(sequilize.models);
  Customer.assocciate(sequilize.models);
  Category.assocciate(sequilize.models);
  Product.assocciate(sequilize.models);
  Order.assocciate(sequilize.models);
}

export default setUpModels;
