'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        autoIncrement: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      book_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.STRING,
        references:{
          model:'Authors',
          key:'author_id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      published_date: {
        type: Sequelize.DATEONLY
      },
      rating: {
        type: Sequelize.INTEGER //1-5
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};