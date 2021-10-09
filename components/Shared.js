import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import font from '../theme'

// Header
export const Header = (props) => {
  let { title, style } = props

  return(
    <View style={[styles.header, style]}>
      <Text style={styles.headerText}>
        {title}
      </Text>
    </View>
  )
}

Header.defaultProps = {
  title: '',
  style: {}
}

// Error
export const ErrorText = ({ error }) => {
  return <Text style={styles.errorText}>{error}</Text>
}

ErrorText.defaultProps = {
  error: ''
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    color: "#362068",
    fontWeight: "400",
    fontFamily: font
  },
  errorText: {
    marginBottom: 8,
    color: 'red'
  }
})