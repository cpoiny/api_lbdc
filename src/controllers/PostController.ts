import { Request, Response } from "express";
import PostService from "../services/PostService";


class PostController {

    private postService = new PostService();

    async getAll(req : Request, res: Response) {
        console.log("PostController");
        const posts = await this.postService.getAll();
        res.send({status: "OK", data: posts})
    }


async create(req : Request, res: Response) {
    console.log("PostController create");

    try {
        const post = await this.postService.create(req.body);
        res.send({status: "OK", data: post});
    } catch (error) {
        res.status(500).send({status : "Failed", message: error});
    }
}
}

export default PostController;