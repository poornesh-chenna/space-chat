import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Start from './Start'
import Register from './Register'
import Login from './Login'
import Chatpage from './Chatpage'
import NotFound from './NotFound'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [inuser, setUserEmail] = useState({
    email: '',
    name: '',
    id: '',
  })
  const Registereduser = (user) => {
    setUserEmail(user)
    setAuthenticated(true)
  }

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      Registereduser(JSON.parse(userData))
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/Register" element={<Register />} />
        <Route
          exact
          path="/Login"
          element={<Login Registereduser={Registereduser} />}
        />
        <Route
          exact
          path="/Chatpage"
          element={<Chatpage user={inuser} isAuthenticated={isAuthenticated} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
