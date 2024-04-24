import AppDataSource from "../data-source";
import { Post } from "../entities/Post";

class PostService {
    private postRepository = AppDataSource.getRepository(Post);

    async getAll() {
        console.log("PostService - get all");
       // return AppDataSource.query("SELECT * FROM post;");
        return this.postRepository.find();
    }

    async create(post: Post) {
        console.log("PostService - create");
        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }

}

export default PostService;