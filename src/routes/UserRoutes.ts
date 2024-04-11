import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

// GET - ALL USERS
userRouter.get("/", (req, res) => {
    console.log("UserRouter - get all");
   userController.getAllUsers(req,res);
});

// GET - USER BY ID
userRouter.get("/:id", (req, res) => {
    console.log("userRouter - get by id");
    userController.getUserById(req,res);
});


// POST - CREATE USER - SIGNUP
userRouter.post("/signup", (req, res) => {
    console.log("UserRouter - create signup");
   userController.signup(req,res);
});

// PUT - UPDATE USER
userRouter.put("/:id", (req, res) => {
    console.log("UserRouter - update");
    userController.updateUser(req,res);
});

// DELETE - USER
userRouter.delete("/:id", (req, res) => {
    console.log("userRouter - delete");
    userController.deleteUser(req,res);
});

// POST - LOGIN - AUTHENTICATION
userRouter.post("/login", (req, res) => {
    console.log("UserRouter - login");
    userController.login(req, res);
  })


export default userRouter;