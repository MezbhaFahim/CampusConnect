-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2024 at 09:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `integrated_student_service_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_table`
--

CREATE TABLE `comment_table` (
  `Post` varchar(500) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `Name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `CourseName` varchar(200) NOT NULL,
  `Time` text NOT NULL,
  `Section` int(100) NOT NULL,
  `Day1` text NOT NULL,
  `Day2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `FoodName` varchar(200) NOT NULL,
  `FoodRating` float DEFAULT NULL,
  `FoodCost` int(11) NOT NULL,
  `FoodPicture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`FoodName`, `FoodRating`, `FoodCost`, `FoodPicture`) VALUES
('Biryani', 5, 160, '/biryani.webp'),
('Burger', 5, 120, '/buger.jpg'),
('Chocolate', 5, 20, '/chocolate.jpg'),
('Chocolate Cup Cake', 5, 50, '/gallary_3.jpg'),
('Chocolate Milkshake', 5, 80, '/chocolate_Drink.jpg'),
('Drinks', 5, 60, '/juse.jpg'),
('Hot Dog', 5, 80, '/Hot_dog.jpg'),
('Ice Cream', 5, 100, '/ice_cream.jpg'),
('Muffin Cake', 5, 40, '/Spanchi.jpg'),
('Pasta', 5, 100, '/pasta.jpg'),
('Pizza', 5, 250, '/pizza.jpg'),
('Sandwich', 5, 70, '/sandwich.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `foodcart`
--

CREATE TABLE `foodcart` (
  `FoodPicture` text NOT NULL,
  `StudentID` int(11) NOT NULL,
  `FoodName` varchar(200) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Bill` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_place_order`
--

CREATE TABLE `food_place_order` (
  `StudentID` varchar(11) NOT NULL,
  `grandTotal` text NOT NULL,
  `orderItems` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `PostID` int(11) NOT NULL,
  `Title` varchar(260) DEFAULT NULL,
  `Text` text DEFAULT NULL,
  `Picture` text DEFAULT NULL,
  `Username` varchar(260) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parking_ver1`
--

CREATE TABLE `parking_ver1` (
  `name` varchar(50) NOT NULL,
  `lic_plate` varchar(50) NOT NULL,
  `student_id` int(20) NOT NULL,
  `type` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `Name` varchar(64) NOT NULL,
  `Place` text NOT NULL,
  `Time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`Name`, `Place`, `Time`) VALUES
('BRAC University', 'Moddho Badda', '7:30 AM'),
('Dhanmondi', 'Road No 7 (ARA Center Shopping Mall)', '6:35 AM'),
('Kalabagan', 'Krira Chokro (Near Foot Over-Bridge)', '6:40 AM'),
('Manik Mia Avenue', 'West End of Manik Mia Avenue (Opposite Aarong)', '6:50 AM'),
('New Market', 'Gate no 2, Janata Bank', '6:30 AM'),
('Sobhanbag', 'Sobhanbag (Near Foot Over-Bridge)', '6:45 AM');

-- --------------------------------------------------------

--
-- Table structure for table `transactions_table`
--

CREATE TABLE `transactions_table` (
  `student_id` int(20) DEFAULT NULL,
  `transactions` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions_table`
--

INSERT INTO `transactions_table` (`student_id`, `transactions`) VALUES
(NULL, '02650187167'),
(NULL, '07417927689'),
(NULL, '09181822938'),
(NULL, '14496164968'),
(NULL, '14803025605'),
(NULL, '15702518649'),
(NULL, '23433893940'),
(NULL, '30607995885'),
(NULL, '33131995641'),
(NULL, '33210819059'),
(NULL, '36237514239'),
(NULL, '42199931612'),
(NULL, '46871538410'),
(NULL, '48039362996'),
(NULL, '49197682504'),
(NULL, '54351784339'),
(NULL, '55176209057'),
(NULL, '59284032284'),
(NULL, '64682214301'),
(NULL, '68553490162'),
(NULL, '71333243578'),
(NULL, '75532271131'),
(NULL, '75658081821'),
(NULL, '83129395156'),
(NULL, '83617498524'),
(NULL, '92371296689'),
(NULL, '94717128197'),
(NULL, '95790513042'),
(NULL, '97899430056'),
(NULL, '99663919582');

-- --------------------------------------------------------

--
-- Table structure for table `transportation`
--

CREATE TABLE `transportation` (
  `BusType` varchar(64) NOT NULL,
  `Time` text NOT NULL,
  `SeatID` int(11) NOT NULL,
  `SeatAvailibility` int(11) NOT NULL,
  `SeatPaid` int(11) NOT NULL,
  `SeatBooked` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transportation`
--

INSERT INTO `transportation` (`BusType`, `Time`, `SeatID`, `SeatAvailibility`, `SeatPaid`, `SeatBooked`) VALUES
('Going', '6:30', 2, 1, 0, NULL),
('Going', '6:30', 3, 1, 0, NULL),
('Going', '6:30', 4, 1, 0, NULL),
('Going', '6:30', 5, 1, 0, NULL),
('Going', '6:30', 6, 1, 0, NULL),
('Going', '6:30', 7, 1, 0, NULL),
('Going', '6:30', 8, 1, 0, NULL),
('Going', '6:30', 9, 1, 0, NULL),
('Going', '6:30', 10, 1, 0, NULL),
('Going', '6:30', 11, 1, 0, NULL),
('Going', '6:30', 12, 1, 0, NULL),
('Going', '6:30', 13, 1, 0, NULL),
('Going', '6:30', 14, 1, 0, NULL),
('Going', '6:30', 15, 1, 0, NULL),
('Going', '6:30', 16, 1, 0, NULL),
('Going', '6:30', 17, 1, 0, NULL),
('Going', '6:30', 18, 1, 0, NULL),
('Going', '6:30', 19, 1, 0, NULL),
('Going', '6:30', 20, 1, 0, NULL),
('Returning', '5:00', 1, 1, 0, NULL),
('Returning', '5:00', 2, 1, 0, NULL),
('Returning', '5:00', 3, 1, 0, NULL),
('Returning', '5:00', 4, 1, 0, NULL),
('Returning', '5:00', 5, 1, 0, NULL),
('Returning', '5:00', 6, 1, 0, NULL),
('Returning', '5:00', 7, 1, 0, NULL),
('Returning', '5:00', 8, 1, 0, NULL),
('Returning', '5:00', 9, 1, 0, NULL),
('Returning', '5:00', 10, 1, 0, NULL),
('Returning', '5:00', 11, 1, 0, NULL),
('Returning', '5:00', 12, 1, 0, NULL),
('Returning', '5:00', 13, 1, 0, NULL),
('Returning', '5:00', 14, 1, 0, NULL),
('Returning', '5:00', 15, 1, 0, NULL),
('Returning', '5:00', 16, 1, 0, NULL),
('Returning', '5:00', 17, 1, 0, NULL),
('Returning', '5:00', 18, 1, 0, NULL),
('Returning', '5:00', 19, 1, 0, NULL),
('Returning', '5:00', 20, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `StudentID` int(11) NOT NULL,
  `Username` varchar(64) NOT NULL,
  `StudentName` varchar(100) NOT NULL,
  `Email` varchar(62) NOT NULL,
  `Grade` float NOT NULL,
  `Password` text NOT NULL,
  `Token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`StudentID`, `Username`, `StudentName`, `Email`, `Grade`, `Password`, `Token`) VALUES
(21301309, 'PhantomN3rd', 'Abrar Ahmed', 'abrargroad2000@gmail.com', 0, '$2b$08$xisZGdVqb1cUpMznS2uMAOnbWVTWmcLexUFRLaQEQ0AVwnChDUIOC', 't4hkp7xxjqd');

-- --------------------------------------------------------

--
-- Table structure for table `usercoursetable`
--

CREATE TABLE `usercoursetable` (
  `Username` varchar(64) NOT NULL,
  `CourseName` varchar(64) NOT NULL,
  `CourseSection` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD UNIQUE KEY `Post` (`Post`,`Name`) USING HASH;

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`CourseName`,`Section`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`FoodName`);

--
-- Indexes for table `foodcart`
--
ALTER TABLE `foodcart`
  ADD PRIMARY KEY (`StudentID`,`FoodName`),
  ADD KEY `FoodName` (`FoodName`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`PostID`);

--
-- Indexes for table `parking_ver1`
--
ALTER TABLE `parking_ver1`
  ADD UNIQUE KEY `lic_plate` (`lic_plate`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`Name`),
  ADD UNIQUE KEY `Place` (`Place`) USING HASH,
  ADD UNIQUE KEY `Time` (`Time`) USING HASH;

--
-- Indexes for table `transactions_table`
--
ALTER TABLE `transactions_table`
  ADD UNIQUE KEY `transactions` (`transactions`),
  ADD UNIQUE KEY `transactions_2` (`transactions`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `transportation`
--
ALTER TABLE `transportation`
  ADD PRIMARY KEY (`BusType`,`SeatID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`StudentID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Token` (`Token`) USING HASH;

--
-- Indexes for table `usercoursetable`
--
ALTER TABLE `usercoursetable`
  ADD PRIMARY KEY (`Username`,`CourseName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foodcart`
--
ALTER TABLE `foodcart`
  ADD CONSTRAINT `foodcart_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `user` (`StudentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foodcart_ibfk_2` FOREIGN KEY (`FoodName`) REFERENCES `food` (`FoodName`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
