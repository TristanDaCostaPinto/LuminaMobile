import React, { useState } from 'react'
import { Alert, View } from 'react-native'

import * as api from '../../services/auth'

import Form, {TYPES } from 'react-native-basic-form'
import { Header, ErrorText } from '../../components/Shared'

export default function ForgotPassword(props) {
  const { navigation } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fields = [
    {name: 'userEmail', label: 'Adresse email', required: true, type: TYPES.Email}
  ]

  async function onSubmit(state) {
    setLoading(true)

    try {
      let response = await api.forgotPassword(state)
      setLoading(false)

      Alert.alert(
        'Récupération de mot de passe',
        response.message,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
        { cancelable: false }
      )
    } catch(error) {
      setError(error.message)
      setLoading(false)
    }
  }

  let formProps = { title: 'Envoyer', fields, onSubmit, loading }
  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <Header title={'Récupération de mot de passe'} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form { ...formProps } />
      </View>
    </View>
  )
}

ForgotPassword.navigationOptions = ({}) => {
  return {
    title: ``
  }
}