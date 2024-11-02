import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles/Login.css';
import config from '../config';
import { useUser } from '../UserContext'; // Import the context hook
import gsap from 'gsap'; // Импортируем GSAP

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserRole } = useUser(); // Get the functions to update the context

  const loginRef = useRef(null); // Ссылка на контейнер формы
  const titleRef = useRef(null); // Ссылка на заголовок
  const emailRef = useRef(null); // Ссылка на поле email
  const passwordRef = useRef(null); // Ссылка на поле password
  const buttonRef = useRef(null); // Ссылка на кнопку

  useEffect(() => {
    // Анимация для заголовка (появление с поворотом и масштабированием)
    gsap.fromTo(titleRef.current, 
      { opacity: 0, scale: 0.5, rotation: -90 }, 
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.75)' }
    );

    // Анимация для поля email (вход снизу с увеличением прозрачности)
    gsap.fromTo(emailRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
    );

    // Анимация для поля password (вход снизу с задержкой)
    gsap.fromTo(passwordRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out' }
    );

    // Анимация для кнопки (прыжок с эффектом bounce)
    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.5, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, delay: 1, ease: 'bounce.out' }
    );

    // Анимация ошибки (если есть)
    if (error) {
      gsap.fromTo(".error-message", 
        { opacity: 0, x: -20, color: 'red' }, 
        { opacity: 1, x: 0, duration: 0.5, ease: 'elastic.out(1, 0.75)' }
      );
    }
  }, [error]); // Перезапуск анимации ошибки при её изменении

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.backendUrl}/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      // Extract claims and token from the response
      const { claims, token } = response.data;

      // Check that all necessary data is present
      const { user_id, first_name, last_name, role, project, exp } = claims;

      // Save user data and token in cookies
      Cookies.set('authData', JSON.stringify({
        claims: {
          user_id,
          first_name,
          last_name,
          role,
          project,
          exp,
        },
        token,
      }), { 
        expires: 7, 
        sameSite: 'None', 
        secure: true 
      });

      // Update the context with user data
      setUserRole(role);

      // Redirect to the homepage
      navigate('/homepage');
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-page'>
      <div className='login' ref={loginRef}> 
        <h1 ref={titleRef}>Вход</h1>
        <form onSubmit={handleLogin} className="inputs">
          <label>Email</label>
          <input
            ref={emailRef} // Привязка анимации к email
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='inp1'
          />
          <label>Password</label>
          <div className="password-input-container">
            <input
              ref={passwordRef} // Привязка анимации к password
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
          </div>
          {error && <p className="error-message" style={{ color: 'red', fontSize: '20px' }}>{error}</p>}
          <button ref={buttonRef} type="submit">Войти</button> {/* Привязка анимации к кнопке */}
        </form>
      </div>
    </div>
  );
}
