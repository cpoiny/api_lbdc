import { Request, Response } from "express";
import MediaService from "../services/MediaService";



class MediaController {

    private mediaService = new MediaService();

    // OK - GET ALL users
    async getAll(req: Request, res: Response) {
        console.log("MediaController");
        try{
            const medias = await this.mediaService.getAll();
            res.send({ status: "OK", data: medias })
        } catch (error: unknown) {
            let  errorMessage = (error as Error).message;
            res.status(500).send({ status: 500, message: `Failed to get medias because ${errorMessage}`});
        }
    }

    // OK - GET MEDIA BY ID
    async getMediaById(req: Request, res: Response) {
        console.log("MediaController - get by id");
        try {
            const media = await this.mediaService.getMediaById(Number(req.params.id));
            res.send({ status: "OK", data: media });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Failed to get media, media doesn't exist" });
        }
    }

    // OK CREATE MEDIA
    async create(req: Request, res: Response) {
        console.log("MediaController create");
        try {
            const media = await this.mediaService.create(req.body);
            res.send({ status: "OK", data: media });
        } catch (error: unknown) {
            let errorMessage = (error as Error).message
            res.status(500).send({ status: "Failed", message: errorMessage });
        }
    }

    //ok - UPDATE USER
    async updateMedia(req: Request, res: Response) {
        console.log("MediaController - update");
        try {
            await this.mediaService.updateMedia(Number(req.params.id), req.body);
            res.send({ status: 200, message: "Success to update media" });
        } catch (error: unknown) {
            let errorMessage = (error as Error).message
            res.status(500).send({ status: 500, message: `Failed to update media because ${errorMessage}` });
        }
    }

    // OK DELETE MEDIA
    async deleteMedia(req: Request, res: Response) {
        console.log("USerController - delete");
        try {
            await this.mediaService.deleteMedia(Number(req.params.id));
            res.send({ status: "OK", message: `Sucess to delete media!` });
        } catch (error) {
            res.status(500).send({ status: 500, message: `Failed to delete media or media doesn't found!` });
        }
    }
}

export default MediaController;