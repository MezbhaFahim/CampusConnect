import React from 'react';
import style from './BusBooking.module.css';

function BusBook() {
  return (
    <div>
      <div className={style["available-seats"]}>
        <h3>Available Seats</h3>
        <p id="goingSeats">Going Trip Seat Available:</p>
        <p id="returningSeats">Returning Trip Seat Available:</p>
      </div>

      <div className={style["booking-form-box"]}>
        <div className={style["heading"]}>
          <h2>Book Your Seats!</h2>
        </div>

        <div className={style["booking-form"]}>
          <form action="/auth/bookTickets" method="POST">
            <div className={style["input-grp"]}>
              <label htmlFor="studentID">Student ID</label>
              <input type="number" id="studentID" name="studentID" className={style["form-control"]} readOnly />
            </div>

            <div className={style["input-grp"]}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className={style["form-control"]} readOnly />
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

            <div className={style["input-grp-2"]}>
              <label htmlFor="number">Phone Number</label>
              <input type="number" id="number" name="number" className={style["form-control"]} readOnly />
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
