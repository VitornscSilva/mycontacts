const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ message: 'Contact not found' });
    }

    response.json(contact);
  }

  store() {
    // criar novo registro
  }

  update() {
    // editar um registro
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ message: 'Contact not found' });
    }
    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// Design Pattern - Singleton
module.exports = new ContactController();
