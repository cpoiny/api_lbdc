import { Request, Response } from "express";
import AuthorService from "../services/AuthorService";


class AuthorController {

    private authorService = new AuthorService();

    async getAll(req: Request, res: Response) {
        console.log("AuthorController");
        const authors = await this.authorService.getAll();
        res.send({ status: "OK", data: authors })
    }

    async getAuthorById(req: Request, res: Response) {
        console.log("AuthorController - get by id");

        try {
            const author = await this.authorService.getAuthorById(Number(req.params.id));
            res.send({ status: "OK", data: author });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Failed to get author, author doesn't exist" });
        }
    }


    async create(req: Request, res: Response) {
        console.log("AuthorController create");

        try {
            const author = await this.authorService.create(req.body);
            res.send({ status: "OK", data: author });
        } catch (error) {
            console.log("mon erreur", error);
            res.status(500).send({ status: "Failed", message: error });
        }
    }
}

export default AuthorController;