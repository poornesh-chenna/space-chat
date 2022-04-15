import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const reg = async (event) => {
    event.preventDefault();

    let registereduser = {
      name: username,
      email: email,
      password: password,
    };
   const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post("http://localhost:5000/register", registereduser, headers)
      .then((res) => {
        console.log("success");
        console.log(res.data);
        navigate("/Login");
      });
  };

  return (
    <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
      <Form className="m-5">
        <h2 className="mb-5">New user Registeration</h2>
        <Form.Group
          className="mb-3"
          onChange={(e) => setUserName(e.target.value)}
        >
          <Form.Label>User Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setEmail(e.target.value)}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">No spams. PROMISE!8</Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={(e) => setPassword(e.target.value)}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={reg}>
          Submit
        </Button>
      </Form>
      <img src=".\images\phoneimage.jpg" alt="phonechatimage" />
    </div>
  );
}

export default Register;
