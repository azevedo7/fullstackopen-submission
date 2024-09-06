import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries"
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm authors={authors}/>
    </div>
  )
}

const BirthYearForm = ({ authors }) => {
  const [born, setBorn] = useState('')

  const [ editAuthor ]= useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = Object.fromEntries(formData).name
    editAuthor({ variables: {name, setBornTo: parseInt(born) }})  
  }

  return(
    <form onSubmit={handleSubmit}>
      <select name="name">
        {authors.map((author) => 
          (<option key={author.id} value={author.name}>{author.name}</option>)
        )} 
      </select>
      <div>
        born
        <input type="number" name="born" onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button type="submit">update author</button>
    </form>
  )
}

export default Authors
