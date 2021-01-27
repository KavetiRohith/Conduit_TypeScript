import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password";
import { sanitizeFields } from "../utils/sanitize";

interface UserSignupData{
  username: string
  password: string,
  email: string
}

interface UserLoginData{
  email:string,
  password: string
}

interface UserUpdateData{
  username?: string,
  password?: string,
  bio?: string,
  image?: string
}

export async function createUser(data: UserSignupData) {
  // check for data validity
  if(!data.username) throw new Error("username is blank")
  if(!data.email) throw new Error("email is blank")
  if(!data.password) throw new Error("password is blank")

  const repo = getRepository(User)

  //check if user exists
  const existing = await repo.findOne(data.email)

  if(existing) throw new Error("User with this email exists")

  //create user and send response
  try{

    const user = await repo.save(new User(
      data.email,
      data.username,
      await hashPassword(data.password)  
    ))
    console.log(sanitizeFields(user))
    user.token = await sign(user)
    return user

  } catch (e) {
    throw e;
  }
}

export async function loginUser(data: UserLoginData): Promise<User> {
  if(!data.email) throw new Error('email is blank')
  if(!data.password) throw new Error('password is blank')

  const repo = getRepository(User)

  //check if mail exists
  const user = await repo.findOne(data.email)

  if(!user) throw new Error('User with given mail does not exist')

  //check if password matches
  const passMatch = await matchPassword(user.password!,data.password)

  if(passMatch===false) throw new Error('wrong password')

  user.token = await sign(user)
  return sanitizeFields(user)
}

export async function getUserBYEmail(email: string): Promise<User>{

  const repo = getRepository(User)

  const user = await repo.findOne(email)

  if(!user) throw new Error('No user exists with given email id')

  return sanitizeFields(user)
}

export async function updateUserDetails(data:UserUpdateData,email:string): Promise<User>{

  const repo = getRepository(User)

  const user = await repo.findOne(email)

  if(!user) throw new Error('No user exists with given email id')

  if(data.bio) user.bio = data.bio
  if(data.username) user.username = data.username
  if(data.password) user.password = data.password
  if(data.image) user.image = data.image

  const updatedUser = await repo.save(user)

  return sanitizeFields(updatedUser)
}