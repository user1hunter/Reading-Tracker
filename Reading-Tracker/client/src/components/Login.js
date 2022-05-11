import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email" style={{color: "#F0EBD8"}}>Email</Label>
          <Input id="email" 
          type="text"
          autoFocus 
          style={{backgroundColor: "#748CAB"}}
          onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password" style={{color: "#F0EBD8"}}>Password</Label>
          <Input id="password" 
          type="password" 
          style={{backgroundColor: "#748CAB"}}
          onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em style={{color: "#F0EBD8"}}>
          Not registered? <Link to="register" style={{color: "#F0EBD8"}}>Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}