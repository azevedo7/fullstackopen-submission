const Header = ({ course }) => {
  return (<h1>{course}</h1>)
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => <Part key={part.name} part={part}/>)} 
    </>
  )
}

const Part = (props) => {
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = ({ total }) => <p>Number of exercises {total.reduce((acc, curr) => acc + curr.exercises, 0)}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ] 

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  )
}

export default App