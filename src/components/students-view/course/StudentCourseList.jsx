import React, { useEffect, useState } from 'react';
import { useAuthcontext } from '../../../contexts/Authcontext';
import { useStudentContext } from '../../../contexts/Student-context';
import { studentCourseListService } from '../../../service/baseService';
import Course from './Course';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Button,
} from 'reactstrap';

const StudentCourseList = () => {
  const { authUser } = useAuthcontext();
  const { studentCoursesList, setStudentCoursesList } = useStudentContext();
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCourseList = async (id) => {
    try {
      setLoading(true); // Set loading to true before fetching
      const res = await studentCourseListService(id);
      setStudentCoursesList(res?.data || []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };

  useEffect(() => {
    fetchCourseList(authUser.user._id);

    return () => setStudentCoursesList([]);
  }, [authUser.user._id]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My Courses</h2>
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" /> {/* Spinner for loading state */}
        </div>
      ) : (
        <Row>
          {studentCoursesList && studentCoursesList.length > 0 ? (
            studentCoursesList.map((course) => (
              <Col md="4" key={course.id || course.name} className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{course.name}</CardTitle>
                    <CardText>{course.description || 'No description available.'}</CardText>
                    <Button color="primary">View Course</Button>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No courses available</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default StudentCourseList;
