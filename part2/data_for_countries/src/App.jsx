import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_OpenWeather_API
function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [showName, setShowName] = useState('')


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
      .catch(err => console.log(err))
  }, [])



  useEffect(() => {
    if(country.length < 1) {
      setCountriesFiltered([])
      return
    }
    const temp = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
    setCountriesFiltered(temp.slice(0, 10))
  }, [country])

  return (
    <div>
      <label>find countries</label>
      <input value={country} onChange={e => setCountry(e.target.value)}/>
      {
        countriesFiltered.length !== 1 ?
        (countriesFiltered.map((c, index) => 
          <div key={index}>
            {c.name.common}
            <button onClick={() => setShowName(c.name.common)}>show</button>
            { showName === c.name.common ? <ShowCountry country={c}/> : null }
          </div>)) :
        <ShowCountry country={countriesFiltered[0]}/>} 
    </div>
  )
}

function ShowCountry({country}){
  const [weather, setWeather] = useState({})

  // Get weather
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${api_key}`)
      .then(res => setWeather(res.data))
  },[]) 

  console.log(weather)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital.map(c => c)}</div>
      <div>area: {country.area}</div>
      <div>population: {country.population}</div>

      <br />

      <div>languages 
        <ul>
          {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
      </div>
      <img src={country.flags.svg} alt="flag" style={{width: 300}}/>

      <h2>Weather in {country.capital[0]}</h2>
      { weather.main ? <Weather weather={weather}/> : null }
    </div>
  )
}

function Weather({weather}){
  return(
    <div>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>

  )
}

export default App
