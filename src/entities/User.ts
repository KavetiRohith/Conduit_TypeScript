import {Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class User{
  @PrimaryColumn()
  email: string

  @Column({unique: true,nullable: false})
  username: string

  @Column({type: 'text',nullable: false})
  bio: string

  @Column({nullable:true})
  image: string
}