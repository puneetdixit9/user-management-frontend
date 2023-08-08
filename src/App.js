import * as React from 'react'
import SignIn from './components/SignIn'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home'
import UserSession from './services/auth'
import About from './components/About'
import Profile from './components/Profile'
import ProjectSettings from './components/ProjectSettings'


function App() {
    const onDelete = () => {
        console.log('onDelete Clicked')
    }

    let projects = ['a', 'b', 'c']

    return (
        <BrowserRouter>
            <TopBar />
            <div style={{ marginTop: 10 }}>
                <Routes>
                    {/* <Route
                        exact
                        path="/"
                        element={<Home />}
                        render={() => {
                            return UserSession.isAuthenticated() ? (
                                <Navigate to="/" />
                            ) : (
                                <Navigate to="/signin" />
                            )
                        }}
                    /> */}

                    <Route
                        path="/"
                        element={
                            UserSession.isAuthenticated() ? (
                                <Home />
                            ) : (
                                <SignIn />
                            )
                        }
                    />

                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route
                        path="/settings"
                        element={<ProjectSettings />}
                    ></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
