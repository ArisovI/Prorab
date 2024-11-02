import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    // Загружаем значение из localStorage при инициализации
    const savedRole = localStorage.getItem('userRole');
    return savedRole ? JSON.parse(savedRole) : null;
  });

  // Сохраняем `userRole` в localStorage при каждом изменении состояния
  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', JSON.stringify(userRole));
    }
  }, [userRole]);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  return useContext(UserContext);
};
