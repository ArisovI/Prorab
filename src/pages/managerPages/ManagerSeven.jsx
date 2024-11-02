import React from 'react';
import './styles/ManagerSeven.css';
import { useState, useEffect } from 'react';
import config from '../../config';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ManagerSeven() {
    const [projects, setProjects] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [projectID, setProjectID] = useState('');
    
    const[userInfo, setUserInfo] = useState();

    useEffect(() => {
        const authData = Cookies.get('authData');

        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            setUserInfo(parsedAuthData)

            if (parsedAuthData) {
                axios.get(`${config.backendUrl}/api/projects`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then((response) => {
                    setProjects(response.data);
                    console.log(response.data);
                })
                .catch(error => console.log(error));
            }
        }
    }, []);

    // Функция для обработки сабмита
    const handleSubmit = () => {

        const data = {
            "title": title,
            "desc": desc,
            "projectID": parseInt(projectID)
        }
        // Здесь вы можете отправить данные title, desc, projectID на сервер
        axios.post(`${config.backendUrl}/api/chars/project/`, data, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        .then(response => alert(response.data))
        .catch(error => console.log(error))

    }

    return (
        <div className='managerSeven'>
            <div className="managerSeven-container">
                <label htmlFor="projectTitle">Введите название</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} // Устанавливаем новое значение в стейт title
                    id="projectTitle"
                />

                <label htmlFor="projectDesc">Введите описание</label>
                <input 
                    type="text" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} // Устанавливаем новое значение в стейт desc
                    id="projectDesc"
                />

                <label htmlFor="selectProject">Выберите проект</label>
                <select 
                    id="selectProject" 
                    value={projectID} 
                    onChange={(e) => setProjectID(e.target.value)} // Устанавливаем новое значение в стейт projectID
                >
                    <option value="">Выберите проект</option>
                    {projects && projects.map((project) => (
                        <option key={project.ID} value={project.ID}>
                            {project.title} {project.ID} ID
                        </option>
                    ))}
                </select>

                <button onClick={handleSubmit}>Добавить описание</button>
            </div>
        </div>
    );
}