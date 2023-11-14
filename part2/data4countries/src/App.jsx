import { useState,useEffect} from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'

function App() {
  const [countries, setCountries] = useState([]) 
  const [userFilter, setuserFilter] = useState('')

  useEffect(() => {
    axios 
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(result =>{
        setCountries(result.data)
      })
  }, [])


  const handleFilter = (event) => {
    setuserFilter(event.target.value)
  }
  

  return (
    <div>
      <form>
      <div>filter shown with <input value={userFilter}
          onChange={handleFilter}/>
        </div>
      </form>
      <CountryFilter countries={countries} userFilter={userFilter}/>
    </div>
  )
}

export default App
