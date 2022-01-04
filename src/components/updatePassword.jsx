import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";
import ErrorHandler from "./ErrorHandler";
import { useSnackbar } from 'react-simple-snackbar'
import { Backdrop, CircularProgress } from "@mui/material";



function UpdatePassword() {
  const [openSnackbar] = useSnackbar()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await resetPassword(auth, email)
      openSnackbar('Email has been sent to your email adress, Click the link to reset the password')
      navigate("/login");
    } catch (err) {
      ErrorHandler(err,openSnackbar)
      setLoading(false)
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
    <div className="">
			<div className="flex justify-center ">
					<div className="w-full  flex">
            <img className="w-full h-screen bg-gray-400 hidden lg:block lg:w-1/2  bg-cover rounded-l-lg" src="https://source.unsplash.com/XWBO0rr_UYA/" alt="" />
					<div className="w-full lg:w-1/2 bg-white p-5 my-auto rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
							<h3 className="pt-4 mb-2 text-4xl">Forgot Your Password?</h3>
							<p className="mb-4 text-lg text-gray-700">
								We get it, stuff happens. Just enter your email address below and we'll send you a
								link to reset your password!
							</p>
						</div>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={submitHandler}>
							<div className="mb-4">
								<label className="block mb-2 text-lg font-bold text-gray-700" for="email">
									Email
								</label>
								<input
									className="w-full px-3 p-5 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Enter Email Address..."
                  onChange={(e) => setEmail(e.target.value)} 
                  required='true'
								/>
							</div>
							<div className="mb-6 text-center mx-auto ">
								<button
									className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Reset Password
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block  text-blue-500 align-baseline hover:text-blue-800"
                  to='/signUp'
								>
									Create an Account!
								</Link>
							</div>
							<div className="text-center">
								<Link
									className="inline-block  text-blue-500 align-baseline hover:text-blue-800"
									to="/login"
								>
									Already have an account? Login!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  </>
  );
}


export default UpdatePassword
