import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./nav.css";
function Nav() {
  const { currentUser } = useAuth();
  if (currentUser) {
    if (!currentUser.displayName) {
      currentUser.displayName = "Not set yet";
    } else if (!currentUser.photoURL) {
      currentUser.photoURL =
        "https://media.istockphoto.com/photos/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-of-picture-id1294780139";
    }
  }
  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Navbar
        </Link>
        {!currentUser ? (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log In
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex flex-column justify-content-center align-items-center text-center">
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                className="img-fluid rounded-circle object-fit-cover "
                width={30 + "px"}
                height={30 + "px"}
              />
              <span className="userName">{currentUser.displayName}</span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
