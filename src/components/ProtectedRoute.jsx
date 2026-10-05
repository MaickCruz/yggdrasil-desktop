import useAuth from "../hooks/UseAuth"
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute