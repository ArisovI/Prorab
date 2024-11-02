import React, { useState, useEffect } from 'react';
import './styles/ManagerSecond.css';
import config from '../../config';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ManagerSecond() {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(); // Состояние для выбранной роли
  const [selectedUserId, setSelectedUserId] = useState(null); // Состояние для выбранного пользователя
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
        console.error(error);
      });
    }
  }, []);

  // Обновление состояния для роли
  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value); // Сохраняем выбранную роль
    console.log(selectedRole)
  };

  // Обновление состояния для пользователя
  const handleUserChange = (event) => {
    const userId = parseInt(event.target.value);
    console.log('userid' + userId)
    setSelectedUserId(userId);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для назначения роли пользователю
  const assignRole = async () => {
    if (!selectedUserId || !selectedRole) {
      setModalMessage('Пожалуйста, выберите пользователя и роль.');
      setIsModalOpen(true);
      return;
    }

    const authData = Cookies.get('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      try {
        await axios.post(`${config.backendUrl}/users/assign-role`, {
          RoleID: parseInt(selectedRole),  // Отправляем выбранную роль
          UserID: selectedUserId // Отправляем выбранного пользователя
        }, {
          headers: {
            'Authorization': `Bearer ${parsedAuthData.token}`
          }
        });

        setModalMessage('Роль успешно назначена!');
        setIsModalOpen(true);
      } catch (error) {
        setModalMessage('Ошибка при назначении роли: ' + error.message);
        setIsModalOpen(true);
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      firstname: name,
      lastname: surname,
      middlename: middlename,
      email: email,
      password: password,
      phonenumber: phone,
      role: selectedRole
    };

    try {
      const response = await axios.post(`${config.backendUrl}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });

      if (response.data.message === "user created successfully") {
        setModalMessage("Пользователь успешно зарегистрирован!");
        setIsModalOpen(true);

        const newUser = {
          ID: response.data.userId, // Предполагаем, что сервер возвращает ID нового пользователя
          FirstName: name,
          LastName: surname,
        };

        // Обновление списка пользователей
        setUsers(prevUsers => [...prevUsers, newUser]);
        // Сброс выбранного пользователя и роли
        setSelectedUserId(null);
        setSelectedRole(null);
      }

      console.log('Пользователь успешно зарегистрирован:', response.data);
    } catch (error) {
      setModalMessage("Ошибка при регистрации: " + error.message);
      setIsModalOpen(true);
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <div className='managerSecondpage'>
      <header>
        <h1>Новый пользователь</h1>
      </header>

      <div className="registration">
        <form onSubmit={handleSubmit}>
          <label htmlFor="surname">Фамилия</label>
          <input type="text" className="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />

          <label htmlFor="name">Имя</label>
          <input type="text" className="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="dads">Отчество</label>
          <input type="text" className="dads" value={middlename} onChange={(e) => setMiddlename(e.target.value)} />

          <label htmlFor="email">Gmail</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Пароль</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="phone">Номер телефона</label>
          <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <button type="submit" className="addUser">Добавить пользователя</button>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>

            {/* Выпадающий список пользователей */}
            <select onChange={handleUserChange}>
              <option value="">Выберите пользователя</option>
              {users.map((user) => (
                <option key={user.ID} value={user.ID}>{user.FirstName} {user.LastName}</option>
              ))}
            </select>

            {/* Выпадающий список ролей */}
            

            {/* Кнопка для назначения роли */}
            <button onClick={assignRole}>Добавить роль</button>

            {/* Сообщение модального окна */}
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
