import { Request, Response } from "express";
import UserService from "../services/UserService";



class UserController {

    private userService = new UserService();

    // GET ALL USERS
    async getAllUsers(req : Request, res: Response) {
        console.log("UserController - get all");
        const users = await this.userService.getAllUsers();
        res.send({status: "OK", data: users})
    }

    // GET USER BY ID
    async getUserById(req : Request, res: Response) {
        console.log("UserController - get by id");

        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            res.send({status: "OK", data: user});
        } catch (error) {
            res.status(500).send({status : "Failed to get user by id", message: error});
        }
    }

    // CREATE USER - SIGNUP
    async signup(req : Request, res : Response) {
        console.log("UserController - signup");
        const pseudo = req.body.pseudo;
        const email = req.body.email;
        const password = req.body.password;
        const createUser = await this.userService.signup(pseudo, email, password);

    if (createUser) {
        res.status(201).json({ message: "User created" });
    } else {
        res.status(500).json({ message: `Failed to create user ${pseudo}` });
    }
}

    // UPDATE USER
    async updateUser(req : Request, res: Response) {
        console.log("UserController - update");

        try {
            const user = await this.userService.updateUser(Number(req.params.id), req.body);
            res.send({status: "OK", data: user});
        } catch (error) {
            res.status(500).send({status : "Failed to update user", message: error});
        }
    }

    // DELETE USER
    async deleteUser(req : Request, res: Response) {
        console.log("USerController - delete");

        try {
            const user = await this.userService.deleteUser(Number(req.params.id));
            res.send({status: "OK", data: user});
        } catch (error) {
            res.status(500).send({status : "Failed to delete user", message: error});
        }
    }

}

export default UserController;