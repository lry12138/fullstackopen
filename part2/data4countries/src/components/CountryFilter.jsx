const CountryFilter = ({countries,userFilter}) =>{
    const matches = countries.filter(country =>country.name.common.includes(userFilter))
    console.log(matches)
    if (matches.length === 1){
        return (
            <div>
            {matches.map(country => <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.keys(country.languages).map((key,val)=><li key={key}>{country.languages[key]}</li>)}
                </ul>
                <img src={country.flags.png} alt='{country.name} flag'/>
            </div>
            )}
            </div>
        )}
    else if (matches.length<10){
        return (
            <div>
                <ul>
                 {matches.map(country => <li>{country.name.common}</li>)}
                 </ul>
            </div>
        )}
    else {
        return(
            <p>Too many matches,please specify filter</p>
        )}
            
    }
export default CountryFilter