import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

// route to get all the users
userRouter.get("/", (req, res) => {
    console.log("UserRouter - get all");
   userController.getAll(req,res);
});


userRouter.post("/signup", (req, res) => {
    console.log("UserRouter - signup");
   userController.signup(req,res);
});

export default userRouter;