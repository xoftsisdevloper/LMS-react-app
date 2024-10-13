import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';

const CourseForm = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    duration: '',
    subjects: [
      {
        name: '',
        description: '',
        duration: '',
        materials: [{ name: '', description: '', content_type: '', content_url: '' }],
      },
    ],
  });

  const { courseId } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      // Fetch course data for editing
      axios
        .get(`/api/courses/${courseId}`)
        .then((response) => {
          const fetchedCourseData = response.data;
          console.log(fetchedCourseData, 'course data'); // Check the structure here
          // Handle potential issues with fetched data
          if (!fetchedCourseData.subjects || !Array.isArray(fetchedCourseData.subjects)) {
            fetchedCourseData.subjects = [];
          }

          // Ensure materials are populated correctly
          setCourseData({
            name: fetchedCourseData.name || '',
            description: fetchedCourseData.description || '',
            duration: fetchedCourseData.duration || '',
            subjects: fetchedCourseData.subjects.map((subject) => ({
              name: subject.name || '',
              description: subject.description || '',
              duration: subject.duration || '',
              materials: Array.isArray(subject.materials) && subject.materials.length > 0 
                ? subject.materials.map((material) => ({
                    name: material.name || '',
                    description: material.description || '',
                    content_type: material.content_type || '',
                    content_url: material.content_url || '',
                  })) 
                : [{ name: '', description: '', content_type: '', content_url: '' }], // Fallback if no materials exist
            })),
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
      subjects: [
        ...courseData.subjects,
        { name: '', description: '', duration: '', materials: [{ name: '', description: '', content_type: '', content_url: '' }] },
      ],
    });
  };

  // Add a new material under a subject
  const addMaterial = (subjectIndex) => {
    const updatedSubjects = [...courseData.subjects];
    updatedSubjects[subjectIndex].materials.push({ name: '', description: '', content_type: '', content_url: '' });
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="container mt-4">
      <h1>{courseId ? 'Edit Course' : 'Create Course'}</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'course' })}
            onClick={() => toggleTab('course')}
          >
            Course
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'subjects' })}
            onClick={() => toggleTab('subjects')}
          >
            Subjects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'materials' })}
            onClick={() => toggleTab('materials')}
          >
            Materials
          </NavLink>
        </NavItem>
      </Nav>
      <Form onSubmit={handleSubmit}>
        <TabContent activeTab={activeTab}>
          {/* Course Tab */}
          <TabPane tabId="course">
            <FormGroup>
              <Label for="name">Course Name</Label>
              <Input
                type="text"
                value={courseData.name}
                onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="duration">Duration (hours)</Label>
              <Input
                type="number"
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
              />
            </FormGroup>
          </TabPane>

          {/* Subjects Tab */}
          <TabPane tabId="subjects">
            {courseData.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-3">
                <h4>Subject {subjectIndex + 1}</h4>
                <FormGroup>
                  <Label for={`subject-name-${subjectIndex}`}>Subject Name</Label>
                  <Input
                    type="text"
                    id={`subject-name-${subjectIndex}`}
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(subjectIndex, 'name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`subject-description-${subjectIndex}`}>Subject Description</Label>
                  <Input
                    type="text"
                    id={`subject-description-${subjectIndex}`}
                    value={subject.description}
                    onChange={(e) => handleSubjectChange(subjectIndex, 'description', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`subject-duration-${subjectIndex}`}>Subject Duration (hours)</Label>
                  <Input
                    type="number"
                    id={`subject-duration-${subjectIndex}`}
                    value={subject.duration}
                    onChange={(e) => handleSubjectChange(subjectIndex, 'duration', e.target.value)}
                  />
                </FormGroup>
              </div>
            ))}
            <Button color="primary" onClick={addSubject}>Add Subject</Button>
          </TabPane>

          {/* Materials Tab */}
          <TabPane tabId="materials">
            {courseData.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-3">
                <h4>Materials for Subject {subjectIndex + 1}</h4>
                {subject.materials.map((material, materialIndex) => (
                  <div key={materialIndex} style={{ marginLeft: '20px' }}>
                    <FormGroup>
                      <Label for={`material-name-${subjectIndex}-${materialIndex}`}>Material Name</Label>
                      <Input
                        type="text"
                        id={`material-name-${subjectIndex}-${materialIndex}`}
                        value={material.name}
                        onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'name', e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`material-description-${subjectIndex}-${materialIndex}`}>Material Description</Label>
                      <Input
                        type="text"
                        id={`material-description-${subjectIndex}-${materialIndex}`}
                        value={material.description}
                        onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'description', e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`material-content-type-${subjectIndex}-${materialIndex}`}>Content Type</Label>
                      <Input
                        type="select"
                        id={`material-content-type-${subjectIndex}-${materialIndex}`}
                        value={material.content_type}
                        onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'content_type', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="PDF">PDF</option>
                        <option value="Video">Video</option>
                        <option value="Document">Document</option>
                        <option value="Image">Image</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for={`material-content-url-${subjectIndex}-${materialIndex}`}>Content URL</Label>
                      <Input
                        type="text"
                        id={`material-content-url-${subjectIndex}-${materialIndex}`}
                        value={material.content_url}
                        onChange={(e) => handleMaterialChange(subjectIndex, materialIndex, 'content_url', e.target.value)}
                      />
                    </FormGroup>
                  </div>
                ))}
                <Button color="secondary" onClick={() => addMaterial(subjectIndex)}>Add Material</Button>
              </div>
            ))}
          </TabPane>
        </TabContent>
        <Button type="submit" color="success" className="mt-3">
          {courseId ? 'Update Course' : 'Create Course'}
        </Button>
      </Form>
    </div>
  );
};

export default CourseForm;
