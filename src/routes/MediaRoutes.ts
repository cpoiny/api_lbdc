import { Router, Request, Response } from "express";

import checkTokenAdmin from "../middlewares/CheckTokenAdmin";
import MediaController from "../controllers/MediaController";

const mediaRouter = Router();
const mediaController = new MediaController();

/**
 * GET all medias.
 * @route GET /
 * @param req - The request object.
 * @param res - The response object.
 */
mediaRouter.get("/", (req: Request, res: Response) => {
    console.log("MediaRouter");
    mediaController.getAll(req, res);
});

/**
 * GET media by ID.
 * @route GET /:id
 * @param req - The request object.
 * @param res - The response object.
 */
mediaRouter.get("/:id", (req: Request, res: Response) => {
    console.log("MediaRouter - get by id");
    mediaController.getMediaById(req, res);
});

/**
 * Create a new media.
 * @route POST /ajouter
 * @param req - The request object.
 * @param res - The response object.
 */
mediaRouter.post("/ajouter", checkTokenAdmin, (req: Request, res: Response) => {
    console.log("MediaRouter create");
    mediaController.create(req, res);
});

/**
 * Update a media by ID.
 * @route PUT /:id
 * @param req - The request object.
 * @param res - The response object.
 */
mediaRouter.put("/:id", checkTokenAdmin, (req: Request, res: Response) => {
    console.log("MediaRouter - update");
    mediaController.updateMedia(req, res);
});

/**
 * Delete a media by ID.
 * @route DELETE /:id
 * @param req - The request object.
 * @param res - The response object.
 */
mediaRouter.delete("/:id", checkTokenAdmin, (req: Request, res: Response) => {
    console.log("MediaRouter - delete");
    mediaController.deleteMedia(req, res);
});

export default mediaRouter;