import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
    axios.get(baseUrl).then(res => res.data)

export const addNew = (content) => 
    axios.post(baseUrl, {content, votes: 0}).then(res => res.data)

export const updateAnecdote = (content) =>
    axios.put(`${baseUrl}/${content.id}`, content).then(res => res.data)