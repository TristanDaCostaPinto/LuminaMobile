import React, { useState } from 'react'
import { View } from 'react-native'

import * as api from '../../services/auth'
import { useAuth } from '../../providers/auth'

import Form from 'react-native-basic-form'
import { Header, ErrorText } from '../../components/Shared'

export default function Username(props) {
  const { navigation } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { state, updateUser } = useAuth()

  const fields = [
    {name: 'userEmail', label: 'User Email', required: true}
  ]

  async function onSubmit(data) {
    setLoading(true)

    try {
      let response = await api.updateProfile(state.user.userId, data)
      updateUser(response.user)

      setLoading(false)

      navigation.navigate('App')
    } catch(error) {
      setError(error.message)
      setLoading(false)
    }
  }

  let formProps = { title: 'Submit', fields, onSubmit, loading }
  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <Header title={'Select username'} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form { ...formProps } />
      </View>
    </View>
  )
}

Username.navigationOptions = ({}) => {
  return {
    title: ``
  }
}