import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";


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

    @Column()
    edition?: string

    @ManyToOne(()=> Author, author => author.media)
    @JoinColumn({ name: "author_id"})
    author_id!: Author['id']


}