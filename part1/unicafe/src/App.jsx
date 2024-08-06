import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addOne = (value, setValue) => () => {setValue(value + 1)}

  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={addOne(good, setGood)} text={'good'}/>
      <Button onClick={addOne(neutral, setNeutral)} text={'neutral'} />
      <Button onClick={addOne(bad, setBad)} text={'bad'} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>netural {neutral}</p>
      <p>bad {bad}</p>
      <p>average {(good-bad)/(good+bad+neutral)}</p>
      <p>positive {good/(good+bad+neutral) * 100}%</p>
    </div>
  )
}

export default App
