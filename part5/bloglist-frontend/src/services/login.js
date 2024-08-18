import axios from 'axios'
const baseUrl = '/api/login'

// { username, password }
const login = async credentials => {
    const user = await axios.post(baseUrl, credentials)
    return user.data
}

export default { login }