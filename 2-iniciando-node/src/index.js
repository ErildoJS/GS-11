const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

//metodos http:
/**
 * get - buscar info ou infos do backend
 * post - criar uma info no backend
 * put - alterar uma info no backend
 * patch - actualiza uma info especifica
 * delete - deletar uma info no backend
 * 
 */

const app = express()
app.use(cors())
app.use(express.json())

//middlewares - é um interceptador de rotas, pode interromper ou 
//alterar os dados da requisiçao

function validateProjectId(request, response, next ) {
  const {id} = request.params

  if(!isUuid(id)) {
    return response.status(400).json({error: 'invalid project id'})
  }

  return next()
}

app.use('/projects/:id', validateProjectId)//executar apenas nas rotas com esse formato

const projects = []

app.get('/projects', (request, response) => {
  //fazendo filtros
  const {title} = request.query

  //se o title foi preenchido pelo user
  //eu vou pegar os projets e vou filtrar 
  //e pra cada um dos projects eu vou verificar
  //se no titulo do project inclui a palavra que esta dentro do title
  const results = title ?
   projects.filter(project => project.title.includes(title)): projects

  return response.json(results)
})


app.post('/projects', (request, response) => {
  const {title, owner} = request.body

  const project = {id: uuid(), title, owner}

  //add a var poject no fim do array projects
  projects.push(project)

  //nao exibo a lista completa e sim o projecto recem criado
  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  //id do projecto que eu quero actualizar
  const {id} = request.params
  const {title, owner} = request.body


  //buscar pelo project mo array com o id igual ao id passado na rota

  //findIndex - buscando a posicao do project no array
  const projectIndex = projects.findIndex(project => project.id == id)

  //se nao encontrar o indice
  if(projectIndex < 0) {
    response.status(400).json({error: 'project not found'})
  }

  //substituindo pelo novos valores
  const project = {
    id, title, owner
  }

  //vou no array pego o indice e subdtituo pelos novos valores
  projects[projectIndex] = project

  return response.json(project)//nao exibo a lista completa e sim o projecto recem criado
})

app.delete('/projects/:id', (request, response) => {
  const {id} = request.params


  //buscar pelo project com o id igual ao id passado na rota

  //findIndex - buscando a posicao do project no array
  const projectIndex = projects.findIndex(project => project.id == id)

  //verifico se o index existe
  if(projectIndex < 0) {
    response.status(400).json({error: 'project not found'})
  }

  projects.splice(projectIndex, 1)


  return response.status(204).send()//retorna-se o send
})


app.listen(3333, () => console.log('✔ server started'))