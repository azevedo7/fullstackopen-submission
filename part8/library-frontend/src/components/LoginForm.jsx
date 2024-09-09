import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "./queries"

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login, result ] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data){
            const token =`Bearer ${result.data.login.value}` 
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data])

    if (!props.show) {
        return null
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            await login({ variables: { username, password } })
            props.setPage("books")
        } catch (error) {
            console.log(error)
        }
        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    username
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button onClick={handleLogin}>login</button>
            </form>
        </div>
    )
}

export default LoginForm