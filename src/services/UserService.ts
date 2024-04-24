import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        // Check if user already exists (email and password)
        const user = await this.userRepository.findOneBy({email: email});
        if(user) {
            const isPasswordValid = await bcrypt.compare(password, user.password!);       
            if(isPasswordValid) {
                return null
            }
        } else {
        
        // Check done, create user
        // Hash 10 rounds with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            pseudo: pseudo,
            email: email, 
            password: hashedPassword,
            role: "user"
        });
     // Save because create method don't register into database
     return await this.userRepository.save(newUser);
      }
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

    // CONNEXION - AUTHENTICATION - LOGIN
    async login(email: string, password: string) {
      // Check if user exists
      const user = await this.userRepository.findOneBy({email: email});
      if(!user) {
        return null
      }
    
      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password!);
      if(!isPasswordValid) {
        return null
      }

      // Generate token (id, email, secret key and expiration time)
      const token = jwt.sign({
      id: user.id, email: user.email},
      process.env.JWT_SECRET!, 
      {expiresIn: "1h"});
    
      // Assign token to user
      // Question : dois je enregistrer le token sachant qu'il expire au bout d'une heure ?
      //user.token = token;
      this.userRepository.save(user);
      return token;
    }
}

export default UserService;