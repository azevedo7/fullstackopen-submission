const Numbers = ({ persons }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => <p key={person.name}>{person.name} {person.phone}</p>)}
            </ul>
        </div>
    )
}

export default Numbers