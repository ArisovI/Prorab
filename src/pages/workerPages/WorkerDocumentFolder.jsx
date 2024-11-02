import React from 'react'
import './styles/WorkerDocumentFolder.css'
import config from '../../config'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function WorkerDocumentFolder() {
    const [userInfo, setUserInfo] = useState(null)
    const [projects, setProjects] = useState(null)
    const [title, setTitle] = useState('')
    const [projectID, setProjectID] = useState(null)

    useEffect(() => {
        const authData = Cookies.get('authData');
        if(authData) {
            const parsedAuthData = JSON.parse(authData)
            setUserInfo(parsedAuthData)

            if(parsedAuthData) {
                axios.get(`${config.backendUrl}/api/projects`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then(response => setProjects(response.data))
                .catch(error => console.log(error))
            }
        }
    }, [])

    const handleChange = (e) => {
        setProjectID(e.target.value)
    }

    const createDocumentFolder = () => {
        const data = {
            'title': title,
            'projectID': parseInt(projectID)
        }

        console.log(data)

        axios.post(`${config.backendUrl}/api/document-folders`, data, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        .then(response => alert('Фолдер успешно создан'))
        .catch((error) => {
            alert('Ошибка')
            console.log(error)
        })
    }

  return (
    <div className='workerDocumentFolder'>
        <div className="workerDocumentFolder-container">
            <label htmlFor="">Выберите ID проекта</label>
            <select name="" id="" onChange={handleChange} defaultValue={''}>
                <option value=''>Выбрите проект</option>

                {projects && projects.map((project) => (
                    <option key={project.ID} value={project.ID}>{project.title} {project.ID} ID</option>
                ))}
            </select>

            <label htmlFor="">Название папки</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)}/>

            <button onClick={createDocumentFolder}>Добавить папку</button>
        </div>
    </div>
  )
}
