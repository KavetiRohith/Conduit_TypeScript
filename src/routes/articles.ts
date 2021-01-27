import { Router } from "express";
import { createArticle } from "../controllers/articles";
import { authByToken } from "../middleware/auth";


const router = Router()

// GET /api/articles List of articles
router.get('/',async (req,res) => {

})

//GET /api/articles/feed Feed articles for a given User
router.get('/feed', authByToken , async (req,res) => {

})

//GET /api/articles/:slug Get a single article
router.get('/:slug', async (req,res) => {

})

//POST /api/articles Create an Article
router.post('/',authByToken,async (req,res) => {
  
  try{
    const article = await createArticle(req.body.article,(req as any).user.email)
    return res.status(201).json(article);
  } catch(e) {
    return res.status(422).json({
      errors: {body: ['Could not create article',e.message]}
    }) 
  }
  
})

//PATCH /api/articles:slug update an article
router.patch('/:slug',async (req,res) => {

})

//DELETE /api/articles:slug
router.delete('/:slug',async (req,res) => {

})

export const articlesRouter = router