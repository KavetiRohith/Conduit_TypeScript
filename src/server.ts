import express from 'express'
import {createConnection} from 'typeorm'
import { userRouter } from './routes/user'
import { usersRouter } from './routes/users'
import { Article } from './entities/Article'
import { User } from './entities/User'

const app = express()

app.get('/',(req,res)=>{
  res.send("Hello World!!")
})

app.use(express.json())
app.use('/api/users',usersRouter)
app.use('/api/user',userRouter)

async function start(){
  await createConnection({
    type: 'postgres',
    username: 'conduit',
    password: 'conduit',
    database: 'conduit',
    entities: [Article,User],
    synchronize:  true,
    logging: true,
    logger: 'advanced-console',
    dropSchema: true
  })

  app.listen(3010,()=>{
    console.log("Server started on http://localhost:3010")
  })
}

start()