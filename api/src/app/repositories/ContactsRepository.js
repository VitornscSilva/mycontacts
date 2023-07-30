const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Vitor',
    email: 'vitornscsilva.dev@gmail.com',
    phone: '123123',
    category_id: uuid(),
  },
];
class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
