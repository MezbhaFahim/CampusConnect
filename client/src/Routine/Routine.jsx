import React, { useEffect } from "react";
import axios from "axios";
import styles from "./Routine.module.css";

function Routine() {
  useEffect(() => {
    courseShow(); // Load courses when component mounts
  }, []);

  // Function to search courses based on input
  const showSearchResults = async () => {
    try {
      const response = await axios.get("/auth/api/courses");
      const courses = response.data;
      const searchInput = document.getElementById("course-search");
      const searchQuery = searchInput.value.toLowerCase();

      const matchingCourses = courses.filter((course) =>
        course.CourseName.toLowerCase().includes(searchQuery)
      );

      const searchResultsContainer = document.getElementById("search-results");
      searchResultsContainer.innerHTML = ""; // Clear previous results

      if (searchQuery === "") {
        searchResultsContainer.style.display = "none";
      } else if (matchingCourses.length === 0) {
        searchResultsContainer.textContent = "No matching courses found.";
        searchResultsContainer.style.display = "block";
      } else {
        matchingCourses.forEach((course) => {
          const courseButton = document.createElement("div");
          courseButton.textContent = `${course.CourseName} Section ${course.Section}`;
          courseButton.classList.add(styles.searchResultItem);
          searchResultsContainer.appendChild(courseButton);

          courseButton.addEventListener("click", function () {
            const selectedCourse = {
              courseName: course.CourseName,
              section: course.Section,
            };
            sendCourseData(selectedCourse);
          });
        });
        searchResultsContainer.style.display = "block";
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  // Function to send selected course data to the server
  const sendCourseData = async (course) => {
    try {
      await axios.post("/auth/api/courseSelected", { courseDetails: course });
      courseShow(); // Refresh courses after adding a new one
    } catch (error) {
      if (error.response.status === 401) {
        alert("You are not logged in. Please log in to continue.");
      } else if (error.response.status === 404) {
        alert("You have already taken this course");
      } else {
        console.error("Error sending course data:", error);
      }
    }
  };

  // Function to fetch and show added courses
  const courseShow = async () => {
    try {
      const response = await axios.get("/auth/api/courseShow");
      const courseTaken = response.data;
      renderCoursesInRoutineTable(courseTaken);
      const addedCoursesList = document.getElementById("added-courses-list");
      addedCoursesList.innerHTML = ""; // Clear previous list

      courseTaken.forEach((courseList) => {
        courseList.forEach((course) => {
          const listItem = document.createElement("li");
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.classList.add(styles.removeButton);
          const courseText = document.createTextNode(
            `${course.CourseName} Section ${course.Section}`
          );
          listItem.appendChild(courseText);
          listItem.appendChild(document.createTextNode(" "));
          listItem.appendChild(removeButton);
          addedCoursesList.appendChild(listItem);

          removeButton.addEventListener("click", function () {
            removeCourse(course.CourseName, course.Section);
          });
        });
      });
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  // Function to remove a course from the routine
  const removeCourse = async (courseName, section) => {
    try {
      await axios.post("/auth/api/removeCourse", { courseName, section });
      courseShow(); // Refresh the table after removal
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  // Function to render courses in the routine table
  const renderCoursesInRoutineTable = (courses) => {
    courses.forEach((courseArray) => {
      courseArray.forEach((course) => {
        const { CourseName, Time, Day1, Day2 } = course;

        let tableCell1 = getTableCell(Time, Day1);
        if (tableCell1) {
          if (tableCell1.textContent.trim() !== "") {
            tableCell1.innerHTML += `, <span className={styles.redText}>${CourseName} Section ${course.Section}</span>`;
          } else {
            tableCell1.textContent = `${CourseName} Section ${course.Section}`;
          }
        }

        let tableCell2 = getTableCell(Time, Day2);
        if (tableCell2) {
          if (tableCell2.textContent.trim() !== "") {
            tableCell2.innerHTML += `, <span className={styles.redText}>${CourseName} Section ${course.Section}</span>`;
          } else {
            tableCell2.textContent = `${CourseName} Section ${course.Section}`;
          }
        }
      });
    });
  };

  // Helper function to find the correct table cell for the course based on time and day
  const getTableCell = (Time, Day) => {
    switch (Day) {
      case "Sunday":
        return document.querySelector(
          `td[data-time="${Time}"] + td[data-day="Sunday"]`
        );
      case "Monday":
        return document.querySelector(
          `td[data-time="${Time}"] + td + td[data-day="Monday"]`
        );
      // Similarly handle other days of the week
      default:
        return null;
    }
  };

  return (
    <div className={styles.routinePage}>
      <div className={styles.header}>
        <h2>Course Routine</h2>
        <button id="customize-button">Customize Routine</button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          id="course-search"
          placeholder="Search courses..."
          onInput={showSearchResults}
        />
        <div id="search-results" className={styles.searchResults}></div>
      </div>

      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Time</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-time="8:00 - 9:20">8:00 - 9:20</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
          <tr>
            <td data-time="9:30 - 10:50">9:30 - 10:50</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
          <tr>
            <td data-time="11:00 - 12:20">11:00 - 12:20</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
          <tr>
            <td data-time="12:30 - 1:50">12:30 - 1:50</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
          <tr>
            <td data-time="2:00 - 3:20">2:00 - 3:20</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
          <tr>
            <td data-time="3:30 - 5:00">3:30 - 5:00</td>
            <td data-day="Sunday"></td>
            <td data-day="Monday"></td>
            <td data-day="Tuesday"></td>
            <td data-day="Wednesday"></td>
            <td data-day="Thursday"></td>
            <td data-day="Friday"></td>
            <td data-day="Saturday"></td>
          </tr>
        </tbody>
      </table>

      <div className={styles.addedCourses}>
        <h3>Added Courses</h3>
        <ul id="added-courses-list"></ul>
      </div>
    </div>
  );
}

export default Routine;
