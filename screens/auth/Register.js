import React, { useState } from 'react'
import {
  Alert,
  View
} from 'react-native'

import * as api from '../../services/auth'

import Form, { TYPES } from 'react-native-basic-form'
import CTA from '../../components/CTA'
import { Header, ErrorText } from '../../components/Shared'

export default function Register(props) {
  const { navigation } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = [
    {label:"Utilisateur", value:1}
  ]

  const initialData = {
    "idRole": 1,
    "idAgency": 1,
  }

  const fields = [
    {name: 'userFirstname', label: 'Prénom', required: true},
    {name: 'userLastname', label: 'Nom', required: true},
    {name: 'userEmail', label: 'Adresse email', required: true, type: TYPES.Email},
    {name: 'userPassword', label: 'Mot de passe', required: true, secure: true},
    {name: 'userPhone', label: 'Numéro de téléphone', required: true},
    {name: 'userAdr', label: 'Adresse', required: true},
    {name: 'userDob', label: 'Date de naissance', required:true, type: TYPES.Date},
    //{name: 'userDob', label: 'Date de naissance', required:true},
    [
      {name: 'idRole', label: 'Rôle', required: true, options: options, editable: false},
      {name: 'idAgency', label: 'Agence', required:true, editable: false}
    ]
  ]

  async function onSubmit(state) {
    setLoading(true)

    let formatedDob = state.userDob.toISOString().split('T')[0]
    state.userDob = formatedDob

    try {
      let response = await api.register(state)
      setLoading(false)
      Alert.alert(
        'Inscription validée',
        response.message,
        [{ text: 'OK', onPress: () => navigation.replace('Login') }],
        { cancelable: false }
      )
    } catch(error) {
      setError(error.message)
      setLoading(false)
    }
  }

  let formProps = { title: "S'inscrire", fields, onSubmit, loading, initialData }

  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <Header title={"S'inscrire"} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form { ...formProps }>
          <CTA
            title={'Déjà inscrit ?'}
            ctaText={'Se connecter'}
            onPress={ () => navigation.replace('Login') }
            style={{ marginTop: 50, marginBottom: 50 }}
          />
        </Form>
      </View>
    </View>
  )
}

Register.navigationOptions = ({}) => {
  return {
    title: ``
  }
}