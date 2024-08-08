import Country from './Country'
import { useState } from 'react'

const Countries = ({ countries }) => {
    const [activeCountry, setActiveCountry] = useState({})

    if(countries.length > 10) return (
        <div>
            <p>Too many matches, specify another filter</p>       
        </div>
    )
    if(countries.length === 1) {
        return(
            <Country country={countries[0]} />
        )
    }

    const handleShowClick = (country) => () => {
        if(activeCountry == country) {
            setActiveCountry({})
        } else {
            setActiveCountry(country)
        }
    }
    
    return(
        <div>
            {countries.map(country=>
                <div key={country.name.common}>
                    {country.name.common} 
                    <button onClick={handleShowClick(country)}>{(activeCountry == country) ? 'hide' : 'show'}</button>
                    {activeCountry == country && <Country country={activeCountry}/>}
                </div>)}
        </div>
    )
}

export default Countries