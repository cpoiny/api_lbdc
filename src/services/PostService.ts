import AppDataSource from "../data-source";
import { Author } from "../entities/Author";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";
import { PostDTO } from "../modelsDTO/post.dto";
import AuthorService from "./AuthorService";
import MediaService from "./MediaService";

class PostService {
    private postRepository = AppDataSource.getRepository(Post);
    private authorRepository = AppDataSource.getRepository(Author);
    private mediaRepository = AppDataSource.getRepository(Media);
    private authorService = new AuthorService();
    private mediaService = new MediaService();
    async getAll() {
        console.log("PostService - get all");
        return this.postRepository.find();
    }


    // Creation d'un post et de ses liaisons
    async create(post: PostDTO) {
        console.log("PostService - create");

        //  Créer un nouveau post de type POST (en entrée on recupére une requete contenant un PostDTO, c'est a dire le  formumlaire du front qui contient toutes les données pour créer un auteur, un média et un post)

        // 1 je crée la structure de mon post
        const newPost = new Post();
        newPost.title = post.title;
        newPost.content = post.content;
        newPost.picture = post.picture;
        newPost.publicated_at = post.publicated_at ? post.publicated_at : new Date();
        newPost.user_id = 1;
        newPost.is_draft = post.is_draft;
        newPost.quantity_comments = post.quantity_comments;
        newPost.quantity_likes = post.quantity_likes;

        // 2 - verifier si l'auteur existe  déjà dans la base de données
        const author = await this.authorRepository.findOneBy({ name: post.author.name });

        // 3 - l'auteur n'existe pas, je le crée et je le lie au post
        if (author === null) {
            const newAuthor = await this.authorService.create(post.author);

            // 4- je crée un média (car un média existe uniquement si un auteur et un post existent)
            const newMedia = new Media();
            // je recupère les données du post recu en entrée
            newMedia.title = post.media?.title;
            newMedia.category = post.media?.category;
            newMedia.theme = post.media?.theme;
            newMedia.edition = post.media?.edition;
            // je recupère l'auteur id de l'auteur que je viens de créer
            newMedia.author_id = newAuthor.id!;

            //5 - je créé le média dans la base de données
            const newMediaToSave = await this.mediaService.create(newMedia);

            // 6- je lie l'auteur et le média au post
            newPost.authors = [newAuthor];
            newPost.medias = [newMediaToSave];

            // 7 - l'auteur existe déja
        } else {

            // je le mets à jour (car j'ai toutes ces infos dans le post recu en entrée)
            const isAuthorUpdated = await this.authorRepository.update(author.id!, post.author);

            // si l'auteur a été mis à jour, je le recupere pour le lier au post
            if (isAuthorUpdated) {
                const updatedAuthor = await this.authorRepository.findOneBy({ id: author.id });
                // je recupére le média de l'auteur
                const media = await this.mediaRepository.findOneBy({ title: post.media?.title });

                if(media === null) {

                    const newMedia = new Media();
                    newMedia.title = post.media?.title;
                    newMedia.category = post.media?.category;
                    newMedia.theme = post.media?.theme;
                    newMedia.author_id = updatedAuthor!.id!;
                    const newMediaToSave = await this.mediaService.create(newMedia);
        
                    
                    newPost.authors = [updatedAuthor!];
                    newPost.medias = [newMediaToSave];
                } else {
                    // liaison de l'auteur au post
                    newPost.authors = [updatedAuthor!];
                    // liaison du média au post
                    newPost.medias = [media];
                }

                }
        }
        // 8 - je crée le post dans la base de données
        const newPostToSave = this.postRepository.create(newPost);
        return await this.postRepository.save(newPostToSave);
    }

}

export default PostService;