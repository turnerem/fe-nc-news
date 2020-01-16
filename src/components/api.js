import axios from 'axios'
import { URL } from '../url'

export const getData = async (key, endpoint, params) => {
  const { data } = await axios.get(`${URL}/${endpoint}`, { params })
  return data[key]
}

export const postData = async (key, endpoint, postData) => {
  const { data } = await axios.post(`${URL}/${endpoint}`, postData)
  return data[key]
}

export const patchData = async (key, endpoint, patchData) => {
  const { data } = await axios.patch(`${URL}/${endpoint}`, patchData)
  console.log(data, 'data in patchData\n\n')
  return data[key]
}

export const deleteData = async (endpoint) => {
  const { data } = await axios.delete(`${URL}/${endpoint}`)
  console.log(data, 'deleted data')
  return data
}