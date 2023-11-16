import CountryInfo from "./CountryInfo"
import { useState } from "react"
const CountryFilter = ({countries,userFilter}) =>{
    const matches = countries.filter(country =>country.name.common.includes(userFilter))
    const [toShow,setToShow] = useState(null)

    if (matches.length === 1){
        return (
            <div>
            {matches.map(country =><CountryInfo name={country.name.common} 
            capital={country.capital}
            area ={country.area}
            languages ={country.languages}
            flagpic={country.flags.png}/>)}
            </div>
        )}
    else if (matches.length<10){
        return (
            <div>
                <ul>
                    {matches.map(country => <li>{country.name.common}
                    <button type="submit" onClick ={()=>setToShow(country)}>
                        Show info
                    </button>
                    </li>)}
                </ul>
                {toShow ? <CountryInfo name={toShow.name.common} 
                            capital={toShow.capital}
                            area ={toShow.area}
                            languages ={toShow.languages}
                            flagpic={toShow.flags.png}/>
                        : null}
            </div>
        )}
    else {
        return(
            <p>Too many matches,please specify filter</p>
        )}
            
    }
export default CountryFilter