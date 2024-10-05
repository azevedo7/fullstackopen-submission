import { useState, useEffect } from 'react'
import { NonSensitiveDiaryEntry, Visibility, Weather } from './types'
import { getAllDiaries, createDiary } from './services/diaryService'

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([])  
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => setDiary(data));
  }, [])


  const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createDiary({ date, visibility, weather, comment })
      .then(data => setDiary([...diary, data]))
      .catch(error => setNotification(error.response.data))
  }

  return(
    <div>
      <h2>Add new entry</h2>
      <div style={{ color: 'red' }}>{notification}</div>
      <form onSubmit={addDiary}>
        <div>date <input type='date' value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div>visibility
          {Object.keys(Visibility).map(key => 
            <label key={key}>
              <input type='radio' name='visibility' value={key.toLowerCase()} onChange={(e) => setVisibility(e.target.value as Visibility)} />
              {key}
            </label>
          )}
        </div>
        <div>weather
          {Object.keys(Weather).map(key => 
            <label key={key}>
              <input type='radio' name='weather' value={key.toLowerCase()} onChange={(e) => setWeather(e.target.value as Weather)} />
              {key}
            </label>
          )}
        </div>
        <div> comment <input value={comment} onChange={(e) => setComment(e.target.value)} /></div>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      {diary.map(entry => 
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          visibility: {entry.visibility}
          <br/>
          weather: {entry.weather}
        </div>
      )}
    </div>
  )
}

export default App
