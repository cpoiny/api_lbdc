import { Router } from "express";

import checkToken from "../middlewares/CheckToken";
import MediaController from "../controllers/MediaController";

const mediaRouter = Router();
const mediaController = new MediaController();

// ok - GET ALL MEDIAS
mediaRouter.get("/", (req, res) => {
    console.log("MediaRouter");
   mediaController.getAll(req,res);
});

//ok - GET - MEDIA BY ID
mediaRouter.get("/:id", (req, res) => {
    console.log("userRouter - get by id");
    mediaController.getMediaById(req,res);
});


// ok - ajouter le checkToken pour le update, delete des media et aussi pour media et media
mediaRouter.post("/ajouter", checkToken, (req, res) => {
    console.log("MediaRouter create");
    mediaController.create(req,res);
});

// ok - PUT - UPDATE MEDIA
mediaRouter.put("/:id", checkToken, (req, res) => {
    console.log("UserRouter - update");
    mediaController.updateMedia(req,res);
});

// ok - DELETE - MEDIA
mediaRouter.delete("/:id", checkToken, (req, res) => {
    console.log("mediaRouter - delete");
    mediaController.deleteMedia(req,res);
});

// on exporte pour qu'il puisse etre appelé par index.ts
export default mediaRouter;