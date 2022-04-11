import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Register() {
   const reg = ()=>{
     axios.post("http://localhost:5000/")
     .then((res)=>{
       console.log("success");
       console.log(res);
     })
   }
  

  return (
    <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
      <Form action="/register" method="POST" className="m-5">
        <h2 className="mb-5">New user Registeration</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control name="username" type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            No spams. PROMISE!
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
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
