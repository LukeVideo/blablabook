
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connexion_db.js';



class BookStatus extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
BookStatus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        book_status: {
            type: DataTypes.STRING,
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
        modelName : 'BookStatus',
        tableName: 'book_status',
        hooks: {
            beforeCreate: (book_status, options) => {
                book_status.updated_at = new Date();

            },
            beforeUpdate: (book_status, options) => {
                book_status.updated_at = new Date();
            },
        },
        
    }
);


export default BookStatus;