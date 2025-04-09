import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { productValidatorRules, validAvailability, validId } from "./validators/productValidator"
import { validate } from "./middlewares/validationMiddleware"

const router = Router ()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor Curvo 2k 144Hz
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 350000
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

// Routing

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *                  - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 * 
 */
router.get("/",getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *             - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              shema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.get("/:id",validId,validate,getProductsById)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 2k 144Hz"
 *                          price:
 *                              type: number
 *                              example: 350000
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid input data
 */

router.post("/", productValidatorRules, validate, createProduct)


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              shema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 2k 144Hz"
 *                          price:
 *                              type: number
 *                              example: 350000
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid ID or Invalida input data
 *          404:
 *              description: Product not found
 */

// Put reemplaza todos los campos aunque no estén todos en el body.
//Sin embargo utilizando el metodo update() nos salvamos de perder los datos y funciona como un patch
router.put("/:id", productValidatorRules, validId, validAvailability, validate, updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              shema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */

// Patch reemplaza solo lo que le mandamos en el body
router.patch("/:id", validId, validate, updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              shema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Producto eliminado"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */

router.delete("/:id", validId, validate, deleteProduct)

export default router