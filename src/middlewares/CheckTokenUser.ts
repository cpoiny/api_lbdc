// SI TOKEN et GENERER PAR NOUS 
// ACCES A LA ROUTE SEULEMENT SI PEROSNNE CONNECTEE

// next : passe à la suite
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface MyTokenPayload extends JwtPayload {
    role: string;
}

const checkTokenUser = (req: Request, res: Response, next: NextFunction) => {

    // dans notre request, on récupère un header qui contient une autorisation
    // on récupére si y' a un token
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //on extrait les infos de notre token
    // on remplace "Bearer " par "" => car dans postman on a un prefixe Bearer devant le token
    const tokenVerify = token.replace("Bearer ", "");
    try {
        const decodedToken = jwt.verify(tokenVerify, process.env.JWT_SECRET as string) as MyTokenPayload;
        const role = decodedToken.role;

        if (role !== "user") {
            return res.status(401).json({ message: "Unauthorized role" });
        }

    } catch (error) {
        console.log("error check token", error);
        return res.status(401).json({ message: "Authorized , invalid token" })
    }
    next();
}

export default checkTokenUser;