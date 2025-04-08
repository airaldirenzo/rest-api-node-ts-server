import  request  from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db"

describe("GET /api", () => {
    test("should send back a json response", async () => {
        const res = await request(server).get("/api")
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body.msg).toBe("Desde API")

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe("desde api")
        
    })
})


// Con un mock podemos simular un entorno y hacer pruebas "virtuales"
jest.mock("../config/db")

// jest.spyOn(db, "authenticate") ... authenticate hace referencia a la funcion utilizada en server.ts linea 13
describe("Connect DB", () => {
    it("should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error al conectar a la base de datos"))

        const consoleSpy = jest.spyOn(console,"log")

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar a la base de datos"))
    })
})