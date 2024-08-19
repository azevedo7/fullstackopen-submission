import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({createNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      createNotification('Wrong credentials')
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input 
          type="password"
          value={password} 
          name='Password'
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm