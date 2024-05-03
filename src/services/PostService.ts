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
        const newPost = this.postRepository.create({
            title: post.title,
            content: post.content,
            picture: post.picture,
            publicated_at: post.publicated_at,
            user_id: post.user_id,
            is_draft: post.is_draft,
            quantity_comments: post.quantity_comments,
            quantity_likes: post.quantity_likes,
        });
        return this.postRepository.save(newPost);
    }

}

export default PostService;