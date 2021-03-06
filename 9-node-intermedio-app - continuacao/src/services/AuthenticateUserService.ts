import { getRepository } from "typeorm";
import User from "../models/User";
import {compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

interface Request {
  email: string;
  password: string;

}

interface Response {
  user: User;
  token: string
}
class AuthenticateUserService {
  public async execute({email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: {email}
    })

    if(!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    const token = await jwt.sign({}, authConfig.jwt.secret, {
      subject: user.id,//id do user que gerou esse token
      expiresIn: authConfig.jwt.expiresIn
    })
    return {
      user,
      token
    }

  }
}


export default AuthenticateUserService
