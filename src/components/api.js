import axios from 'axios'
import { URL } from '../url'

export const getArticles = async params => {
  const { data: {articles} = {} } = await axios.get(`${URL}/articles`, { params })
  // console.log(articles, 'srticles in api')
  return articles
}