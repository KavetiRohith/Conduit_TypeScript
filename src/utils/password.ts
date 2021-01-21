import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export function hashPassword(password: string): Promise<string> {

  return new Promise<string>((resolve,reject)=>{

    bcrypt.hash(password,SALT_ROUNDS,(err,encrypted)=>{
      if(err) return reject(err)

      resolve(encrypted)
    })

  })

}

export function matchPassword(hash: string,password: string): Promise<boolean> {
  return new Promise<boolean>((resolve,reject)=>{

    bcrypt.compare(password,hash,(err,same)=>{
      if(err) return reject(err)

      resolve(same)
    })
  })
}

async function test() {
  const pass = 'xyz123'
  const hash = await hashPassword(pass)
  console.log(hash)
  const match1 = await matchPassword(hash,'xyz123')
  console.log(match1)

  const match2 = await matchPassword(hash,'xyz1234')
  console.log(match2)
}

