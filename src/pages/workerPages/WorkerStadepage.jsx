import React, { useEffect, useState } from 'react';
import './styles/WorkerStadepage.css';
import config from '../../config';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function WorkerStadepage() {
  const [projects, setProjects] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [stades, setStades] = useState(null);
  const [editStade, setEditStade] = useState({});

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
        .then(response => setProjects(response.data))
        .catch(error => console.log(error));
      }
    }
  }, []);

  const handleChangeProject = (e) => {
    const projectID = e.target.value;

    if (userInfo) {
      axios.get(`${config.backendUrl}/api/states/${projectID}`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      })
      .then(response => setStades(response.data))
      .catch(error => console.log(error));
    }
  };

  const handleEditChange = (e, stadeID, field) => {
    const newValue = e.target.value;
    setEditStade((prevEditStade) => ({
      ...prevEditStade,
      [stadeID]: {
        ...prevEditStade[stadeID],
        [field]: newValue === '' ? '' : newValue // Проверяем пустое значение
      }
    }));
  };

  const handleSave = (stade) => {
    const data = {
      project_id: stade.project_id, // Добавьте ID проекта
      job: stade.job, // Добавьте название работы
      position: parseInt(stade.position), // Добавьте позицию
      necessary_money: parseInt(editStade[stade.ID]?.necessary_money ?? stade.necessary_money),
      paid_money: parseInt(editStade[stade.ID]?.paid_money ?? stade.paid_money),
      deadline: editStade[stade.ID]?.deadline ?? stade.deadline,
      done_part: parseInt(editStade[stade.ID]?.done_part ?? stade.done_part),
      status: editStade[stade.ID]?.status ?? stade.status
    };

    console.log(data)

    axios.patch(`${config.backendUrl}/api/states/${stade.ID}`, data, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      alert("Стадия обновлена");
      // Обновите состояние, если необходимо
    })
    .catch(error => {
      console.log("Ошибка при обновлении стадии:", error);
    });
  };

  const renderStades = () => {
    if (!stades || stades.length === 0) {
      return <p>Стадии не найдены</p>;
    }

    return stades.map((stade) => (
      <div key={stade.ID} className="stade-card">
        <h3>Стадия: {stade.job}</h3>
        <p><strong>ID стадии:</strong> {stade.ID}</p>

        {/* Поле для редактирования "Необходимая сумма" */}
        <label>Необходимая сумма:</label>
        <input
          type="number"
          value={editStade[stade.ID]?.necessary_money ?? stade.necessary_money ?? ''}
          onChange={(e) => handleEditChange(e, stade.ID, 'necessary_money')}
        />

        {/* Поле для редактирования "Оплаченная сумма" */}
        <label>Оплаченная сумма:</label>
        <input
          type="number"
          value={editStade[stade.ID]?.paid_money ?? stade.paid_money ?? ''}
          onChange={(e) => handleEditChange(e, stade.ID, 'paid_money')}
        />

        {/* Поле для редактирования "Прогресс выполнения" */}
        <label>Прогресс выполнения (%):</label>
        <input
          type="number"
          value={editStade[stade.ID]?.done_part ?? stade.done_part ?? ''}
          onChange={(e) => handleEditChange(e, stade.ID, 'done_part')}
        />

        {/* Поле для редактирования "Дедлайн" */}
        <label>Дедлайн (дни):</label>
        <input
          type="number"
          value={editStade[stade.ID]?.deadline ?? stade.deadline ?? ''}
          onChange={(e) => handleEditChange(e, stade.ID, 'deadline')}
        />

        {/* Поле для редактирования "Статус" */}
        <label>Статус:</label>
        <input
          type="text"
          value={editStade[stade.ID]?.status ?? stade.status ?? ''}
          onChange={(e) => handleEditChange(e, stade.ID, 'status')}
        />

        {/* Кнопка для сохранения изменений */}
        <button onClick={() => handleSave(stade)}>Сохранить изменения</button>
      </div>
    ));
  };

  return (
    <div className='workerStade'>
      <div className="workerStade-first-container">
        <label htmlFor="">Получить Данные проекта</label>
        <select defaultValue={''} onChange={handleChangeProject}>
          <option>Выберите проект</option>
          {projects && projects.map((project) => (
            <option key={project.ID} value={project.ID}>{project.title} {project.ID} ID</option>
          ))}
        </select>

        {stades && stades.length > 0 && (
          <div className="stades-container">
            {renderStades()}
          </div>
        )}
      </div>
    </div>
  );
}
