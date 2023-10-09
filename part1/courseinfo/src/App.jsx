const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.no} {props.title}</p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part no={props.parts[0].exercises} title={props.parts[0].name}/>
      <Part no={props.parts[1].exercises} title={props.parts[1].name}/>
      <Part no={props.parts[2].exercises} title={props.parts[2].name}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[1].exercises + props.parts[2].exercises + props.parts[0].exercises}</p>
    </div>
  )
}

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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App