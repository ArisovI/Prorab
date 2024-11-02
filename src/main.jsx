import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Импортируйте ваш провайдер

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Оборачиваем App в UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
