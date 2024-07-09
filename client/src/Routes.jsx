import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import SignupSignin from './AuthenticationPages/SignupSignin';
import LoggedinHome from './Homepage/LoggedinHome';
import LoggedinBusRoutes from './ParkingTransportation/Transportation/LoggedinBusRoutes';
import BusRoutes from './ParkingTransportation/Transportation/BusRoutes';
import BusBook from './ParkingTransportation/Transportation/BusBooking';
import BusTicket from './ParkingTransportation/Transportation/BusTicket';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/SignupSignin" element={<SignupSignin />} />
        <Route path="/Home" element={<LoggedinHome />} />
        <Route path="/BusRoutes" element={<LoggedinBusRoutes />} />
        <Route path="/BusRoutes-Signout" element={<BusRoutes />} />
        <Route path="/BusBook" element={<BusBook />} />
        <Route path="/BusTicket" element={<BusTicket />} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
