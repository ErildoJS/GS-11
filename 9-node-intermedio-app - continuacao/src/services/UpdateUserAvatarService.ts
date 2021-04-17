import { getRepository } from "typeorm"
import User from "../models/User"
import uploadConfig from '../config/upload'
import path from 'path'
import fs from 'fs'

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if(!user) {
      throw new Error('Only authenticated users can change avatar')
    }

    //se o user ja tinha um avatar eu elemino ele
    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      //checo se o file existe
      const userAvatarFileExists = fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists) {//se existir removo ele
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user


  }
}

export default UpdateUserAvatarService
