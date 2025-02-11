import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/connexion_db.js';
import Bookshelf from './Bookshelf.js';
import Role from './Role.js';

class Reader extends Model {}

// Création d'une classe Reader avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
Reader.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
        
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        reader_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reader_role_id: {
            type: DataTypes.INTEGER,
            defaultValue: 2
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
    }, {
        sequelize,
        modelName: 'Reader',
        tableName: 'reader',
        timestamps: false, // Disable automatic timestamps since we are managing them manually
        hooks: {
        beforeCreate: (reader, options) => {
            reader.updated_at = new Date();
            
        },
        beforeUpdate: (reader, options) => {
            reader.updated_at = new Date();
        },
    },
});

// Define the association with ReaderRole
Reader.belongsTo(Role, { foreignKey: 'reader_role_id' });

export default Reader;
