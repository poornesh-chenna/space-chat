import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./Start";
import Register from "./Register"
import Login from "./Login"
import Chatpage from "./chatpage";

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/Register" element = {<Register/>} />
                <Route path="/Login" element = {<Login/>} />
                <Route path="/chatpage" element = {<Chatpage/>} />
            </Routes>
        </Router>
        
    )
}


export default App;