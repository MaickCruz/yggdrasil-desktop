import useAuth from "../../hooks/UseAuth"
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useAuth()

    async function logout() {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })

            if(response.ok) {
                setCurrentUser(null)
                navigate("/login")
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <h1>Welcome, {currentUser?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>

    )
}

export default Home