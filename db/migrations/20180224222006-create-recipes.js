'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      box_type: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING(1024)
      },
      short_title: {
        type: Sequelize.STRING
      },
      marketing_description: {
        type: Sequelize.TEXT
      },
      calories_kcal: {
        type: Sequelize.INTEGER
      },
      protein_grams: {
        type: Sequelize.INTEGER
      },
      fat_grams: {
        type: Sequelize.INTEGER
      },
      carbs_grams: {
        type: Sequelize.INTEGER
      },
      bulletpoint1: {
        type: Sequelize.STRING
      },
      bulletpoint2: {
        type: Sequelize.STRING
      },
      bulletpoint3: {
        type: Sequelize.STRING
      },
      recipe_diet_type_id: {
        type: Sequelize.STRING
      },
      season: {
        type: Sequelize.STRING
      },
      base: {
        type: Sequelize.STRING
      },
      protein_source: {
        type: Sequelize.STRING
      },
      preparation_time_minutes: {
        type: Sequelize.INTEGER
      },
      shelf_life_days: {
        type: Sequelize.INTEGER
      },
      equipment_needed: {
        type: Sequelize.STRING
      },
      origin_country: {
        type: Sequelize.STRING
      },
      recipe_cuisine: {
        type: Sequelize.STRING
      },
      in_your_box: {
        type: Sequelize.STRING
      },
      gousto_reference: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};
