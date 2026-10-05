import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    <Route path="/login" element={<Login />}/>

                    <Route
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>}>
                        <Route index element={<Home />}/>
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App