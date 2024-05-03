import Joi from "joi";
import { NextFunction, Request, Response } from "express";


const checkDataForCreation = (req: Request, res: Response, next: NextFunction) => {
    console.log("checkDataForCreation");
    const { pseudo, email, password } = req.body || {};

    const schema = Joi.object({
        pseudo: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required()
    });
    const { error } = schema.validate({ pseudo, password, email });
    if (error) {
        res.status(500).json({ message: `Invalid data for create an account` });
    }
    else {
        next();
    }
}

export default checkDataForCreation;

