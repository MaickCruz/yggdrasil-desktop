import useAuth from "../hooks/UseAuth"

function RequireRole({ role, children }) {
    
    const roles = {
        SALESPERSON: 1,
        MANAGER: 2,
        ADMIN: 3
    }

    const { currentUser } = useAuth()

    if(!currentUser) {
        return null
    }

    if (roles[currentUser.role] >= roles[role]) {
        return children
    }

    return null
}

export default RequireRole