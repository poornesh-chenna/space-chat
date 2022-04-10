import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./Start";
import Register from "./Register"
import Login from "./Login"

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/Register" element = {<Register/>} />
                <Route path="/Login" element = {<Login/>} />
            </Routes>
        </Router>
        
    )
}


export default App;