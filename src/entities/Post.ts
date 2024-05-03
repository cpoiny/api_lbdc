import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"
import { Media } from "./Media"
import { Author } from "./Author"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({length:100})
    title?: string
    
    @Column("text")
    content?: string
    
    @Column({length:100})
    picture?: string
    
    @CreateDateColumn({type: 'timestamp'})
    publicated_at?: Date
    
    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updated_at?: Date
    
    @Column()
    is_draft?: boolean
    
    @Column({nullable: true})
    quantity_comments?: number
    
    @Column({nullable:true})
    quantity_likes?: number

    @ManyToOne(()=> User, (user) => user.posts,
    {nullable: false})
    @JoinColumn({ name: "user_id"})
    user_id!: User['id']

    @OneToMany(()=> Comment, 
        (comment) => comment.post, {nullable:true}
    )
    comments?: Comment[]

    // Si le media est delete, update alors le post aussi
    @ManyToMany(() => Media, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinTable({name : "post_media"})
    media? : Media

    @ManyToMany(() => Author)
    @JoinTable({name : "post_author"})
    author? : Author

}