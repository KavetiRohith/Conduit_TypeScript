import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeFields } from "../utils/sanitize";
import { slugify } from "../utils/stringUtils";

interface ArticleData{
  title: string,
  description: string,
  body: string,
  tagList: string[]
}

export async function createArticle(data:ArticleData,email: string): Promise<Article>{

  // data Validation
  if(!data.title) throw new Error('Article title absent')
  if(!data.description) throw new Error('Article description absent');
  if(!data.body) throw new Error('Article body is Absent')

  const ArticleRepo = getRepository(Article)
  const UserRepo = getRepository(User)
  

  try{
    const user = await UserRepo.findOne(email)
    if(!user) throw new Error('User does not exist')

    const article = await ArticleRepo.save(new Article(
      slugify(data.title),
      data.title,
      data.description,
      data.body,
      sanitizeFields(user)
    ))

    return article

  } catch(e) {
    throw e
  }
  
}

// export async function updateArticle( slug: string, data:Partial<ArticleData>): Promise<Article>{
//   return new Article()  
// }

// export async function deleteArticle(slug: string):Promise<boolean>{
//   return true
// }

// export async function getAllArticle(): Promise<Article[]>{
//   return [new Article()]
// }

// export async function getFeedArticles(email:string): Promise<Article[]>{
//   return [new Article()]
// }

// export async function getArticleBySlug(slug:string): Promise<Article>{
//   return new Article() 
// }