import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage.jsx';
import SignupSignin from './AuthenticationPages/SignupSignin.jsx';
import LoggedinHome from './Homepage/LoggedinHome.jsx';
import LoggedinBusRoutes from './ParkingTransportation/Transportation/LoggedinBusRoutes.jsx';
import BusRoutes from './ParkingTransportation/Transportation/BusRoutes.jsx';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/SignupSignin" element={<SignupSignin />} />
        <Route path="/Home" element={<LoggedinHome />} />
        <Route path="/BusRoutes" element={<LoggedinBusRoutes />} />
        <Route path="/BusRoutes-Signout" element={<BusRoutes />} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
