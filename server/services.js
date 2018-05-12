const nedbService = require('feathers-nedb');
const dataModel = require('./models/data.model');
const userModel = require('./models/users.model');

module.exports = function(app) {
  const paginate = app.get('paginate');

  app.use('/data', nedbService({
    Model: dataModel(app),
    paginate
  }));

  app.use('/users', nedbService({
    Model: userModel(app),
    paginate: false
  }));
  
};