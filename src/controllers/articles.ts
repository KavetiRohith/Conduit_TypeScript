import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeArticleFields, sanitizeFields } from "../utils/sanitize";
import { slugify } from "../utils/stringUtils";

interface ArticleData{
  title: string,
  description: string,
  body: string,
  tagList: string[]
}

interface ArticleUpdateData{
  title?: string,
  description?: string,
  body?: string
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
      user
    ))

    return sanitizeArticleFields(article)

  } catch(e) {
    throw e
  }
  
}

export async function updateArticle( slug: string, data: ArticleUpdateData,user: User): Promise<Article>{
  const repo = getRepository(Article)
  
  const article = await repo.findOne(slug,{relations:['author']})

  if(!article) throw new Error('Article not found')

  try {
    if(article.author.email!=user.email) throw new Error('Only the author can edit the article')

    if(data.title){
      await repo.remove(article) //TODO optimize this necessary only when title is updated
      article.title = data.title
      article.slug = slugify(data.title)
    }
    if(data.body) article.body = data.body
    if(data.description) article.description = data.description
     
    
    const updatedArticle = await repo.save(article)

    return sanitizeArticleFields(updatedArticle)
  } catch(e){
    console.log(e);
    throw e
  }
}

export async function deleteArticle(slug: string,email:string):Promise<Article>{
  const repo = getRepository(Article)

  const article = await repo.findOne(slug,{relations:['author']})

  if(!article) throw new Error('Article not found')

  try{
    if(article.author.email!=email) throw new Error('Only the author can edit the article')

    const deletedArticle = await repo.remove(article)
  
    return sanitizeArticleFields(deletedArticle)
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllArticles(): Promise<Article[]>{
  const repo = getRepository(Article)

  const articles = await repo.find({relations:['author']})

  if(!articles) throw new Error('Articles not found')

  articles.forEach(article=>{
    sanitizeArticleFields(article)
  })

  return articles
}

// export async function getFeedArticles(email:string): Promise<Article[]>{
//   return [new Article()]
// }

export async function getArticleBySlug(slug:string): Promise<Article>{
  const repo = getRepository(Article)

  const article = await repo.findOne(slug,{relations:['author']})

  if(!article) throw new Error('Articles not found')

  return sanitizeArticleFields(article)
}