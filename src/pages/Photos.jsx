import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';
import './styles/Photos.css';

export default function Photos() {
    const [photoFolders, setPhotoFolders] = useState([]); // Хранит папки с фото
    const [selectedFolder, setSelectedFolder] = useState(null); // Хранит выбранную папку для отображения
    const [isModalOpen, setIsModalOpen] = useState(false); // Управляет открытием модального окна

    useEffect(() => {
        const authData = Cookies.get('authData');
        if (authData) {
            const parsedAuthData = JSON.parse(authData);

            const firstProjectId = parsedAuthData.claims.project && parsedAuthData.claims.project.length > 0 ? parsedAuthData.claims.project[0] : null;
            if(firstProjectId) {
                axios.get(`${config.backendUrl}/api/projects/${firstProjectId}`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data && response.data.photo_folders) {
                        setPhotoFolders(response.data.photo_folders);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }}
    }, []);

    // Закрываем модальное окно при нажатии Esc
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        // Добавляем событие при открытии модального окна
        if (isModalOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        // Очищаем обработчик события при закрытии модального окна
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isModalOpen]);

    // Функция для открытия модального окна с фотографиями выбранной папки
    const openFolder = (folder) => {
        setSelectedFolder(folder);
        setIsModalOpen(true); // Открывает модальное окно
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFolder(null); // Сбрасывает выбранную папку
    };

    return (
        <div className='photos'>
            <div className="photo-container">
                <div className="header">
                    <h1>Фотографии Объекта</h1>
                </div>

                <div className="photo-folders">
                    {photoFolders.length > 0 ? (
                        photoFolders.map((folder, index) => (
                            <div key={index} className="photo-folder">
                                <div className="file" onClick={() => openFolder(folder)}> {/* Клик по папке */}
                                    <svg width="207" height="151" viewBox="0 0 207 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M199.234 15.6195H77.6218V7.80977C77.6218 3.51421 74.129 0 69.8599 0H7.76187C3.49267 0 0 3.51437 0 7.80977V143.19C0 147.486 3.49282 151 7.76187 151H199.238C203.507 151 207 147.486 207 143.19V23.4314C207 19.1338 203.507 15.6195 199.236 15.6195H199.234Z" fill="#D2DDF8"/>
                                    </svg>
                                    <h2 className="photo-name">{folder.title}</h2>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Нет доступных фото</p>
                    )}
                </div>
            </div>

            {/* Модальное окно для отображения фотографий */}
            {isModalOpen && selectedFolder && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span> {/* Кнопка закрытия */}
                        <h2>{selectedFolder.title}</h2>
                        <div className="photo-grid">
                            {selectedFolder.Photos && selectedFolder.Photos.length > 0 ? (
                                selectedFolder.Photos.map((photo, index) => (
                                    <div key={index} className="photo-item">
                                        <img src={`${config.backendUrl}/${photo.filePath}`} alt={photo.title} />
                                    </div>
                                ))
                            ) : (
                                <p>Нет фотографий в этой папке</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
