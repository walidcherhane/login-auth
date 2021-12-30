import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState(null);
  const { signout, currentUser } = useAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // if (!currentUser.displayName) {
  //   currentUser.displayName = "[Not set yet]";
  // } else if (!currentUser.photoURL) {
  //   currentUser.photoURL =
  //     "https://media.istockphoto.com/photos/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-of-picture-id1294780139";
  // }
  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signout(auth);
      Navigate("/login");
    } catch (error) {
      setError("Failed to log Out, Try again...");
      setLoading(false)
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="px-4 py-5 text-center">
          <div className="col-md-8 px-4 py-5 mx-auto bg-light rounded-3">
            <div className="row flex-column">
              <div className="col mb-4 profile-pic bg-light">
                <img
                  src={currentUser.photoURL && currentUser.photoURL}
                  alt={currentUser.displayName && currentUser.displayName}
                  className="img-thumbnail  mx-auto rounded-circle shadow border border-3 border-warning object-fit-cover"
                />
              </div>
              {currentUser.displayName && (
                <div className="col shadow-sm bg-white text-start rounded-3 p-3">
                  <strong>Name</strong> {currentUser.displayName}
                </div>
              )}

              <div className="col shadow-sm bg-white text-start p-3 my-2">
                <strong>Email</strong> : {currentUser.email}{" "}
                <span>
                  {!currentUser.emailVerified && (
                    <small className="text-muted user-select-none">
                      (Not verified)
                    </small>
                  )}
                </span>
              </div>

              {currentUser.phoneNumber && (
                <div className="col shadow-sm bg-white text-start rounded-3 p-3">
                  <strong>Phone Number</strong> {currentUser.phoneNumber}
                </div>
              )}
              <div className="col">
                {error && (
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}
              </div>
              <div className="col text-start mt-4">
                <button
                  id="log-out"
                  onClick={logOutHandler}
                  className="btn btn-primary me-4"
                  disabled={loading}
                >
                  Log out
                </button>
                <Link className="btn btn-dark text-light" to="/update-profile" disabled={loading}>
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
