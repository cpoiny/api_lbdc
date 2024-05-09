import AppDataSource from "../data-source";
import { Author } from "../entities/Author";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";
import { AuthorAndMediaDTO } from "../modelsDTO/authorAndMedia.dto";
import { MediaDTO } from "../modelsDTO/media.dto";
import { PostDTO } from "../modelsDTO/post.dto";
import { PostApiResponseDTO } from "../modelsDTO/postApiResponse.dto";
import AuthorService from "./AuthorService";
import MediaService from "./MediaService";

class PostService {
    private postRepository = AppDataSource.getRepository(Post);
    private authorRepository = AppDataSource.getRepository(Author);
    private mediaRepository = AppDataSource.getRepository(Media);
    private authorService = new AuthorService();
    private mediaService = new MediaService();

    // GET ALL - ok
    async getAll() {
       console.log("PostService - get all");
       const posts = await this.postRepository.find();
       const authors = await this.authorService.getAll();
       const medias = await this.mediaService.getAll();
       if (posts.length === 0) {
        throw new Error('No post found');
      }
      let totalPost! : PostApiResponseDTO;
      totalPost.posts = posts;
      totalPost.authors = authors;
      totalPost.medias = medias;
      return totalPost;
    }

       // ok - GET BY ID
       async getPostById(id: number) {
        console.log("PostService - Get by id");
        const post = await this.postRepository.findOneBy({ id: id });
        if (!post) {
            throw new Error('Post not found');
        } else {
            return post;
        }
    }

    // Creation d'un post et de ses liaisons -- ok
    async create(post: PostDTO) {
        console.log("PostService - create");

        const newPost = new Post();
        newPost.title = post.title;
        newPost.content = post.content;
        newPost.picture = post.picture;
        newPost.publicated_at = post.publicated_at ? post.publicated_at : new Date();
        newPost.user_id = 1;
        newPost.is_draft = post.is_draft;
        newPost.quantity_comments = post.quantity_comments;
        newPost.quantity_likes = post.quantity_likes;

        let results = await this.createOrUpdateAuthor(post);
        if (results) {
            newPost.authors = [results.author!];
            newPost.medias = [results.media!];
        } else {
            throw new Error ("Something went wrong while creating Post");
        }
        // 8 - je crée le post dans la base de données
        const newPostToSave = this.postRepository.create(newPost);
        return await this.postRepository.save(newPostToSave);
    }

    // Create or UpdateAuthor
    async createOrUpdateAuthor(post: PostDTO) {
        let results = new AuthorAndMediaDTO();
        const existingAuthor = await this.authorRepository.findOneBy({ name: post.author.name });

        if (existingAuthor === null) {
            const newAuthor = await this.authorService.create(post.author);
            results.author = newAuthor;
            if (newAuthor) {
                const newMedia = await this.createMedia(post.media!, newAuthor.id!);
                results.media = newMedia
            }
            return results;

        } else {

            const isAuthorUpdated = await this.authorRepository.update(existingAuthor.id!, post.author);
            if (isAuthorUpdated) {
                const updatedAuthor = await this.authorRepository.findOneBy({ id: existingAuthor.id });
                if(updatedAuthor) {
                    const media = await this.mediaRepository.findOneBy({ title: post.media?.title });
                    if ( media === null) {
                        const newMedia = await this.createMedia(post.media!, updatedAuthor.id!);
                        results.author = updatedAuthor;
                        results.media = newMedia;
                        return results;   
                    } else {
                        const isUpdatedMedia = await this.mediaRepository.update(media.id!, post.media!);
                        if (isUpdatedMedia){
                            const updatedMedia = await this.mediaRepository.findOneBy({ id: media.id });
                            results.author = updatedAuthor;
                            results.media = updatedMedia!;
                            return results;
                        }
                }   
                } else {
                    throw new Error ('Something went wrong while updating author');
                }
            }   
        }
    }

    // ccreate or update media
    async createMedia(media: MediaDTO, id: number) {
        const newMedia = new Media();
        newMedia.title = media.title;
        newMedia.category = media.category;
        newMedia.theme = media.theme;
        newMedia.edition = media?.edition;
        newMedia.author_id = id!;
        const newMediaToSave = await this.mediaService.create(newMedia);
        return newMediaToSave;
    }

}

export default PostService;