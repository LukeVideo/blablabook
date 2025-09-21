import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge le fichier .env depuis le dossier racine du client
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sequelize = new Sequelize(
    process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.HOST_DB_PORT}/${process.env.POSTGRES_DB}`,
    {
        dialect: 'postgres',
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        },
        logging: false
    }
);

export default sequelize;

