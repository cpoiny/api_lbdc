import { Router } from "express";
import PostController from "../controllers/PostController";
import checkTokenAdmin from "../middlewares/CheckTokenAdmin";


const postRouter = Router();
const postController = new PostController();

// OK - GET ALL POST
postRouter.get("/", (req, res) => {
    console.log("PostRouter");
    postController.getAll(req, res);
});

// OK - GET POST BY ID
postRouter.get("/:id", (req, res) => {
    console.log("PostRouter - get by id");
    postController.getPostById(req, res);
});

// OK - CREATE POST=> verifier le format des données
postRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("PostRouter create");
    postController.create(req, res);
});

// OK - DELETE POST
postRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("PostRouter - delete");
    postController.deletePost(req, res);
});

export default postRouter;