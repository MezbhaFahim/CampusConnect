import React from 'react';
import style from './BusRoutes.module.css';

function redirectToBookingPage() {
  window.location.href = '/'; 
}

function BusRoutes() {
  return (
    <div>
  <div>
    <h1 className={style["introduction"]}>
      <span className={style["introduction-text"]}>Brac University Bus Routes <i className="fa-solid fa-route"></i></span>
      <button className={style["custom-button"]} onClick={redirectToBookingPage}>CampusConnect</button>
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
        <h2>New Market</h2>
        <p>Description of New Market route</p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-city"></i>
      <div className={style["info"]} id="Dhanmondi">
        <h2>Dhanmondi</h2>
        <p>Description of Dhanmondi route</p>
      </div>
    </div>
    <div className={style["box-left"]}>
      <i className="fa-solid fa-hospital"></i>
      <div className={style["info"]} id="Kalabagan">
        <h2>Kalabagan</h2>
        <p>Description of Kalabagan route</p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-building-columns"></i>
      <div className={style["info"]} id="Manik Mia Avenue">
        <h2>Manik Mia Avenue</h2>
        <p>Description of Manik Mia Avenue route</p>
      </div>
    </div>
    <div className={style["box-left"]}>
      <i className="fa-solid fa-road"></i>
      <div className={style["info"]} id="Sobhanbag">
        <h2>Sobhanbag</h2>
        <p>Description of Sobhanbag route</p>
      </div>
    </div>
    <div className={style["box-right"]}>
      <i className="fa-solid fa-map-pin"></i>
      <div className={style["info"]} id="BRAC University">
        <h2>BRAC University</h2>
        <p>Description of BRAC University route</p>
      </div>
    </div>
  </div>
</div>

  );
}

export default BusRoutes;
