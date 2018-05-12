module.exports = function(app) {
  if(typeof app.channel !== 'function') return;

  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
    console.log('Anonymous user joined')
  });

  app.on('login', (authResult, { connection }) => {
    if(connection) {
      const user = connection.user;
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
      if(user.isAdmin) { 
        app.channel('admins').join(connection);
      }
    }
  });

  app.publish((data, hook) => {
    console.log('Publishing all events to all authenticated users.');
    return app.channel('authenticated');
  });

  app.service('users').publish('created', () => app.channel('admins'));
  app.service('data').publish('created', () => app.channel('admins'));
};
