import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    const fullName = sessionStorage.getItem('full_name');

    if (token && role) {
      setUser({ token, role, username, full_name: fullName });
    }
  }, []);

  const login = (userData) => {
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('role', userData.role);
    sessionStorage.setItem('username', userData.username);
    sessionStorage.setItem('full_name', userData.full_name);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
