import React from 'react';
import { useNavigate } from 'react-router-dom';

const Course = ({ course }) => {
  const { name, description, duration, status, subject_ids, createdAt, updatedAt, _id:id } = course;
  const navigate = useNavigate()

  return (
    <div className="course-card cursor-pointer" onClick={() => {navigate(`/course/details/${id}`)}}>
      <h2 className="course-title">{name}</h2>
      <p className="course-description">{description}</p>
      <p className="course-duration">Duration: {duration} weeks</p>
      <p className="course-status">Status: {status}</p>
      
      {/* Optionally display subjects if they exist */}
      {subject_ids && subject_ids.length > 0 && (
        <div className="course-subjects">
          <h4>Subjects:</h4>
          <ul>
            {subject_ids.map((subject, index) => (
              <li key={index}>{subject.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Course;
