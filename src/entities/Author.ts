import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Media } from "./Media";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column("text")
    description?: string

    @Column({nullable:true})
    picture?: string

    @ManyToMany(() => Post, post => post.authors)
    posts?: Post[];

    @OneToMany(() => Media, media => media.author_id)
    media?: Media[];

}