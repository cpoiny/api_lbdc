import { Router } from "express";
import AuthorController from "../controllers/AuthorController";

const authorRouter = Router();
const authorController = new AuthorController();

// ok - GET ALL AUTHORS
authorRouter.get("/", (req, res) => {
    console.log("AuthorRouter");
   authorController.getAll(req,res);
});

//ok - GET - AUTHOR BY ID
authorRouter.get("/:id", (req, res) => {
    console.log("userRouter - get by id");
    authorController.getAuthorById(req,res);
});



// ok - ajouter le checkToken pour le update, delete des author et aussi pour author et media
authorRouter.post("/ajouter", (req, res) => {
    console.log("AuthorRouter create");
    authorController.create(req,res);
});


// on exporte pour qu'il puisse etre appelé par index.ts
export default authorRouter;