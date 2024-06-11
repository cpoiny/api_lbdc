import { Router } from "express";
import UserController from "../controllers/UserController";
import checkDataForCreation from "../middlewares/CheckDataForCreation";
import checkDataForLogin from "../middlewares/CheckDataForLogin";


const userRouter = Router();
const userController = new UserController();

/**
 * Route for retrieving all users.
 * @route GET /
 */
userRouter.get("/", (req, res) => {
    console.log("UserRouter - get all");
    userController.getAllUsers(req, res);
});


/**
 * Route for retrieving a user by ID.
 * @route GET /:id
 * @param {string} id - The ID of the user.
 */
userRouter.get("/:id", (req, res) => {
    console.log("userRouter - get by id");
    userController.getUserById(req, res);
});


/**
 * Route for creating a new user (signup).
 * @route POST /signup
 * @middleware checkDataForCreation - Middleware for validating user data.
 */
userRouter.post("/signup", checkDataForCreation, (req, res) => {
    console.log("UserRouter - create signup");
    userController.signup(req, res);
});


/**
 * Route for updating a user.
 * @route PUT /:id
 * @param {string} id - The ID of the user to update.
 * @middleware checkDataForCreation - Middleware for validating user data.
 */
userRouter.put("/:id", checkDataForCreation, (req, res) => {
    console.log("UserRouter - update");
    userController.updateUser(req, res);
});


/**
 * Route for deleting a user.
 * @route DELETE /:id
 * @param {string} id - The ID of the user to delete.
 */
userRouter.delete("/:id", (req, res) => {
    console.log("userRouter - delete");
    userController.deleteUser(req, res);
});


/**
 * Route for user login (admin).
 * @route POST /login
 * @middleware checkDataForLogin - Middleware for validating login data.
 */
userRouter.post("/login", checkDataForLogin, (req, res) => {
    console.log("UserRouter - login");
    userController.loginAdmin(req, res);
});

/**
 * Route for user login.
 * @route POST /connexion
 * @middleware checkDataForLogin - Middleware for validating login data.
 */
userRouter.post("/connexion", checkDataForLogin, (req, res) => {
    console.log("UserRouter - connexion user");
    userController.loginUser(req, res);
});

export default userRouter;