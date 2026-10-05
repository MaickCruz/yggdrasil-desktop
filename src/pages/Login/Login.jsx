import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/UseAuth"
import "./Login.css"

function Login() {

    const { setCurrentUser } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(form)
            })

            if (response.ok) {

                const meResponse = await fetch('http://localhost:8080/auth/me', {
                    method: 'GET',
                    credentials: 'include'
                })

                const user = await meResponse.json()

                setCurrentUser(user)
                navigate('/')
                
                return
            }

            if (response.status === 401) {
                setError('Invalid email or password')
                return
            }

            setError('Unable to sign in')
        } catch (error) {
            console.error(error)
            setError('Could not connect to the server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-container">

                <div className="login-form-section">
                    <div className="login-form-wrapper">

                        <div className="login-header">
                            <h1>Sign in</h1>

                            <p>
                                Enter your credentials to access the system.
                            </p>
                        </div>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <button
                                className="forgot-password"
                                type="button"
                            >
                                Forgot password?
                            </button>

                            {error && (
                                <p className="login-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className="login-button"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                    </div>
                </div>

                <div className="login-visual">
                    <div className="visual-content">
                        <h2>Welcome back.</h2>

                        <p>
                            Management made simple.
                        </p>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default Login