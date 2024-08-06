import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = good / total * 100

  if(total == 0) return (
    <>
      <h1>statistics</h1> 
      <p>No feedback given</p>
    </>
  )
  return(
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />      
    </div>
  )
}

export default App
