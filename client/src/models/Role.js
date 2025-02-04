import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../database/connexion_db.js';

class Role extends Sequelize.Model {}

Role.init(
    {
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'user_role',
    }
);

export default Role;