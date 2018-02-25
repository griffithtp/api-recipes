
let models = require('./models');

const server = require('./server');

models.sequelize.sync().then( () => {

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
  server.on('restifyError', function(req, res, err, callback) {
      err.toJSON = function customToJSON() {
          return {
            data: {},
            error: {
              name: err.name,
              message: err.message
            }
          };
      };
      err.toString = function customToString() {
          return `${err.name} >> ${err.message}`;
      };
      return callback();
  });
  // server.on('after', function(req, res, route, error) {
  //   console.log('after res >>', res);
  //   res.toJSON( () => {
  //     return {
  //       data: res.data,
  //       error: {}
  //     }
  //   })
  //   return next();
  // });
})
