import {EmailAuthProvider, updateProfile} from "firebase/auth";
import React, { useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {Header} from "semantic-ui-react";
import {Backdrop,  CircularProgress, Divider, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {getAuth, updatePassword} from "firebase/auth";
import {useSnackbar} from "react-simple-snackbar";
import ErrorHandler from "./ErrorHandler";
import { Visibility, VisibilityOff } from "@material-ui/icons";
function UpdateProfile() {
  const {currentUser, ReAuthUser} = useAuth();
  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  // const [phone, setPhone] = useState(currentUser.phoneNumber);
  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [viewPassWord, setViewPassWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  // eslint-disable-next-line
  const alphabet = /^[a-zA-Z ]*$/;
  // const numbers = /^(\(?\+?[0-9]*\)?)?[0-9_\-()]*$/;
  const spaceChar = /^ {1,}/;
  const Navigate = useNavigate();
  // const isValidNumber = numbers.test(phone);
  const isValidName = alphabet.test(name);
  const isStartWithSpace = spaceChar.test(name);

  const auth = getAuth();
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setViewPassWord(false);
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await ReAuthUser(credential)
      .then(() => {
        updatePassword(user, newPassword);
        openSnackbar("Password Changed Successfully");
      })
      .catch((err) => {
        ErrorHandler(err, openSnackbar);
        setLoading(false);
      });
  };
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      if (isValidName) {
        if (isStartWithSpace) {
          openSnackbar("Your Name Cannot start with a space");
          return;
        }
      } else {
        // invalid Name
        openSnackbar("Please Enter a valid Name");
        return;
      }
      // if (!isValidNumber) {
      //   openSnackbar("Please Enter a valid Phone Number");
      //   return;
      // }
      setLoading(true);
      await updateProfile(currentUser, {
        displayName: name ? name : currentUser.displayName,
        photoURL: profilePicture ? profilePicture : currentUser.photoURL,
      });
      openSnackbar("Profile Updated Successfully");
      Navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      openSnackbar("Failed To Update Profile");
      console.log(err);
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
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="text-center mt-10 mb-5">
          <Header size="huge">Update Profile</Header>
          <Divider variant="middle" />
        </div>
        <div>
        <form action="" onSubmit={handleChange}>
        <div className="mt-5 bg-white rounded-lg shadow">
          <div className="flex">
            <div className="flex gap-x-4 items-center py-5 pl-5 overflow-hidden">
              <img alt="profil" src={currentUser.photoURL} className="mx-auto object-cover rounded-full h-16 w-16 "/>
              <h1 className="inline text-2xl font-semibold m-0">{currentUser.displayName}</h1>
            </div>
          </div>
          <div className="px-5 pb-5">
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            <input
              disabled
              type='email'
              value={currentUser.email}
              
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
              className="cursor-not-allowed text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />

                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e)=>{setProfilePicture(e.target.value)}}
                  placeholder="Photo Url"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />

            <div className="flex justify-end mt-10 gap-x-4">
            <Link to="/dashboard">  
              </Link>
              <button
                disabled={loading}
                type="submit"
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
              >
                <SaveIcon/>
                <span className="pl-2 mx-1">Save Changes</span>
              </button>
            </div>
          </div>

        </div>
      </form>
      <div className="flex">
        <div className="flex gap-x-4 items-center py-5 pl-5 overflow-hidden">
          <div className="bg-gray-300 rounded-full p-3">
          <LockOpenIcon fontSize="large"/>

          </div>
          <h1 className="inline m-0 text-2xl font-semibold leading-none">Change Password</h1>
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center gap-x-4 pr-3 flex-cols">
        <input
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          type={viewPassWord ? "text" : "password"}
          placeholder="Currennt Password"
          className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <IconButton
          aria-label="toggle password visibility"
          onClick={(e)=>{setViewPassWord(!viewPassWord)}}
          edge="end"
        >
          {viewPassWord ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        </div>
          <div className="flex items-center gap-x-4 pr-3 flex-cols">
            <input
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type={viewPassWord ? "text" : "password"}
            placeholder="New PassWord"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          />
            <IconButton
              aria-label="toggle password visibility"
              onClick={(e)=>{setViewPassWord(!viewPassWord)}}
              edge="end"
            >
              {viewPassWord ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        <div className="flex flex-row-reverse p-3">
            <div className="flex justify-end mt-10 gap-x-4">
            <Link to="/dashboard">
              <button
                type="button"
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
              >
                  <CancelIcon/>

                    <span className="pl-2 mx-1">Cancel All Changes</span>

              </button>
              </Link>
              <button
                disabled={loading}
                onClick={changePasswordHandler}
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
              >
                <SaveIcon/>
                <span className="pl-2 mx-1">Change Password</span>
              </button>
            </div>
      </div>
      </div>
        </div>
      </div>




    </>
  );
}

export default UpdateProfile;
