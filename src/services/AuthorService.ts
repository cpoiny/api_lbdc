import AppDataSource from "../data-source";
import { Author } from "../entities/Author";

class AuthorService {
    private authorRepository = AppDataSource.getRepository(Author);

    // ok - GET ALL
    async getAll() {
        console.log("AuthorService - get all");
       // return AppDataSource.query("SELECT * FROM author;");
        return this.authorRepository.find();
    }
    

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
        const newAuthor = this.authorRepository.create(author);
        console.log("newAuthor", newAuthor);
        return this.authorRepository.save(newAuthor);
    }

}

export default AuthorService;