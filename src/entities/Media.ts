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
    @JoinColumn()
    author?: Author


}