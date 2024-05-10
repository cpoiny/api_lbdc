import { Request, Response } from "express";
import PostService from "../services/PostService";


class PostController {

    private postService = new PostService();

    // GET ALL POSTS with AUTHOR and MEDIA associated
    async getAll(req: Request, res: Response) {
        console.log("PostController");

        try {
            const posts = await this.postService.getAll();
            res.status(201).json({ status: "Success", data: posts })
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get posts because ${errorMessage}` });
        }
    }

    // OK - GET POST BY ID with author and media
    async getPostById(req: Request, res: Response) {
        console.log("PostController - get by id");

        try {
            const post = await this.postService.getPostById(Number(req.params.id));
            res.status(201).json({ status: "Success", data: post });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get post beacause ${errorMessage}` });
        }
    }

    // OK - CREATE POST
    async create(req: Request, res: Response) {
        console.log("PostController create");

        try {
            const post = await this.postService.create(req.body);
            res.status(201).json({ status: "Success", data: post });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to create post beacause ${errorMessage}` });
        }
    }

    // WIP - UPDATE 
    async updatePost(req: Request, res: Response) {
        console.log("PostController - update");
        try {
            await this.postService.updatePost(Number(req.params.id), req.body);
            res.status(201).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to update post beacause ${errorMessage}` });
        }
    }

    // OK DELETE POST
    async deletePost(req: Request, res: Response) {
        console.log("PostController - delete");

        try {
            await this.postService.deletePost(Number(req.params.id));
            res.status(201).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to delete post because ${errorMessage}` });
        }
    }
}

export default PostController;