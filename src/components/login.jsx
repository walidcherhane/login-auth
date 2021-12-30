import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    <div className="container my-5">
      <form
        id="login-form"
        className="bg-light p-3 py-5"
        onSubmit={LogInHandler}
      >
        <div className="text-center display-5 mb-2">Log in</div>
        <div className="row">
          <div className="col-md-8 mx-auto">
          {error && (
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
          )}
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
                type="password"
                className="form-control"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col text-center">
              <button
                type="submit"
                className="btn btn-primary px-4 rounded-pill "
                disabled={loading}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signin">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
