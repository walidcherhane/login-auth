import Login from "./components/login";
import Nav from "./components/nav";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import UpdateProfile from "./components/UpdateProfile";
import  UpdatePassword  from "./components/updatePassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SnackbarProvider from 'react-simple-snackbar'
import Public from "./components/Public";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import Private from "./components/Private";

import 'semantic-ui-css/semantic.min.css';
function App() {
  return (
    <AuthProvider>
    <SnackbarProvider>
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Private />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route exact path="/" element={<Public />}>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path='/UpdatePassword' element={<UpdatePassword />} />
            </Route>
          </Routes>
        </Router>
      </div>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
