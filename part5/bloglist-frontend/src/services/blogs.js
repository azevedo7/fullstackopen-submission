import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async blog => {
  const request = { 
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, request)
  return response.data
}

const likeBlog = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

export default { getAll, setToken, createBlog, likeBlog }