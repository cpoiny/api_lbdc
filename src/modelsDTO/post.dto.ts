import { CommentDTO } from "./comment.dto";
import { AuthorDTO } from "./author.dto";
import { MediaDTO } from "./media.dto";


export class PostDTO {
    id!: number;
    title!: string;
    content!: string;
    picture!: string;
    updated_at!: Date;
    publicated_at!: Date;
    is_draft!: boolean;
    quantity_comments!: number;
    quantity_likes!: number;
    comments!: CommentDTO[];
    media!: MediaDTO[];
    author!: AuthorDTO[];
    user_id!: number;

}