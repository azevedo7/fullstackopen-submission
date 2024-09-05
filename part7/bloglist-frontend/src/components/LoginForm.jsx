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
    <form className="card border max-w-lg p-4 mx-auto mt-40">
      <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
      <div>
          <input
            type="text"
            value={username}
            placeholder="Username"
            className="input input-bordered w-full"
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
      </div>
      <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="input input-bordered w-full mt-4"
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
      </div>
      <button onClick={handleLogin} className="btn btn-primary w-full mt-4">login</button>
    </form>
  )
}

export default LoginForm