import jwt from 'jsonwebtoken'
import { User } from '../entities/User';

//TODO: move to config file
const JWT_SECRET = "secret-no-one-can-guess";

export async function sign(user: User):Promise<string> {
  return new Promise((resolve,reject)=>{
    jwt.sign({
      username: user.username,
      email: user.email
    }, JWT_SECRET,(err: any,encoded: string|undefined)=>{
      if(err) return reject(err)
      else{
        resolve(encoded as string)
      } 
    })
  })
}

export async function decode(token: string): Promise<any> {
  return new Promise((resolve,reject)=>{

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{

      if(err) return reject(err)
      else return resolve(decoded)

    })


  })
}

// for testing
async function run() {
  const token = await sign({email: 'a@cb.lk', username: 'avi'})
  console.log(token)

  const decoded = await decode(token)
  console.log(decoded)
}

