import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

class UserService {

    private userRepository = AppDataSource.getRepository(User);

    async signup(pseudo: string, email: string, password: string) {
        console.log("UserService");
    
        // 10 correspond au nombre de round pour le hashage
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // grace au repository on a acces à la methode create qui est notre requete SQL avec orm
        const newUser = this.userRepository.create({
            pseudo: pseudo,
            email: email, 
            password: hashedPassword
        });
    
        // on save car la methode create ne save pas, elle create juste
     return await this.userRepository.save(newUser);
      }


      async getAll() {
        console.log("UserServices - get all");
        //return AppDataSource.query("SELECT * FROM user;");
        return this.userRepository.find();
    }
}

export default UserService;