export class CommentDTO {
    id!: number;
    comment!: string;
    publicated_at!: Date;
    updated_at!: Date;
    user!: number;
    post!: number;
}