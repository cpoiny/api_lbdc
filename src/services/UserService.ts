import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

  public userRepository = AppDataSource.getRepository(User);

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   * @throws {Error} If no users are found.
   */
  async getAllUsers() {
    console.log("UserService - Get all");
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new Error('No users found');
    }
    return users;
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A Promise that resolves to the user object if found, or throws an error if not found.
   */
  async getUserById(id: number) {
    console.log("UserService - Get by id");
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  /**
   * Creates a new user with the provided pseudo, email, and password.
   * 
   * @param pseudo - The pseudo of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the newly created user.
   * @throws Error if the user already exists.
   */
  async signup(pseudo: string, email: string, password: string) {
    console.log("UserService - Create");
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      throw new Error('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        pseudo: pseudo,
        email: email,
        password: hashedPassword,
        role: "user"
      });
      return await this.userRepository.save(newUser);
    }
  }

  /**
   * Updates a user with the specified ID.
   * @param id - The ID of the user to update.
   * @param user - The updated user object.
   * @returns A promise that resolves to the updated user.
   * @throws Error if the user doesn't exist.
   */
  async updateUser(id: number, user: User) {
    console.log("UserService - Update");
    const { password, email } = user;
    const foundUser = await this.userRepository.findOneBy({ id: id });

    if (foundUser) {
      const isEmailUnique = await this.checkIfEmailExist(email!, id)
      if (isEmailUnique) {
        const hashedPassword = await bcrypt.hash(password!, 10);
        user.password = hashedPassword;
      }
      return this.userRepository.update(id, user);
    } else {
      throw new Error(`User doesn't exist`);
    }
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user.
   * @throws Error if the user is not found.
   */
  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    console.log("UserService - Delete");
    if (!user) {
      throw new Error('User not found');
    } else {
      return this.userRepository.delete(id);
    }
  }


  /**
   * Authenticates an admin user by checking the email and password.
   * If the user is authenticated, a JWT token is generated and returned.
   * @param email - The email of the admin user.
   * @param password - The password of the admin user.
   * @returns The JWT token if the user is authenticated.
   * @throws Error if the user doesn't exist, doesn't have admin role, or the password is invalid.
   */
  async loginAdmin(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new Error('User doesnt exists');
    }
    if (user.role !== "admin") {
      throw new Error('User doesnt have admin role');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({
      id: user.id, email: user.email, role: user.role
    },
      process.env.JWT_SECRET!,
      { expiresIn: "4h" });

    return token;
  }

  /**
   * Authenticates a user by checking their email and password.
   * If the user is authenticated, a JWT token is generated and returned.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A JWT token if the user is authenticated.
   * @throws Error if the user doesn't exist, doesn't have the user role, or if the password is invalid.
   */
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new Error('User doesnt exists');
    }
    if (user.role !== "user") {
      throw new Error('User doesnt have user role');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({
      id: user.id, email: user.email, role: user.role
    },
      process.env.JWT_SECRET!,
      { expiresIn: "4h" });

    return token;
  }


  /**
   * Checks if the given email already exists in the database.
   * 
   * @param newEmail - The email to check.
   * @param id - The ID of the user.
   * @returns A boolean indicating whether the email exists or not.
   * @throws Error if the email is already used by another user.
   */
  async checkIfEmailExist(newEmail: string, id: number) {

    const existingUser = await this.userRepository.findOneBy({ email: newEmail });
    if (existingUser?.id === id) {
      return true;

    } else if (!existingUser) {
      return true;

    } else {
      throw new Error("Email already used !");
    }
  }
}

export default UserService;