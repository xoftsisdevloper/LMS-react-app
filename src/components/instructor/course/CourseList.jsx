import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        const errorMessage = error.response?.data?.message || 'Error submitting form. Please try again.';
        toast.error(errorMessage);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));  // Remove the course from state
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <Link to="/instructor/create-course">
        <button>Create New Course</button>  {/* Create Course button */}
      </Link>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
            <Link to={`/instructor/edit-course/${course._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
