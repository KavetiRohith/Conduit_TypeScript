import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleBySlug, updateArticle } from "../controllers/articles";
import { authByToken } from "../middleware/auth";


const router = Router()

// GET /api/articles List of articles
router.get('/',async (req,res) => {
  try{
    const articles = await getAllArticles()
    return res.status(200).json({articles})
  } catch(e){
    return res.status(400).json({
    errors: {body: ['Could not create article',e.message]}
    })
  }
})

//GET /api/articles/feed Feed articles for a given User
router.get('/feed', authByToken , async (req,res) => {

})

//GET /api/articles/:slug Get a single article
router.get('/:slug', async (req,res) => {
  try{
    const article = await getArticleBySlug(req.params.slug)
    return res.status(200).json({article});
  } catch(e){
    return res.status(400).json({
      errors: {body: ['Could not get article',e.message]}
    }) 
  }
})

//POST /api/articles Create an Article
router.post('/',authByToken,async (req,res) => {
  
  try{
    const article = await createArticle(req.body.article,(req as any).user.email)
    return res.status(201).json({ article});
  } catch(e) {
    return res.status(422).json({
      errors: {body: ['Could not create article',e.message]}
    }) 
  }
  
})

//PATCH /api/articles:slug update an article
router.patch('/:slug',authByToken,async (req,res) => {
  try{
    const article = await updateArticle(req.params.slug,req.body.article,(req as any).user)
    return res.status(200).json({article})
  } catch(e){
    return res.status(400).json({
      errors: {body: ['Could not update article',e.message]}
    })
  }
})

//DELETE /api/articles:slug
router.delete('/:slug',authByToken,async (req,res) => {
  try{
    console.log(req.params.slug)
    const article = await deleteArticle(req.params.slug,(req as any).user.email)
    return res.status(200).json({article})
  } catch(e){
    return res.status(400).json({
      errors: {body: ['Could not delete article',e.message]}
    })
  }
})

export const articlesRouter = router