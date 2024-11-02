import React, { useState, useEffect } from 'react';
import './styles/ManagerFourth.css';
import config from '../../config';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ManagerThird() {
  const [userInfo, setUserInfo] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  
  // Состояния для выбранных значений
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [selectedProjectID, setSelectedProjectID] = useState(null);
  const [selectedRoleID, setSelectedRoleID] = useState(1); // По умолчанию "Работник"

  useEffect(() => {
    const authData = Cookies.get('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUserInfo(parsedAuthData);
      axios.get(`${config.backendUrl}/users`, {
        headers: {
          'Authorization': `Bearer ${parsedAuthData.token}`
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get(`${config.backendUrl}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${parsedAuthData.token}`
        }
      })
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => console.log(error));
    }
  }, []);

  // Обработчик изменения для поля загрузки файла
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Убираем префикс data:image/jpeg;base64, или data:image/png;base64, 
        const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
        console.log('Base64 строка (без префикса):', base64Data); // Для отладки
        setImage(base64Data); // Сохраняем только данные Base64 без префикса
      };
      reader.readAsDataURL(file); // Чтение файла как URL
    }
  };
  

  // Обработчик для кнопки добавления проекта
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/projects`,
        {
          title,
          image,
        },
        {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
          },
        }
      );
      // Обработка ответа, например, перенаправление или уведомление
      console.log(response.data);
      alert('Проект успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении проекта:', error);
      alert('Ошибка при добавлении проекта.');
    }
  };

  // Обработчик для добавления пользователя к проекту
  const handleAddUserToProject = async () => {
    if (selectedUserID && selectedProjectID && selectedRoleID) {
      try {
        const response = await axios.post(
          `${config.backendUrl}/api/project-roles/`,
          {
            userID: parseInt(selectedUserID),
            projectID: parseInt(selectedProjectID),
            roleID: parseInt(selectedRoleID),
          },
          {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
            },
          }
        );
        console.log('Пользователь успешно добавлен к проекту:', response.data);
        alert('Пользователь успешно добавлен к проекту!');
      } catch (error) {
        console.error('Ошибка при добавлении пользователя к проекту:', error);
        alert('Ошибка при добавлении пользователя к проекту.');
      }
    } else {
      console.error('Не все поля заполнены');
      alert('Не все поля заполнены.');
    }
  };

  return (
    <div className='managerFourth'>
      <div className="container">
        <label htmlFor="projectTitle">Название Проекта</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          id="projectTitle"
        />
        <label htmlFor="file">Фотография схемы</label>
        <input 
          type="file" 
          name="file" 
          id="file" 
          onChange={handleFileChange} 
        />
        <button onClick={handleSubmit}>Добавить проект</button>
      </div>

      <div className="second-container">
        <label htmlFor="">Добавьте пользователя к проекту</label>
        <select onChange={(e) => setSelectedUserID(e.target.value)}>
          <option value="">Выберите пользователя</option>
          {data && data.map((user) => (
            <option key={user.ID} value={user.ID}>
              {user.FirstName} {user.LastName}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedProjectID(e.target.value)}>
          <option value="">Выберите проект</option>
          {projectData && projectData.map((project) => (
            <option key={project.ID} value={project.ID}>
              {project.title} ID {project.ID}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedRoleID(e.target.value)}>
          <option value="1">Работник</option>
          <option value="2">Менеджер</option>
          <option value="3">Клиент</option>
        </select>
        
        <button onClick={handleAddUserToProject}>Добавить</button>
      </div>
    </div>
  );
}
