import axios from "axios"
import { useState,useEffect } from "react"
const CountryInfo = ({name,capital,area,languages,flagpic}) =>{
    const[weather,setWeather] = useState([])
    const api_key = import.meta.env.VITE_SOME_KEY
    useEffect(() => {
        axios 
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
          .then(result =>{
            setWeather(result.data)
          })
      }, [])
      console.log(weather)

    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.keys(languages).map((key,val)=><li key={key}>{languages[key]}</li>)}
            </ul>
            <img src={flagpic}/>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.main.temp} C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
        )}
export default CountryInfo