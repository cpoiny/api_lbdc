import { Router } from "express";
import PostController from "../controllers/PostController";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", (req, res) => {
    console.log("PostRouter");
   postController.getAll(req,res);
});

postRouter.post("/ajouter", (req, res) => {
    console.log("PlantRouter create");
    postController.create(req,res);
});


// on exporte pour qu'il puisse etre appelé par index.ts
export default postRouter;