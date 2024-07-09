import React from 'react';
import style from './BusTicket.module.css';

function BusTicket() {
  return (
    <div className={style.container}>
      <form action="/auth/buyBusTickets" method="POST">
        <div className={style.row}>
          <div className={style.col}>
            <h3 className={style.title}>Student Information</h3>
            <div className={style.inputBox}>
              <span>Full Name :</span>
              <input type="text" id="fullName" name="fullName" placeholder="" readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Student ID :</span>
              <input type="number" id="studentID" name="studentID" placeholder="" readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Email :</span>
              <input type="email" id="email" name="email" placeholder="" readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Phone number  :</span>
              <input type="number" id="phone" name="phone" placeholder="" readOnly />
            </div>
            <div className={style.inputBox}>
              <span>Bus time :</span>
              <select id="time" name="time" type="text" className={`${style.customSelect}`} required>
                <option value="1">6:30 AM</option>
                <option value="2">5:00 PM</option>
              </select>
            </div>
          </div>
          <div className={style.col}>
            <h3 className={style.title}>Payment</h3>
            <div className={style.inputBox}>
              <span>Select your mode of Payment method</span>
              <div className={style.paymentButtons}>
                <button type="button" className={style.paymentBtn} id="bkashBtn" onClick={() => selectPayment('bkash')}>bkash</button>
                <button type="button" className={style.paymentBtn} id="nagadBtn" onClick={() => selectPayment('nagad')}>nagad</button>
              </div>
            </div>
            <div className={style.inputBox}>
              <span>Transaction ID :</span>
              <input type="text" name="transactionInput" placeholder="Select Your Payment Method" id="transactionInput" required />
            </div>
          </div>
        </div>
        <input type="submit" value="proceed to checkout" className={style.submitBtn} />
      </form>
    </div>
  );
}

export default BusTicket;
