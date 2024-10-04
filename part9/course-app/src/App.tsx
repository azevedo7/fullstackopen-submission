interface CoursePartBase {
  name: string,
  exerciseCount: number
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string,
  kind: "background"
}

interface CoursePartDescription extends CoursePartBase {
  description: string,
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number,
  kind: "group"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface CoursePartsProp {
  courseParts: CoursePart[]
};

const App = () => {
  const courseName = "Half stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
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
      {courseParts.map(course => (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <Part coursePart={course} />
        </div>
      ))}
    </div>
  )
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return <>{coursePart.description}</>;
    case "group":
      return (<>Number per group: {coursePart.groupProjectCount}</>);
    case "background":
      return (
        <>
          <i>{coursePart.description}</i>
          {coursePart.backgroundMaterial}
        </>
      )
    case "special":
      return(
        <>
          <div>{coursePart.description}</div>
          required skills: {coursePart.requirements.toString()} 
        </>
      )
    default:
      assertNever(coursePart);
      break;
  }
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



export default App;