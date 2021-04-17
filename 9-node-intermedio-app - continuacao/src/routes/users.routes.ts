import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multerConfig from '../config/upload'
import multer from 'multer'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(multerConfig)

usersRouter.post('/',async (request, response) => {
 try {
  /**
   * service - usado para quando as nossas rotas tem regras de negocio
   * eu poderia simplesmente criar o usser aqui, mas preciso do service
   * pk esse user , antes tenho que verificar se ele nao esta duplicado
   * e se a senha esta sendo salva da forma criptografica
   *
   */
    const {name, email, password} = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name, email, password
    })

    //é legal nao retornar a hash da pswd
    //delete user.password

    return response.json(user)
 } catch (err) {
   return response.status(400).json({error: err.message})
 }
})

  //coloco o ensure nessa rota pk so user autenticado pode alterar o avatar
usersRouter.patch('/avatar' ,ensureAuthenticated, upload.single('avatar'),async (request, response) => {
  try {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    //delete user.password

   return response.status(400).json(user)

  }catch(err) {
   return response.status(400).json({error: err.message})

  }
  return response.json({ok: true});
})

export default usersRouter
