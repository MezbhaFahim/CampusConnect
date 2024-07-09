import React from 'react';
import style from './LoggedinBusRoutes.module.css';

function LoggedinBusRoutes() {

  return (
    <div>
  <div>
    <h1 className={style["introduction"]}>
      <span className={style["introduction-text"]}>Brac University Bus Routes <i className="fa-solid fa-route"></i></span>
      <button className={style["custom-button"]} onClick={redirectToBookingPage}>Book Seats</button>
    </h1>
  </div>

  <div>
    <h1 className={style["going-trip"]}><span className={style["going-trip-text"]}>Trip Both-Ways</span></h1>
  </div>
  
  <div className={style["container"]}>
    <div className={style["vertical-line"]}></div>
    <div className={style["box-left"]}>
      <i className="fa-solid fa-shop"></i>
      <div className={style["info"]} id="New Market">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-city"></i>
      <div className={style["info"]} id="Dhanmondi">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div className={style["box-left"]}>
      <i className="fa-solid fa-hospital"></i>
      <div className={style["info"]} id="Kalabagan">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-building-columns"></i>
      <div className={style["info"]} id="Manik Mia Avenue">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div className={style["box-left"]}>
      <i className="fa-solid fa-road"></i>
      <div className={style["info"]} id="Sobhanbag">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-map-pin"></i>
      <div className={style["info"]} id="BRAC University">
        <h2></h2>
        <p></p>
      </div>
    </div>
  </div>
</div>

  );
}

export default LoggedinBusRoutes;
