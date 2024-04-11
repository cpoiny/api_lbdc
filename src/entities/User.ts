import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    pseudo?: string

    @Column()
    email?: string

    @Column()
    password?: string

    @Column()
    token?: string

    @Column()
    role?: number

    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[]
    
    @OneToMany(() => Comment, (comment) => comment.user)
    comments?: Comment[]
    
    @ManyToMany(() => Post)
    @JoinTable()
    likes? : Post[]

}