import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

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

}