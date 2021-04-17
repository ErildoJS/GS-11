import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  //validando o token jwt

  //1  - pegar o token
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new Error('JWT token is missing')
  }

  //2 - dividir a palavra bearer do token em si
  const [, token] = authHeader.split(' ')


  //como o verify retorna um erro proprio dele vamos criar um erro generico de
  try {
    //3 - verificando se o token é valido ou nao
    const decoded = verify(token, authConfig.jwt.secret)

    const {sub} = decoded as TokenPayLoad//hack pra forcar uma typagem numa variavel

    //agora vamos incluir as info do user logado vamos
    //pra as proximas rotas

    //nesse caso vamos incluir o id do user na requisicao

    request.user = {
      id: sub
    }

    //se deu tudo certo entao
    return next()

  }catch(err) {
    throw new Error('invalid JWT token')
  }

}
