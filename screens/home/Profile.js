import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../providers/auth';

export default function Profile(props) {
    
  const { state } = useAuth()
  const { navigation } = props
  const user = state.user

  return(
    <View style={{
        padding: 20,
        marginTop: 200,
        textAlign: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    }}>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'purple'}}>Bonjour {user.userFirstname} </Text>
        <Button  
            onPress={() => {navigation.navigate('UpdateProfile')}}  
            title="Modifier mon profil"  
            color="#841584"  
            accessibilityLabel="Modifier mon profil"/>
        <Button  
            onPress={() => {navigation.navigate('GeneratePDF')}}  
            title="Créer un état des lieux"  
            color="#841584"  
            accessibilityLabel="Créer un état des lieux"/>
    </View>
  )
}

Profile.navigationOptions = ({}) => {
  return {
    title: `Profil`
  }
}