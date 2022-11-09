import faker from 'faker';

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthday: faker.date.between(
          '1950-01-01T00:00:00.000Z',
          '2002-01-01T00:00:00.000Z'
        ),
        img: faker.internet.avatar(),
      });
    }
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }
}

export default UsersService;
