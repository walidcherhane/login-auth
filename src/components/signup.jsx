import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";
import Alert from '@mui/material/Alert';
import { Button, Form, Header, Input } from 'semantic-ui-react'

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const SignInHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(null)
      await signin(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      switch (err.message) {
        case "Firebase: Error (auth/invalid-email).":
          setError("Please, Enter Your Credentials");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setError(`The Email is already in use log in instead `);
          break;
        default:
          setError("Failed to create account, Try again later");
          console.log(err)
      }
      setLoading(false)
    }
  };
  return (

    <div className="bg-gray-50 p-10 py-16 mx-5 mt-10 md:mx-40 lg:mx-80 lg:py-16 md:mt-10 shadow-lg shadow-gray-300 rounded-xl">
      <div className="text-center text-2xl mb-10 ">
      <Header size='huge'>Sign Up</Header>

      </div>
      <div className="container my-5 mx-auto">
       {error && (<Alert severity="error">{error}</Alert>)}
    
    <Form onSubmit={SignInHandler} id="signup-form" className="mt-5">
      <Form.Field required>
        <label>E-mail Adress</label>
        <Input placeholder='Enter Your Email Adress' type="email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Field>
      <Form.Field required>
        <label>Password</label>
        <Input placeholder='Enter a Password' type="password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Field>
      <Button positive type='submit' disabled={loading}>Sign Up</Button>
      <br />
      <div className="mt-10 text-center">
              <span>You have An Account ? </span>
              <Link to='/login'>
              Log In
              </Link>
      </div>
    </Form>  
    </div>

    </div>
  );
}

export default Signin;
