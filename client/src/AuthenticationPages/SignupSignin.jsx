import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import style from './SignupSignin.module.css';
import SigninCartoon from './SigninCartoon.png';
import SignupCartoon from './SignupCartoon.png';

function SignupSignin() {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://kit.fontawesome.com/64d58efce2.js" crossOrigin="anonymous"></script>
        <title>Entry Portal</title>
      </Helmet>

      <div className={`${style["container"]} ${signUpMode ? style["sign-up-mode"] : ''}`}>
        <div className={style["forms-container"]}>
          <div className={style["signin-signup"]}>
            <form action="/auth/signin" className={style["sign-in-form"]} method="POST">
              <h2 className={style["title"]}>Sign in</h2>
              <div className={style["input-field"]}>
                <i className="fas fa-user"></i>
                <input type="text" name="Username" placeholder="Username" />
              </div>
              <div className={style["input-field"]}>
                <i className="fas fa-lock"></i>
                <input type="password" name="Password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className={`${style["btn"]} ${style["solid"]}`} />
              <p className={style["social-text"]}>Or Sign in with social platforms</p>
              <div className={style["social-media"]}>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="/auth/signup" className={style["sign-up-form"]} method="POST">
              <h2 className={style["title"]}>Sign Up</h2>
              <div className={style["input-field"]}>
                <i className="fa fa-id-card" aria-hidden="true"></i>
                <input type="text" name="StudentID" placeholder="Student ID" />
              </div>
              <div className={style["input-field"]}>
                <i className="fas fa-user"></i>
                <input type="text" name="Username" placeholder="Username" />
              </div>
              <div className={style["input-field"]}>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <input type="text" name="StudentName" placeholder="Name" />
              </div>
              <div className={style["input-field"]}>
                <i className="fas fa-envelope"></i>
                <input type="email" name="Email" placeholder="Email" />
              </div>
              <div className={style["input-field"]}>
                <i className="fas fa-lock"></i>
                <input type="password" name="Password" placeholder="Password" />
              </div>
              <input type="submit" value="Sign up" className={`${style["btn"]} ${style["solid"]}`} />
              <p className={style["social-text"]}>Or sign up with social platforms</p>
              <div className={style["social-media"]}>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={style["social-icon"]}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className={style["panels-container"]}>
          <div className={style["panel"] + ' ' + style["left-panel"]}>
            <div className={style["content"]}>
              <h3>No Account?</h3>
              <p>
                Seize the moment! Craft your personalized routine for an extraordinary semester ahead. Unleash possibilities and make it uniquely yours!
              </p>
              <button className={`${style["btn"]} ${style["transparent"]}`} id="sign-up-btn" onClick={() => setSignUpMode(true)}>Sign Up</button>
            </div>
            <img src={SigninCartoon} className={style["image"]} alt="Sign in Cartoon" />
          </div>
          <div className={style["panel"] + ' ' + style["right-panel"]}>
            <div className={style["content"]}>
              <h3>Already Have an Account?</h3>
              <p>
                Elevate your routine, effortlessly check for clashes, and simplify your life with us! Excitement awaits – update routine now!
              </p>
              <button className={`${style["btn"]} ${style["transparent"]}`} id="sign-in-btn" onClick={() => setSignUpMode(false)}>Sign In</button>
            </div>
            <img src={SignupCartoon} className={style["image"]} alt="Sign up Cartoon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupSignin;