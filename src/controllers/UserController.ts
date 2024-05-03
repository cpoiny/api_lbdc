import { Request, Response } from "express";
import UserService from "../services/UserService";
import Joi from "joi";



class UserController {

    private userService = new UserService();

    //ok - GET ALL USERS
    async getAllUsers(req: Request, res: Response) {
        console.log("UserController - get all");
        const users = await this.userService.getAllUsers();
        res.send({ status: "OK", data: users })
    }

    //ok - GET USER BY ID
    async getUserById(req: Request, res: Response) {
        console.log("UserController - get by id");

        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            res.send({ status: "OK", data: user });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Failed to get user, user doesn't exist" });
        }
    }

    //ok - CREATE USER - SIGNUP
    async signup(req: Request, res: Response) {
        console.log("UserController - signup");
        const { pseudo, email, password } = req.body;

        // Define the validation schema for pseudo, email and password
        const schema = Joi.object({
            pseudo: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required()
        });

        // Validate the input
        const { error } = schema.validate({ pseudo, password, email });
        if (error) {
            res.status(500).json({ message: `Invalid data for create an account` });
        }
        else {
            try {
                const createUser = await this.userService.signup(pseudo, email, password);
                res.status(201).json({ data: createUser, message: "User created" });
            }  catch (error) {
                res.status(500).json({ message: `Failed to create user ${pseudo}, or user exist` });
            }
        }
          
    }

    // UPDATE USER
    async updateUser(req: Request, res: Response) {
        console.log("UserController - update");

        try {
            const user = await this.userService.updateUser(Number(req.params.id), req.body);
            res.send({ status: "OK", data: user });
        } catch (error) {
            res.status(500).send({ status: "Failed to update user", message: error });
        }
    }

    // DELETE USER
    async deleteUser(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            const user = await this.userService.deleteUser(Number(req.params.id));
            res.send({ status: "OK", data: user });
        } catch (error) {
            res.status(500).send({ status: "Failed to delete user", message: error });
        }
    }

    // CONNEXION - AUTHENTICATION
    async login(req: Request, res: Response) {
        console.log("UserController-login")
        const email = req.body.email;
        const password = req.body.password;
        // le service va verifier que email existe et password associé aussi, génére le token et le renvoie
        const token = await this.userService.login(email, password);

        if (token) {
            //important: ici je retourne un objet de type user, si je mets ({user: user}) , je retourne un objet contenant un objet de type user
            res.status(201).json({ token, message: "Connexion sucess" });
        } else {
            res.status(500).json({ message: "You Failed to connect !" });
        }

    }
}

export default UserController;