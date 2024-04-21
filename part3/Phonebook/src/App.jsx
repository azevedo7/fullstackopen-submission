/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import phonesServices from './services/phones'
import Notification from './assets/Notification.jsx'

function App() {
  const [persons, setPersons] = useState(null)
  const [update, setUpdate] = useState(0);
  const [message, setMessage] = useState();
  const [type, setType] = useState('');

  
  // Get all
  useEffect(() => {
    phonesServices
    .getAll()
    .then(response => setPersons(response))
    
  }, [update])
  
  // do not render anything if phonebook is null
  if(persons === null) return null
  
  const addPerson = (person) => {
    if(nameExists(person.name)){
      // Message box to confirm change  
      if(window.confirm(`${person.name} is already in the phonebook, replace the old number?`))
      {
        const id = (persons.find(p => p.name === person.name)).id
        phonesServices
          .update(id, person)
          .catch((err) => {
            console.log(err)
            addError(`Information of ${person.name} has already been removed from server`)
            setUpdate(update+1);
            return;
          }) // If item does not exist when updating
          setUpdate(update+1); 
          addNotification(`${person.name} was updated`)
        }
        else{
          addNotification(`${person.name} was not added to the phonebook`)
        }
      } else{
        phonesServices
        .create(person)
        setUpdate(update+1);
        addNotification(`${person.name} was added to the phonebook`)
      }
    }
    
    const addNotification = (mess) => {
    setMessage(mess);
    setType('success');
    setTimeout(() => setMessage(null), 3000);
  }
  
  const addError = (mess) => {
    setMessage(mess);
    setType('error');
    setTimeout(() => setMessage(null), 3000);
  }
  
  const nameExists = (name) => {
    return persons.some(person => person.name === name);
  }
  const deletePerson = (id) => {
    phonesServices
    .del(id)
    .then(response => console.log(response));
    setUpdate(update+1);
  }
  
  
  return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={type}/>
      <h2>Add a new</h2>
      <New onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <List persons={persons} deletePerson={deletePerson}/>
    </div>

  )
}

function List({ persons, deletePerson }) {
  const confirmDelete = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      deletePerson(person.id);
    }
  }
  
  return (
    <ul>
      {persons.map(person =>
      <li key={person.id}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => confirmDelete(person)}>Delete</button>
      </li>
    )}
    </ul>
  )
}

function New({ onSubmit }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const checkName = (name) => {
    return persons.some(person => person.name === name);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = { name, number }
    // const res = phonesServices.create(person);
    // console.log(res);
    onSubmit(person)
  }
  

  return (
    <div>
      <div>
        name: <input value={name} onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        number: <input value={number} onChange={({ target }) => setNumber(target.value)}/>
      </div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  )
}

export default App
