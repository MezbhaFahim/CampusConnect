import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Homepage.module.css';

function Homepage() {
  const navigate = useNavigate();

  const redirectToSignupPage = () => {
    navigate('/SignupSignin');
  };

  return (
        <div>
      <header>
        <nav className={style["navbar"]}>
          <a className={style["logo"]} href="#">CampusConnect<span>.</span></a>
          <ul className={style["menu-links"]}>
            <span id="close-menu-btn" className="material-symbols-outlined">close</span>
            <li>
              <a href="/routine">Routine</a>
            </li>
            <li>
              <a href="#">Transportation</a>
              <ul className={style["dropdown-menu"]}>
                <li><a href="/bus-routes">Bus Routes</a></li>
              </ul>
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
          <button onClick={redirectToSignupPage}>Sign-Up</button>
        </div>
      </section>
    </div>

  );
}

export default Homepage;
