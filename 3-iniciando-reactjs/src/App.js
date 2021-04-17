import React, {useEffect, useState} from 'react'
import Header from './components/Header'
import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  //executa uma funcao assim que o component é renderizado em tela
  /**
   * 1 parametro - a funcao a ser executada
   * 2 - dependencias ou seja ......
   */
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])
  async function handleAddProject() {
    //setProjects([...projects, `novo projecto ${Date.now()}`])

    const respone = await api.post('projects', {
      title: `novo projecto ${Date.now()}`,
      owner: "erildojs"
    })

    const project = response.data

    setProjects([...projects, project])
  }
  return (
    <>
    <Header />
    
    <ul>
      <li>{projects.map(project => <li key={project.id}>{project.title}</li>)}</li>
      </ul>

      <button type="button" onClick={handleAddProject}></button>
    </>
  )
}