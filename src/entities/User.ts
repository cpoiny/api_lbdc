import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Media } from "./Media";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    pseudo?: string

    @Column({ unique: true })
    email?: string

    @Column()
    password?: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role?: string

    @OneToMany(() => Post, (post) => post.user_id, { nullable: true })
    posts?: Post[]

    @OneToMany(() => Comment, (comment) => comment.user_id, { nullable: true })
    comments?: Comment[]

    @ManyToMany(() => Post, { nullable: true })
    @JoinTable({
        name: "like",
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'post_id', referencedColumnName: 'id' }
    })
    like?: Post[]

    @ManyToMany(() => Media, { nullable: true })
    @JoinTable({
        name: "wishlist",
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' }
    })
    books?: Media[]

}