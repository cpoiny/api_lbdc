import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {

    private userService = new UserService();

    /**
     * Retrieves all users.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response with the status and data of the users.
     */
    async getAllUsers(req: Request, res: Response) {
        console.log("UserController - get all");

        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: "Success", data: users });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get users because ${errorMessage}` });
        }
    };

    /**
        * Retrieves a user by their ID.
        * 
        * @param req - The request object.
        * @param res - The response object.
        * @returns A JSON response with the user data if successful, or an error message if failed.
        */
    async getUserById(req: Request, res: Response) {
        console.log("UserController - get by id");

        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            res.status(200).json({ status: "Success", data: user });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get user because ${errorMessage}` });
        }
    };

    /**
     * Handles the signup functionality for a user.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the status of the signup operation.
     */
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
    };

    /**
     * Updates a user.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the status of the update operation.
     */
    async updateUser(req: Request, res: Response) {
        console.log("UserController - update");

        try {
            await this.userService.updateUser(Number(req.params.id), req.body);
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to update user because ${errorMessage}` });
        }
    };

    /**
     * Deletes a user.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the status of the operation.
     */
    async deleteUser(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            await this.userService.deleteUser(Number(req.params.id));
            res.status(201).json({ status: "Success", message: `Sucess to delete user!` });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to delete user because ${errorMessage}` });
        }
    };

    /**
     * Log in.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response with the status, token, and message.
     */
    async login(req: Request, res: Response) {
        console.log("UserController-login")
        const { email, password } = req.body;

        try {
            const token = await this.userService.login(email, password);
            res.status(201).json({ status: "Success", token, message: "Connexion sucessful" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to login because ${errorMessage}!` });
        }

    };
}

export default UserController;