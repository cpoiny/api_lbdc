import AppDataSource from "../data-source";

class PostService {

    async getAll() {
        console.log("PostServices");
        return AppDataSource.query("SELECT * FROM post;");
    }

  

}

export default PostService;