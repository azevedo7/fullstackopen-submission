import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(countryData => {
        setCountries(countryData)
      })
  }, [])

  const filteredCountries = countries.filter((c) => {
    const name = c.name.common.toLowerCase()
    return name.includes(filter.toLowerCase())
  })

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  
  return(
    <div>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App