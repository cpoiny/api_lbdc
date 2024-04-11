import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Media } from "./Media";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}



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

    @Column({nullable: true})
    token?: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role?: number

    @OneToMany(() => Post, (post) => post.user, {nullable: true})
    posts?: Post[]
    
    @OneToMany(() => Comment, (comment) => comment.user, {nullable:true})
    comments?: Comment[]
    
    @ManyToMany(() => Post, {nullable: true})
    @JoinTable({name: "Like"})
    count? : Post[]

    @ManyToMany(() => Media, {nullable:true})
    @JoinTable({name: "Wishlist"})
    books? : Media[]

}