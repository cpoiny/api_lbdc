import { Author } from "../entities/Author";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";

export class PostApiResponseDTO {
    posts!: Post[];
    authors!: Author[];
    medias! : Media[];
};