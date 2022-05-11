import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { name, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="name" style={{color: "#F0EBD8"}}>Name</Label>
          <Input id="name" 
          type="text" 
          style={{backgroundColor: "#748CAB"}}
          onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email" style={{color: "#F0EBD8"}}>Email</Label>
          <Input id="email" 
          type="text" 
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
          <Label for="confirmPassword" style={{color: "#F0EBD8"}}>Confirm Password</Label>
          <Input id="confirmPassword" 
          type="password" 
          style={{backgroundColor: "#748CAB"}}
          onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
