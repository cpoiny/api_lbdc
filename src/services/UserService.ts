import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

class UserService {

    private userRepository = AppDataSource.getRepository(User);

    // GET ALL USERS
    async getAllUsers() {
        console.log("UserService - Get all");
        return this.userRepository.find();
    }

     // GET USER BY ID
    async getUserById(id: number) {
        console.log("UserService - Get by id");
        return this.userRepository.findOneBy({id: id});
    }

    // CREATE USER
    async signup(pseudo: string, email: string, password: string) {
        console.log("UserService - Create");
        // 10 correspond au nombre de round pour le hashage
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            pseudo: pseudo,
            email: email, 
            password: hashedPassword
        });
     // Save car méthode "create" ne save pas dans la BDD
     return await this.userRepository.save(newUser);
      }


    // UPDATE USER
    async updateUser(id: number, user: User) {
        console.log("UserService - Update");
        return this.userRepository.update(id, user);
      }


    // DELETE USER
    async deleteUser(id: number) {
        console.log("UserService - Delete");
        return this.userRepository.delete(id);
    }
    

}

export default UserService;