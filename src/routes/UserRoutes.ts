import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

// GET ALL USERS
userRouter.get("/", (req, res) => {
    console.log("UserRouter - get all");
   userController.getAll(req,res);
});

// GET USER BY ID
userRouter.get("/:id", (req, res) => {
    console.log("userRouter get by id");
    userController.getById(req,res);
});


// CREATE USER - SIGNUP
userRouter.post("/signup", (req, res) => {
    console.log("UserRouter - signup");
   userController.signup(req,res);
});

export default userRouter;