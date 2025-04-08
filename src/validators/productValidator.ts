import { body, param } from "express-validator"

export const productValidatorRules = [

    body("name").notEmpty().withMessage("Debe asignar un nombre al Producto"),
        
    body("price")
        .isNumeric().withMessage("Debe ingresar numeros unicamente")
        .notEmpty().withMessage("Debe asignar un precio al Producto")
        .custom((value) => value > 0).withMessage("El precio debe ser mayor a cero"),

];

export const validId = [
    param("id").isInt().withMessage("Id no valido")
]

export const validAvailability = [
    body("availability")
        .isBoolean().withMessage("Valor no valido para disponibilidad")
]