import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase/config";

import { Button, Image, Modal } from 'semantic-ui-react'


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import EditIcon from '@material-ui/icons/Edit';
import { ListItemIcon } from "@mui/material";


function Nav() {
  const { currentUser, signout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [OpenModel, setOpenModel] = useState(false)
  const Navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout =async(e)=>{
    setOpenModel(false)
    e.preventDefault();
    try {
      await signout(auth);
      Navigate("/login");
    } catch (error) {
      alert(error)
    }
  }
 
  if (currentUser) {
    if (!currentUser.displayName) {
      currentUser.displayName = "Not set yet";
    } else if (!currentUser.photoURL) {
      currentUser.photoURL =
        "https://media.istockphoto.com/photos/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-of-picture-id1294780139";
    }
  }
  return (
    <React.Fragment>
       <Modal size='tiny' open={OpenModel} onClose={()=>{setOpenModel(false)}} dimmer='blurring' className="d-none">
          <Modal.Header>Log out</Modal.Header>
          <Modal.Content>
           <p>Are you sure you want to Log Out ?</p>
          </Modal.Content>
          <Modal.Actions>
             <Button negative onClick={()=>{setOpenModel(false)}}>
                 Cancel
             </Button>
            <Button positive onClick={handleSignout}>
            Yes
            </Button>
          </Modal.Actions>
        </Modal>
    <nav className="bg-gray-200 p-5 px-10 sm:px-40  ">
      <div  className="container mx-auto flex flex-row justify-center  items-center">
      <Link className="navbar-brand grow text-gray-900 font-bold" to="/dashboard" >
          Login Auth App
        </Link>
        {!currentUser ? (
          <ul className="flex gap-x-4  ">
            <li>
              <Link to="/signup">
                Sign up 
              </Link>
            </li>
            <li >
              <Link to="/login">
                Log In
              </Link>
            </li>
          </ul>
        ) : (
          <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 80 }}><Link to='/'>Home</Link></Typography>
                <Typography sx={{ minWidth: 80 }}><Link to='/dashboard'>Profile</Link></Typography>
                <Tooltip title="See More">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                    <Avatar sx={{ width: 40, height: 40 }}> <Image  src={currentUser.photoURL} /> </Avatar>
                  </IconButton>
                </Tooltip >
              </Box>
              <Menu
              anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} 
              PaperProps={{
                  elevation: 0, sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
              <Link to="/dashboard" >
                <MenuItem sx={{ my: 1 }}>
                  <Avatar />  Profile
                </MenuItem>
              </Link>
              <Divider />
              <Link to="/Update-profile" >
                <MenuItem sx={{ my: 0.25 }}>
                  <ListItemIcon>
                  <EditIcon  fontSize="small"  />  
                  </ListItemIcon>
                  <span> Update Your Profile</span>
                </MenuItem>
              </Link>
              <Divider />
              <div  onClick={()=>{setOpenModel(true)}}>
                <MenuItem sx={{ my: 0.25 }}>
                  <ListItemIcon >
                    <Logout  fontSize="small" sx={{me: 1}}/>  
                  </ListItemIcon>
                  <span>Log Out</span>
                </MenuItem>
              </div>
            </Menu>
          </React.Fragment>

        )}

      </div>
    </nav>
    



    </React.Fragment>

  );
}

export default Nav;
