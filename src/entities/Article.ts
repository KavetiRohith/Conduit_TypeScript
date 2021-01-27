import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity('articles')
export class Article{
  /*
    {
      "article": {
        
        "tagList": ["dragons", "training"], //Relationship with tags
        
        "favorited": false, // TODO:Relationship with user
        "favoritesCount": 0,
        "author": {
          "username": "jake",
          "bio": "I work at statefarm",
          "image": "https://i.stack.imgur.com/xHWG8.jpg",
          "following": false
        }
      }
    }
  */

  @PrimaryColumn({length: 30})
  slug: string

  @Column({length: 40})
  title: string

  @Column({length: 100, nullable: true})
  description?: string

  @Column({type: 'text'})
  body: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(()=>User)
  @JoinColumn()
  author: User

  constructor(slug: string,title: string,description: string,body: string,author: User){
    this.slug = slug,
    this.title = title,
    this.description = description,
    this.body = body
    this.author = author
  }
}