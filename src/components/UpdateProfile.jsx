import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    updateProfile(currentUser, {
      displayName: name ? name : currentUser.displayName,
      photoURL: profilePicture ? profilePicture : currentUser.photoURL,
      phoneNumber: phone ? phone : currentUser.phoneNumber,
    })
      .then(() => {
        alert("Updated Successfully");
        setError(null);
        window.location.reload();
        Navigate("/dashboard");
      })
      .catch(() => {
        setError("Failed To Update Profile");
      });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="mx-auto col-md-8">
          <form onSubmit={handleChange}>
            <div className="row">
              <div className="col-12">
                {error && (
                  <div className="alert alert-warning" role="alert">
                    {error}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label className="mb-2" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="Leave Blank to keep the same"
                />
              </div>
              <div className="col-md-6">
                <label className="mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="form-control"
                  type="tel"
                  placeholder="Leave Blank to keep the same"
                />
              </div>
              <div className="col-md-6">
                <label className="mb-2" htmlFor="plink">
                  Profile Picture Link
                </label>
                <input
                  id="plink"
                  onChange={(e) => {
                    setProfilePicture(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="Leave Blank to keep the same"
                />
              </div>
            </div>
            <div className="col-md-8 my-3">
              <button type="submit" className="btn btn-primary me-4 mb-3">
                Update Info
              </button>
            </div>
          </form>
          <Link className="btn btn-dark text-light" to="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
