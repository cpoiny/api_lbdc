import { Request, Response } from "express";
import PostService from "../services/PostService";


class PostController {

    private postService = new PostService();

    // GET ALL POSTS with AUTHOR and MEDIA associated
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

    // OK - GET POST BY ID with author and media
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


      // OK DELETE POST
      async deletePost(req: Request, res: Response) {
        console.log("PostController - delete");
        try {
            await this.postService.deletePost(Number(req.params.id));
            res.send({ status: "OK", message: `Sucess to delete post!` });
        } catch (error) {
            res.status(500).send({ status: 500, message: `Failed to delete post or post doesn't found!` });
        }
    }
}

export default PostController;