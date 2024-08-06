const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return(
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you are probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return(
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name='Daisy' age={10+24}/> 
    </div>
  )
}

export default App