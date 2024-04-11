import { Request, Response } from "express";
import PostService from "../services/PostService";


class PostController {

    private postService = new PostService();

    async getAll(req : Request, res: Response) {
        console.log("PostController");
        const posts = await this.postService.getAll();
        res.send({status: "OK", data: posts})
    }
}

export default PostController;