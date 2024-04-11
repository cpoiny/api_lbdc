import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"
import { Media } from "./Media"
import { Author } from "./Author"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length:100,
    })
    title?: string
    
    @Column("text")
    content?: string
    
    @Column()
    picture?: string
    
    @CreateDateColumn({type: 'timestamp'})
    publicated_at?: Date
    
    @UpdateDateColumn({type: 'timestamp'})
    updated_at?: Date
    
    @Column()
    is_draft?: boolean
    
    @Column()
    quantity_comments?: number
    
    @Column()
    quantity_likes?: number

    @ManyToOne(()=> User, (user) => user.posts, {cascade: true})
    user?: User

    @ManyToOne(()=> Comment, (comment) => comment.post, {cascade: true})
    comments?: Comment[]

    @ManyToMany(() => Media)
    @JoinTable()
    by? : Media

    @ManyToMany(() => Author)
    @JoinTable()
    for? : Author

}