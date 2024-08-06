const Header = ({ course }) => {
  return (<h1>{course.name}</h1>)
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part}/>)} 
      <Total parts={ parts }/>
    </>
  )
}

const Part = (props) => {
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = ({ parts }) => <p><b>Total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b></p>

const Course = ({ course }) => {
  return(
    <>
      <Header course={course}/>
      <Content parts={course.parts}/>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}


export default App