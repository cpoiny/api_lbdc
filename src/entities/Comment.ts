import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    
    @UpdateDateColumn({type: 'timestamp', nullable:true})
    updated_at?: Date

    @ManyToOne(()=> User, (user) => user.comments)
    user?: User

    @ManyToOne(()=> Post, (post) => post.comments)
    post?: Post
}