import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

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

    return response.json(user)
 } catch (err) {
   return response.status(400).json({error: err.message})
 }
})

export default usersRouter
