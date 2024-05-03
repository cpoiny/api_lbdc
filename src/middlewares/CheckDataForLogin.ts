import Joi from "joi";
import { NextFunction, Request, Response } from "express";


const checkDataForLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log("checkDataForLogin");
    const { email, password } = req.body;

    const schema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required()
    });
    const { error } = schema.validate({ password, email });
    if (error) {
        res.status(500).json({ message: `Invalid Email or password for Login` });
    }
    else {
        next();
    }
}

export default checkDataForLogin;