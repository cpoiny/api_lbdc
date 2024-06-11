import { Router } from "express";
import AuthorController from "../controllers/AuthorController";
import checkTokenAdmin from "../middlewares/CheckTokenAdmin";

const authorRouter = Router();
const authorController = new AuthorController();

/**
 * GET all authors.
 * @route GET /authors
 */
authorRouter.get("/", (req, res) => {
    console.log("AuthorRouter");
    authorController.getAll(req, res);
});

/**
 * GET author by ID.
 * @route GET /authors/:id
 * @param {string} id - The ID of the author.
 */
authorRouter.get("/:id", (req, res) => {
    console.log("AuthorRouter - get by id");
    authorController.getAuthorById(req, res);
});

/**
 * Create a new author.
 * @route POST /authors/ajouter
 * @middleware checkTokenAdmin - Middleware to check if the user is an admin.
 */
authorRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter create");
    authorController.create(req, res);
});

/**
 * Update an existing author.
 * @route PUT /authors/:id
 * @param {string} id - The ID of the author to update.
 * @middleware checkTokenAdmin - Middleware to check if the user is an admin.
 */
authorRouter.put("/:id", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter - update");
    authorController.updateAuthor(req, res);
});

/**
 * Delete an author.
 * @route DELETE /authors/:id
 * @param {string} id - The ID of the author to delete.
 * @middleware checkTokenAdmin - Middleware to check if the user is an admin.
 */
authorRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter - delete");
    authorController.deleteAuthor(req, res);
});

export default authorRouter;