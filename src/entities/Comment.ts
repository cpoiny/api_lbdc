import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id?: number

    @Column("text")
    comment?: string

    @CreateDateColumn({
        type: 'timestamp'
    })
    publicated_at?: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date

    @ManyToOne(() => User, (user) => user.comments, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user_id!: User['id']

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "post_id" })
    post_id!: Post['id']
}