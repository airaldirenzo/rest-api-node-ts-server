import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi, { serve } from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"

// En package.json en scripts
// "test:coverage": "npm run pretest && jest --detectOpenHandles --coverage"
// Si hacemos npm run test:coverage nos muestra una tabla con la parte de codigo que cubrimos con las pruebas hechas

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // Comentado para que supertest no tire error
        //console.log(colors.blue.bold("Conexion exitosa"));
        
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"));
        
    }
}

connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null,true) // No hay error y permitimos la conexion
        } else {
            callback(new Error("Error de CORS"))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Es util para ver las peticiones y cuanto tiempo demoran
server.use(morgan("dev"))

server.use("/api/products", router)

// Docs

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server