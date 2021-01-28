import { Article } from "../entities/Article";
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