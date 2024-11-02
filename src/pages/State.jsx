import React from 'react';
import './styles/State.css';
import config from '../config';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const ProgressBar = ({ value }) => {
    return (
        <CircularProgressbarWithChildren
            className="stateBar"
            value={value}
            styles={buildStyles({
                pathColor: '#43E16F', // Цвет заполненной части прогресс-бара
                trailColor: '#d6d6d6', // Цвет трека
                strokeLinecap: 'round', // Закругленные концы прогресса
                textColor: '#000', // Цвет текста
                pathTransitionDuration: 0.5, // Длительность анимации
                textSize: '20px', // Размер текста
                pathWidth: 1, // Толщина линии прогресса
                trailWidth: 4, // Толщина линии трека
            })}
        >
            {/* Текст в центре прогресс-бара */}
            <div style={{
                fontSize: '24px', // Размер текста
                fontWeight: 'bold', // Жирность шрифта
                marginTop: '-10px', // Корректируем отступ для точного центрирования текста
                color: '#000',
            }}>
                {`${value}%`}
            </div>
        </CircularProgressbarWithChildren>
    );
};

export default function State() {
    const [data, setData] = useState(null);  // Инициализируем состояние с null

    useEffect(() => {
        const authData = Cookies.get('authData');

        if (authData) {
            const parsedAuthData = JSON.parse(authData);
            const firstProjectId = parsedAuthData.claims.project && parsedAuthData.claims.project.length > 0 ? parsedAuthData.claims.project[0] : null;

            if (firstProjectId) {
                axios.get(`${config.backendUrl}/api/details/project/${firstProjectId}`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then((response) => {
                    setData(response.data);  // Устанавливаем полученные данные в состояние
                    console.log(response.data);
                })
                .catch(error => console.log(error));
            }
        }
    }, []);

    if (!data) {
        return (
            <div className='state'>
                <h2>Загрузка данных...</h2>
            </div>
        );
    }

    return (
        <div className='state'>
            <div className="state-first">
                <div className="state-chars">
                    <div className="header">
                        <h1>Прогресс работы</h1>
                    </div>

                    <div className="state-details">
                        <div className="detail-item">
                            <h2><span className='item-circle'></span>Стоимость ремонта</h2>
                            <h2>{data.project_price}</h2> {/* Отображаем цену проекта */}
                        </div>

                        <div className="detail-item">
                            <h2><span className='item-circle'></span>Оплачено материалов</h2>
                            <h2>{data.paid_materials} <span className='need'> / {data.necessary_materials}</span></h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="state-second">
                {/* Здесь можно добавить другой контент */}
                <div className="state-second-container">
                    <header>
                        <h1 className="state-second-container">Время выполнения</h1>
                    </header>

                    <div className="state-second-container-info">
                        <h2>Сроки: {data.deadline_days} дней</h2>
                        <h2>Осталось времени: {data.deadline_days - data.completion_days} дней</h2> {/* Отображаем оставшиеся дни */}
                        
                        <div className="progressBar-div">
                            {/* Расчет процента выполнения */}
                            <ProgressBar value={(data.completion_days / data.deadline_days) * 100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
