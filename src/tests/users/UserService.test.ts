// import { beforeEach, describe, it } from "node:test";
import UserService from "../../services/UserService";
import bcrypt from "bcrypt";


describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe('get All Users', () => {
        it('should return all users', async () => {
            userService.userRepository.find = jest.fn().mockResolvedValue([
                { id: 1, pseudo: 'Cyril', email: 'cyril@test.com', password: 'passwordcyril' },
                { id: 2, pseudo: 'Cynthia', email: 'cyn@test.com', password: 'passwordcynthia' },
            ]);

            const users = await userService.getAllUsers();

            expect(users).toEqual([
                { id: 1, pseudo: 'Cyril', email: 'cyril@test.com', password: 'passwordcyril' },
                { id: 2, pseudo: 'Cynthia', email: 'cyn@test.com', password: 'passwordcynthia' },
            ]);
        });

        it('should throw an error if no users found', async () => {
            userService.userRepository.find = jest.fn().mockResolvedValue([]);

            await expect(userService.getAllUsers()).rejects.toThrow('No users found');
        });
    });


    describe('getUserById', () => {

        it('should return the user with the specified id', async () => {
            // Arrange
            const id = 1;
            const expectedUser = { id: 1, pseudo: 'Cyril', email: 'cyril@test.com', password: 'passwordcyril' };
            userService.userRepository.findOneBy = jest.fn().mockResolvedValue(expectedUser);

            // Act
            const user = await userService.getUserById(id);

            // Assert
            expect(user).toEqual(expectedUser);
            expect(userService.userRepository.findOneBy).toHaveBeenCalledWith({ id: id });
        });

        it('should throw an error if user with the specified id is not found', async () => {
            // Arrange
            const id = 1;
            userService.userRepository.findOneBy = jest.fn().mockResolvedValue(null);

            // Act and Assert
            await expect(userService.getUserById(id)).rejects.toThrow('User not found');
            expect(userService.userRepository.findOneBy).toHaveBeenCalledWith({ id: id });
        });
    });
    
    describe('signup', () => {
        it('should create a new user', async () => {
            // Arrange
            const pseudo = 'Bob';
            const email = 'bob@test.com';
            const password = 'passwordbob';
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword", hashedPassword);

            const findOneByMock = jest.fn().mockResolvedValue(null);
            const createMock = jest.fn().mockReturnValue({
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                role: 'user'
            });
            const saveMock = jest.fn().mockResolvedValue({
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                role: 'user'
            });

            userService.userRepository.findOneBy = findOneByMock;
            userService.userRepository.create = createMock;
            userService.userRepository.save = saveMock;

            // Act
            const result = await userService.signup(pseudo, email, password);

            // Assert
            expect(findOneByMock).toHaveBeenCalledWith({ email: email });
            expect(createMock).toHaveBeenCalledWith({
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                role: 'user'
            });
            expect(saveMock).toHaveBeenCalledWith({
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                role: 'user'
            });
            expect(result).toEqual({
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                role: 'user'
            });
        });

        it('should throw an error if user already exists', async () => {
            // Arrange
            const pseudo = 'Bob';
            const email = 'bob@test.com';
            const password = 'passwordbob';

            const findOneByMock = jest.fn().mockResolvedValue({
                pseudo: pseudo,
                email: email,
                password: 'passwordbob',
                role: 'user'
            });

            userService.userRepository.findOneBy = findOneByMock;

            // Act and Assert
            await expect(userService.signup(pseudo, email, password)).rejects.toThrow('User already exists');
            expect(findOneByMock).toHaveBeenCalledWith({ email: email });
        });
    });
});