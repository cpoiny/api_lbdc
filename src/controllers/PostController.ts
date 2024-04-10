import { Request, Response } from "express";
import PostService from "../services/PostService";


class BookController {

    private postService = new PostService();

    async getAll(req : Request, res: Response) {
        console.log("PostController");
        const posts = await this.postService.getAll();
        res.send({status: "OK", data: posts})
    }
}

export default BookController;