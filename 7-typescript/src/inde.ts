import express from 'express'
import CreateUser from './service/CreateUser'
const app = express()
app.get('/', (request, response) => {
  const user = CreateUser({
    email: 'erildo@gmail.com',
    password: '123457',
    techs: ['nodejs', 'reactjs', 'rn', 
  {title: 'js', exp: 100}]
  })

  return response.json({message: 'hello world'})
})
app.listen(3333)