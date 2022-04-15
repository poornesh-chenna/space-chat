import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [email , setEmail] = useState();
  const [password,setPassword] = useState();

  const log = async (event)=>{
    event.preventDefault();
    const user = {
      "email" : email,
      "password" : password
    }
    let headers = {
      'Content-Type': 'application/json'
  }
    await axios.post("http://localhost:5000/login",user,headers)
     .then((res)=>{
       console.log("Success");
       console.log(res.data);
        props.Registereduser({'email':email})
       navigate('/Chatpage')
     })
     .catch((reg)=>{
       console.log("invalidddd");
        console.log(reg);
     })
  }

  return (
    <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
      <Form className="m-5">
        <h2 className="mb-5">Welcome back!</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => {setEmail(e.target.value)}}>
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => {setPassword(e.target.value)}}>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={log} >
          Submit
        </Button>
      </Form>
      <img src=".\images\phoneimage.jpg" alt="phoneimg" />
    </div>
  );
}

export default Login;
