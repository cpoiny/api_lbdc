import { Router } from "express";
import PostController from "../controllers/PostController";
import checkTokenAdmin from "../middlewares/CheckTokenAdmin";


const postRouter = Router();
const postController = new PostController();

postRouter.get("/", (req, res) => {
    console.log("PostRouter");
    postController.getAll(req, res);
});


postRouter.get("/:id", (req, res) => {
    console.log("PostRouter - get by id");
    postController.getPostById(req, res);
});

// ajouter le checkToken pour le update, delete des post et aussi pour author et media
postRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("PostRouter create");
    postController.create(req, res);
});



// ok - DELETE - AUTHOR
postRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("postRouter - delete");
    postController.deletePost(req, res);
});


// on exporte pour qu'il puisse etre appelé par index.ts
export default postRouter;