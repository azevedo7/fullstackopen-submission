import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService 
            .getAll()
            .then(newPersons => {
                setPersons(newPersons)
            })
    }, [])    


    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const filteredPersons = filter === ''
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

    const addName = (e) => {
        e.preventDefault()
        if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
            if(window.confirm(`${newName} is already added to phonebook, replace old number with new number?`))
            {
                const id = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()).id
                const newPerson = { name: newName, number: newNumber }
                personService
                    .update(id, newPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
                    })
            }
        } else {
            const newPerson = { name: newName, number: newNumber }

            personService
                .create(newPerson)
                .then(newAddedPerson => {
                    setPersons(persons.concat(newAddedPerson))
                })

            setNewName('')
            setNewNumber('')
        }
    }

    const deletePerson = (id) => {
        if(!window.confirm(`Delete ${persons.find((person) => person.id === id).name} ?`)) return

        personService
            .deleteRequest(id)
            .then((deletedPerson) => {
                setPersons(persons.filter(p => p.id !== deletedPerson.id))

            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>

            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h3>Numbers</h3>

            <Numbers persons={filteredPersons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App