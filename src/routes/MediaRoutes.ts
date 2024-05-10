import { Router } from "express";

import checkTokenAdmin from "../middlewares/CheckTokenAdmin";
import MediaController from "../controllers/MediaController";

const mediaRouter = Router();
const mediaController = new MediaController();

// ok - GET ALL MEDIAS
mediaRouter.get("/", (req, res) => {
    console.log("MediaRouter");
    mediaController.getAll(req, res);
});

//ok - GET - MEDIA BY ID
mediaRouter.get("/:id", (req, res) => {
    console.log("MediaRouter - get by id");
    mediaController.getMediaById(req, res);
});

// ok - CREATE MEDIA
mediaRouter.post("/ajouter", checkTokenAdmin, (req, res) => {
    console.log("MediaRouter create");
    mediaController.create(req, res);
});

// ok - PUT - UPDATE MEDIA
mediaRouter.put("/:id", checkTokenAdmin, (req, res) => {
    console.log("MediaRouter - update");
    mediaController.updateMedia(req, res);
});

// ok - DELETE - MEDIA
mediaRouter.delete("/:id", checkTokenAdmin, (req, res) => {
    console.log("MediaRouter - delete");
    mediaController.deleteMedia(req, res);
});

export default mediaRouter;