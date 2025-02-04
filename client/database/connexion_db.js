import "dotenv/config";

import { Sequelize } from 'sequelize'; 

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    },
    logging: false,
});

export  default sequelize ;

