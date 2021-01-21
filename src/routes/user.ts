import {Router} from 'express'

const router = Router()


//GET /user - returns current user
router.get('',(req,res)=>{
  res.send('/GET User') // TODO: get real data
})

export const userRouter = router