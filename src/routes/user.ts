import {Router} from 'express'
import { getUserBYEmail } from '../controllers/users'
import { authByToken } from '../middleware/auth'

const router = Router()


//GET /user - returns current user
router.get('/',authByToken,async (req,res)=>{

  try {
    const user = await getUserBYEmail((req as any).user.email)
    if(!user) throw new Error('No such user found')
    return res.status(200).json({user})
  } catch(e) {
    return res.status(404).json({
      errors: {body: [ e.message ]}
    })
  }

  

})

//PATCH /user - updates data of current user
router.patch('/',(req,res)=>{
  
})

export const userRouter = router