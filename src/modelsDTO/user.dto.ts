import { CommentDTO } from "./comment.dto";
import { MediaDTO } from "./media.dto";
import { PostDTO } from "./post.dto";

export class UserDTO {
    id!: number;
    pseudo!: string;
    email!: string;
    password!: string;
    role!: string;
    posts!: PostDTO[];
    comments!: CommentDTO[];
    like!: number[];
    books_whislist!: MediaDTO[];
}