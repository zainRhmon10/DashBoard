import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email,setEmail] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };
  const newEmail = (newEmail)=>{
    setEmail(newEmail);
  }
  const delEmail = ()=>{
    setEmail('');
  }

  return (
    <AuthContext.Provider value={{ email , delEmail , newEmail , token , login , logout , isAuthenticated: !!token  }}>
      {children}
    </AuthContext.Provider>
  );
};
