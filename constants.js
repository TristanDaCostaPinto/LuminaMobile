import React from 'react'

// API URL
export const API_URL = 'http://www.share-your-universe.com/public/api/v1'

// API End Points
export const REGISTER = `${API_URL}/signup`
export const LOGIN = `${API_URL}/login`
export const UPDATE_PROFILE = `${API_URL}/user`
export const APPOINTMENT_LIST = `${API_URL}/appointments`
export const PROPERTY_LIST = `${API_URL}/properties`


// export const  = `${API_URL}/`
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};