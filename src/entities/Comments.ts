import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";


@Entity('comments')
export class Comment{

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  body: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(()=>User)
  @JoinColumn()
  author!: User

  @ManyToOne(() => Article)
  @JoinColumn()
  article?: Article
  
  constructor(body: string,author: User,article: Article){
    this.body = body,
    this.author = author,
    this.article = article
  }
}