// src/utils/getUserRoleFromToken.js
import jwtDecode from 'jwt-decode';

const getUserRoleFromToken = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
    const jwt = token.split('=')[1];
    const decodedToken = jwtDecode(jwt);
    return decodedToken.role; // Извлекаем роль пользователя
  }
  return null; // Если токена нет
};

export default getUserRoleFromToken;
