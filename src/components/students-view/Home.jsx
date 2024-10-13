import React from 'react';
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
} from 'reactstrap';

const Home = () => {
  const name = "LMS Platform";
  const website = "lmsplatform.com";

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Unlock Your Potential</h1>
          <p className="lead">Explore a wide range of courses and boost your career.</p>
          <Button color="light" className="btn-lg">Get Started</Button>
        </Container>
      </div>

      {/* Featured Courses Section */}
      <Container className="mt-5">
        <h2 className="text-center">Featured Courses</h2>
        <Row>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col sm="6" md="3" key={index}>
              <Card className="mb-4">
                <CardImg
                  top
                  src={`https://via.placeholder.com/150?text=Course+${index + 1}`}
                  alt={`Course ${index + 1}`}
                />
                <CardBody>
                  <CardTitle tag="h5">Course Title {index + 1}</CardTitle>
                  <CardText>Description of course {index + 1}...</CardText>
                  <Button color="primary">Enroll Now</Button>
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
                  <CardTitle tag="h5">— Student Name {index + 1}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action Section */}
        <div className="text-center mt-5 py-5 bg-light">
          <h2>Join Us Today!</h2>
          <p>Sign up now and start your learning journey with us.</p>
          <Button color="primary" className="btn-lg">Sign Up</Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
