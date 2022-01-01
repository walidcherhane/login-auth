import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {   Image, Modal,Button } from "semantic-ui-react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Alert } from "@mui/material";

function Dashboard() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState()
  const { signout, currentUser } = useAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.primary,
    fontSize: 15
  }));
  // if (!currentUser.displayName) {
  //   currentUser.displayName = "[Not set yet]";
  // } else if (!currentUser.photoURL) {
  //   currentUser.photoURL =
  //     "https://media.istockphoto.com/photos/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-of-picture-id1294780139";
  // }
  const OpenModel =()=>{
    setOpen(true)
  }
  const CloseModel =()=>{
    setOpen(false)
  }
  const logOutHandler = async (e) => {
    setOpen(false)
    e.preventDefault();
    try {
      setLoading(true)
      setError(null)
      await signout(auth);
      Navigate("/login");
    } catch (error) {
      setError("Failed to log Out, Try again...");
      setLoading(false)
    }
  };
  return (
    <div className="container mx-auto">
      <div className="row">
        <div className="px-4 py-5 text-center">
        <div className="col-8 mx-auto my-4">
          {error && (<Alert severity="error">{error}</Alert>)}
        </div>
          <div className="col-md-8 px-4 py-5 bg-light rounded-3 md:mx-28">
            <div className="grid  gap-4 bg-gray-50 shadow-xl shadow-gray-200 p-10 py-9 md:p-20 md:py-24 rounded-xl">
              <div className="mx-auto mb-10 sm:mb-0">
              <Image src={currentUser.photoURL && currentUser.photoURL} alt={currentUser.displayName && currentUser.displayName} size='small' circular />
              </div>
              <div className=" p-0 md:p-5 grid grid-cols">
              <Stack spacing={2} >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Item>
                {currentUser.displayName && (
                  <div className="p-2">
                    <strong>Name: </strong> 
                    {currentUser.displayName}
                  </div>
                )}
                </Item>
                <Item>
                    <div className="p-2">
                      <strong>Email: </strong>  {currentUser.email}
                      <span>
                          {!currentUser.emailVerified && (
                            <small className="text-muted user-select-none ps-3">
                              (Not verified)
                            </small>
                          )}
                      </span>
                    </div>
                </Item>
                {currentUser.phoneNumber && (
                  <Item>
                      <div className="p-2">
                        <strong>Phone Number</strong>
                         {currentUser.phoneNumber}
                      </div>
                  </Item>
                )}
      
                </div>
              </Stack>
              </div>
              <div className="col text-start mt-4">
                <Button
                  variant="contained"
                  size="large"
                  id="log-out"
                  onClick={OpenModel}
                  disabled={loading}
                  floated='left'
                >
                  Log out
                </Button>
                  <Link className="btn btn-dark text-gray-900" to="/update-profile" disabled={loading}>
                     <Button floated='right' variant="outlined" size="medium">Update Profile</Button>
                  </Link>
                      <Modal size='tiny' open={open} onClose={CloseModel} dimmer='blurring' className="d-none">
                          <Modal.Header>Log out</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to Log Out ?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button negative onClick={CloseModel}>
                              Cancel
                            </Button>
                            <Button positive onClick={logOutHandler}>
                              Yes
                            </Button>
                          </Modal.Actions>
                        </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
