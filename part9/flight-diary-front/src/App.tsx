import { useState, useEffect } from 'react'
import { NonSensitiveDiaryEntry } from './types'
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
        <div>date <input value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div>visibility <input value={visibility} onChange={(e) => setVisibility(e.target.value)} /></div>
        <div>weather <input value={weather} onChange={(e) => setWeather(e.target.value)} /></div>
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
