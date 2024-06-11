import AppDataSource from "../data-source";
import { Author } from "../entities/Author";

class AuthorService {
   
    private authorRepository = AppDataSource.getRepository(Author);

    /**
     * Retrieves all authors from the author repository.
     * @returns {Promise<Author[]>} A promise that resolves to an array of authors.
     * @throws {Error} If no authors are found.
     */
    async getAll() {
        console.log("AuthorService - get all");
        const authors = await this.authorRepository.find();
        if (authors.length === 0) {
            throw new Error('No authors found');
        }
        return authors;
    };

    /**
     * Retrieves an author by their ID.
     * @param id - The ID of the author to retrieve.
     * @returns The author object if found, otherwise throws an error.
     */
    async getAuthorById(id: number) {
        console.log("AuthorService - Get by id");
        const author = await this.authorRepository.findOneBy({ id: id });
        if (!author) {
            throw new Error('Author not found');
        } else {
            return author;
        }
    };

    /**
     * Creates a new author.
     * @param author - The author object to be created.
     * @returns A promise that resolves to the created author.
     * @throws Error if the author already exists.
     */
    async create(author: Author) {
        console.log("AuthorService - create");
        const existingAuthor = await this.authorRepository.findOneBy({ name: author.name });
        if (existingAuthor) {
            throw new Error('Author already exists');
        }
        const newAuthor = this.authorRepository.create(author);
        console.log("newAuthor", newAuthor);
        return this.authorRepository.save(newAuthor);
    };


    /**
     * Updates an author with the specified ID.
     * @param id - The ID of the author to update.
     * @param author - The updated author object.
     * @returns A promise that resolves to the updated author.
     * @throws Error if the author with the specified ID doesn't exist.
     */
    async updateAuthor(id: number, author: Author) {
        console.log("AuthorService - Update");
        const foundAuthor = await this.authorRepository.findOneBy({ id: id });

        if (foundAuthor) {
            return this.authorRepository.update(id, author);
        } else {
            throw new Error(`Author doesn't exist`);
        }
    };


    /**
     * Deletes an author by their ID.
     * @param id - The ID of the author to delete.
     * @throws Error if the author is not found.
     * @returns A promise that resolves to the deleted author.
     */
    async deleteAuthor(id: number) {
        const author = await this.authorRepository.findOneBy({ id: id });
        console.log("AuthorService - Delete");
        if (!author) {
            throw new Error('Author not found');
        } else {
            return this.authorRepository.delete(id);
        }
    };
}

export default AuthorService;