'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    book_id: DataTypes.STRING,
    author_id: DataTypes.STRING,
    title: DataTypes.STRING,
    pages:DataTypes.INTEGER,
    price: DataTypes.STRING,
    status: DataTypes.STRING,
    isbn: DataTypes.STRING,
    published_date:DataTypes.DATEONLY,
    rating:DataTypes.INTEGER  
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};