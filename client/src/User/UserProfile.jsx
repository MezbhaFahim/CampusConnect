import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import style from './UserProfile.module.css';

function UserProfile() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [userData, setUserData] = useState({});

  const openPopup = () => {
    setIsPopupActive(true);
  };

  const closePopup = () => {
    setIsPopupActive(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/auth/api/auth');
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <div className={`${style.popup} ${isPopupActive ? style.active : ''}`}>
        <div className={style.closeBtn} onClick={closePopup}>&times;</div>
        <div className={style.form}>
          <h2>Are you sure you want to log out?</h2>
          <button className={style.btn2} id="logoutButton">Logout</button>
        </div>
      </div>

      <div className={style.leftbox}>
        <nav>
          <a href="/userProfile" className={style.active}>
            <i className="fa fa-user"></i>
          </a>
          <a href="/Home">
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
          <a href="/Routine">
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
        <div className={style.profile} id="profile">
          <h1>Personal Info</h1>
          <h2>Full Name</h2>
          <p id="fullName">{userData.StudentName}</p>
          <h2>Student ID</h2>
          <p id="studentID">{userData.StudentID}</p>
          <h2>Username</h2>
          <p id="username">{userData.Username}</p>
          <h2>Email</h2>
          <p id="email">{userData.Email}</p>
        </div>
      </div>

      
    </div>
  );
}

export default UserProfile;
