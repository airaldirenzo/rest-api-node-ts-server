import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

// Información general de la API

const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "REST API Node.js / Express / Typescript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url(https://conversisconsulting.com/wp-content/uploads/2021/02/producto-excelente.jpg);
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #9c6c01
        }
    `,
    customSiteTitle: "Documentacion de Producto REST API Express / Typescript"
}

export default swaggerSpec
export {
    swaggerUiOptions
}