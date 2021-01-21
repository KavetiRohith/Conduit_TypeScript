import {Router} from 'express'
import { createUser } from '../controllers/users'

const router = Router()


// POST /users/login - login Path
router.post('/login',async (req,res)=>{
  

})

//POST /users - Signup/Register a new user Path
router.post('/',async (req,res)=>{
  try {
    const user = await createUser(req.body.user)

    return res.send(user)
  } catch(e){
    console.error(e)
    return res.status(422).json({
      errors: {body: ['Could not create user',e.message]}
    })
  }
})


export const usersRouter = router;