import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Register() {
  const navigate = useNavigate();
  const [user , setUser] = useState({
    name : "",
    email : "",
    password: ""
  })
  const handleChange = e=>{
    const {name , value} = e.target
    setUser({
      ...user,
      [ name ]:value
    })
  }
   const reg = ()=>{
     const {name,email,password} = user
     if(name && email && password){
      axios.post("http://localhost:5000/register",user)
      .then((res)=>{
        console.log("success");
        console.log(res);
      })
      .catch((reg)=>{
         console.log(reg);
      })
     } else {
        alert("Invalid Input")
     }
     
     navigate("../Chatpage",{replace:"true"})
   }
  

  return (
    <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
      <Form action="/Chatpage" className="m-5">
        <h2 className="mb-5">New user Registeration</h2>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control onChange={handleChange} name="name" value={user.name} type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleChange} name="email" value={user.email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            No spams. PROMISE!
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange} name="password" value={user.password} type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={reg}>
          Submit
        </Button>
      </Form>
      <img src=".\images\phoneimage.jpg" alt="phonechatimage"/>
    </div>
  );
}

export default Register;
