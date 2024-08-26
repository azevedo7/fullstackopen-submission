import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const createNew = async (content) => {
    const object = { content, important: false }
    const request = await axios.post(baseUrl, object)
    return request.data
}

export default { 
    getAll,
    createNew,
}