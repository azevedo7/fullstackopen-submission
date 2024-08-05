const Header = ({ course }) => {
  return (<h1>{course.name}</h1>)
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

export default App