import React, { useState }  from 'react';
import { View } from 'react-native';

import * as api from '../../services/auth';
import { useAuth } from '../../providers/auth';

import Form, { TYPES } from 'react-native-basic-form';
import { ErrorText } from '../../components/Shared';

export default function UpdateProfile(props) {
  const { navigation } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { state, updateUser } = useAuth()

  const fields = [
    {name: 'userFirstname', label: 'Prénom', required: true},
    {name: 'userLastname', label: 'Nom', required: true},
    {name: 'userEmail', label: 'Adresse email', required: true, type: TYPES.Email},
    {name: 'userAdr', label: 'Adresse', required: false}
  ]

  async function onSubmit(data) {
    setLoading(true)
    try {
      let response = await api.updateProfile(state.user.idUser, data)
      updateUser(response.user)
      setLoading(false)
      navigation.goBack()
    } catch(error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form
          fields={fields}
          title={'Modifier'}
          loading={loading}
          initialData={state.user}
          error={error}
          onSubmit={onSubmit}/>
      </View>
    </View>
  )
}

UpdateProfile.navigationOptions = ({}) => {
  return {
    title: `Modifier mon profil`
  }
}