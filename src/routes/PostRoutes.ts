import { Router } from "express";
import PostController from "../controllers/PostController";
import checkTokenAdmin from "../middlewares/CheckTokenAdmin";

const postRouter = Router();
const postController = new PostController();

/**
 * Route for getting all posts.
 * @name GET /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
postRouter.get("/", (req, res) => {
    console.log("PostRouter");
    postController.getAll(req, res);
});

/**
 * Route for getting a post by ID.
 * @name GET /:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
postRouter.get("/:id", (req, res) => {
    console.log("PostRouter - get by id");
    postController.getPostById(req, res);
});

/**
 * Route for creating a new post.
 * @name POST /ajouter
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
postRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("PostRouter create");
    postController.create(req, res);
});

/**
 * Route for updating a post.
 * @name PUT /modifier/:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
postRouter.put("/modifier/:id", checkTokenAdmin, (req, res) => {
    console.log("PostRouter - update");
    postController.updatePost(req, res);
});

/**
 * Route for deleting a post.
 * @name DELETE /:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
postRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("PostRouter - delete");
    postController.deletePost(req, res);
});

export default postRouter;