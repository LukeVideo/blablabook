
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connexion_db.js';
import Author from './Author.js';
import { timeStamp } from 'console';


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
        category_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        book_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        book_cover: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "created_at",

        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field : "updated_at",

        },
    },


    {
        sequelize,
        modelName : 'Book',
        tableName: 'book',
        timeStamps: true,
        underscored: true,
        hooks: {
            beforeCreate: (book, options) => {
                book.updated_at = new Date();
                
            },
            beforeUpdate: (book, options) => {
                book.updated_at = new Date();
            },
        },
        
    }
);


export default Book;