import { Request, Response } from "express"
import Product from "../models/Product.model"

// HTTP response Status Codes
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

export const getProducts = async (request:Request, response:Response) =>{

        const products = await Product.findAll({
            order: [
                ["price", "DESC"]
            ],
            attributes: {exclude: ["createdAt", "updatedAt"]}
        })
        response.json({data: products})

}

export const getProductsById = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            res.status(404).json({ error: "Producto no encontrado"})
            return 
        }

        res.json({data: product})
}

export const createProduct = async (request: Request, response: Response) =>{

        const product = await Product.create(request.body)
        response.status(201).json({data: product})    

}

export const updateProduct = async (req: Request, res: Response) => {

        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            res.status(404).json({ error: "Producto no encontrado"})
            return 
        }

        // Actualizar

        await product.update(req.body)
        await product.save()
        res.json({data: product})

}

export const updateAvailability = async (req: Request, res: Response) => {

        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            res.status(404).json({ error: "Producto no encontrado"})
            return 
        }

        // Asignamos el valor contrario en la disponibilidad asi nos evitamos pasar un body
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product})

}

export const deleteProduct = async (req: Request, res: Response) => {
    
        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            res.status(404).json({ error: "Producto no encontrado"})
            return 
        }

        // También existe el eliminado lógico que es básicamente dejar de hacerlo visible
        //y en la consultas where tienen que tener un visible==1 para que solo traiga los
        //que están disponibles
        await product.destroy()
        res.json({data: "Producto eliminado"})

}