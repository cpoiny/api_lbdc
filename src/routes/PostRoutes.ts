import { Router } from "express";
import PostController from "../controllers/PostController";
import checkToken from "../middlewares/CheckToken";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", (req, res) => {
    console.log("PostRouter");
   postController.getAll(req,res);
});

// ajouter le checkToken pour le update, delete des post et aussi pour author et media
postRouter.post("/ajouter", (req, res) => {
    console.log("PlantRouter create");
    postController.create(req,res);
});


// on exporte pour qu'il puisse etre appelé par index.ts
export default postRouter;