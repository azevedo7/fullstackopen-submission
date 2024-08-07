import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const MostVotes = ({anecdotes, votes}) => {
  const max = Math.max(...votes)
  if(max === 0){
    return(
      <>
        <h1>No anecdote has votes</h1>
      </>
    )
  }

  let maxIndex = 0;
  votes.forEach((value,index) => {if(value === max) {maxIndex = index}})

  return(
    <>
      <h1>Most voted anecdote</h1>
      <p>{anecdotes[maxIndex]}</p>
    </>
  )

  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = (index) => {
    const votesCopy = [...votes]
    votesCopy[index] = votes[index] + 1
    setVotes(votesCopy)
  } 

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => vote(selected)} text={'vote'} />
      <Button onClick={getRandom} text={'random'} />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App