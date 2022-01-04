import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function Nav() {
  const { currentUser,  } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
      {
        currentUser && (
          
        <nav className=" bg-indigo-100 w-full flex relative justify-between items-center mx-auto px-8 h-20">
        <div className="flex gap-x-4 items-center text-indigo-900 ">
            <Link className="w-10" to="/">
             <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpassword-managers.bestreviews.net%2Fwp-content%2Fuploads%2Fsites%2F34%2Fgoogle-authenticator-logo-1.png&f=1&nofb=1" alt="" />
            </Link>
            <span>Login Auth App</span>
        </div>
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
               <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
             >
                 <Link to='/'>
                   <MenuItem onClick={handleClose}>
                     <div className="flex gap-x-3" >
                         Home
                     </div>
                   </MenuItem>
                  </Link>
 
                  <Link to='/dashboard'>
                     <MenuItem onClick={handleClose}>
                       <div className="flex gap-x-3" >
                       Profile
                       </div>
                     </MenuItem>
                  </Link>
                  <Link to='/update-profile'>
                     <MenuItem onClick={handleClose}>
                       <div className="flex gap-x-3" >
                       Update Profile
                       </div>
                     </MenuItem>
                  </Link>
              </Menu>
 
            </div>
 
            <div className="block">
           <div className="inline relative">
               <button type="button"  onClick={handleMenu} className="flex gap-x-2 items-center relative  border border-indigo-300 rounded-full transition duration-200 hover:shadow-lg hover:shadow-indigo-500/3">
              <div className="pl-1 w-10 text-indigo-500">
                <MenuIcon />
              </div>
 
              <div className="block flex-grow-0 flex-shrink-0 h-10 w-10" >
                   <img className="block flex-grow-0 flex-shrink-0 h-10 w-10 rounded-full " src={currentUser.photoURL} alt="" />
              </div>
               </button>
           </div>
            </div>
          </div>
        </div>
         </nav>
        )
      }

    </React.Fragment>

  );
}

export default Nav;
