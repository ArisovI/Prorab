import { Navigate } from 'react-router-dom';
import getUserRoleFromToken from './utils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRoleFromToken();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Перенаправление на главную страницу
  }

  return children;
};

export default ProtectedRoute;
