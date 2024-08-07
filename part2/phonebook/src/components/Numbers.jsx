const Numbers = ({ persons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => <p key={person.name}>{person.name} {person.phone}</p>)}
            </ul>
        </div>
    )
}

export default Numbers