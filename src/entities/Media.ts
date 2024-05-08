import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne(()=> Author)
    @JoinColumn({ name: "author_id"})
    author_id!: Author['id']


}