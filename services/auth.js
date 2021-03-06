import axios from 'axios'
import * as c from '../constants'

export async function register(data) {
  try {
    let res = await axios.post(c.REGISTER, data)

    return res.data
  } catch(e) {
    throw handler(e)
  }
}

export async function login(data) {
  try {
    let res = await axios.post(c.LOGIN, data)

    return res.data
  } catch(e) {
    throw handler(e)
  }
}

export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, data, options)

    return res.data
  } catch(e) {
    throw handler(e)
  }
}

export async function appointmentsList() {
  try {
    let res = await axios.get(c.APPOINTMENT_LIST)

    return res.data
  } catch(e) {
    throw handler(e)
  }
}

export async function propertiesList() {
  try {
    let res = await axios.get(c.PROPERTY_LIST)

    return res.data
  } catch(e) {
    throw handler(e)
  }
}

export function handler(err) {
  let error = err

  if(err.response && err.response.data.hasOwnProperty("message")) {
    error = err.response.data
  } else if(!err.hasOwnProperty("message")) {
    error = err.toJSON()
  }

  return new Error(error.message)
}