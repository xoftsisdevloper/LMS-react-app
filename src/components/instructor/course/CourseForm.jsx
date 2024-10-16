// Import necessary modules from React and Reactstrap
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
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
} from "reactstrap";
import classnames from "classnames";

// Constants for Tab IDs
const TABS = {
  COURSE: "course",
  SUBJECTS: "subjects",
  MATERIALS: "materials",
};

const CourseForm = () => {
  const [activeTab, setActiveTab] = useState(TABS.COURSE);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    duration: "",
    imageUrl: "",
    subjects: [
      {
        name: "",
        description: "",
        duration: "",
        materials: [
          { name: "", description: "", content_type: "", content_url: "" },
        ],
      },
    ],
  });

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      // Fetch course data for editing
      axios
        .get(`/api/courses/${courseId}`)
        .then((response) => {
          const fetchedCourseData = response.data;
          if (!Array.isArray(fetchedCourseData.subjects)) {
            fetchedCourseData.subjects = [];
          }

          setCourseData({
            name: fetchedCourseData.name || "",
            description: fetchedCourseData.description || "",
            duration: fetchedCourseData.duration || "",
            imageUrl: fetchedCourseData.imageUrl || "",
            subjects: fetchedCourseData.subjects.map((subject) => ({
              name: subject.name || "",
              description: subject.description || "",
              duration: subject.duration || "",
              materials:
                Array.isArray(subject.materials) && subject.materials.length > 0
                  ? subject.materials.map((material) => ({
                      name: material.name || "",
                      description: material.description || "",
                      content_type: material.content_type || "",
                      content_url: material.content_url || "",
                    }))
                  : [
                      {
                        name: "",
                        description: "",
                        content_type: "",
                        content_url: "",
                      },
                    ],
            })),
          });
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          toast.error("Failed to load course data. Please try again.");
        });
    }
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        await axios.put(`/api/courses/update-course/${courseId}`, courseData);
        toast.success("Course updated successfully!");
      } else {
        await axios.post("/api/courses/create-course", courseData);
        toast.success("Course created successfully!");
      }
      navigate("/instructor/courses");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error submitting form. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...courseData.subjects];
    updatedSubjects[index][field] = value;
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  const handleMaterialChange = (subjectIndex, materialIndex, field, value) => {
    const updatedSubjects = [...courseData.subjects];
    const updatedMaterials = [...updatedSubjects[subjectIndex].materials];
    updatedMaterials[materialIndex][field] = value;
    updatedSubjects[subjectIndex].materials = updatedMaterials;
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setCourseData({
      ...courseData,
      subjects: [
        ...courseData.subjects,
        {
          name: "",
          description: "",
          duration: "",
          materials: [
            { name: "", description: "", content_type: "", content_url: "" },
          ],
        },
      ],
    });
  };

  const addMaterial = (subjectIndex) => {
    const updatedSubjects = [...courseData.subjects];
    updatedSubjects[subjectIndex].materials.push({
      name: "",
      description: "",
      content_type: "",
      content_url: "",
    });
    setCourseData({ ...courseData, subjects: updatedSubjects });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const duration = (courseSubjects) => {
    let timeOfCourse = 0;
    if (courseSubjects.length > 0) {
      courseSubjects.forEach((subject) => {
        timeOfCourse += subject.duration;
      });
    }
    console.log(timeOfCourse);

    return timeOfCourse;
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textDecoration: "none", marginBottom: "1rem" }}>
        {courseId ? "Edit Course" : "Create Course"}
      </h2>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TABS.COURSE })}
            onClick={() => toggleTab(TABS.COURSE)}
          >
            Course
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TABS.SUBJECTS })}
            onClick={() => toggleTab(TABS.SUBJECTS)}
          >
            Subjects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TABS.MATERIALS })}
            onClick={() => toggleTab(TABS.MATERIALS)}
          >
            Materials
          </NavLink>
        </NavItem>
      </Nav>
      <Form onSubmit={handleSubmit}>
        <TabContent activeTab={activeTab}>
          {/* Course Tab */}
          <TabPane
            tabId={TABS.COURSE}
            style={{ cursor: "pointer", padding: "20px" }}
          >
            <FormGroup>
              <Label for="name">Course Name</Label>
              <Input
                type="text"
                value={courseData.name}
                className="form-control"
                onChange={(e) =>
                  setCourseData({ ...courseData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                value={courseData.description}
                className="form-control"
                onChange={(e) =>
                  setCourseData({ ...courseData, description: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="duration">Duration (hours)</Label>
              <Input
                type="number"
                value={duration(courseData.subjects)}
                className="form-control"
                onChange={(e) =>
                  setCourseData({ ...courseData, duration: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="imageUrl">Image URL</Label>
              <Input
                type="text"
                value={courseData.imageUrl}
                className="form-control"
                onChange={(e) =>
                  setCourseData({ ...courseData, imageUrl: e.target.value })
                }
              />
            </FormGroup>
            {/* Image Preview */}
            {courseData.imageUrl && (
              <div className="image-preview mt-2">
                <Label>Image Preview:</Label>
                <img
                  src={courseData.imageUrl}
                  alt="Course Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </TabPane>

          {/* Subjects Tab */}
          <TabPane tabId={TABS.SUBJECTS} style={{ padding: "20px" }}>
            {courseData.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-3">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Subject {subjectIndex + 1}</h4>
                  <Button
                    color="danger"
                    onClick={() =>
                      setCourseData({
                        ...courseData,
                        subjects: courseData.subjects.filter(
                          (_, index) => index !== subjectIndex
                        ),
                      })
                    }
                  >
                    <i class="bi bi-x-circle-fill"></i>
                  </Button>
                </div>
                <FormGroup>
                  <Label for={`subject-name-${subjectIndex}`}>
                    Subject Name
                  </Label>
                  <Input
                    type="text"
                    id={`subject-name-${subjectIndex}`}
                    value={subject.name}
                    onChange={(e) =>
                      handleSubjectChange(subjectIndex, "name", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`subject-description-${subjectIndex}`}>
                    Subject Description
                  </Label>
                  <Input
                    type="text"
                    id={`subject-description-${subjectIndex}`}
                    value={subject.description}
                    onChange={(e) =>
                      handleSubjectChange(
                        subjectIndex,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`subject-duration-${subjectIndex}`}>
                    Subject Duration (hours)
                  </Label>
                  <Input
                    type="number"
                    id={`subject-duration-${subjectIndex}`}
                    value={subject.duration}
                    onChange={(e) =>
                      handleSubjectChange(
                        subjectIndex,
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </FormGroup>
              </div>
            ))}
            <Button color="primary" onClick={addSubject}>
              <i class="bi bi-plus-circle-fill"></i> Add
            </Button>
          </TabPane>

          {/* Materials Tab */}
          <TabPane tabId={TABS.MATERIALS} style={{ padding: "20px" }}>
            {courseData.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex}>
                {subject.materials.map((material, materialIndex) => (
                  <div key={materialIndex} className="my-3">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h4>{subject.name} Materials</h4>
                      </div>
                      <div>
                        <Button
                          color="danger"
                          onClick={() => {
                            const updatedMaterials = subject.materials.filter(
                              (_, index) => index !== materialIndex
                            );
                            handleSubjectChange(
                              subjectIndex,
                              "materials",
                              updatedMaterials
                            );
                          }}
                        >
                          <i class="bi bi-x-circle-fill"></i>
                        </Button>
                      </div>
                    </div>
                    <FormGroup>
                      <Label
                        for={`material-name-${subjectIndex}-${materialIndex}`}
                      >
                        Material Name
                      </Label>
                      <Input
                        type="text"
                        id={`material-name-${subjectIndex}-${materialIndex}`}
                        value={material.name}
                        onChange={(e) =>
                          handleMaterialChange(
                            subjectIndex,
                            materialIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        for={`material-description-${subjectIndex}-${materialIndex}`}
                      >
                        Material Description
                      </Label>
                      <Input
                        type="text"
                        id={`material-description-${subjectIndex}-${materialIndex}`}
                        value={material.description}
                        onChange={(e) =>
                          handleMaterialChange(
                            subjectIndex,
                            materialIndex,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        for={`material-content_type-${subjectIndex}-${materialIndex}`}
                      >
                        Content Type
                      </Label>
                      <Input
                        type="select"
                        id={`material-content_type-${subjectIndex}-${materialIndex}`}
                        value={material.content_type}
                        onChange={(e) =>
                          handleMaterialChange(
                            subjectIndex,
                            materialIndex,
                            "content_type",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Content Type</option>
                        <option value="PDF">PDF</option>
                        <option value="Video">Video</option>
                        <option value="Document">Document</option>
                        <option value="Image">Image</option>
                        {/* Add more content types as needed */}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        for={`material-content_url-${subjectIndex}-${materialIndex}`}
                      >
                        Content URL
                      </Label>
                      <Input
                        type="text"
                        id={`material-content_url-${subjectIndex}-${materialIndex}`}
                        value={material.content_url}
                        onChange={(e) =>
                          handleMaterialChange(
                            subjectIndex,
                            materialIndex,
                            "content_url",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                  </div>
                ))}
                <Button
                  color="primary"
                  onClick={() => addMaterial(subjectIndex)}
                >
                  <i class="bi bi-plus-circle-fill"></i> Add
                </Button>
              </div>
            ))}
          </TabPane>
        </TabContent>
        <Button color="success" type="submit">
          {courseId ? "Update Course" : "Create Course"}
        </Button>
      </Form>
    </div>
  );
};

export default CourseForm;
