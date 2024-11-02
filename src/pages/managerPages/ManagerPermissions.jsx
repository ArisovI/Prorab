import React, { useEffect, useState } from 'react'
import './styles/ManagerPermissions.css'
import config from '../../config'
import Cookies from 'js-cookie'
import axios from 'axios'
import Select from 'react-select'

export default function ManagerPermissions() {
    const [permissions, setPermissions] = useState([]); // Дефолтное значение - пустой массив
    const [selectedPermissions, setSelectedPermissions] = useState([]); // Состояние для выбранных разрешений
    const [userInfo, setUserInfo] = useState(null);

    // Получаем данные о пользователе и разрешениях
    useEffect(() => {
        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            setUserInfo(parsedAuthData);

            if (parsedAuthData) {
                axios.get(`${config.backendUrl}/permissions`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then((response) => {
                    const permissionOptions = response.data.map(permission => ({
                        value: permission.ID,
                        label: permission.Name
                    }));
                    setPermissions(permissionOptions);
                    console.log(permissionOptions);
                })
                .catch(error => console.log(error));
            }
        }
    }, []);

    // Обработка выбора разрешений
    const handlePermissionsChange = (selectedOptions) => {
        setSelectedPermissions(selectedOptions);
    };

    return (
        <div className='managerPermissions'>
            <div className="managerPermissions-container">
                <h2>Создать роль</h2>
                <div className="permissions-select">
                    <Select
                        options={permissions}
                        isMulti
                        onChange={handlePermissionsChange}
                        value={selectedPermissions}
                        placeholder="Выберите разрешения..."
                    />
                </div>
                <div className="selected-permissions">
                    <h3>Выбранные разрешения:</h3>
                    <ul>
                        {selectedPermissions.map(permission => (
                            <li key={permission.value}>{permission.label}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
