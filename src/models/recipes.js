'use strict';
module.exports = (sequelize, DataTypes) => {
var Recipes = sequelize.define('Recipes',  {
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    box_type: DataTypes.STRING,
    title: DataTypes.STRING,
    slug: DataTypes.STRING(1024),
    short_title: DataTypes.STRING,
    marketing_description: DataTypes.TEXT,
    calories_kcal: DataTypes.INTEGER,
    protein_grams: DataTypes.INTEGER,
    fat_grams: DataTypes.INTEGER,
    carbs_grams: DataTypes.INTEGER,
    bulletpoint1: DataTypes.STRING,
    bulletpoint2: DataTypes.STRING,
    bulletpoint3: DataTypes.STRING,
    recipe_diet_type_id: DataTypes.STRING,
    season: DataTypes.STRING,
    base: DataTypes.STRING,
    protein_source: DataTypes.STRING,
    preparation_time_minutes: DataTypes.INTEGER,
    shelf_life_days: DataTypes.INTEGER,
    equipment_needed: DataTypes.STRING,
    origin_country: DataTypes.STRING,
    recipe_cuisine: DataTypes.STRING,
    in_your_box: DataTypes.STRING,
    gousto_reference: DataTypes.INTEGER
  }, {
    underscored: true
  });
  Recipes.associate = function(models) {
    // associations can be defined here
  };
  return Recipes;
};
