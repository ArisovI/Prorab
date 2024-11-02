import React, { useState, useEffect } from 'react';
import './styles/ManagerRole.css';
import Cookies from 'js-cookie';
import config from '../../config';
import axios from 'axios';

export default function ManagerRole() {
    const [users, setUsers] = useState([]); // Инициализируем как пустой массив
    const [role, setRole] = useState(null);
    const [userID, setUserID] = useState(null);
    const [message, setMessage] = useState('');

    // Получение пользователей
    useEffect(() => {
        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            axios.get(`${config.backendUrl}/users`, {
                headers: {
                    'Authorization': `Bearer ${parsedAuthData.token}`
                }
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении пользователей:', error);
            });
        }
    }, []);

    // Обработка изменения роли
    const changeRole = (event) => {
        setRole(parseInt(event.target.value));
    };

    // Обработка изменения пользователя
    const changeUser = (event) => {
        setUserID(parseInt(event.target.value));
    };

    // Обработка отправки данных
    const handleSubmit = async () => {
        if (!role || !userID) {
            setMessage('Пожалуйста, выберите пользователя и роль.');
            return;
        }

        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            try {
                const response = await axios.post(`${config.backendUrl}/users/assign-role`, {
                    RoleID: role,
                    UserID: userID
                }, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                });

                setMessage(response.data.message || 'Роль успешно назначена!');
            } catch (error) {
                setMessage('Ошибка при назначении роли: ' + error.message);
                console.error('Ошибка при назначении роли:', error);
            }
        }
    };

    return (
        <div className='managerRole'>
            <div className="role-container">
                <h1>Роли и Пользователи</h1>

                <select onChange={changeUser} defaultValue="">
                    <option value="">Выберите пользователя</option>
                    {users.map((user) => (
                        <option key={user.ID} value={user.ID}>
                            {user.FirstName} {user.LastName}
                        </option>
                    ))}
                </select>

                <select onChange={changeRole} defaultValue="">
                    <option value="">Выберите роль</option>
                    <option value="1">Работник</option>
                    <option value="2">Директор</option>
                    <option value="3">Клиент</option>
                </select>

                <button onClick={handleSubmit}>Добавить Роль</button>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
