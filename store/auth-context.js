import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  onSuccessAuth: () => {},
  onLogout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [axiosInstance, setAxiosInstance] = useState({});

  // Fetch saved token if exists
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        setAuthToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (authToken === null) return;

    checkExpirationAndSetTimeout();

    async function checkExpirationAndSetTimeout() {
      const expiredAt = new Date(await AsyncStorage.getItem('expiredAt'));
      //   console.log(authToken);
      //   console.log(expiredAt);
      const curTime = new Date();
      if (expiredAt - curTime < 0) {
        onLogout();
      }
      const timer = setTimeout(onLogout, expiredAt - curTime);
      return () => clearTimeout(timer);
    }
  }, [authToken]);

  function onSuccessAuth(token) {
    setAuthToken(token);
    let curTime = new Date();
    curTime.setHours(curTime.getHours() + 1);
    AsyncStorage.setItem('expiredAt', curTime.toString());
    AsyncStorage.setItem('token', token);

    // Create axios instance
    const instance = axios.create({
      baseURL: 'http://dat2409.online/api',
      timeout: 10000,
      headers: { Authorization: 'Bearer ' + token },
    });
    setAxiosInstance(instance);
  }

  function onLogout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('expiredAt');
    setAxiosInstance({});
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    onSuccessAuth,
    onLogout,
    axiosInstance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
