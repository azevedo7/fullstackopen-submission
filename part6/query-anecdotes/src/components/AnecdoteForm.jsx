import { useQueryClient , useMutation } from '@tanstack/react-query'
import { addNew } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: (data) => {
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const currentData = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], currentData.concat(data))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
