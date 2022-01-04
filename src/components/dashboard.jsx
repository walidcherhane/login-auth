import React, {useState} from "react";
import {useNavigate} from "react-router";
import {auth} from "./firebase/config";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";
import {Modal, Button} from "semantic-ui-react";
import { Backdrop, Chip, CircularProgress} from "@mui/material";
import {useSnackbar} from "react-simple-snackbar";

function Dashboard() {
  const [openSnackbar] = useSnackbar();
  const [open, setOpen] = useState();
  const [disable , setDisable] = useState(false)
  const {signout, currentUser, sendVerificationEmail, name} = useAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  if (name) {
    currentUser.displayName = name;
  }
  const handleEmailVerification = async () => {
    setDisable(true)    
      await sendVerificationEmail(auth).then(() => {
        openSnackbar("The Link Is Sent Successfully, Check Your Email..");
      });
    setTimeout(() => {
      setDisable(false)
    }, 60000);
  };

  const OpenModel = () => {
    setOpen(true);
  };
  const CloseModel = () => {
    setOpen(false);
  };
  const logOutHandler = async (e) => {
    setOpen(false);
    e.preventDefault();
    try {
      setLoading(true);
      await signout(auth);
      Navigate("/login");
    } catch (error) {
      openSnackbar("Failed to log Out, Try again...");
      setLoading(false);
    }
  };
  return (
    <>
      {
      loading && (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )
    }
      <div className="container mx-auto">
        <div className="relative mt-40">
          <div className="text-center mb-4 absolute  -top-16 right-1/2 transform translate-x-1/2">
            <div href="#" className="block relative">
              <img alt={currentUser.displayName} src={currentUser.photoURL} className="mx-auto object-cover rounded-lg h-40 w-40  border-2 border-white dark:border-gray-800" />
            </div>
          </div>
          <div className="bg-indigo-200  pb-16 mx-auto sm:w-1/2 dark:bg-gray-800 rounded-lg px-8 py-4 pt-24">
            <div className="text-center ">
              <p className="text-2xl text-gray-800 dark:text-white pt-5 mb-0">{currentUser.displayName}</p>
              <p className="text-md m-0 text-gray-500 w-60 dark:text-gray-400 mx-auto py-4 font-light">{currentUser.email}</p>
              <button disabled={disable}>{!currentUser.emailVerified && <Chip label="Verify Your Email" onClick={handleEmailVerification} variant="outlined" />}</button>
            </div>
            <div className="pt-8 flex  w-80 mx-auto text-gray-500 items-center justify-between">
              <Button variant="contained" size="large" id="log-out" onClick={OpenModel} disabled={loading} floated="left">
                Log out
              </Button>
              <Link className="btn btn-dark text-gray-900" to="/update-profile" disabled={loading}>
                <Button floated="right" variant="outlined" size="medium">
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal size="tiny" open={open} onClose={CloseModel} dimmer="blurring" className="d-none">
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
    </>
  );
}

export default Dashboard;
