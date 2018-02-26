'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ratings = sequelize.define('Ratings', {
    recipe_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Ratings.associate = function(models) {
    // associations can be defined here
  };
  return Ratings;
};
