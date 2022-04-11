import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function Login() {
  function log(){
     axios.post("http://localhost:5000/")
     .then((res)=>log(res.data))
  }

  return (
    <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
      <Form className="m-5">
        <h2 className="mb-5">Welcome back!</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
