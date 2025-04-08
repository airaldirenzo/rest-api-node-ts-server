import { exit } from "node:process"
import db from "../config/db"

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log("Datos eliminados correctamente");
        exit()
    } catch (error) {
        console.log(error);
        exit(1)
    }
}
// En el package.json, en la parte de scripts usamos pretest 
// para que antes de ejecutar un test se mande a llamar ts-node ./src/data --clear
// De modo que cada vez que hagamos un test con npm test, borramos la base de datos
if(process.argv[2] === "--clear"){
    clearDB()
}