import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth, setName } from "../contexts/AuthContext";
import { auth } from "./firebase/config";

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
      }
      setLoading(false)
    }
  };
  return (
    <div className="container my-5">
      <form id="signin-form" action="" className="bg-light p-3">
        <div className="text-center display-5 mb-2">Sign up</div>
        <div className="row">
          <div className="mx-auto col-lg-8">
          {error && (
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}
            <div className="col p-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="name"
                required
              />
            </div>
            <div className="col p-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="col p-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <div className="col text-center">
              <button
                type="submit"
                onClick={SignInHandler}
                className="btn btn-primary px-4 rounded-pill"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
            <div className="w-100 text-center mt-2">
              Already have an account ? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
