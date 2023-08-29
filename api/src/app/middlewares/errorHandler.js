module.exports = (error, request, response, next) => {
  console.log(error); // ToDo: add LogService
  response.sendStatus(500);
};
