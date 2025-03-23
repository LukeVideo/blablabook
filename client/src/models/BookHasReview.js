import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connexion_db.js';
import Book from './Book.js';
import Reader from './Reader.js';

class BookHasReview extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
BookHasReview.init(
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
        
        reader_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        modelName : 'BookHasReview',
        tableName: 'book_has_review',
        timestamps: false, // Disable automatic timestamps since we are managing them manually
        hooks: {
        beforeCreate: (bookhasreview, options) => {
            bookhasreview.updated_at = new Date();
            
        },
        beforeUpdate: (bookhasreview, options) => {
            bookhasreview.updated_at = new Date();
        },
    },
    }
);


export default BookHasReview;