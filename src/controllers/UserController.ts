import { Request, Response } from "express";
import UserService from "../services/UserService";



class UserController {

    private userService = new UserService();

    // GET ALL USERS
    async getAll(req : Request, res: Response) {
        console.log("UserController - get all");
        const users = await this.userService.getAll();
        res.send({status: "OK", data: users})
    }

  // SIGNUP
  async signup(req : Request, res : Response) {
    console.log("UserController- signup");
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    const password = req.body.password;
    const createUser = await this.userService.signup(pseudo, email, password);

    if (createUser) {
        res.status(201).json({ message: "User created" });
    } else {
        res.status(500).json({ message: `Error : Failed for the creation of user ${pseudo}` });
    }
}
}

export default UserController;