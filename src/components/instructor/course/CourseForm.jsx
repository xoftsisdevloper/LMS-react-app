import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    duration: '',
    subjects: [{
      name: '',
      description: '',
      duration: '',
      materials: [{ name: '', description: '', content_type: '', content_url: '' }]
    }]
  });

  const { courseId } = useParams();  // Get the course ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      // Fetch course data for editing
      axios.get(`/api/courses/${courseId}`)
        .then((response) => {
          const fetchedCourseData = response.data;
          console.log(fetchedCourseData, "course data"); // Check the structure here
          // Handle potential issues with fetched data
          if (!fetchedCourseData.subjects || !Array.isArray(fetchedCourseData.subjects)) {
            fetchedCourseData.subjects = [];
          }
  
          // Ensure materials are populated correctly
          setCourseData({
            name: fetchedCourseData.name || '',
            description: fetchedCourseData.description || '',
            duration: fetchedCourseData.duration || '',
            subjects: fetchedCourseData.subjects.map(subject => ({
              name: subject.name || '',
              description: subject.description || '',
              duration: subject.duration || '',
              materials: Array.isArray(subject.materials) && subject.materials.length > 0 
                ? subject.materials.map(material => ({
                    name: material.name || '',
                    description: material.description || '',
                    content_type: material.content_type || '',
                    content_url: material.content_url || ''
                  })) 
                : [{ name: '', description: '', content_type: '', content_url: '' }] // Fallback if no materials exist
            }))
          });
        })
        .catch((error) => console.error('Error fetching course data:', error));
    }
  }, [courseId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        // Update course
        await axios.put(`/api/courses/${courseId}`, courseData);
        toast.success('Course updated successfully!');
      } else {
        // Create new course
        await axios.post('/api/courses/create-course', courseData);
        toast.success('Course created successfully!');
      }
      navigate('/instructor/courses');
    } catch (error) {
      console.error('Error submitting form:', error, courseData);
      const errorMessage = error.response?.data?.message || 'Error submitting form. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Handle change for subject fields
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...courseData.subjects];
    updatedSubjects[index][field] = value;
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  // Handle change for materials within subjects
  const handleMaterialChange = (subjectIndex, materialIndex, field, value) => {
    const updatedSubjects = [...courseData.subjects];
    const updatedMaterials = [...updatedSubjects[subjectIndex].materials];
    updatedMaterials[materialIndex][field] = value;
    updatedSubjects[subjectIndex].materials = updatedMaterials;
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  // Add a new subject
  const addSubject = () => {
    setCourseData({
      ...courseData,
      subjects: [...courseData.subjects, { name: '', description: '', duration: '', materials: [{ name: '', description: '', content_type: '', content_url: '' }] }]
    });
  };

  // Add a new material under a subject
  const addMaterial = (subjectIndex) => {
    const updatedSubjects = [...courseData.subjects];
    updatedSubjects[subjectIndex].materials.push({ name: '', description: '', content_type: '', content_url: '' });
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  return (
    <div>
      <h1>{courseId ? 'Edit Course' : 'Create Course'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={courseData.name}
            onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={courseData.description}
            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
          />
        </label>
        <br />
        <label>
          Duration (hours):
          <input
            type="number"
            value={courseData.duration}
            onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
          />
        </label>
        <br />

        <h3>Subjects</h3>
        {courseData.subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex}>
            <label>
              Subject Name:
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange(subjectIndex, 'name', e.target.value)}
              />
            </label>
            <br />
            <label>
              Subject Description:
              <input
                type="text"
                value={subject.description}
                onChange={(e) => handleSubjectChange(subjectIndex, 'description', e.target.value)}
              />
            </label>
            <br />
            <label>
              Subject Duration (hours):
              <input
                type="number"
                value={subject.duration}
                onChange={(e) => handleSubjectChange(subjectIndex, 'duration', e.target.value)}
              />
            </label>
            <br />

            <h4>Materials</h4>
            {subject.materials.map((material, materialIndex) => (
              <div key={materialIndex} style={{ marginLeft: '20px' }}>
                <label>
                  Material Name:
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'name', e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Material Description:
                  <input
                    type="text"
                    value={material.description}
                    onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'description', e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Content Type:
                  <select
                    value={material.content_type}
                    onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'content_type', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Document">Document</option>
                    <option value="Image">Image</option>
                  </select>
                </label>
                <br />
                <label>
                  Content URL:
                  <input
                    type="text"
                    value={material.content_url}
                    onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'content_url', e.target.value)}
                  />
                </label>
                <br />
              </div>
            ))}
            <button type="button" onClick={() => addMaterial(subjectIndex)}>Add Material</button>
            <br /><br />
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>
        <br />
        <button type="submit">{courseId ? 'Update Course' : 'Create Course'}</button>
      </form>
    </div>
  );
};

export default CourseForm;
