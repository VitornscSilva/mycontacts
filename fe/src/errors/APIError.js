export default class APIError extends Error {
  constructor(response, body) {
    super(); // Error.constrcutor

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
