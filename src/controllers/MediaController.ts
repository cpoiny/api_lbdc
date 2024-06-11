import { Request, Response } from "express";
import MediaService from "../services/MediaService";

class MediaController {

    private mediaService = new MediaService();

    /**
        * Retrieves all medias.
        * 
        * @param req - The request object.
        * @param res - The response object.
        * @returns A JSON response with the status and data of the retrieved medias, or an error message if the retrieval fails.
        */
    async getAll(req: Request, res: Response) {
        console.log("MediaController");

        try {
            const medias = await this.mediaService.getAll();
            res.status(200).json({ status: "Success", data: medias })
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get medias because ${errorMessage}` });
        }
    };

    /**
        * Retrieves a media by its ID.
        * 
        * @param req - The request object.
        * @param res - The response object.
        * @returns A JSON response with the retrieved media.
        */
    async getMediaById(req: Request, res: Response) {
        console.log("MediaController - get by id");

        try {
            const media = await this.mediaService.getMediaById(Number(req.params.id));
            res.status(200).json({ status: "Success", data: media });
        } catch (error) {
            let errorMessage = (error as Error).message;
            res.status(500).json({ status: "Failed", message: `Failed to get media because ${errorMessage}` });
        }
    };

    /**
        * Creates a new media.
        * 
        * @param req - The request object.
        * @param res - The response object.
        */
    async create(req: Request, res: Response) {
        console.log("MediaController create");

        try {
            const media = await this.mediaService.create(req.body);
            res.status(200).json({ status: "Success", data: media });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to create media because ${errorMessage}` });
        }
    };

    /**
     * Updates a media.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the status of the update operation.
     */
    async updateMedia(req: Request, res: Response) {
        console.log("MediaController - update");

        try {
            await this.mediaService.updateMedia(Number(req.params.id), req.body);
            res.status(200).json({ status: "Success", message: "Success to update media" });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to update media because ${errorMessage}` });
        }
    };

    /**
        * Deletes a media by its ID.
        * 
        * @param req - The request object.
        * @param res - The response object.
        */
    async deleteMedia(req: Request, res: Response) {
        console.log("MediaController - delete");

        try {
            await this.mediaService.deleteMedia(Number(req.params.id));
            res.status(200).json({ status: "Success" });
        } catch (error) {
            let errorMessage = (error as Error).message
            res.status(500).json({ status: "Failed", message: `Failed to delete media because ${errorMessage}` });
        }
    };
}

export default MediaController;