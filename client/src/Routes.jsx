import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import SignupSignin from './AuthenticationPages/SignupSignin';
import LoggedinHome from './Homepage/LoggedinHome';
import BusRoutes from './ParkingTransportation/BusRoutes';
import BusBook from './ParkingTransportation/BusBooking';
import BusTicket from './ParkingTransportation/BusTicket';
import BookParking from './ParkingTransportation/BookParking';
import Routine from './Routine/Routine';
import UserProfile from './User/UserProfile';
import UserUpdate from './User/UserUpdate';
import ParkingBooking from './ParkingTransportation/Parkingbooking';
import ParkingContact from './ParkingTransportation/ParkingContact';

function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<LoggedinHome />} />
        <Route path="/SignupSignin" element={<SignupSignin />} />
        <Route path="/BusRoutes" element={<BusRoutes />} />
        <Route path="/BusBook" element={<BusBook />} />
        <Route path="/BusTicket" element={<BusTicket />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/UserUpdate" element={<UserUpdate />} />
        <Route path="/BookParking" element={<BookParking />} />
        <Route path="/Routine" element={<Routine />} />
        <Route path="/ParkingBooking" element={<ParkingBooking />} />
        <Route path="/ParkingContact" element={<ParkingContact />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
