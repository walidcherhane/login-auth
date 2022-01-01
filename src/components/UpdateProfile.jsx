import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Input } from 'semantic-ui-react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Divider } from "@mui/material";


function UpdateProfile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const alphabet = /^[a-zA-Z ]*$/;
  const numbers = /^(\(?\+?[0-9]*\)?)?[0-9_\-()]*$/;
  const spaceChar = /^ {1,}/ ;
  const Navigate = useNavigate();
  const isValidNumber = numbers.test(phone)
  const isValidName = alphabet.test(name)
  const isStartWithSpace = spaceChar.test(name)

  const handleChange = async (e) => {
    e.preventDefault();
      try{
        if (isValidName){
          if (isStartWithSpace){
            setError('Your Name Cannot start with a space')
            return;
          }
          setError(null)
        } else{
          setError('Please Enter a valid Name');
          return 
        }
        if (isValidNumber){
          setError(null)
        } else{
          setError('Please Enter a valid Phone Number');
          return 
        }
        setLoading(true)
        setError(null);
        await updateProfile(currentUser, {
          displayName: name ? name : currentUser.displayName,
          photoURL: profilePicture ? profilePicture : currentUser.photoURL,
          phoneNumber: phone ? phone : currentUser.phoneNumber,
        })
        Navigate("/dashboard");
        window.location.reload();

      } catch (err){
        setError("Failed To Update Profile");
        console.log(err)
        setLoading(false)
      }
  };
  return (
    <>
      {loading
      && (<Box sx={{ width: '100%' }}>
          <LinearProgress />
          </Box>
         )}
        <div className="container mx-auto">
          <div className="text-center mt-10 mb-5">
          <Header size='huge'>Update Profile</Header>
          <Divider variant="middle" />
          </div>
        <div className="col-8 mx-auto my-4">
          {error && (<Alert severity="error">{error}</Alert>)}
        </div>
          <div className="px-8 py-16 bg-gray-100 shadow-lg mx-8 rounded-lg shadow-gray-200">
          <Form onSubmit={handleChange} >
            <Form.Field >
            <label>Full Name</label>
            <input placeholder='Leave Blank to keep the same'
              id="name"
              onChange={(e) => {setName(e.target.value)}}
              type="text"
            />
            </Form.Field>
            <Form.Field >
              <label>Phone Number</label>
              <input placeholder='Leave Blank to keep the same'
                    id="phoneNumber"
                    onChange={(e) => {setPhone(e.target.value)}}
                    type="tel"
              />
              </Form.Field>
            <Form.Field >
              <label>Profile Link</label>
              <Input label='http://' placeholder='Leave Blank to keep the same' id="plink" onChange={(e) => {setProfilePicture(e.target.value);}} />
            </Form.Field>
            <div className="text-center mt-10">
            <Button.Group>
              <Button type='submit' positive disabled={loading}>Update Info</Button>
              <Button.Or />
              <Link  to="/dashboard">
                <Button >Back to dashboard</Button>
              </Link>
            </Button.Group>
            </div>
          </Form>
          </div>
          
        </div>
            
    </>

  );
}

export default UpdateProfile;
