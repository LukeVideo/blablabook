import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/connexion_db.js';


class Author extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        biography: {
            type: DataTypes.TEXT,
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
        tableName: 'Author',
        hooks: {
            beforeCreate: (author, options) => {
                reader.updated_at = new Date();
                
            },
            beforeUpdate: (author, options) => {
                reader.updated_at = new Date();
            },
        }
});


export default Author;