import { Request, Response } from "express";
import AuthorService from "../services/AuthorService";


class AuthorController {

    private authorService = new AuthorService();

    // OK - GET ALL users
    async getAll(req: Request, res: Response) {
        console.log("AuthorController");
        try{
            const authors = await this.authorService.getAll();
            res.send({ status: "OK", data: authors })
        } catch (error: unknown) {
            let  errorMessage = (error as Error).message;
            res.status(500).send({ status: 500, message: `Failed to get authors because ${errorMessage}`});
        }
    }

    // OK - GET AUTHOR BY ID
    async getAuthorById(req: Request, res: Response) {
        console.log("AuthorController - get by id");
        try {
            const author = await this.authorService.getAuthorById(Number(req.params.id));
            res.send({ status: "OK", data: author });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Failed to get author, author doesn't exist" });
        }
    }

    // OK CREATE AUTHOR
    async create(req: Request, res: Response) {
        console.log("AuthorController create");
        try {
            const author = await this.authorService.create(req.body);
            res.send({ status: "OK", data: author });
        } catch (error: unknown) {
            let errorMessage = (error as Error).message
            res.status(500).send({ status: "Failed", message: errorMessage });
        }
    }

    //ok - UPDATE USER
    async updateAuthor(req: Request, res: Response) {
        console.log("AuthorController - update");
        try {
            const updateAuthor = await this.authorService.updateAuthor(Number(req.params.id), req.body);
            res.send({ status: 200, author: updateAuthor, message: "Success to update author" });
        } catch (error: unknown) {
            let errorMessage = (error as Error).message
            res.status(500).send({ status: 500, message: `Failed to update author because ${errorMessage}` });
        }
    }

    // OK DELETE AUTHOR
    async deleteAuthor(req: Request, res: Response) {
        console.log("USerController - delete");
        try {
            await this.authorService.deleteAuthor(Number(req.params.id));
            res.send({ status: "OK", message: `Sucess to delete author!` });
        } catch (error) {
            res.status(500).send({ status: 500, message: `Failed to delete author or author doesn't found!` });
        }
    }
}

export default AuthorController;