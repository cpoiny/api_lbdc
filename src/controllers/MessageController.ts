import { Response } from "express-serve-static-core";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
// npm i --save-dev @types/nodemailer

class MessageController {
    
    async send(req: any, res: Response<any, Record<string, any>, number>) {
       console.log(req.email, req.message);
       let email = req.messageToSend.email;
       let message = req.messageToSend.message;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
        
          let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'Message de La bibliotheque de Cyril',
            text: message
          };
        
          let info = await transporter.sendMail(mailOptions);
        
          res.send(info);
        };
        

    }



export default MessageController;