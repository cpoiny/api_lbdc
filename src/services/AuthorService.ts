import AppDataSource from "../data-source";
import { Author } from "../entities/Author";

class AuthorService {
    private authorRepository = AppDataSource.getRepository(Author);

    // ok - GET ALL
    async getAll() {
        console.log("AuthorService - get all");
        const authors = await this.authorRepository.find();
        if (authors.length === 0) {
            throw new Error('No authors found');
        }
        return authors;
    }

    // ok - GET BY ID
    async getAuthorById(id: number) {
        console.log("AuthorService - Get by id");
        const author = await this.authorRepository.findOneBy({ id: id });
        if (!author) {
            throw new Error('Author not found');
        } else {
            return author;
        }
    }

    // OK CREATE AUTHOR
    async create(author: Author) {
        console.log("AuthorService - create");
        const existingAuthor = await this.authorRepository.findOneBy({ name: author.name });
        if (existingAuthor) {
            throw new Error('Author already exists');
        }
        const newAuthor = this.authorRepository.create(author);
        console.log("newAuthor", newAuthor);
        return this.authorRepository.save(newAuthor);
    }

    // ok - UPDATE AUTHOR
    async updateAuthor(id: number, author: Author) {
        console.log("AuthorService - Update");
        const foundAuthor = await this.authorRepository.findOneBy({ id: id });

        if (foundAuthor) {
            return this.authorRepository.update(id, author);
        } else {
            throw new Error(`Author doesn't exist`);
        }
    }


    // ok - DELETE Author
    async deleteAuthor(id: number) {
        const author = await this.authorRepository.findOneBy({ id: id });
        console.log("AuthorService - Delete");
        if (!author) {
            throw new Error('Author not found');
        } else {
            return this.authorRepository.delete(id);
        }
    }
}

export default AuthorService;