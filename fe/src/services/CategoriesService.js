import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:8000');
  }

  async listCategories() {
    return this.HttpClient.get('/categories');
  }
}

export default new CategoriesService();
