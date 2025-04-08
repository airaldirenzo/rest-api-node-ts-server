import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + "/../models/**/*.ts"],
    // Para que no mande nada a la consola y supertest no de errores
    logging: false
})

export default db