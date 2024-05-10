import { Router } from "express";
import AuthorController from "../controllers/AuthorController";
import checkTokenAdmin from "../middlewares/CheckTokenAdmin";

const authorRouter = Router();
const authorController = new AuthorController();

// ok - GET ALL AUTHORS
authorRouter.get("/", (req, res) => {
    console.log("AuthorRouter");
    authorController.getAll(req, res);
});

//ok - GET - AUTHOR BY ID
authorRouter.get("/:id", (req, res) => {
    console.log("AuthorRouter - get by id");
    authorController.getAuthorById(req, res);
});

// ok - CREATE AUTHOR
authorRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter create");
    authorController.create(req, res);
});

// ok - PUT - UPDATE AUTHOR
authorRouter.put("/:id", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter - update");
    authorController.updateAuthor(req, res);
});

// ok - DELETE - AUTHOR
authorRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("AuthorRouter - delete");
    authorController.deleteAuthor(req, res);
});

export default authorRouter;