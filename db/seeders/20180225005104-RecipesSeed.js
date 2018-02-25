'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const csvjson = require('csvjson');
    const fs = require('fs');
    const path = require('path');
    const csvFile = 'recipe-data.csv';
    var data = fs.readFileSync(csvFile, { encoding : 'utf8'});
    var options = {
      delimiter : ',',
      quote     : '"'
    };

    const res = csvjson.toObject(data, options);
    // console.log(res);
    return queryInterface.bulkInsert('Recipes', res, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Recipes', null, {});
  }
};
