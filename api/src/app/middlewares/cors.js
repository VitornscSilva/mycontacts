module.exports = (request, response, next) => {
  const allowedOrigin = [
    'http://localhost:3000',
    'http://localhost:3002',
  ];

  const origin = request.header('Origin');
  const isAllowed = allowedOrigin.includes(origin);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
};
