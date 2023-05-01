import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({
  token: '',
  user: '',
  isAuthenticated: false,
  onSuccessAuth: () => {},
  onLogout: () => {},
})

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState()
  const [userInfo, setUserInfo] = useState({})

  // Fetch saved token if exists
  useEffect(() => {
    const fetchToken = async () => {
      const [storedToken, userData] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user'),
      ])

      if (storedToken) {
        console.log(userData)
        setAuthToken(storedToken)
        setUserInfo(JSON.parse(userData))
      }
    }

    fetchToken()
  }, [])

  useEffect(() => {
    if (authToken === null) return

    checkExpirationAndSetTimeout()

    async function checkExpirationAndSetTimeout() {
      const expiredAt = new Date(await AsyncStorage.getItem('expiredAt'))
      const curTime = new Date()
      if (expiredAt - curTime < 0) {
        onLogout()
      }
      const timer = setTimeout(onLogout, expiredAt - curTime)
      return () => clearTimeout(timer)
    }
  }, [authToken])

  function onSuccessAuth(token, userInfo) {
    let curTime = new Date()
    curTime.setHours(curTime.getHours() + 1)
    AsyncStorage.setItem('expiredAt', curTime.toString())
    AsyncStorage.setItem('token', token)
    AsyncStorage.setItem('user', JSON.stringify(userInfo))
    setAuthToken(token)
    setUserInfo(userInfo)
  }

  function onLogout() {
    setAuthToken(null)
    setUserInfo(null)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('expiredAt')
    AsyncStorage.removeItem('user')
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    user: userInfo,
    onSuccessAuth,
    onLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
