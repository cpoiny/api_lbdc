import { Request, Response } from "express";
import PostService from "../services/PostService";


class PostController {

    private postService = new PostService();

    async getAll(req: Request, res: Response) {
        console.log("PostController");
        try {
            const posts = await this.postService.getAll();
            res.send({ status: "OK", data: posts })
        } catch (error: unknown) {
            let errorMessage = (error as Error).message;
            res.status(500).send({ status: 500, message: `Failed to get posts because ${errorMessage}` });
        }
    }

    // OK - GET POST BY ID
    async getPostById(req: Request, res: Response) {
        console.log("PostController - get by id");
        try {
            const post = await this.postService.getPostById(Number(req.params.id));
            res.send({ status: "OK", data: post });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Failed to get post, post doesn't exist" });
        }
    }

    // OK - CREATE POST
    async create(req: Request, res: Response) {
        console.log("PostController create");

        try {
            const post = await this.postService.create(req.body);
            res.send({ status: "OK", data: post });
        } catch (error) {
            console.log("mon erreur", error);
            res.status(500).send({ status: "Failed", message: error });
        }
    }
}

export default PostController;