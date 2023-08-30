const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ message: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const {
      name,
    } = request.body;

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ message: 'This name is already in use' });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name,
    } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return response.status(404).json({ message: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    const categoryByName = await CategoriesRepository.findByName(name);

    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ message: 'This name is already in use' });
    }

    const contact = await CategoriesRepository.update(id, {
      name,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

// Design Pattern - Singleton
module.exports = new CategoryController();
