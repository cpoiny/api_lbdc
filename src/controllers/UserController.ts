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

        try {
            const createdUser = await this.userService.signup(pseudo, email, password);
            res.status(201).json({ data: createdUser, message: "User created" });
        } catch (error) {
            res.status(500).json({ message: `Failed to create user ${pseudo}, or user exist` });
        }


    }

    //ok - UPDATE USER
    async updateUser(req: Request, res: Response) {
        console.log("UserController - update");

        try {
            await this.userService.updateUser(Number(req.params.id), req.body);
            res.send({ status: 200, message: "Success to update user" });
        } catch (error) {
            console.log("error", error);
            res.status(500).send({ status: 500 , message: "Failed to update user", error: error });
        }
    }

    // ok - DELETE USER
    async deleteUser(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            await this.userService.deleteUser(Number(req.params.id));
            res.send({ status: "OK", message: `Sucess to delete user!` });
        } catch (error) {
            res.status(500).send({ status: 500, message: `Failed to delete user or user doesn't found!`});
        }
    }

    // ok - CONNEXION - AUTHENTICATION
    async login(req: Request, res: Response) {
        console.log("UserController-login")

        // le service va verifier que email existe et password associé aussi, génére le token et le renvoie
        const { email, password } = req.body;
                 try {
                const token = await this.userService.login(email, password);
                res.status(201).json({ token, message: "Connexion sucessful" });
            } catch {
                res.status(500).json({ message: `Failed to login!` });
            }

        }
}

export default UserController;