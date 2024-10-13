import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useCourse } from "../../hooks/Courses/useCourses";
import defaultIMG from "../../assets/images/default_images/Skill Pointer.png"

const Home = () => {
  const name = "LMS Platform";
  const website = "lmsplatform.com";

  const navigate = useNavigate();

  const { course, loading } = useCourse();

  const firstFourCourses = course.slice(0, 4);
  const handleNavigation = (route) => {
    navigate(route);
  };

  const student_name_array = [
    "James Gosling",
    "Bjarne Stroustrup",
    "Guido van Rossum"
  ]
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Unlock Your Potential</h1>
          <p className="lead">
            Explore a wide range of courses and boost your career.
          </p>
          <Button
            color="light"
            className="btn-lg"
            onClick={() => handleNavigation("/courses")}
          >
            Get Started
          </Button>
        </Container>
      </div>

      {/* Featured Courses Section */}
      <Container className="my-4">
        <h2 className="text-center">Featured Courses</h2>
        <Row>
          {firstFourCourses.map((crs) => (
            <Col sm="6" md="3" key={crs._id} id="home-list-course">
              <Card className="mb-4">
                <CardImg top src={defaultIMG} alt={course.title} id="course-home-card-img"  />
                <CardBody>
                  <CardTitle tag="h5">{crs.name}</CardTitle>
                  <CardText className="truncate-3-lines">{crs.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials Section */}
        <h2 className="text-center mt-5">What Our Students Say</h2>
        <Row>
          {Array.from({ length: 3 }).map((_, index) => (
            <Col md="4" key={index}>
              <Card className="mb-4 text-center">
                <CardBody>
                  <CardText>
                    <em>"This platform changed my career path!"</em>
                  </CardText>
                  <CardTitle tag="h5"> — {student_name_array[index]}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action Section */}
        <div className="text-center mt-5 py-5 bg-light">
          <h2>Join Us Today!</h2>
          <p>Sign up now and start your learning journey with us.</p>
          <Button color="primary" className="btn-lg" onClick={() => handleNavigation("/signup")}>
            Sign Up
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
