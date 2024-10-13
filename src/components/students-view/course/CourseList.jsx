import React, { useEffect } from 'react';
import { useStudentContext } from '../../../contexts/Student-context';
import { courseListService } from '../../../service/baseService';
import  defaultIMG from "../../../assets/images/default_images/Skill Pointer.png"
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Row,
    Container,
    Spinner,
    Button,
} from 'reactstrap';
import ReactStarRatings from 'react-star-ratings';

const CourseList = () => {
    const { studentCoursesList, setStudentCoursesList } = useStudentContext();

    const fetchCourseList = async () => {
        const res = await courseListService();
        setStudentCoursesList(res?.data);
    };

    useEffect(() => {
        fetchCourseList();
        return () => setStudentCoursesList([]);
    }, []);

    return (
        <Container className="mt-4">
            <h2 className=" mb-4">Course List</h2>
            {studentCoursesList ? (
                studentCoursesList.length > 0 ? (
                    <Row>
                        {studentCoursesList.map((course) => (
                            <Col key={course.id || course.name} sm="12" md="6" lg="4" className="mb-4">
                                <Card className="course-card h-100">
                                    <img
                                        src={course.imageUrl ? course.imageUrl : defaultIMG}
                                        alt={course.name}
                                        className="card-img-top"
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', height: 250 }}
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">{course.name}</CardTitle>
                                        <ReactStarRatings
                                            rating={course.rating || 4}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="20px"
                                            starSpacing="2px"
                                        />
                                        <CardText className='mt-2'>{course.description}</CardText>
                                        <CardText>
                                            <strong>Duration:</strong> {course.duration} weeks
                                        </CardText>
                                        <CardText>
                                            <strong>Status:</strong> {course.status}
                                        </CardText>
                                        <Button color="primary" className="mt-2" href={`/course/details/${course._id}`}>
                                            View Course
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center">No courses available</p>
                )
            ) : (
                <div className="text-center">
                    <Spinner color="primary" />
                </div>
            )}
        </Container>
    );
};

export default CourseList;
