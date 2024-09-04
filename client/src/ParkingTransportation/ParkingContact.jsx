import React from 'react';
import styles from './ParkingContact.module.css';

const ParkingContact = () => {
  return (
    <div className={styles.container}>
      <main className={styles.row}>
        <section className={`${styles.col} ${styles.left}`}>
          <div className={styles.contactTitle}>
            <h1>Get In Touch</h1>
            <p>
              For any inquiries or feedback about our cafeteria, please feel
              free to contact us using the information below:
            </p>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className={styles.details}>
                <span>Phone</span>
                <span>+8809638464646</span>
              </div>
            </div>

            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className={styles.details}>
                <span>Email</span>
                <span>BracParking@bracu.ac.bd</span>
              </div>
            </div>

            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className={styles.details}>
                <span>Location</span>
                <span>
                  <a
                    href="https://www.google.com/maps/place/BRAC+University/"
                    style={{ color: '#2b2b2b' }}
                  >
                    KHA 224, Progati Sarani, Merul Badda, Dhaka 1212
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.socialMedia}>
            <a href="https://www.facebook.com/BRACUniversity/">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/bracuniversity?lang=en">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://bd.linkedin.com/school/brac-university/">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </section>

        <section className={`${styles.col} ${styles.right}`}>
          <form
            className={styles.messageForm}
            action="https://formsubmit.co/abrargroad2000@gmail.com"
            method="POST"
          >
            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <input type="text" name="name" required />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <input type="email" name="email" required />
              <label htmlFor="email">Email</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <input type="text" name="subject" required />
              <label htmlFor="subject">Subject</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <textarea name="message" required></textarea>
              <label htmlFor="message">Say Something</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <button type="submit">Send Message</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ParkingContact;
