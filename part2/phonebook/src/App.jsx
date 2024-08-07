import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    const tempFilter = e.target.value
    setFilter(tempFilter)
    setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(tempFilter.toLowerCase()) || person.phone.includes(tempFilter)))

  }
  
  const filterChange = (newPersons) => {
    setFilteredPersons(newPersons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()) || person.phone.includes(filter)))
  }


  const addName = (e) => {
    e.preventDefault()
    if(persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.some((person) => person.phone === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      const newPersons = [...persons, { name: newName, phone: newNumber }]
      setPersons(newPersons)
      filterChange(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input value={filter} onChange={handleFilterChange} /></div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => <p key={person.name}>{person.name} {person.phone}</p>)}
      </ul>
    </div>
  )
}

export default App