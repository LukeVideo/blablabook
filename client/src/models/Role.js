import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../database/connexion_db.js';

class Role extends Sequelize.Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'reader_role',
    }
);

export default Role;