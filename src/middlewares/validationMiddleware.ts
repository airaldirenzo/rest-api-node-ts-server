import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (request: Request, response: Response, next: NextFunction):void => {
    let errors = validationResult(request)
    if(!errors.isEmpty()){
        response.status(400).json({errors: errors.array()})
        return;
    }
    next();
};
