import { useState } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Numbers from './components/Numbers'

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
        if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
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
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <AddPersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <Numbers persons={filteredPersons}/>
        </div>
    )
}

export default App