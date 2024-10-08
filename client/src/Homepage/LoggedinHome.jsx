import React from 'react';
import style from './LoggedinHome.module.css';

function LoggedinHome() {


  return (
    <React.Fragment>
      <header>
        <nav className={style["navbar"]}>
          <a className={style["logo"]} href="#">CampusConnect<span>.</span></a>
          <ul className={style["menu-links"]}>
            <li>
              <a href="/Routine">Routine</a>
            </li>
            <li>
              <a href="#">Transportation</a>
              <ul className={style["dropdown-menu"]}>
                <li><a href="/BusRoutes">Bus Routes</a></li>
                <li><a href="/BusBook">Book Seats</a></li>
                <li><a href="/BusTicket">Buy Tickets</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Parking Slot</a>
              <ul className={style["dropdown-menu"]}>
                <li><a href="/BookParking">Book Parking Slot</a></li>
                <li><a href="/Parkingbooking">Parking payment Slot</a></li>
                <li><a href="/ParkingContact">Queries</a></li>
              </ul>
            </li>
            <li>
              <a href="/UserProfile">MyProfile</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className={style["hero-section"]}>
        <div className={style["content"]}>
          <h2>Optimize Your Student Experience</h2>
          <p>
            From crafting your class routines to checking out the cafeteria menu, booking bus seats, and securing parking slots – we've got it all covered.
          </p>
          <button>Welcome</button>
        </div>
      </section>
    </React.Fragment>

  );
}

export default LoggedinHome;
