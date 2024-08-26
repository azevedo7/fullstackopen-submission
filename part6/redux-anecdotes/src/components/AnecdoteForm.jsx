import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        const response = await anecdoteService.createNew(content)
        dispatch(newAnecdote(response))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm