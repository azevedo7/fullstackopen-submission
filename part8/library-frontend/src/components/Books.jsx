import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"

const Books = (props) => {
  const response = useQuery(ALL_BOOKS)
  const [ genreFilter, setGenreFilter ] = useState(null)
  

  if (!props.show) {
    return null
  }
  if(response.loading) { return <div>loading...</div>}

  const books = response.data.allBooks

  const genres = [... new Set(books.map(book => book.genres).flat())]
  const filteredBooks = genreFilter ? books.filter(book => book.genres.includes(genreFilter)) : books

  return (
    <div>
      <h2>books</h2>
      {genreFilter && <p>in genre <b>{genreFilter}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenreFilter(null)}>reset</button>
        {genres.map((genre) => <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>)}
      </div>
    </div>
  )
}

export default Books
