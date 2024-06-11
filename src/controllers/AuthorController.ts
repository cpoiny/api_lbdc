import { Request, Response } from "express";
import AuthorService from "../services/AuthorService";


class AuthorController {

    private authorService = new AuthorService();

    /**
        * Retrieves all authors.
        * 
        * @param req - The request object.
        * @param res - The response object.
        * @returns A JSON response with the status and data of the authors, or an error message if the retrieval fails.
        */
    async getAll(req: Request, res: Response) {
        console.log("AuthorController");

        try {
            const authors = await this.authorService.getAll();
            res.status(200).json({ status: "Success", data: authors })
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Success", message: `Failed to get authors because ${errorMessage}` });
        }
    };

    /**
        * Retrieves an author by their ID.
        * 
        * @param req - The request object.
        * @param res - The response object.
        */
    async getAuthorById(req: Request, res: Response) {
        console.log("AuthorController - get by id");

        try {
            const author = await this.authorService.getAuthorById(Number(req.params.id));
            res.status(200).json({ status: "Sucess", data: author });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to update author because ${errorMessage}` });
        }
    };

    /**
        * Creates a new author.
        * 
        * @param req - The request object.
        * @param res - The response object.
        */
    async create(req: Request, res: Response) {
        console.log("AuthorController create");

        try {
            const author = await this.authorService.create(req.body);
            res.status(200).json({ status: "Success", data: author });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to create author because ${errorMessage}` });
        }
    };

    /**
     * Updates an author.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the status of the update operation.
     */
    async updateAuthor(req: Request, res: Response) {
        console.log("AuthorController - update");

        try {
            await this.authorService.updateAuthor(Number(req.params.id), req.body);
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to update author because ${errorMessage}` });
        }
    };

    /**
     * Deletes an author.
     * 
     * @param req - The request object.
     * @param res - The response object.
     */
    async deleteAuthor(req: Request, res: Response) {
        console.log("USerController - delete");

        try {
            await this.authorService.deleteAuthor(Number(req.params.id));
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to delete author because ${errorMessage}` });
        }
    };
}

export default AuthorController;