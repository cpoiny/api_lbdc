import AppDataSource from "../data-source";
import { Author } from "../entities/Author";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";
import { AuthorAndMediaDTO } from "../modelsDTO/authorAndMedia.dto";
import { MediaDTO } from "../modelsDTO/media.dto";
import { PostDTO } from "../modelsDTO/post.dto";
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
        const posts = await this.postRepository.find({ relations: ['authors', 'medias'] });

        if (posts.length === 0) {
            throw new Error('No post found');
        }
        return posts;
    }

    // ok - GET BY ID
    async getPostById(id: number) {
        console.log("PostService - Get by id");
        const post = await this.postRepository.findOne({
            where: { id: id },
            relations: ['authors', 'medias']
        });
        if (!post) {
            throw new Error('Post not found');
        } else {
            return post;
        }
    }

 
    // ok - Creation d'un post et de ses liaisons
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
            throw new Error("Something went wrong while creating Post");
        }
        const newPostToSave = this.postRepository.create(newPost);
        return await this.postRepository.save(newPostToSave);
    }

    //ok - Create or UpdateAuthor
    async createOrUpdateAuthor(post: PostDTO) {
        let results = new AuthorAndMediaDTO();
        const existingAuthor = await this.authorRepository.findOneBy({ id: post.authors[0].id });

        if (existingAuthor === null) {
            const newAuthor = await this.authorService.create(post.authors[0]);
            results.author = newAuthor;
            if (newAuthor) {
                const newMedia = await this.createMedia(post.medias![0], newAuthor.id!);
                results.media = newMedia
            }
            return results;

        } else {

            const isAuthorUpdated = await this.authorRepository.update(existingAuthor.id!, post.authors[0]);
            if (isAuthorUpdated) {
                const updatedAuthor = await this.authorRepository.findOneBy({ id: existingAuthor.id });
                if (updatedAuthor) {
                    const media = await this.mediaRepository.findOneBy({ id: post.medias![0].id });
                    if (media === null) {
                        const newMedia = await this.createMedia(post.medias![0], updatedAuthor.id!);
                        results.author = updatedAuthor;
                        results.media = newMedia;
                        return results;
                    } else {
                        const isUpdatedMedia = await this.mediaRepository.update(media.id!, post.medias![0]);
                        if (isUpdatedMedia) {
                            const updatedMedia = await this.mediaRepository.findOneBy({ id: media.id });
                            results.author = updatedAuthor;
                            results.media = updatedMedia!;
                            return results;
                        }
                    }
                } else {
                    throw new Error('Something went wrong while updating author');
                }
            }
        }
    }

    //ok - create or update media
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

    // UPDATE POST
    async updatePost (id: number, post: PostDTO) {
        const oldPost = await this.getPostById(id);
        if (oldPost) {
        oldPost.title = post.title,
        oldPost.content = post.content,
        oldPost.picture = post.picture,
        oldPost.updated_at = new Date(),
        oldPost.is_draft = post.is_draft,
        oldPost.quantity_comments = post.quantity_comments,
        oldPost.quantity_likes = post.quantity_likes;
        } else {
            throw new Error("No post found to be updated");
        }

        const authorAndMedia = await this.createOrUpdateAuthor(post);
        if (authorAndMedia){
            oldPost.authors = [authorAndMedia.author!],
            oldPost.medias = [authorAndMedia?.media!]
        } else {
            throw new Error ("Something went wrong while updating author or media");
        }

       return this.postRepository.save(oldPost);
    }



    //ok - DELETE POST
    async deletePost(id: number) {
        console.log("PostService - Delete");
        // je recupere le post
        const post = await this.postRepository.findOne({
            where: { id: id },
            relations: ['medias']
        });
        if (!post) {
            throw new Error('Post not found');
        } else {
            // je supprime le post
            this.postRepository.remove(post);
            // verification pour savoir si ce media est concerné par plusieurs posts ou pas
            for (const media of post.medias!) {
                const mediaWithPosts = await this.mediaRepository.findOne({
                    where: { id: media.id },
                    relations: ['posts']
                });
                //si il n'y a aucun autre post associé au media alors on supprime le media
                if (mediaWithPosts?.posts?.length === 1) {
                    await this.mediaRepository.remove(media);
                }
            }
        }
    }
}

export default PostService;