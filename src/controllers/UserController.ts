import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {

    private userService = new UserService();

    //ok - GET ALL USERS
    async getAllUsers(req: Request, res: Response) {
        console.log("UserController - get all");

        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: "Success", data: users });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get users because ${errorMessage}` });
        }
    }

    //ok - GET USER BY ID
    async getUserById(req: Request, res: Response) {
        console.log("UserController - get by id");

        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            res.status(200).json({ status: "Success", data: user });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get user because ${errorMessage}` });
        }
    }

    //ok - CREATE USER - SIGNUP
    async signup(req: Request, res: Response) {
        console.log("UserController - signup");
        const { pseudo, email, password } = req.body;

        try {
            await this.userService.signup(pseudo, email, password);
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to create user ${pseudo} because ${errorMessage}` });
        }
    }

    //ok - UPDATE USER
    async updateUser(req: Request, res: Response) {
        console.log("UserController - update");

        try {
            await this.userService.updateUser(Number(req.params.id), req.body);
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to update user because ${errorMessage}` });
        }
    }

    // ok - DELETE USER
    async deleteUser(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            await this.userService.deleteUser(Number(req.params.id));
            res.status(201).json({ status: "Success", message: `Sucess to delete user!` });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to delete user because ${errorMessage}` });
        }
    }

    // ok - CONNEXION - AUTHENTICATION
    async loginAdmin(req: Request, res: Response) {
        console.log("UserController-login")
        const { email, password } = req.body;

        try {
            const token = await this.userService.loginAdmin(email, password);
            res.status(201).json({ status: "Success", token, message: "Connexion admin sucessful" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to login admin because ${errorMessage}!` });
        }

    }

    async loginUser(req: Request, res: Response) {
        console.log("UserController-login user")
        const { email, password } = req.body;

        try {
            const token = await this.userService.loginUser(email, password);
            res.status(201).json({ status: "Success", token, message: "Connexion user sucessful" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to login user because ${errorMessage}!` });
        }
    }
}

export default UserController;