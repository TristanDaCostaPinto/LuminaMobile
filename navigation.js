import React from 'react'
import * as SecureStore from 'expo-secure-store'

import axios from 'axios'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { headerStyle, headerTitleStyle } from './theme'

// Default Screens
import HomeScreen from './screens/HomePageScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';

// Login Screens
import RegisterScreen from './screens/auth/Register';
import LoginScreen from './screens/auth/Login';
import ForgotPasswordScreen from './screens/auth/ForgotPassword';

const Tab = createBottomTabNavigator()

const AuthContext = React.createContext()

export default function Navigation({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            useToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )

  React.useEffect(() => {
    const bootstrapAsync = async() => {
      let userToken

      try {
        userToken = await SecureStore.getItemAsync('userToken')
      } catch(e) {
        throw new Error(e)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        //let { token, user } = data
        //let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]]

        console.log(data_)

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

        dispatch({ type: 'SIGN_IN', token: data.token})
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // send user data and get a token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      },
    }), []
  )

  return(
    <AuthContext.Provider value={authContext}>
      <Tab.Navigator>
        {state.userToken == null ? (
          <Tab.Screen 
            name="Se connecter"
            component={LoginStackNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="log-in"  color={color} />,
            }}
          />
        ) : (
          <Tab.Screen 
            name="Dashboard" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
            }}
          />
        )}
      </Tab.Navigator>
    </AuthContext.Provider>
  )
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Stack = createStackNavigator()

const LoginStackNavigator = () => {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: headerStyle, 
        headerTitleStyle: headerTitleStyle
      }}>
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ title: 'Se connecter' }}
      />
      <Stack.Screen 
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Mot de passe oublié' }}
      />
      <Stack.Screen 
        name="Register"
        component={RegisterScreen}
        options={{ title: "S'inscrire" }}
      />
    </Stack.Navigator>
  )
}

const DefaultStackNavigator = () => {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: headerStyle, 
        headerTitleStyle: headerTitleStyle
      }}>
      <Stack.Screen 
        name="Accueil"
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Stack.Screen 
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={{ title: 'Détail' }}
      />
    </Stack.Navigator>
  )  
}