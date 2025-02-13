import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connexion_db.js';
import Reader from './Reader.js';

class Bookshelf extends Model {}

// Création d'une classe Book avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
Bookshelf.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reader_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        
        bookshelf_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        bookshelf_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // created_at: {
        //     type: DataTypes.TIMESTAMPTZ,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
        // updated_at: {
        //     type: DataTypes.TIMESTAMPTZ,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
    },


        {
        sequelize,
        modelName : 'Bookshelf',
        tableName: 'bookshelf',
        timestamps: true, // Disable automatic timestamps since we are managing them manually
     //   hooks: {
     //   beforeCreate: (reader, options) => {
     //       reader.updated_at = new Date();
     //   },
     //   beforeUpdate: (reader, options) => {
     //       reader.updated_at = new Date();
     //   },
        
},


);

export default Bookshelf;