import React, { useState, useEffect } from 'react';
import './styles/ManagerPhotopage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

export default function ManagerPhotopage() {
    const [projects, setProjects] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [projectID, setProjectID] = useState(null);
    const [title, setTitle] = useState('');
    const [photoProjectID, setPhotoProjectID] = useState(null);
    const [folders, setFolders] = useState([]);  // Инициализация пустым массивом

    useEffect(() => {
        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            setUserInfo(parsedAuthData);

            if (parsedAuthData) {
                axios.get(`${config.backendUrl}/api/projects`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then(response => {
                    setProjects(response.data);
                    console.log(response.data)
                })
                .catch(error => console.log(error));
            }
        }
    }, []);

    const createFolder = () => {
        console.log(`your id is ${projectID}`)
        const folder = {
            "title": title,
            "projectID": projectID
        };

        axios.post(`${config.backendUrl}/api/photo-folder`, folder, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        .then(response => console.log(response.data))
        .catch(error => alert("Ошибка"));
    };

    // Загружаем папки для выбранного проекта
    useEffect(() => {
        if (photoProjectID) {
            axios.get(`${config.backendUrl}/api/photo-folder/project/${photoProjectID}`, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            })
            .then((response) => {
                setFolders(response.data);  // Обновляем состояние папок
            })
            .catch(error => console.log(error));
        }
    }, [photoProjectID]);  // Делаем запрос только при изменении photoProjectID
    
    const onSelectID = (event) => {
        setProjectID(parseInt(event.target.value))
    }

  return (
    <div className='managerPhotopage'>
        <div className="managerPhotopage-container">
            <label>Выберите ID проекта</label>
            <select name="" id="" defaultValue={''} onChange={(e) => {onSelectID(e)}}>
                <option value={''}>Выберите проект</option>
                {projects && projects.map((project) => (
                    <option key={project.ID} value={project.ID}>{project.title} {project.ID} ID</option>
                ))}
            </select>
            <label htmlFor="">Название папки</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <button onClick={createFolder}>Создать папку</button>
        </div>

        {/* <div className="managerPhotopgae-secondContainer">
            <label htmlFor="">Выберите проект</label>
            <select name="" id="" onChange={(e) => setPhotoProjectID(e.target.value)}>
                {projects && projects.map((project) => (
                    <option key={project.ID} value={project.ID}>{project.title} {project.ID} ID</option>
                ))}
            </select>
            <label htmlFor="">Выберите папку</label>
            <select name="" id="">
                {folders && folders.length > 0 ? (
                    folders.map((folder) => (
                        <option key={folder.ID} value={folder.ID}>{folder.title} {folder.ID} ID</option>
                    ))
                ) : (
                    <option>Папки отсутствуют</option>
                )}
            </select>
        </div> */}
    </div>
  )
}
