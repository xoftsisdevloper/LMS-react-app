import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    "Guido van Rossum",
  ];
  return (
    <>
      {/* Featured Courses Section */}
      <Container className="mt-4">
        <h2 className="text-center mb-4">Featured Courses</h2>
        <Row className="justify-content-center">
          {firstFourCourses.map((crs) => (
            <Col
              sm="6"
              md="3"
              key={crs._id}
              id="home-list-course"
              className="rounded"
            >
              <Link to={`/course/explore-details/${crs._id}`}>
                <Card className="mb-4">
                  <CardImg
                    top
                    src={crs.imageUrl}
                    alt={crs.title}
                    id="course-home-card-img"
                    className="rounded-top"
                  />
                  <CardBody className="rounded">
                    <CardTitle tag="h5">{crs.name}</CardTitle>
                    <CardText className="truncate-3-lines">
                      {crs.description}
                    </CardText>
                  </CardBody>
                </Card>
              </Link>
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
