// Initializes the `data` service on path `/data`
const createService = require('feathers-nedb');
const createModel = require('../../models/data.model');
const hooks = require('./data.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/data', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('data');

  service.hooks(hooks);
};
