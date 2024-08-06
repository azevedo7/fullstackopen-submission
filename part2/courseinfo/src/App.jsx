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

const Course = ({ courses }) => {
  return(
    <>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course}/>
          <Content parts={course.parts}/>
        </div>
      )}
    </>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 

  return <Course courses={courses} />
}


export default App