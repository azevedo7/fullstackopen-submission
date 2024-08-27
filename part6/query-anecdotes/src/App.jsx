import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './services/anecdotes.js'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdote(newAnecdote)
    const currentData = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], currentData.map(a => a.id === anecdote.id ? newAnecdote : a))
  }

  if(result.isLoading) { return 'loading data...'}
  if(result.isError) { return 'anecdote service not available due to problems in server'}

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
