import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './BusTicket.module.css';

function BusTicket() {
  const [userData, setUserData] = useState({
    fullName: '',
    studentID: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/auth/api/auth');
        const user = response.data[0];
        setUserData({
          fullName: user.StudentName,
          studentID: user.StudentID,
          email: user.Email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const selectPayment = (method) => {
    document.getElementById('transactionInput').placeholder = `Enter your ${method} transaction ID`;
  };

  return (
    <div className={style.container}>
      <form action="/auth/buyBusTickets" method="POST">
        <div className={style.row}>
          <div className={style.col}>
            <h3 className={style.title}>Student Information</h3>
            <div className={style.inputBox}>
              <span>Full Name :</span>
              <input type="text" id="fullName" name="fullName" value={userData.fullName} readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Student ID :</span>
              <input type="number" id="studentID" name="studentID" value={userData.studentID} readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Email :</span>
              <input type="email" id="email" name="email" value={userData.email} readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Bus time :</span>
              <select id="time" name="time" className={style.customSelect} required>
                <option value="1">6:30 AM</option>
                <option value="2">5:00 PM</option>
              </select>
            </div>
          </div>
          <div className={style.col}>
            <h3 className={style.title}>Payment</h3>

            <div className={style.inputBox}>
              <span>Transaction ID :</span>
              <input type="text" name="transactionInput" placeholder="Select Your Payment Method" id="transactionInput" required />
            </div>
          </div>
        </div>
        <input type="submit" value="proceed to checkout" className={style.submitBtn} />
      </form>
    </div>
  );
}

export default BusTicket;
