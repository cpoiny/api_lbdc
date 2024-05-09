import { CommentDTO } from "./comment.dto";
import { AuthorDTO } from "./author.dto";
import { MediaDTO } from "./media.dto";


export class PostDTO {
    id!: number;
    title!: string;
    content!: string;
    picture!: string;
    publicated_at!: Date;
    updated_at!: Date;
    is_draft!: boolean;
    user_id!: number;
    author!: AuthorDTO;
    media?: MediaDTO;
    comments?: CommentDTO[];
    quantity_comments?: number;
    quantity_likes?: number;
}