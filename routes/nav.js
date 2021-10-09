import React, { useEffect, useState } from 'react'

import AuthStack from './auth'
import HomeStack from './home'
import AuthLoading from '../screens/auth/AuthLoading'

import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../providers/auth';

export default function Nav() {
  
  const { state } = useAuth()
  //console.log(state)

  if(state.isLoading) {
    return <AuthLoading />
  }

  const Stack = createStackNavigator()

  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      {state.isLoggedIn ? (
        <Stack.Screen name="App" component={HomeStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  )
}
