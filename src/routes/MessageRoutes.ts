import { Router } from "express";
import MessageController from "../controllers/MessageController";


const messageRouter = Router();
const messageController = new MessageController();



// ok - POST - CREATE USER - SIGNUP
messageRouter.post("/send", (req, res) => {
    console.log("messageRouter - send message");

    console.log("req.body", req.body);
 
    messageController.send(req.body, res);
});




export default messageRouter;