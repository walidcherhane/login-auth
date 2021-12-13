import Login from "./components/login";
import Nav from "./components/nav";
import Signin from "./components/signin";
import Dashboard from "./components/dashboard";
import UpdateProfile from "./components/UpdateProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./components/Private";
import Public from "./components/Public";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import Private from "./components/Private";

function App() {
  return (
    <AuthProvider>
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
              <Route exact path="/signin" element={<Signin />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
