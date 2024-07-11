import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './BusRoutes.module.css';
import { Helmet } from 'react-helmet';

function BusRoutes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutesData = async () => {
      try {
        const response = await axios.get('/auth/api/fetchroutes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching bus routes:', error);
      }
    };

    fetchRoutesData();
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="../global.css" />
      </Helmet>
      <div className={style.container}>
        <div>
          <h1 className={style.introduction}>
            <span className={style["introduction-text"]}>Brac University Bus Routes <i className="fa-solid fa-route"></i></span>
            <button className={style["custom-button"]} onClick={() => window.location.href = '/'}>CampusConnect</button>
          </h1>
        </div>

        <div>
          <h1 className={style["going-trip"]}><span className={style["going-trip-text"]}>Trip Both-Ways</span></h1>
        </div>

        <div className={style.container}>
          <div className={style["vertical-line"]}></div>
          {routes.map((route, index) => (
            <div key={route.Name} className={index % 2 === 0 ? style["box-left"] : style["box-right"]}>
              <i className={`fa-solid ${route.Icon}`}></i>
              <div className={style.info} id={route.Name}>
                <h2>{route.Name}</h2>
                <p>Place: {route.Place} <br /> Time: {route.Time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BusRoutes;
