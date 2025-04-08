import request from "supertest"
import server from "../../server"

// it es lo mismo que test

describe("POST /api/products", () => {
    
    test("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(4) // que me devuelva 4 errores en el arreglo errors

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Monitor - Testing",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    test("should validate that the price is a number and greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Monitor - Testing2",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    test("should create a new product", async () =>{
        const response = await request(server).post("/api/products").send({
            name: "Mouse - Testing4",
            price: 10000
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products", () => {

    test("should check if api/products url exists", async () => {
        const response = await request(server).get("/api/products")
        expect(response.status).not.toBe(404)
    })

    test("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/products")

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products/:id", () => {
    test("Should return a 404 response for a non-existent product", async () => {
        const productId = -1
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
    })

    test("Should check a valid ID in the URL", async () => {
        const response = await request(server).get("/api/products/not-valid-id")
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no valido")
    })

    test("get a JSON response for a single product", async () => {
        const response = await request(server).get("/api/products/1")
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        
    })
})

describe("PUT /api/products/:id", () => {
    
    it("should check a valid ID in the URL", async () => {
        const response = await request(server).put("/api/products/not-valid-url").send({
            name: "Product test",
            availability: true,
            price: 1000
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no valido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    
    it("should display validation error messages when updating a product", async () => {
        const response = await request(server).put("/api/products/1").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).put("/api/products/1").send({
            name: "Product test",
            availability: true,
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El precio debe ser mayor a cero")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should return a 404 response for a non-existent product", async () => {
        const productId = -1
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Product test",
            availability: true,
            price: 1000
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should update a product with valid data", async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Product test",
            availability: true,
            price: 1000
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("PATCH /api/products/:id", () => {
    it("should return a 404 response for a non-existing product", async () => {
        const productId = -1
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should update the product availability", async () => {
        const response = await request(server).patch(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("error")
        
    })
})

describe("DELETE /api/products/:id", () => {
    it("should check a valid ID", async () => {
        const response = await request(server).delete("/api/products/not-valid-url")

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors[0].msg).toBe("Id no valido")
    })

    it("should return a 404 response for a non-existent product", async () => {
        const productId = -1
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
    })

    it("should delete a product", async () => {
        const response = await request(server).delete(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Producto eliminado")

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})