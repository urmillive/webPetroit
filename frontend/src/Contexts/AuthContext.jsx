import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import AuthAPI from "../API/auth";

export const AuthContext = React.createContext({
  token: null,
  user: null,
  isLoading: false,
  setToken: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      AuthAPI.get()
        .then((res) => {
          const { data } = res;
          setUser(data);
          setIsLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setToken(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token", null);
    setToken(token);
  });

  return (
    <AuthContext.Provider value={{ user, token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
