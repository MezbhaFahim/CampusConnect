import React, { useEffect, useState } from "react";
import axios from "axios";
import parkingBackground from "./parking-background.jpg";
import styles from "./BookParking.module.css";

function ParkingForm() {
  const [userData, setUserData] = useState({
    StudentName: "",
    StudentID: "",
    Phone: "",
  });
  const [parkingInfo, setParkingInfo] = useState([]);
  const [status, setStatus] = useState({
    parkedCars: 0,
    availableSpace: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get("/auth/api/auth");
        const parkingInfoResponse = await axios.get("/auth/parkingInfo");
        const parkingStatusResponse = await axios.get("/auth/parkingStatus");

        setUserData(userDataResponse.data[0]);
        setParkingInfo(parkingInfoResponse.data);
        setStatus(parkingStatusResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Inline background style
  const backgroundStyle = {
    backgroundImage: `
            linear-gradient(
                rgba(260, 255, 255, 0.5), 
                rgba(260, 255, 255, 0.5)
            ), 
            url(${parkingBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={backgroundStyle}>
      <nav className={styles.navbar}>
        <div className={styles.containerFluid}>
          <h1 className={styles.navbarBrand}>Parking - Book Slot</h1>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colLg6}>
            <div className={styles.dFlex}>
              <form
                action="/auth/parking"
                method="POST"
                className={styles.form}
              >
                <div className={styles.mb3}>
                  <label htmlFor="name" className={styles.formLabel}>
                    <i className="bi bi-person"></i>&ensp;Fullname
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="name"
                    name="name"
                    value={userData.StudentName}
                    onChange={(e) =>
                      setUserData({ ...userData, StudentName: e.target.value })
                    } // Update state on change
                  />
                </div>
                <div className={styles.mb3}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    <i className="bi bi-phone"></i>&ensp;Phone Number
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={styles.formControl}
                    id="phone"
                    name="phoneNo"
                    value={userData.Phone}
                    onChange={(e) =>
                      setUserData({ ...userData, Phone: e.target.value })
                    } // Update state on change
                  />
                </div>
                <div className={styles.mb3}>
                  <label htmlFor="plate" className={styles.formLabel}>
                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                    &ensp;License Plate
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="plate"
                    name="lic_plate"
                  />
                </div>
                <div className={styles.mb3}>
                  <label htmlFor="studentId" className={styles.formLabel}>
                    <i className="bi bi-card-id"></i>&ensp;Student ID
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="studentId"
                    name="student_id"
                    value={userData.StudentID}
                    onChange={(e) =>
                      setUserData({ ...userData, StudentID: e.target.value })
                    } // Update state on change
                  />
                </div>
                <div className={styles.mb3}>
                  <label htmlFor="model" className={styles.formLabel}>
                    <i className="lni lni-car-alt"></i>&ensp;Vehicle Type
                  </label>
                  <select
                    className={styles.formSelect}
                    id="vehicleType"
                    name="type"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>
                <button type="submit" className={styles.btnWarning}>
                  Book!
                </button>
              </form>
            </div>
          </div>
          <div className={styles.colLg6}>
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <h4>Parked Cars</h4>
                <p className={styles.parkedCarsCount}>{status.parkedCars}</p>
              </div>
              <div className={styles.box}>
                <h4>Available Space</h4>
                <p className={styles.availableSpaceCount}>
                  {status.availableSpace}
                </p>
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.id}>
                    Student Id
                  </th>
                  <th scope="col" className={styles.namE}>
                    Name
                  </th>
                  <th scope="col" className={styles.platE}>
                    Plate
                  </th>
                  <th scope="col" className={styles.modeL}>
                    Type
                  </th>
                  <th scope="col" className={styles.arrivaltimE}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={styles.parkingtable}>
                {parkingInfo.map((info) => (
                  <tr key={info.student_id}>
                    <td>{info.student_id}</td>
                    <td>{info.name}</td>
                    <td>{info.lic_plate}</td>
                    <td>{info.type}</td>
                    <td>{info.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingForm;
