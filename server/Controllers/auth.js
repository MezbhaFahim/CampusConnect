const db = require('../db');
const bcrypt = require('bcrypt');

const generateSessionToken = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return randomString;
};

exports.GetUserData = (req, res) => {

    if (!req.session.user) {
      return res.status(401).send('User not logged in.');
    }
  
    const userId = req.session.user.StudentID;
  
    db.query('SELECT StudentID, Username, StudentName, Email FROM user WHERE StudentID = ?', [userId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).send('Internal server error');
      }
  
      if (results.length === 0) {
        return res.status(404).send('User not found.');
      }
  
      const userData = results;
      res.send(userData);
    });
  };

exports.UserSignup = async (req, res) => {
    
    const {StudentID, Username, StudentName, Email, Password} = req.body;

    db.query("SELECT StudentID, Email, Username FROM user WHERE StudentID = ? OR Email = ? OR Username = ?", [StudentID, Email, Username], async (error, results) => {
        
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            let errorMessage = ''

            if (results.some(result => result.StudentID === StudentID)) {
                errorMessage += 'Student ID already registered. ';
            }
            if (results.some(result => result.Email === Email)) {
                errorMessage += 'Email already exists. ';
            }

            if (results.some(result => result.Username === Username)) {
                errorMessage += 'Username already taken. ';
            }


            return res.status(400).send(errorMessage.trim());
        } 

        let hashedPassword = await bcrypt.hash(Password, 8);

        db.query("INSERT INTO user SET ?", {StudentID: StudentID, Username: Username, StudentName: StudentName, Email: Email, Password: hashedPassword}, (error, results) => {
            
            if(error){
                console.log(error);
            } else {
                res.redirect("/SignupSignin")
            }
        })
    });
}

exports.UserLogin = (req, res) => {

    const {Username, Password } = req.body;
    const sanitizedUsername = db.escape(Username);
    const query = `SELECT * FROM user WHERE Username = ${sanitizedUsername}`;

    db.query(query, async (err, results) => {

      if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Internal server error');
      } else {

          if (results.length === 0) {
            return res.status(200).send('User not found.');
          } else {
            const user = results[0]; 
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (isPasswordValid) {
              const sessionToken = generateSessionToken();
              db.query('UPDATE user SET Token = ? WHERE StudentID = ?', [sessionToken, user.StudentID], (updateError, updateResults) => {
                  if (updateError) {
                      console.error('Database error:', updateError);
                      return res.status(500).send('Internal server error');
                  } else {
                      req.session.user = { ...user, Token: sessionToken };
                      res.redirect('/Home');
                  }
                });

            } else {
              return res.status(400).send('Invalid password');
            }
          }
      }
    });
};

exports.UserUpdate = async (req, res) => {
    const { fullName, studentID, username, email} = req.body;
    const userId = req.session.user.StudentID;
  
    if (!req.session.user) {
      return res.status(401).send('User not logged in.');
    } else{
        console.log(`studentID type: ${typeof studentID}`);
      console.log(studentID)
      console.log(userId.toString())
      if (studentID === userId.toString()) {
  
        
        db.query('UPDATE user SET StudentName = ?, Email = ? WHERE StudentID = ?', [fullName, email, studentID], (error, results) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).send({
              success: false,
              message: 'Internal server error',
            });
          } else {
            if (results.affectedRows === 0) {
              return res.status(404).send({
                success: false,
                message: 'User not found.',
              });
            }
            res.redirect('/UserProfile');
          }
        });
      } else {
        res.redirect('/UserProfile');
      } 
    }
  }

exports.Logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal server error');
        } else {
            res.redirect('/');
        }
    });
}


exports.BusRoutes = (req, res) => {

  db.query('SELECT * FROM routes', (error, results) => {

    if (error) {
      return res.status(500).send('Internal server error');
    }
    res.send(results);
  });

}

exports.bookTicket = (req, res) => {

  const { studentID, email, goingFrom, goingTo, number, time } = req.body;
  const loggedInUser = req.session.user;

  const busType = goingFrom === '1' ? 'Going' : 'Returning';

  db.query('SELECT * FROM transportation WHERE FIND_IN_SET(?, SeatBooked) > 0 AND BusType = ?', [loggedInUser.Username.toString(), busType], (error, result) => {

    if (error) {
      return res.status(500).send('Internal server error');
    }

    if (result.length > 0) {
      return res.status(400).send('You have already booked a seat.');
    } else {
      db.query('SELECT SeatID FROM transportation WHERE BusType = ? AND SeatAvailibility = 1 LIMIT 1', [busType], (error, result) => {
        if (error) {
          return res.status(500).send('Internal server error');
        }
        if (result.length === 0) {
          return res.status(400).send('No Available Seats');
        } else {

          const seatID = result[0].SeatID;

          db.query('UPDATE transportation SET SeatAvailibility = 0, SeatBooked = CONCAT_WS(",", SeatBooked, ?) WHERE BusType = ? AND SeatID = ?', [loggedInUser.Username, busType, seatID], (error, result) => {
            if (error) {
              console.error('Error updating seat:', error);
              return res.status(500).send('Internal Server Error');
            }
            res.redirect('/Home')
          });
        }
      });
    }
  });
};

exports.BusSeatAvailability = (req, res) => {

  db.query('SELECT COUNT(*) AS goingSeats FROM transportation WHERE SeatAvailibility = 1 AND BusType = ?', ['Going'], (error, goingResult) => {
    if (error) {
      return res.status(500).send('Internal server error');
    }

    const goingSeats = goingResult[0].goingSeats;

    db.query('SELECT COUNT(*) AS returningSeats FROM transportation WHERE SeatAvailibility = 1 AND BusType = ?', ['Returning'], (error, returningResult) => {
      if (error) {
        return res.status(500).send('Internal server error');
      }

      const returningSeats = returningResult[0].returningSeats;

      const seatAvailability = {going: goingSeats, returning: returningSeats};
      res.send(seatAvailability);

    });
  });
};

exports.busTicket = (req, res) => {
  
  const { fullName, studentID, email, time, transaction } = req.body;
  const loggedInUser = req.session.user;


  const BusType = time === '1' ? 'Going' : 'Returning';

  db.query('UPDATE transportation SET SeatPaid = 1 WHERE BusType = ? AND SeatBooked = ?', [BusType, loggedInUser.Username], (error, result) => {
    if (error) {
      return res.status(500).send('Internal Server Error');
    }
    if (result.affectedRows > 0) {
      res.redirect('/Home')
    } else {
      res.status(400).send('No matching seat found')
    }
  })
}

exports.parking = (req, res) => {
  const { name, phoneNo, lic_plate, type } = req.body; 
  const loggedInUser = req.session.user;

  db.query('SELECT * FROM parking_ver1 WHERE student_id = ? LIMIT 1', [loggedInUser.StudentID], (error, results) => {
      if (error) {
          console.error('Error checking previous bookings:', error);
          return res.status(500).send('Internal Server Error');
      }

      if (results.length > 0) {
          return res.status(400).send('No more bookings available');
      }

      const status = 'unpaid';

      db.query('INSERT INTO parking_ver1 (name, lic_plate, student_id, type, status) VALUES (?, ?, ?, ?, ?)',
          [name, lic_plate, loggedInUser.StudentID, type, status],
          (insertError, insertResults) => {
              if (insertError) {
                  console.error('Error booking parking:', insertError);
                  return res.status(500).send('Internal Server Error');
              }
              res.redirect('/Home')
          }
      );
  });
};

// Backend logging

exports.getLicensePlate = (req, res) => {
  const { studentId } = req.query;
  const query = 'SELECT lic_plate FROM parking_ver1 WHERE student_id = ?';

  db.query(query, [studentId], (err, results) => {
      if (err) {
          console.error('Error fetching license plate:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'License plate not found for the given student ID' });
      }
      
      const licensePlate = results[0].lic_plate;
      console.log('License Plate from DB:', licensePlate); 
      res.json({ licensePlate }); 
  });
};




exports.getParkingStatus = async (req, res) => {

  try {
      const query = `SELECT COUNT(CASE WHEN student_id IS NULL THEN 1 END) AS availableSpace, COUNT(CASE WHEN student_id IS NOT NULL THEN 1 END) AS parkedCars FROM transactions_table`;
      
      db.query(query, (error, results) => {
          if (error) {
              console.error('Error fetching parking status:', error);
              return res.status(500).send('Internal server error');
          }
          const { parkedCars, availableSpace } = results[0];
          res.send({ parkedCars, availableSpace });
      });
  } catch (error) {
      console.error('Error fetching parking status:', error);
      res.status(500).send('Internal server error');
  }
};

exports.getParkingInfo = async (req, res) => {

  try {
      const userId = req.session.user.StudentID; 
      const query = `SELECT student_id, name, lic_plate, type, status FROM parking_ver1 WHERE student_id = ?`;
      db.query(query, [userId], (error, results) => {
          if (error) {
              console.error('Error fetching parking info:', error);
              return res.status(500).send('Internal server error');
          }
          res.send(results); 
      });
  } catch (error) {
      console.error('Error fetching parking info:', error);
      res.status(500).send('Internal server error');
  }
};


exports.proceedToCheckout = async (req, res) => {

  const { transactionID, studentID } = req.body;
  try {

    db.query('SELECT * FROM transactions_table WHERE transactions = ?', [transactionID], (error, result) => {

      if (error) {
        console.error('Error during checkout:', error);
        return res.status(500).send('Error during checkout');
      }

      if (result.length > 0) {

        db.query('UPDATE transactions_table SET student_id = ? WHERE transactions = ?', [studentID, transactionID], (updateError, updateResult) => {
          if (updateError) {
            console.error('Error during update:', updateError);
            return res.status(500).send('Error during update');
          }

          db.query('SELECT * FROM parking_ver1 WHERE student_id = ?', [studentID], (parkingError, parkingResult) => {
            if (parkingError) {
              console.error('Error fetching parking details:', parkingError);
              return res.status(500).send('Error fetching parking details');
            }

            if (parkingResult.length > 0) {
              db.query('UPDATE parking_ver1 SET status = "Paid" WHERE student_id = ?', [studentID], (parkingUpdateError, parkingUpdateResult) => {
                if (parkingUpdateError) {
                  console.error('Error updating parking status:', parkingUpdateError);
                  return res.status(500).send('Error updating parking status');
                }
                return res.redirect('/successful')
              });
            } else {
              return res.status(200).send('No Student ID');
            }
          });
        });
      } else {
        return res.status(404).send('Transaction not found');
      }
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    return res.status(500).send('Error during checkout');
  }
};


//Routine Stuff

exports.CourseFetch = async (req, res) => {
  db.query('SELECT CourseName, Time, Section, Day1, Day2 FROM courses', (error, results) => {

    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(404).send('No Courses Found!.');
    }

    const userData = results;
    res.send(userData);

  });
};

exports.CourseSelected = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.Username) {
      return res.status(401).send("User is not logged in");
    }
    const { courseDetails } = req.body;
    const username = req.session.user.Username;

    db.query("SELECT * FROM usercoursetable WHERE Username = ? AND CourseName = ?", [username, courseDetails.courseName], (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).send("Internal server error");
        }
        if (results.length > 0) {
          return res.status(404).send("You have taken this course");
        } else {
          db.query(
            "INSERT INTO usercoursetable SET ?", {Username: username, CourseName: courseDetails.courseName, CourseSection: courseDetails.section}, (insertError, insertResults) => {
              if (insertError) {
                console.error("Database insert error:", insertError);
                return res.status(500).send("Internal server error");
              }
              return res.status(200).send("Course selection successful");
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error in CourseSelected:", error);
    return res.status(500).send("Internal server error");
  }
};

exports.removeCoursefromdatabase = async(req, res) => {
  const courseDescription = req.body
  const courseName = courseDescription.courseName
  const courseSection = courseDescription.section
  const username = req.session.user.Username;
  db.query( `DELETE FROM usercoursetable WHERE Username = ? AND CourseName = ? AND CourseSection = ?` , [username, courseName, courseSection], (error, results) => {
    if (error) {
        return res.status(500).send('Internal server error');
    } else {
      res.redirect('/Routine')
    }
  
  });
}

exports.CourseShowRoutine = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.Username) {
      return res.status(401).send("User is not logged in");
    }
    const username = req.session.user.Username;
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM usercoursetable WHERE Username = ?', [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const courseNamesList = results.map(row => ({ courseName: row.CourseName, courseSection: row.CourseSection }));
    const courseDetails = [];

    for (let i = 0; i < courseNamesList.length; i++) {
      const courseName = courseNamesList[i]['courseName'];
      const courseSection = courseNamesList[i]['courseSection'];

      const courseResults = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM courses WHERE CourseName = ? AND Section = ?', [courseName, courseSection], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      courseDetails.push(courseResults);
    }
    res.send(courseDetails);

  } catch (error) {
    console.error("Error in CourseShowRoutine:", error);
    return res.status(500).send("Internal server error");
  }
};