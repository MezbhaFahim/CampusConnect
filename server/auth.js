const express = require("express");
const authController = require("./Controllers/auth");
const router = express.Router();


//Post ->

router.post("/signup", authController.UserSignup)
router.post("/signin", authController.UserLogin)

router.post("/bookTickets", authController.bookTicket)
router.post("/buyBusTickets", authController.busTicket)
router.post("/parking", authController.parking)

router.post("/updateUser", authController.UserUpdate)

router.get('/api/courses', authController.CourseFetch)
router.get('/api/courseShow' , authController.CourseShowRoutine)


//fetch ->

router.get('/logout', authController.Logout)

router.get("/api/auth", authController.GetUserData)

router.get("/api/fetchroutes", authController.BusRoutes)
router.get('/api/busSeatAvailability' , authController.BusSeatAvailability)
router.get('/parkingStatus', authController.getParkingStatus)
router.get('/parkingInfo', authController.getParkingInfo)
router.get('/api/getLicensePlate', authController.getLicensePlate)

router.post('/api/courseSelected' , authController.CourseSelected)
router.post("/api/removeCourse" , authController.removeCoursefromdatabase)

module.exports = router;