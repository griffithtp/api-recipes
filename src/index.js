// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.cached.Database('recipes.db', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });
// db.serialize(function() {
//     db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
//
//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();
//
//     // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//     //     console.log(row.id + ": " + row.info);
//     // });
//     console.log(db);
// });

let models = require('./models');

const server = require('./server');

models.sequelize.sync().then( () => {

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

})
