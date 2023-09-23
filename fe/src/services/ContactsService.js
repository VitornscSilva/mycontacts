import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:8000');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.HttpClient.get(`/contacts/${id}`);
  }

  createContact(contact) {
    return this.HttpClient.post('/contacts', { body: contact });
  }

  updateContact(id, contact) {
    return this.HttpClient.put(`/contacts/${id}`, { body: contact });
  }
}

export default new ContactsService();
