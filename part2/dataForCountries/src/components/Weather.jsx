import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0].toLowerCase()}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`
    
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                console.log(response.data)
                setWeather(response.data)
            })
    }, [])

    if(weather === null) return 

    return(
        <div>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>wind {weather.wind.speed}</p>
        </div>
    )
}

export default Weather