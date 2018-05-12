const users = require('./users/users.service.js');
const data = require('./data/data.service.js');

module.exports = function(app) {
  app.configure(users);
  app.configure(data);
};