import { Sequelize } from 'sequelize';

const DB_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DB}:${process.env.HOST_DB_PORT}/{}`

const connexion = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    },
    logging: false,
});

export { connexion };
