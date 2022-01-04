import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {auth} from "./firebase/config";
import {Backdrop, CircularProgress, Divider} from "@mui/material";
import ErrorHandler from "./ErrorHandler";
import {useSnackbar} from "react-simple-snackbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { LoadingButton } from "@mui/lab";

function Login() {
  const [openSnackbar] = useSnackbar();
  const passwordRef = useRef();
  const emailReff = useRef();
  const [loading, setLoading] = useState();
  const [viewPassWord, setViewPassWord] = useState(false);
  const navigate = useNavigate();
  const {login, SignUpWithGoogle, SignUpWithGithub} = useAuth();

  const LogInHandler = async (e) => {
    const email = emailReff.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    try {
      setLoading(true);
      await login(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      ErrorHandler(err, openSnackbar);
      setLoading(false);
    }
  };
  const logInWithGoogleHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await SignUpWithGoogle();
    } catch (err) {
      ErrorHandler(err, openSnackbar);
      setLoading(false);
    }
  };
  const logInWithGithubHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await SignUpWithGithub();
    } catch (err) {
      ErrorHandler(err, openSnackbar);
      setLoading(false);
    }
  };
  // const logInWithTwitterHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     await SignUpWithTwitter();
  //   } catch (err) {
  //     ErrorHandler(err, openSnackbar);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {
    loading && (
      <Backdrop   open={loading}  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      )
    }
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col mt-20 justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-4xl m-0 font-black text-center underline decoration-violet-500 hover:decoration-4 bg-clip-text text-transparent bg-gradient-to-r  from-violet-500 to-indigo-500 ">
              Welcome Back !
            </p>
            <form className="flex flex-col pt-3 md:pt-8 mb-5" onSubmit={LogInHandler}>
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    ref={emailReff}
                    type="text"
                    id="design-login-email"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4 mb-12">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type={viewPassWord ? 'text' : 'password'}
                    ref={passwordRef}
                    id="design-login-password"
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Password"
                  />
                  <div onClick={()=>{setViewPassWord(!viewPassWord)}} className="cursor-pointer inline-flex  items-center px-3  text-gray-500 ">
                    { viewPassWord ? <VisibilityOff/> : <Visibility /> }
                  </div>
                </div>
                <div className="pt-5 text-start">
                  <span className=" text-gray-400 mr-2">Forget Your Password ?</span>
                  <Link to="/updatePassword" className="font-semibold underline ">
                    Reset it
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-violet-800 shadow-md hover:text-violet-100 hover:bg-violet-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-purple-100"
              >
                <span className="w-full">Login</span>
              </button>
            </form>
            <Divider>Or</Divider>
            <div className="flex flex-wrap  justify-center gap-4 sm:gap-y-0 sm:gap-x-4   mt-10">
                          <LoadingButton
                              color='secondary'
                              onClick={logInWithGithubHandler}
                              loading={loading}
                              loadingPosition="start"
                              startIcon={<GitHubIcon />}
                              variant="outlined"
                            >
                              Login With Github
                            </LoadingButton>
                          <LoadingButton
                              color="secondary"
                              onClick={logInWithGoogleHandler}
                              loading={loading}
                              loadingPosition="start"
                              startIcon={<GoogleIcon />}
                              variant="outlined"
                            >
                              Login With Google
                            </LoadingButton>
                    </div>
            <div className="pt-12 pb-12 text-center">
              <span className=" text-gray-400 mr-2">Need An Account ?</span>
              <Link to="/signup" className="font-semibold underline ">
                Register Here
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            alt=""
            className="hidden object-cover w-full h-screen md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
