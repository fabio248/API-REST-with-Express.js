import faker from 'faker';
import boom from '@hapi/boom';
import sequelize from '../libs/sequelize.js';

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const product = { id: faker.datatype.uuid(), ...data };
    this.products.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    return product;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const product = this.products.find((producto) => producto.id === id);
    if (!product) throw boom.notFound('Product not found');
    if (product.isBlock) throw boom.conflict('product is block');
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) throw boom.notFound('Product not found');
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) throw boom.notFound('Product not found');
    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductsService;
