import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async blog => {
  const request = { 
    headers: { Authorization: token }
  }

  await axios.post(baseUrl, blog, request)
}

export default { getAll, setToken, createBlog }