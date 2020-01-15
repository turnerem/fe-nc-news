import axios from 'axios'
import { URL } from '../url'

export const getData = async (key, endpoint, params) => {
  const { data } = await axios.get(`${URL}/${endpoint}`, { params })
  return data[key]
}

export const postData = async (key, endpoint, postData) => {
  const { data } = await axios.post(`${URL}/${endpoint}`, postData)
  console.log(data, 'data in postData\n\n')
  return data[key]
}