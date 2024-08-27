import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick}) => {
    return(
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter })=> 
        (filter === 'ALL') 
        ? anecdotes
        : [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    )
    
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 4))
    } 

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
                )}
        </div>

    )
}

export default AnecdoteList