import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ allowedRoles }) => {
  // Получаем токен из cookies
  const authData = Cookies.get("authData");

  if (!authData) {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    return <Navigate to="/" />;
  }

  const { claims } = JSON.parse(authData);
  const userRole = claims.role;

  // Проверяем, соответствует ли роль пользователя допустимым ролям для этой страницы
  if (!allowedRoles.includes(userRole)) {
    // Если роль не соответствует, перенаправляем пользователя на страницу, соответствующую его роли
    if (userRole === "client") {
      return <Navigate to="/homepage" />;
    } else if (userRole === "manager") {
      return <Navigate to="/managerFirstpage" />;
    } else if (userRole === "worker") {
      return <Navigate to="/workerHomepage" />;
    }
  }

  // Если роль соответствует, разрешаем доступ к странице
  return <Outlet />;
};

export default PrivateRoute;
