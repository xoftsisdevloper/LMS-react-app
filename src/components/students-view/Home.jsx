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
import defaultIMG from "../../assets/images/default_images/Skill Pointer (1).png";
import TestimonialSlider from "./TestimonialSlider";
import AboutUs from "./About-us";
import ContactUs from "./Contact-us";

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
      <div className=" text-white text-center py-5 home-banner d-flex justify-content-center align-items-center" style={{ backgroundRepeat: "no-repeat", backgroundBlendMode: "overlay", backgroundColor: "#000000bd"}}>
        <Container>
          <h1 className="display-4">Unlock Your Potential</h1>
          <p className="lead">
            Explore a wide range of courses and boost your career.
          </p>
          <Button
            color="light"
            className="btn-lg me-2"
            onClick={() => handleNavigation("/courses")}
          >
            Get Started
          </Button>
          <Button color="light" onClick={() => navigate("/courses")} className="btn-lg me-2">
             Explore Courses
          </Button>
        </Container>
      </div>

      {/* Featured Courses Section */}
      <Container className="mt-4">
        <h2 className="text-center mb-4">Featured Courses</h2>
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
        <h2 className="text-center my-4">What Our Students Say</h2>
        <Row className="mb-4">          
            <Col md="12">
              <TestimonialSlider />              
            </Col>          
        </Row>

        <Row className="mb-4">          
            <Col md="12">
              <AboutUs />              
            </Col>          
        </Row>

        

        {/* Call to Action Section */}
      </Container>
      <Row className="mb-0">          
            <Col md="12">
              <ContactUs />              
            </Col>          
        </Row>
    </>
  );
};

export default Home;
