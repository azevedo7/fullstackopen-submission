const Numbers = ({ persons, deletePerson }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => 
                <li key={person.name}>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => deletePerson(person.id)}>Delete</button> 
                </li>)}
            </ul>
        </div>
    )
}

export default Numbers