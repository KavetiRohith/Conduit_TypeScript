import { Article } from "../entities/Article";
import { Comment } from "../entities/Comments";
import { User } from "../entities/User";

export function sanitizeFields(user: User) {
  if (user.password) delete user.password
  return user
}

export function sanitizeArticleFields(article: Article) {
  if (article.author.email) delete article.author.email
  if (article.author.password) delete article.author.password
  return article
}

export function sanitizeComment(comment: Comment) {
  if(comment.article) delete comment.article
  if(comment.author.password) delete comment.author.password
  if(comment.author.email) delete comment.author.email
  return comment
}