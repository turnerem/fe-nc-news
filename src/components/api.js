import axios from 'axios'
import { URL } from '../url'

export const getData = async (key, endpoint, params) => {
  const { data } = await axios.get(`${URL}/${endpoint}`, { params })
  return data[key]
}