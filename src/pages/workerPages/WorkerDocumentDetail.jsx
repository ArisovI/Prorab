import React from 'react'
import './styles/WorkerDocumentDetail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import config from '../../config'
import Cookies from 'js-cookie'

export default function WorkerDocumentDetail() {
    const [projects, setProjects] = useState(null)
    const [projectID, setProjectID] = useState(null)
    const [documentFolders, setDocumentFolders] = useState([])
    const [folderID, setFolderID] = useState(null)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData)
            setUserInfo(parsedAuthData)
            console.log(parsedAuthData)
            axios.get(`${config.backendUrl}/api/projects`, {
                headers: { 'Authorization': `Bearer ${parsedAuthData.token}` }
            })
            .then(response => setProjects(response.data))
            .catch(error => console.log(error))
        }
    }, [])

    const handleProjectChange = (e) => {
        const changedID = e.target.value;
        setProjectID(changedID);
        axios.get(`${config.backendUrl}/api/document-folders/project/${changedID}`, {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        })
        .then(response => setDocumentFolders(response.data))
        .catch(error => console.log(error));
    }

    const handleFolderChange = (e) => setFolderID(e.target.value)
    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleFileChange = (e) => setFile(e.target.files[0])

    const handleSubmit = () => {
        if (!file || !title || !projectID || !folderID) {
            alert("Пожалуйста, заполните все поля и выберите файл.")
            return
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', title)
        formData.append('projectID', Number(projectID))
        formData.append('folderID', Number(folderID))

        axios.post(`${config.backendUrl}/api/docs`, formData, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => alert("Файл успешно добавлен"))
        .catch(error => console.error("Ошибка при добавлении файла", error))
    }

    return (
        <div className='workerDocumentDetail'>
            <div className="workerDocumentDetail-container">
                <h1>Добавить документ</h1>
                <div className="workerDocumentDetail-form">
                    <label className="workerDocumentDetail-label">Выберите Проект</label>
                    <select className="workerDocumentDetail-select" onChange={handleProjectChange}>
                        <option value={''}>Проекты</option>
                        {projects && projects.map(project => (
                            <option key={project.ID} value={project.ID}>{project.title} {project.ID} ID</option>
                        ))}
                    </select>

                    {documentFolders.length > 0 && (
                        <>
                            <label className="workerDocumentDetail-label">Выберите папку документа</label>
                            <select className="workerDocumentDetail-select" onChange={handleFolderChange}>
                                <option value={''}>Папки</option>
                                {documentFolders.map(folder => (
                                    <option key={folder.ID} value={folder.ID}>{folder.title} {folder.ID} ID</option>
                                ))}
                            </select>
                        </>
                    )}

                    <label className="workerDocumentDetail-label">Название файла</label>
                    <input type="text" className="workerDocumentDetail-input" value={title} onChange={handleTitleChange} />

                    <label className="workerDocumentDetail-label">Выберите файл</label>
                    <input type="file" className="workerDocumentDetail-fileInput" onChange={handleFileChange} />

                    <button className="workerDocumentDetail-button" onClick={handleSubmit}>Добавить Файл</button>
                </div>
            </div>
        </div>
    )
}
