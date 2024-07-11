import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './BookParking.module.css';

function BookParking() {
    const [formData, setFormData] = useState({
        name: '',
        lic_plate: '',
        student_id: '',
        type: 'car',
    });
    const [parkedCars, setParkedCars] = useState([]);
    const [availableSpace, setAvailableSpace] = useState(10);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userDataResponse = await axios.get('/auth/api/auth');
            const userData = userDataResponse.data[0];
            setFormData({
                ...formData,
                name: userData.StudentName,
                student_id: userData.StudentID,
            });

            const parkingInfoResponse = await axios.get('/auth/parkingInfo');
            setParkedCars(parkingInfoResponse.data);

            const response = await axios.get('/auth/parkingStatus');
            const { parkedCars, availableSpace } = response.data;
            setAvailableSpace(availableSpace);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/parking', formData);
            if (response.data.success) {
                fetchData();
                setFormData({
                    name: '',
                    lic_plate: '',
                    student_id: '',
                    type: 'car',
                });
            } else {
                setErrors(response.data.errors);
            }
        } catch (error) {
            console.error('Error booking parking slot:', error);
        }
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${style.navbar}`}>
                <div className="container-fluid">
                    <a className={`navbar-brand ${style['navbar-brand']}`} href="#" id="nav-link">
                        <svg viewBox="0 0 24 24" width="57px" height="57px" fill="yellow" xmlns="http://www.w3.org/2000/svg">
                            {/* SVG content */}
                        </svg>
                        Parking - Book Slot
                    </a>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 mb-3">
                        <div className="d-flex justify-content-center">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className={`form-label ${style['form-label']}`}><i className="bi bi-person"></i>&ensp;Fullname</label>
                                    <input type="text" className={`form-control ${style['form-control']}`} id="name" name="name" value={formData.name} onChange={handleInputChange} />
                                    {errors.name && <div><p id="nameError">{errors.name}</p></div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="plate" className={`form-label ${style['form-label']}`}><i className="fa fa-list-alt" aria-hidden="true"></i>&ensp;License Plate</label>
                                    <input type="text" className={`form-control ${style['form-control']}`} id="plate" name="lic_plate" value={formData.lic_plate} onChange={handleInputChange} />
                                    {errors.lic_plate && <div><p id="plateError">{errors.lic_plate}</p></div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="studentId" className={`form-label ${style['form-label']}`}><i className="bi bi-card-id"></i>&ensp;Student ID</label>
                                    <input type="text" className={`form-control ${style['form-control']}`} id="studentId" name="student_id" value={formData.student_id} onChange={handleInputChange} />
                                    {errors.student_id && <div><p id="studentIdError">{errors.student_id}</p></div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="model" className={`form-label ${style['form-label']}`}><i className="lni lni-car-alt"></i>&ensp;Vehicle Type</label>
                                    <select className={`form-select ${style['form-select']}`} id="vehicleType" name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                    </select>
                                    {errors.type && <div><p id="vehicleTypeError">{errors.type}</p></div>}
                                </div>
                                <button type="submit" id="btn1" className={`btn btn-warning ${style.btn}`}>Book!</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className={`box-container d-flex justify-content-between ${style['box-container']}`}>
                            <div className={`box ${style.box}`}>
                                <h4 style={{ color: '#007BFF' }}>Parked Cars</h4>
                                <p id="parkedCarsCount" style={{ color: '#007BFF' }}>{parkedCars.length}</p>
                            </div>
                            <div className={`box ${style.box}`}>
                                <h4 style={{ color: '#007BFF' }}>Available Space</h4>
                                <p id="availableSpaceCount" style={{ color: '#007BFF' }}>{availableSpace}</p>
                            </div>
                        </div>

                        <table className={`table table-borderless mt-5 ${style.table}`}>
                            <thead>
                                <p id="parkingHead" className={style.parkingHead}><i className="fa fa-product-hunt" aria-hidden="true"></i>&ensp;Parked Cars</p>
                                <tr>
                                    <th scope="col" id="id">Student Id</th>
                                    <th scope="col" id="namE">Name</th>
                                    <th scope="col" id="platE">Plate</th>
                                    <th scope="col" id="modeL">Type</th>
                                    <th scope="col" id="arrivaltimE">Status</th>
                                </tr>
                            </thead>
                            <tbody id="parkingtable">
                                {parkedCars.map((car, index) => (
                                    <tr key={index}>
                                        <td>{car.student_id}</td>
                                        <td>{car.name}</td>
                                        <td>{car.lic_plate}</td>
                                        <td>{car.type}</td>
                                        <td>{car.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookParking;