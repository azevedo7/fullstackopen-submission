import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../slices/userActions"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(login(username, password))
    setUsername("")
    setPassword("")
  }

  return (
    <form>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </label>
      </div>
      <button onClick={handleLogin}>login</button>
    </form>
  )
}

export default LoginForm