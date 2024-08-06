const Header = ({ course }) => {
    return (<h1>{course.name}</h1>)
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.name} part={part} />)}
            <Total parts={parts} />
        </>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = ({ parts }) => <p><b>Total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b></p>

const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course} />
                    <Content parts={course.parts} />
                </div>
            )}
        </>
    )
}

export default Course