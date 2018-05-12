const winston = require('winston');

const logger = function () {
  return context => {
    winston.debug(`${context.type} app.service('${context.path}').${context.method}()`);
    if(typeof context.toJSON === 'function') {
      winston.debug('Hook Context', JSON.stringify(context, null, '  '));
    }
    if (context.error) {
      winston.error(context.error);
    }
  };
};

module.exports = {
  before: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
