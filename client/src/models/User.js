const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Role = require('./Role.js');

class User extends Model {}

// Création d'une classe User avec les propriétés définies dans la base de données
// Définis comment les données sont stockées dans la base de données PostGreSQL via Sequelize
// Sequelize va "traduire" les Datatypes en type appropriés
User.init(
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
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_role_id: {
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
        modelName: 'User',
        tableName: 'user',
        timestamps: false, // Disable automatic timestamps since we are managing them manually
        hooks: {
        beforeCreate: (user, options) => {
            user.updated_at = new Date();
        },
        beforeUpdate: (user, options) => {
            user.updated_at = new Date();
        },
    },
});

// Define the association with UserRole
User.belongsTo(UserRole, { foreignKey: 'user_role_id' });

module.exports = User;
