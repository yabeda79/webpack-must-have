import { useState, useCallback, useEffect } from "react";

const storageName: string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((jwtToken, username) => {
    setToken(jwtToken);
    setUserName(username);

    console.log(username);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userName: username,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userName);
    }
  }, [login]);

  return { login, logout, token, userName };
};
