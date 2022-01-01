import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";
import { Button, Form, Header, Input } from 'semantic-ui-react'
import Alert from '@mui/material/Alert';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();

  const LogInHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(null)
      await login(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      switch (err.message) {
        case "Firebase: Error (auth/invalid-email).":
          setError("Please, Enter Your Credentials");
          break;
        case "Firebase: Error (auth/user-not-found).":
          setError(`User Not Found, Please Sign in `);
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setError(`The Email is already in use log in instead `);
          break;
        case "Firebase: Error (auth/wrong-password).":
          setError(`Wrong Password, Try again or get new one `);
          break;

        default:
          setError("Sorry: Failed To log in,Please contact the admin");
      }
      setLoading(false)
    }
  };

  return (
    <div className="bg-gray-50 p-10 py-16 mx-5 mt-10 md:mx-40 lg:mx-80 lg:py-16 md:mt-10 shadow-lg shadow-gray-300 rounded-xl">
      <div className="text-center text-2xl mb-10 ">
      <Header size='huge'>Log In</Header>

      </div>
      <div className="container my-5 mx-auto">
       {error && (<Alert severity="error">{error}</Alert>)}
    
    <Form onSubmit={LogInHandler} id="login-form" className="mt-5">
      <Form.Field required>
        <label>E-mail Adress</label>
        <Input placeholder='Enter The Email Adress' type="email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Field>
      <Form.Field required>
        <label>Password</label>
        <Input placeholder='Enter The Password' type="password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Field>
      <Button positive type='submit' disabled={loading}>Log In</Button>
      <br />
      <div className="mt-10 text-center">
              <span>Need an Account ? </span>
              <Link to='/signup'>
              Create One
              </Link>
      </div>
    </Form>  
    </div>

    </div>
  );
}

export default Login;
