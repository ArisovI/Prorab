import React, { useState, useEffect } from 'react';
import './styles/FirstPage.css';
import Cookies from 'js-cookie';
import config from '../config';
import axios from 'axios';

export default function FirstPage() {
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [userFor, setUserFor] = useState(null);

  useEffect(() => {
    const authData = Cookies.get('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUserInfo(parsedAuthData.claims);

      // Retrieve the first project ID from the claims object
      const firstProjectId = parsedAuthData.claims.project && parsedAuthData.claims.project.length > 0 ? parsedAuthData.claims.project[0] : null;

      console.log(parsedAuthData)

      axios.get(`${config.backendUrl}/users`, {
        headers: {
          'Authorization': `Bearer ${parsedAuthData.token}`
        }
      })
      .then((response) => {
        const foundUser = response.data.find(user => user.ID === parsedAuthData.claims.user_id);

        if(foundUser) {
          console.log(`asasd ${foundUser}`)
          setUserFor(foundUser)
          console.log(foundUser)
        }
        else {
          console.log('no users')
        }
    })
    .catch((error) => {
      console.log(error)
    })

      if (firstProjectId) {
        axios.get(`${config.backendUrl}/api/projects/${firstProjectId}`, {
          headers: {
            'Authorization': `Bearer ${parsedAuthData.token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        console.log('No project found in claims');
      }
    }
  }, []);

  const userName = userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : 'Пользователь';

  return (
    <div className='firstPage'>
      <div className="client-info">
        <div className="avatar">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="75" cy="75" r="75" fill="#D9D9D9"/>
            <path d="M91.0962 69.2068H58.902C47.1464 69.2068 36.2847 75.477 30.4087 85.6553C24.5304 95.8337 24.5304 108.374 30.4087 118.551C36.286 128.73 47.1477 135 58.902 135H91.0962C102.852 135 113.713 128.73 119.592 118.551C125.469 108.373 125.469 95.8327 119.592 85.6553C113.714 75.477 102.852 69.2068 91.0962 69.2068ZM91.0962 129.096H58.902C51.7078 129.148 44.791 126.328 39.6858 121.261C34.5796 116.193 31.7084 109.298 31.7084 102.105C31.7084 94.9125 34.5796 88.017 39.6858 82.9501C44.791 77.8832 51.7078 75.0627 58.902 75.1149H91.0962C98.2904 75.0626 105.207 77.8832 110.313 82.9501C115.419 88.017 118.29 94.9125 118.29 102.105C118.29 109.298 115.419 116.193 110.313 121.261C105.207 126.328 98.2904 129.148 91.0962 129.096ZM74.9996 59.0734C81.641 59.0734 88.0098 56.4359 92.7058 51.7408C97.4017 47.0446 100.041 40.6769 100.041 34.0367C100.041 27.3965 97.4017 21.0278 92.7058 16.3327C88.0098 11.6376 81.641 9 74.9996 9C68.3582 9 61.9883 11.6376 57.2924 16.3327C52.5965 21.0278 49.9584 27.3965 49.9584 34.0367C49.9655 40.6749 52.6055 47.0384 57.3004 51.7328C61.9953 56.4258 68.3603 59.0665 74.9996 59.0734ZM74.9996 14.9066C80.0736 14.9066 84.9405 16.9229 88.5295 20.5103C92.1174 24.0976 94.1331 28.9639 94.1331 34.0377C94.1331 39.1116 92.1174 43.9778 88.5295 47.5652C84.9405 51.1525 80.0736 53.1679 74.9996 53.1679C69.9246 53.1679 65.0577 51.1525 61.4698 47.5652C57.8807 43.9778 55.865 39.1116 55.865 34.0377C55.8721 28.9657 57.8908 24.1046 61.478 20.5183C65.0642 16.9317 69.9269 14.9146 74.9999 14.9063L74.9996 14.9066Z" fill="black"/>
          </svg>
          <h2>{userName}</h2>
        </div>

        <div className="buttons">
          {(userFor) ? <h2>{userFor.PhoneNumber}</h2> : <p>Null</p>}
          {(userFor) ? <h2>{userFor.Email}</h2> : <p>Null</p>}
          {(userFor) ? <h2>{userFor.City}</h2> : <p>NotYey</p>}
        </div>
      </div>

      <div className="remont-info">
        <div className="header">
          <h2>Мои ремонты</h2>
        </div>

        <div className="remont-container">
          <div className="info-chars">
          {data &&  (
            // Определяем, какой тип MIME должен быть использован
            <img
              src={`data:${data.image.includes('/9j/') ? 'image/jpeg' : 'image/png'};base64,${data.image}`}
              alt="Project"
              style={{ width: '500px', height: '500px' }}
            />
          ) 
          }

          </div>

          <div className="string-chars">
            {data && data.characteristics && data.characteristics.map((char, index) => (
              <div key={char.ID}><span className='circle'></span> {char.desc}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
