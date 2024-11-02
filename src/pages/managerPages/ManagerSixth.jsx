import React from 'react'
import './styles/ManagerSixth.css'
import config from '../../config'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function ManagerSixth() {
    const [projects, setProjects] = useState(null);
    const [userInfo, setUserInfo] = useState(null)
    
    const [projectID, setProjectID] = useState(null);
    const [paidMaterials, setPaidMaterials] = useState('');
    const [necessaryMaterials, setNecessaryMaterials] = useState('');
    const [deadline, setDeadline] = useState('');
    const [completionDays, setCompletionDays] = useState('');

    useEffect(() => {
        const authData = Cookies.get('authData')
        if (authData) {
            const parsedAuthData = JSON.parse(authData)
            setUserInfo(parsedAuthData)

            axios.get(`${config.backendUrl}/api/projects`, {
                headers: {
                    'Authorization': `Bearer ${parsedAuthData.token}`
                }
            })
            .then(response => setProjects(response.data))
            .catch(error => console.log(error))
        }
    }, [])

    // Обработчики изменений для каждого инпута
    const handleProjectChange = (e) => setProjectID(e.target.value);
    const handlePaidMaterialsChange = (e) => setPaidMaterials(e.target.value);
    const handleNecessaryMaterialsChange = (e) => setNecessaryMaterials(e.target.value);
    const handleDeadlineChange = (e) => setDeadline(e.target.value);
    const handleCompletionDaysChange = (e) => setCompletionDays(e.target.value);

    // Обработчик отправки формы
    const handleSubmit = () => {
        // Создаем объект с данными
        const details = {
            project_id: parseInt(projectID),
            paid_materials: parseInt(paidMaterials),
            necessary_materials: parseInt(necessaryMaterials),
            deadline_days: parseInt(deadline),
            completion_days: parseInt(completionDays)
        };

        // Отправляем POST-запрос
        axios.post(`${config.backendUrl}/api/details`, details, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        .then(response => {
            // Обрабатываем успешный ответ
            alert('Данные успешно отправлены')
        })
        .catch(error => {
            // Обрабатываем ошибку
            alert("Error", error)
            console.error('Ошибка при отправке данных:', error);
        });
    }

    return (
        <div className='managerSixth'>
            <div className="sixthContainer">
                <select name="projects" id="" onChange={handleProjectChange}>
                    {projects && projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.title}, {project.ID} ID</option>
                    ))}
                </select>

                <label>Сумма оплаченных материалов</label>
                <input 
                    type="text" 
                    value={paidMaterials} 
                    onChange={handlePaidMaterialsChange} 
                />

                <label>сумма всех необходимых материалов</label>
                <input 
                    type="text" 
                    value={necessaryMaterials} 
                    onChange={handleNecessaryMaterialsChange} 
                />

                <label>Дедлайн</label>
                <input 
                    type="text" 
                    value={deadline} 
                    onChange={handleDeadlineChange} 
                />

                <label>Закончено дней</label>
                <input 
                    type="text" 
                    value={completionDays} 
                    onChange={handleCompletionDaysChange} 
                />

                <button id='manager-btn' onClick={handleSubmit}>Добавить</button>
            </div>
        </div>
    )
}
