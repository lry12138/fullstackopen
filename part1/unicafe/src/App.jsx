import { useState } from 'react'

const Title =({title}) => <h1>{title}</h1>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine =({text1,text2,value}) => <tr><td>{text1}:</td><td>{value}</td><td>{text2}</td></tr>

const Statistics = ({good,bad,neutral}) => {
  const all = good + bad + neutral
  const score = good - bad
  const average = score/all
  const positive = good/all*100
  if (all === 0){
    return (
      <div>
        <Title title="Statistics" />
        <p>No feedback given</p>
      </div>
    )
  }
  else{
    return (
      <div>
        <Title title="Statistics"/>
        <table>
          <thead>
            <StatisticLine text1="Good"  value={good} />
            <StatisticLine text1="Neutral"  value={neutral} />
            <StatisticLine text1="Bad" value={bad} />
            <StatisticLine text1="All" value={all} />
            <StatisticLine text1="Average"  value={average} />
            <StatisticLine text1="Positive" text2="%" value={positive} />
          </thead>
        </table>
      </div>
    )
  }
  
}

const App = () =>{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Title title = "Give Feedback"/>
      <Button handleClick={()=>setGood(good + 1)} text='good' />
      <Button handleClick={()=>setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} bad={bad} neutral={neutral} />
      
    </div>
  )
}

export default App
