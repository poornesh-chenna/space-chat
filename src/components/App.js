import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./Start";
import Register from "./Register"
import Login from "./Login"
import Chatpage from "./Chatpage";
import NotFound from "./NotFound";

function App(){
   const [isAuthenticated, setAuthenticated] = useState(false)
   const [inuser,setUserEmail] = useState({
       email:"",
       name:""
   })

   const Registereduser = (user)=>{
       setUserEmail(user)
       setAuthenticated(true)
   }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Start/>} />
                <Route exact path="/Register" element = {<Register/>} />
                <Route exact path="/Login" element = {<Login Registereduser={Registereduser}/>} />
                <Route exact path="/Chatpage" element = {<Chatpage user={inuser} isAuthenticated={isAuthenticated}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        
    )
}


export default App;