import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch('http://localhost:8080/auth/me', {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const user = await response.json()
                    setCurrentUser(user)
                } else {
                    setCurrentUser(null)
                }
            } catch (error) {
                console.error(error)
                setCurrentUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}