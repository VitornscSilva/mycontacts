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

  async store(request, response) {
    const {
      name, email, phone, categoryId,
    } = request.body;

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ message: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, categoryId,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone, categoryId,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ message: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ message: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      categoryId,
    });

    response.json(contact);
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