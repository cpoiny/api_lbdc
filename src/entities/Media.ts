import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Post } from "./Post";


@Entity()
export class Media {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    category?: string

    @Column()
    theme?: string

    @Column({nullable: true})
    edition?: string

    @ManyToOne(()=> Author, author => author.media)
    @JoinColumn({ name: "author_id"})
    author_id!: Author['id']

    @ManyToMany(() => Post, post => post.medias)
    posts?: Post[];
}