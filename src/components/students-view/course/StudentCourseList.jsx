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
  ListGroup,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const StudentCourseList = () => {
  const { authUser } = useAuthcontext();
  const { studentCoursesList, setStudentCoursesList } = useStudentContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchCourseList = async (id) => {
    try {
      setLoading(true);
      const res = await studentCourseListService(id);
      setStudentCoursesList(res?.data.data || []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseList(authUser.user._id);
  }, [authUser.user._id]);

  console.log(studentCoursesList)
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
              <Col md="4" key={course._id || course.name} className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{course.name}</CardTitle>
                    <CardText>{course.description || 'No description available.'}</CardText>
                    <Button color="primary"
                    onClick={() => navigate(`/course/details/${course._id}`)}
                    >View Course</Button>
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
