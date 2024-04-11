import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column("text")
    description?: string

    @Column()
    picture?: string

    @ManyToMany(() => Post)
    @JoinTable()
    posts? : Post[]

}