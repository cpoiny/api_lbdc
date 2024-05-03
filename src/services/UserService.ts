import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

    private userRepository = AppDataSource.getRepository(User);

    // ok - GET ALL USERS
    async getAllUsers() {
        console.log("UserService - Get all");
        return await this.userRepository.find();
    }

     // ok - GET USER BY ID
    async getUserById(id: number) {
      console.log("UserService - Get by id");
      const user  = await this.userRepository.findOneBy({id: id});
      if(!user){
        throw new Error('User not found');
      } else {
        return user;
      }
    }

    // ok - CREATE USER
    async signup(pseudo: string, email: string, password: string) {
        console.log("UserService - Create");
        // Check if user already exists (email and password)
        const user = await this.userRepository.findOneBy({email: email});
        if(user) {
          throw new Error('User already exists');
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


    // ok - DELETE USER
    async deleteUser(id: number) {
        const user  = await this.userRepository.findOneBy({id: id});
        console.log("UserService - Delete");
        if(!user){
          throw new Error('User not found');
        } else {
          return this.userRepository.delete(id);
        }
    }

    // ok - CONNEXION - AUTHENTICATION - LOGIN
    async login(email: string, password: string) {
      // Check if user exists
      const user = await this.userRepository.findOneBy({email: email});
      if(!user) {
         throw new Error('User doesnt exists');
      }
    
      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password!);
      if(!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate token (id, email, secret key and expiration time)
      const token = jwt.sign({
      id: user.id, email: user.email, role: user.role},
      process.env.JWT_SECRET!, 
      {expiresIn: "1h"});
    
      return token;
    }
}

export default UserService;