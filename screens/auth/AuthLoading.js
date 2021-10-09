import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useAuth } from '../../providers/auth'

export default function AuthLoading(props) {
  const { navigate } = props.navigation
  const { getAuthState } = useAuth()

  useEffect(() => {
    initialize()
  }, [])

  async function initialize() {
    try {
      const { user } = await getAuthState()
      console.log(user)

      if(user) {
        let idUser = !!(user.idUser)
        
        if(idUser) navigate('App')
        else navigate('Auth', {}, StackActions.replace({ routeName: "Dashboard" }))
        //else navigate('App')
        
      } else navigate('App')
    } catch(e) {
      navigate('App')
    }
  }

  return(
    <View style={{ 
      backgroundColor: '#fff', 
      alignItems: 'center', 
      justifyContent: 'center', 
      flex: 1 
    }}>
      <ActivityIndicator />
      <Text>{"Chargement des informations utilisateurs"}</Text>
    </View>
  )
}