import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {

    private userService = new UserService();

    //ok - GET ALL USERS
    async getAllUsers(req: Request, res: Response) {
        console.log("UserController - get all");
        try {
            const users = await this.userService.getAllUsers();
            res.send({ status: "OK", data: users })
        } catch (error: unknown) {
            let errorMessage = (error as Error).message;
            res.status(500).send({ status: 500, message: `Failed to get users because ${errorMessage}` });
        }
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
        } catch (error: unknown) {
            let errorMessage = (error as Error).message
            res.status(500).send({ status: 500, message: `Failed to update user because ${errorMessage}` });
        }
    }

    // ok - DELETE USER
    async deleteUser(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            await this.userService.deleteUser(Number(req.params.id));
            res.send({ status: "OK", message: `Sucess to delete user!` });
        } catch (error) {
            res.status(500).send({ status: 500, message: `Failed to delete user or user doesn't found!` });
        }
    }

    // ok - CONNEXION - AUTHENTICATION
    async loginAdmin(req: Request, res: Response) {
        console.log("UserController-login")
        const { email, password } = req.body;
        try {
            const token = await this.userService.loginAdmin(email, password);
            res.status(201).json({ token, message: "Connexion sucessful" });
        } catch (error: unknown){
            res.status(500).json({ message: `Failed to login because ${(error as Error).message}!` });
        }

    }
}

export default UserController;