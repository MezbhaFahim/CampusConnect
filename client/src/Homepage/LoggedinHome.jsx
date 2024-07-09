import React from 'react';
import style from './Homepage.module.css';

function LoggedinHome() {


  return (
    <React.Fragment>
      <header>
        <nav className={style["navbar"]}>
          <a className={style["logo"]} href="#">CampusConnect<span>.</span></a>
          <ul className={style["menu-links"]}>
            <span id="close-menu-btn" className="material-symbols-outlined">close</span>
            <li>
              <a href="/routine">Routine</a>
            </li>
            <li>
              <a href="/cafetaria">Cafetaria</a>
            </li>
            <li>
              <a href="#">Transportation</a>
              <ul className={style["dropdown-menu"]}>
                <li><a href="/bus-routes-in">Bus Routes</a></li>
                <li><a href="/bus-book">Book Seats</a></li>
                <li><a href="/bus-ticket">Buy Tickets</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Parking Slot</a>
              <ul className={style["dropdown-menu"]}>
                <li><a href="/parking">Book Parking Slot</a></li>
                <li><a href="/parkingconfirm">Parking payment Slot</a></li>
                <li><a href="/parkingContact">Queries</a></li>
              </ul>
            </li>
            <li>
              <a href="/StudentForum">Student Forum</a>
            </li>
            <li>
              <a href="/userProfile">MyProfile</a>
            </li>
          </ul>
          <span id="hamburger-btn" className="material-symbols-outlined">menu</span>
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
