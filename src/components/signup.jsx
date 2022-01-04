import React, { useState,useRef } from "react";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoadingButton from '@mui/lab/LoadingButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useSnackbar } from 'react-simple-snackbar'
import ErrorHandler from "./ErrorHandler";
function Signin() {
  const { setName ,signin, SignUpWithGoogle, SignUpWithGithub } = useAuth();


  const [openSnackbar] = useSnackbar()
  const [loading, setLoading] = useState(false);
  const [viewPassWord, setViewPassWord] = useState(false);
  const navigate = useNavigate();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const emailRef = useRef()
  const nameRef = useRef()

  const SignUpWithEmailHandler = async (e) => {
    const Name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    setName(Name)
    e.preventDefault();
    if (password !== passwordConfirm) {
      return openSnackbar("Passwords do not match");
    }
    try {
      setLoading(true)
      await signin(auth, email, password, Name)
      navigate("/dashboard");
    } catch (err) {
      ErrorHandler(err, openSnackbar)
      setLoading(false)
    }
  };

  const SignUpWithGoogleHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await SignUpWithGoogle()
    } catch (err) {
      ErrorHandler(err, openSnackbar)
    }
    setLoading(false)
  };
  const SignUpWithGithubHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await SignUpWithGithub()
    } catch (err) {
      ErrorHandler(err, openSnackbar)
  };
  setLoading(false)
  }
  return (
    <>
  {
    loading && (
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
<div className="flex flex-wrap w-full">
    <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center mt-20 px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-4xl font-black m-0 text-center underline decoration-violet-500 hover:decoration-4 bg-clip-text text-transparent bg-gradient-to-r  from-violet-500 to-indigo-500 ">
              Sign Up For FREE !
            </p>
            <form className="flex flex-col pt-3 md:pt-8 mb-5" onSubmit={SignUpWithEmailHandler}>
                <div className="flex flex-col pt-4 gap-y-4">
                    <div className="flex relative ">
                        <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <PersonIcon />
                        </span>
                        <input ref={nameRef} type="text" id="design-login-name" className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Full Name"/> 
                        </div>
                    <div className="flex relative ">
                        <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <AlternateEmailIcon />
                        </span>
                        <input ref={emailRef} type="text" id="design-login-email" className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                    </div>
                    </div>
                    <div className="flex flex-col pt-4 gap-y-4 mb-10">
                        <div className="flex relative  ">
                            <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <LockIcon />
                            </span>
                                <input type={viewPassWord ? 'text' : 'password'} ref={passwordRef}  id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"  />
                            <div onClick={()=>{setViewPassWord(!viewPassWord)}} className="cursor-pointer inline-flex  items-center px-3  text-gray-500 ">
                                { viewPassWord ? <VisibilityOff/> : <Visibility /> }
                            </div>
                            </div>
                        <div className="flex relative ">
                            <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <LockIcon />
                            </span>
                            <input  type={viewPassWord ? 'text' : 'password'} ref={passwordConfirmRef}  id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Re-Type The Password"  />
                            <div onClick={()=>{setViewPassWord(!viewPassWord)}} className="cursor-pointer inline-flex  items-center px-3  text-gray-500 ">
                                { viewPassWord ? <VisibilityOff /> : <Visibility /> }
                            </div>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} id="submit" className=" w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-violet-800 shadow-md hover:text-violet-100 hover:bg-violet-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-purple-100">
                            <span className="w-full">
                                Sign Up
                            </span>
                        </button>
                    </form>
                    <Divider>Or</Divider>
                    <div className="flex flex-wrap  justify-center gap-4 sm:gap-y-0 sm:gap-x-4   mt-10">
                          <LoadingButton
                              color='secondary'
                              onClick={SignUpWithGithubHandler}
                              loading={loading}
                              loadingPosition="start"
                              startIcon={<GitHubIcon />}
                              variant="outlined"
                            >
                              Sign Up With Github
                            </LoadingButton>
                          <LoadingButton
                              color="secondary"
                              onClick={SignUpWithGoogleHandler}
                              loading={loading}
                              loadingPosition="start"
                              startIcon={<GoogleIcon />}
                              variant="outlined"
                            >
                              Sign Up With Google
                            </LoadingButton>
                    </div>
                    <div className="pt-12 pb-12 text-center">
                        <span className=' text-gray-400 mr-2'> 
                            Allready have an account? 
                        </span>
                        <Link to="/login" className="font-semibold underline ">
                                Login here.
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                <img alt="" className="hidden object-cover w-full h-screen md:block" src="https://images.unsplash.com/photo-1635377090186-036bca445c6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"/>
            </div>
        </div>

    </>
  );
}


export default Signin
