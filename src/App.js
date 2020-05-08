import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Signup from './containers/signup/SignUp';
import Login from './containers/signin/SignIn';
import Home from './containers/home/Home';
import PrivateRoute from './utils/PrivateRoute';
import Bookings from './containers/bookings/Bookings'

function App() {
  return (
    <Router>
   <PrivateRoute exact path="/" component={Home} />
   <PrivateRoute exact path="/booking" component={Bookings} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    {/* <Route path="/dashboard" component={Dashboard} /> */}
    
</Router>
  );
}

export default App;
