import { useEffect, useState } from 'react';
import { Note } from './types';
import { getAllNotes, createNote } from './noteService';


const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {id: '1', content: 'testing'}
  ]);

  useEffect(() => {
    getAllNotes().then(data => setNotes(data));
  }, []);

  const noteCreation= (event: React.SyntheticEvent) =>{
    event.preventDefault()
    createNote({ content: newNote })
      .then(data => setNotes(notes.concat(data)))

    setNewNote('');
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type='submit'>save</button>
      </form>
      
      <ul>
        {notes.map(note => 
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  );
}

export default App
