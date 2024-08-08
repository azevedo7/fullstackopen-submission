import Weather from "./Weather"

const Country = ({ country }) => {
    let languages = []
    Object.keys(country.languages).forEach(key => {
        languages = languages.concat(country.languages[key])
    })
    console.log(languages)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}km2</p>

            <h2>Languages</h2>
            <ul>
                {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width={200}/>

            <h2>Weather</h2>
            <Weather country={country} />
        </div>
    )
}

export default Country