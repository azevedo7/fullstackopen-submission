import { useState, useEffect } from 'react'
import { NonSensitiveDiaryEntry } from './types'
import { getAllDiaries } from './services/diaryService'

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([])  

  useEffect(() => {
    getAllDiaries().then(data => setDiary(data));
  }, [])

  return(
    <div>
      <h2>Diary entries</h2>
      {diary.map(entry => 
        <div>
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
