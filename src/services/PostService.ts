import AppDataSource from "../data-source";
import { Author } from "../entities/Author";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";
import { PostDTO } from "../modelsDTO/post.dto";

class PostService {
    private postRepository = AppDataSource.getRepository(Post);
    private authorRepository = AppDataSource.getRepository(Author);
    private mediaRepository = AppDataSource.getRepository(Media);

    async getAll() {
        console.log("PostService - get all");
        return this.postRepository.find();
    }

    async create(post: PostDTO) {
        console.log("PostService - create");

        const author = await this.authorRepository.findOneBy({ name: post.author});
        const media = await this.mediaRepository.findOneBy({ title: post.media});

        const newPost = new Post();
        newPost.title= post.title;
        newPost.content = post.content;
        newPost.picture = post.picture;
        newPost.publicated_at = post.publicated_at? post.publicated_at : new Date();
        newPost.user_id = post.user_id;
        newPost.is_draft= post.is_draft;
        newPost.quantity_comments = post.quantity_comments;
        newPost.quantity_likes= post.quantity_likes;

        if (author === null || media === null) {
            throw new Error('Author or media not found');
        } else {
            newPost.authors = [author];
            newPost.media = [media];
        }
        return this.postRepository.save(newPost);
    }

}

export default PostService;