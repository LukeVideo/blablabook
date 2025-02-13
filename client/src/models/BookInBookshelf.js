
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connexion_db.js';
import Book from './Book.js';
import Bookshelf from './Bookshelf.js';


class BookInBookshelf extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
BookInBookshelf.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        bookshelf_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        display: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
            created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

        },
    },


    {
        sequelize,
        modelName : 'BookInBookshelf',
        tableName: 'book_in_bookshelf',
        hooks: {
            beforeCreate: (book_in_bookshelf, options) => {
                book_in_bookshelf.updated_at = new Date();
                
            },
            beforeUpdate: (book_in_bookshelf, options) => {
                book_in_bookshelf.updated_at = new Date();
            },
        },
        
    }
);


export default BookInBookshelf;