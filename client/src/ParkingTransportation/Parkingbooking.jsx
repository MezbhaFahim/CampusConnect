import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Parkingbooking.module.css";

const ParkingBooking = () => {
    const [timer, setTimer] = useState(120);
    const [userData, setUserData] = useState(null);
    const [transactionID, setTransactionID] = useState('');
    const [licensePlate, setLicensePlate] = useState('');

    useEffect(() => {
        fetchData();

        const countdownInterval = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime <= 1) {
                    window.location.reload();
                    return 120; 
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval); 
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/auth/api/auth');
            const data = response.data[0];
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (userData?.StudentID) {
            fetchLicensePlate(userData.StudentID);
        }
    }, [userData]);

    const fetchLicensePlate = async (studentId) => {
        try {
            const response = await axios.get('/auth/getLicensePlate', {
                params: { studentId }
            });
            console.log("License Plate Response:", response.data); // Log the full response
            setLicensePlate(response.data.licensePlate || ''); // Ensure licensePlate is set properly
        } catch (error) {
            console.error('Error fetching license plate:', error);
        }
    };

    const proceedToCheckout = async () => {
        try {
            await axios.post('/auth/proceedToCheckout', {
                transactionID,
                studentID: userData.StudentID,
            });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div>
            <div className={styles.headerRow}>
                <h2>Booking Information</h2>
                <div id="countdown">
                    Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60} seconds
                </div>
            </div>

            <div className={styles.bookingForm}>
                <form id="bookingForm">
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        value={userData?.StudentName || ''}
                        readOnly
                    />

                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={userData?.Phone || ''}
                        onChange={(e) => setUserData({ ...userData, Phone: e.target.value })}
                    />

                    <label htmlFor="licensePlate">License Plate:</label>
                    <input
                        type="text"
                        id="licensePlate"
                        value={licensePlate || ''}
                        readOnly
                    />

                    <label htmlFor="studentId">Student ID:</label>
                    <input
                        type="text"
                        id="studentId"
                        value={userData?.StudentID || ''}
                        readOnly
                    />

                    <button
                        type="button"
                        onClick={() => document.getElementById('paymentSection').style.display = 'block'}
                    >
                        Confirm Booking
                    </button>
                </form>

                <div className={styles.paymentMethodSection} id="paymentSection" style={{ display: 'none' }}>
                    <h2>Payment Confirmation</h2>

                    <div className={styles.inputBox}>
                        <span>Transaction ID:</span>
                        <input
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={transactionID}
                            onChange={(e) => setTransactionID(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={proceedToCheckout} className={styles.submitBtn}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParkingBooking;
