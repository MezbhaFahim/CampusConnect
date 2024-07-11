import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './BusBooking.module.css';

function BusBook() {
  const [userData, setUserData] = useState({ studentID: '', email: '', phone: '' });
  const [busSeatData, setBusSeatData] = useState({ going: 0, returning: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/auth/api/auth');
        const user = response.data[0];
        setUserData({
          studentID: user.StudentID,
          email: user.Email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBusSeatAvailability = async () => {
      try {
        const response = await axios.get('/auth/api/busSeatAvailability');
        setBusSeatData(response.data);
      } catch (error) {
        console.error('Error fetching bus seat availability:', error);
      }
    };

    fetchData();
    fetchBusSeatAvailability();
  }, []);

  return (
    <div>
      <div className={style["available-seats"]}>
        <h3>Available Seats</h3>
        <p id="goingSeats">Going Trip Seat Available: {busSeatData.going}</p>
        <p id="returningSeats">Returning Trip Seat Available: {busSeatData.returning}</p>
      </div>

      <div className={style["booking-form-box"]}>
        <div className={style["heading"]}>
          <h2>Book Your Seats!</h2>
        </div>

        <div className={style["booking-form"]}>
          <form action="/auth/bookTickets" method="POST">
            <div className={style["input-grp"]}>
              <label htmlFor="studentID">Student ID</label>
              <input type="number" id="studentID" name="studentID" className={style["form-control"]} value={userData.studentID} readOnly />
            </div>

            <div className={style["input-grp"]}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className={style["form-control"]} value={userData.email} readOnly />
            </div>

            <div className={style["input-grp-time"]}>
              <label htmlFor="goingFrom">Going From</label>
              <select id="goingFrom" name="goingFrom" className={`${style["custom-select"]}`} required>
                <option value="1">Newmarket</option>
                <option value="2">Brac University</option>
              </select>
            </div>

            <div className={style["input-grp-time"]}>
              <label htmlFor="goingTo">Going To</label>
              <select id="goingTo" name="goingTo" className={`${style["custom-select"]}`} required>
                <option value="1">Brac University</option>
                <option value="2">Newmarket</option>
              </select>
            </div>

            <div className={style["input-grp-time"]}>
              <label htmlFor="time">Time</label>
              <select id="time" name="time" className={`${style["custom-select"]}`}>
                <option value="1">6:30 AM</option>
                <option value="2">5:00 PM</option>
              </select>
            </div>
            <br />

            <div className={style["input-grp-btn"]}>
              <button type="submit" className={`${style["btn"]} ${style["btn-primary"]} ${style["flight"]}`}>Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusBook;
