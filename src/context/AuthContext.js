"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log("Retrieved token from localStorage:", token); // 토큰 출력
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            console.log("Base64 URL part:", base64Url); // Base64 부분 출력
            if (base64Url) {
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const decodedUser = JSON.parse(jsonPayload);
                console.log("Decoded user from token:", decodedUser); // 디코딩된 사용자 정보 출력
                setUser(decodedUser);
            } else {
                console.error("Invalid token format");
            }
        } catch (error) {
            console.error("Failed to decode token", error);
        }
    }
}, []);

const login = (token) => {
  if (token) {
      localStorage.setItem('jwtToken', token);
      console.log('Stored token in localStorage:', localStorage.getItem('jwtToken')); // 저장된 토큰 확인

      try {
          const base64Url = token.split('.')[1];
          if (base64Url) {
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              const decodedUser = JSON.parse(jsonPayload);
              console.log("Decoded user from token:", decodedUser); // 디코딩된 사용자 정보 출력
              setUser(decodedUser);
          } else {
              console.error("Invalid token format");
          }
      } catch (error) {
          console.error("Failed to decode token", error);
      }
  } else {
      console.error("No token provided");
  }
};

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
