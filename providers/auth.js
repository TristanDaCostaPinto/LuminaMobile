import React, { useMemo, useReducer, useContext } from 'react'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
//import jwt_decode from 'jwt-decode'

// Import reducer, initial state & actions
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from '../reducer'

// Config keys
export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'
export const keys = [TOKEN_KEY, USER_KEY]

// Context
const AuthContext = React.createContext()

function AuthProvider(props) {

  const [state, dispatch] = useReducer(reducer, initialState || {})

  const getAuthState = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN_KEY)
      let user = await AsyncStorage.getItem(USER_KEY)
      user = JSON.parse(user)

      if(token !== null && user !== null) await handleLogin({ token, user })
      else await handleLogout()

      return { token, user }
    } catch(error) {
      throw new Error(error)
    }
  }

  const handleLogin = async (data) => {
    try {
      // Store data
      let { token, user } = data
      let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]]

      await AsyncStorage.multiSet((data_))

      // Axios authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

      // Dispatch to reducer
      dispatch({ type: LOGGED_IN, user: data.user })
      
    } catch(error) {
      throw new Error(error)
    }
  }

  const handleLogout = async () => {
    try {
      // Remove data
      await AsyncStorage.multiRemove(keys)

      // Axios authorization header
      delete axios.defaults.headers.common["Authorization"]

      // Dispatch to reducer
      dispatch({ type: LOGGED_OUT })
    } catch(error) {
      throw new Error(error)
    }
  }

  const updateUser = async (user) => {
    try {
      // Update data
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))

      // Dispatch to reducer
      dispatch({ type: LOGGED_IN, user})
    } catch(error) {
      throw new Error(error)
    }
  }

  const value = useMemo(() => {
    return { state, getAuthState, handleLogin, handleLogout, updateUser }
  }, [state])

  return(
    <AuthContext.Provider value={value}>
      {props.children} 
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
export { AuthContext, useAuth }
export default AuthProvider