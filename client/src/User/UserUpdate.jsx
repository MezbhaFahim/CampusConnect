import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './UserProfile.module.css';

function UserUpdate() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [userData, setUserData] = useState({
    StudentName: '',
    StudentID: '',
    Username: '',
    Email: '',
    Phone: ''
  });

  const openPopup = () => {
    setIsPopupActive(true);
  };

  const closePopup = () => {
    setIsPopupActive(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/auth/api/auth');
      setUserData(response.data[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className={style.container}>
      <div className={`${style.popup} ${isPopupActive ? style.active : ''}`}>
        <div className={style.closeBtn} onClick={closePopup}>&times;</div>
        <div className={style.form}>
          <h2>Are you sure you want to log out?</h2>
          <button className={style.btn2} id="logoutButton" href="/">Logout</button>
        </div>
      </div>

      <div className={style.leftbox}>
        <nav>
          <a href="/userProfile" className={style.active}>
            <i className="fa fa-user"></i>
          </a>
          <a href="/homepage">
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
          <a href="/routine">
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </a>
          <a href="/userUpdate">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </a>
          <a href="#Logout?" id="show-login" onClick={openPopup}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </a>
        </nav>
      </div>

      <div className={style.rightbox}>
        <div className={style.profile}>
          <form action="/auth/updateUser" method="POST">
            <h1>Personal Info</h1>
            <h2>Full Name</h2>
            <input
              type="text"
              id="StudentName"
              className={style.input}
              value={userData.StudentName}
              onChange={handleChange}
            />
            <h2>Student ID</h2>
            <input
              type="number"
              id="StudentID"
              className={style.input}
              value={userData.StudentID}
              readOnly
            />
            <h2>Username</h2>
            <input
              type="text"
              id="Username"
              className={style.input}
              value={userData.Username}
              readOnly
            />
            <h2>Email</h2>
            <input
              type="email"
              id="Email"
              className={style.input}
              value={userData.Email}
              onChange={handleChange}
            />
            <br />
            <button className={style.btn} id="updateBtn">Update</button>
          </form>
        </div>
      </div>

      
    </div>
  );
}

export default UserUpdate;
