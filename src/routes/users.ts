import {Router} from 'express'
import { createUser, loginUser } from '../controllers/users'

const router = Router()


// POST /users/login - login Path
router.post('/login',async (req,res)=>{
  
  try{
    const user = await loginUser(req.body.user)

    return res.status(200).json({user})
  } catch(e) {
    console.error(e)
    return res.status(422).json({
      errors: {body: ['login failed',e.message]}
    })
  }

})

//POST /users - Signup/Register a new user Path
router.post('/',async (req,res)=>{
  try {
    const user = await createUser(req.body.user)

    return res.status(201).json({user})
  } catch(e){
    console.error(e)
    return res.status(422).json({
      errors: {body: ['Could not create user',e.message]}
    })
  }
})


export const usersRouter = router;