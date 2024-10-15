import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    Table,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';

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
                const errorMessage = error.response?.data?.message || 'Error fetching courses. Please try again.';
                toast.error(errorMessage);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`/api/courses/${courseId}`);
            setCourses(courses.filter(course => course._id !== courseId));  // Remove the course from state
            toast.success('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            const errorMessage = error.response?.data?.message || 'Error deleting course. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <CardTitle tag="h5">Course Management</CardTitle>
                                <Link to="/instructor/create-course">
                                    <Button color="primary">Create New Course</Button>
                                </Link>
                            </div>
                            {courses.length > 0 ? (
                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course._id}>
                                                <td>{course.name}</td>
                                                <td>{course.description}</td>
                                                <td>
                                                    <Link to={`/instructor/edit-course/${course._id}`}>
                                                        <Button color="warning" className="me-2"><i className='bi bi-pen-fill'></i></Button>
                                                    </Link>
                                                    <Button color="danger" onClick={() => handleDelete(course._id)}><i className='bi bi-trash-fill'></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className="text-center">No courses available</p>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseList;
