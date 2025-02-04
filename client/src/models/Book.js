const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const BookHasReview = require('./Book_has_review.js');

class Book extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isbn: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
        
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        release_date: {
            type: DataTypes.TIMESTAMPTZ,
            allowNull: false,
        },
        book_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        create_at: {
            type: DataTypes.TIMESTAMPTZ,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.TIMESTAMPTZ,
            allowNull: false,
        },
    },


    {
        sequelize,
        tableName: 'book',
    }
);

// Define the association with ...
// Book.belongsTo(bookshelf, { foreignKey: 'user_role_id' });

module.exports = Book;
