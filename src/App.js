import * as React from 'react'
import SignIn from './components/SignIn'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home'
import About from './components/About'
import ChangePassword from './components/ChangePassword'
import UserProfile from './components/UserProfile'
import PrivateRoute from './components/AuthorisedRoutes'

function App() {

    return (
        <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
            <TopBar />
            <div style={{ marginTop: 10 }}>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={Home} path={"/"} />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/profile/:userId" element={<PrivateRoute element={UserProfile} path={"/profile/:userId"} />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
