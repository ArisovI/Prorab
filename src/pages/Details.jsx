import React from 'react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import config from '../config'
import './styles/Details.css'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

const ProgressBar = ({ value }) => {
    return (
        <CircularProgressbarWithChildren 
            className='progressBar'
            value={value}
            // text={`${value}%`}
            styles={buildStyles({
                textColor: 'black',
                pathColor: '#43E16F',
                trailColor: 'red',
                textSize: '20px',
                textAnchor: 'middle', // Ensure text alignment
                dominantBaseline: 'central', // Center text vertically
            })}
        > <h2>{`${value} %`}</h2> </CircularProgressbarWithChildren>
    )
}

export default function Details() {
    const [data, setData] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const authData = Cookies.get('authData');
        if(authData) {
            const parsedAuthData = JSON.parse(authData)
            setUserInfo(parsedAuthData.claims)
            const firstProjectId = parsedAuthData.claims.project && parsedAuthData.claims.project.length > 0 ? parsedAuthData.claims.project[0] : null;

            if(firstProjectId) {
                axios.get(`${config.backendUrl}/api/projects/${firstProjectId}`, {
                    headers: {
                        'Authorization': `Bearer ${parsedAuthData.token}`
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            }}
    }, [])

    return (
        <div className='details'>
            <div className="details-folder">
            {data && data.states && data.states.map((state, index) => (
                <div key={state.ID} className='details-container'>
                    <div className="state-name">
                        <h1>{state.job}</h1>
                    </div>
                    <div className='state-progress'>
                        <h2>Прогресс Работы: </h2>
                        <ProgressBar value={state.done_part} />
                    </div>
                    <div className="payed">
                        <h1>Оплачено:</h1>
                        <h2>{state.paid_money} руб</h2>
                    </div>
                </div>
            ))}
           </div>
        </div>
    )
}
