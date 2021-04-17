//services sao espacos isolados
//de codigo pra serem executados

/*
export default function CreateUser(name = '', email: string, password: string) {
  const user = {
    name, email, password
  }

  return user
}
*/
interface TechObject {
  title: string,
  exp: number
}

interface CreateUserData{
  name?: string,
  email: string,
  password: string,
  techs: Array<string | TechObject>
}

/**
 * array de string 
 * techs: string[]
 * 
 */


export default function CreateUser({name, email, password}: CreateUserData) {
  const user = {
    name, email, password
  }

  return user
}