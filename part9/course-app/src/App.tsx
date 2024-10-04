const App = () => {
  const courseName = "Half stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];



  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}/>
    </div>
  );
};

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
};

const Content = (props: CoursePartsProp) => {
  const courseParts = props.courseParts;
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  )
}

const Total = (props: CoursePartsProp) => {
  const totalExercises = props.courseParts.reduce((sum, part) => {
    return sum + part.exerciseCount;
  }, 0);

  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
};

interface Course {
  name: string,
  exerciseCount: number
};

interface CoursePartsProp {
  courseParts: Course[]
};

export default App;