import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { Comment } from "../entities/Comments";
import { User } from "../entities/User";
import { sanitizeComment } from "../utils/sanitize";

interface commentData{
  body: string
}

export async function createComment(data: commentData,slug: string,email: string): Promise<Comment>{
  if(!data) throw new Error('No body found')

  const ArticleRepo = getRepository(Article)
  const UserRepo = getRepository(User)
  const article = await ArticleRepo.findOne(slug)
  const user = await UserRepo.findOne(email)
  if(!article) throw new Error('No article found')
  if(!user) throw new Error('No user found')

  try{
    const CommentRepo = getRepository(Comment)
    const comment = await CommentRepo.save(new Comment(
      data.body,
      user,
      article
    ))
    return sanitizeComment(comment)
  } catch(e){
    throw e;
  }
}

export async function getComments(slug: string): Promise<Comment[]> {
  const CommentRepo = getRepository(Comment)
  try {
    const comments = await CommentRepo.find({      
      where: {
        article: {
          slug: slug
        } 
      },
      relations: ['author']    
    })
    comments.forEach(comment => {
      sanitizeComment(comment)
    })
    return comments
  } catch(e) {
    throw e;
  }
}

export async function deleteComment(slug:string,id:string ,email: string): Promise<Comment> {
  const CommentRepo = getRepository(Comment)
  const comment = await CommentRepo.findOne({
    where: {
      id: parseInt(id),
      article: {
        slug: slug
      }
    },
    relations: ['author']
  })

  if(!comment) throw new Error('Comment not found')
  if(comment.author.email!=email) throw new Error('Only author can delete comment')
  
  try{
    const deletedComment = await CommentRepo.remove(comment)
    return sanitizeComment(deletedComment)
  } catch(e) {
    throw e;
  }
}