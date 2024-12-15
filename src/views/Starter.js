import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import { useGroup } from "../hooks/Groups/useGroups";
import { RiBookMarkedLine, RiBookOpenFill, RiGraduationCapFill, RiTeamFill, RiUser4Line, RiUserAddFill, RiUserLine } from "react-icons/ri";
import { courseListService } from "../service/baseService";

const Starter = () => {
  const { group, loading } = useGroup();
  const [courses, setCourses] = useState([]); // State to store the fetched courses
  const [loadingCourses, setLoadingCourses] = useState(true); // State to track loading state for courses

  // Fetch courses function
  const fetchCourses = async () => {
    try {
      const response = await courseListService(); // Call the service function
      const fetchedCourses = response.data; // Access the data (response is the Axios response object)
      setCourses(fetchedCourses); // Set the courses in the state
      setLoadingCourses(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching courses:", error); // Handle error
      setLoadingCourses(false); // Set loading state to false even in case of error
    }
  };

  // Use useEffect to call fetchCourses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row className="g-4">
        {/* Courses Card */}
        <Col sm="12" lg="3" xl="3" xxl="3">
          <Card className="shadow-sm border-light rounded">
            <CardBody className="d-flex align-items-center">
              <div className="me-3">
                <RiBookOpenFill fill="#016A70" size={50} />
              </div>
              <div>
                <CardTitle tag="h5" className="text-primary mb-1">Courses</CardTitle>
                <CardSubtitle className="text-muted">
                  {loadingCourses ? (
                    <span className="text-warning">Loading...</span>
                  ) : (
                    <span className="count-text text-primary">{courses.length}</span>
                  )}
                </CardSubtitle>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Users Card */}
        <Col sm="12" lg="3" xl="3" xxl="3">
          <Card className="shadow-sm border-light rounded">
            <CardBody className="d-flex align-items-center">
              <div className="me-3">
                <RiTeamFill fill="#016A70" size={50} />
              </div>
              <div>
                <CardTitle tag="h5" className="text-primary mb-1">Students</CardTitle>
                <CardSubtitle className="text-muted">
                  {loadingCourses ? (
                    <span className="text-warning">Loading...</span>
                  ) : (
                    <span className="count-text text-primary">{courses.length}</span>
                  )}
                </CardSubtitle>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Users Card */}
        <Col sm="12" lg="3" xl="3" xxl="3">
          <Card className="shadow-sm border-light rounded">
            <CardBody className="d-flex align-items-center">
              <div className="me-3">
                <RiGraduationCapFill fill="#016A70" size={50} />
              </div>
              <div>
                <CardTitle tag="h5" className="text-primary mb-1">Creaters</CardTitle>
                <CardSubtitle className="text-muted">
                  {loadingCourses ? (
                    <span className="text-warning">Loading...</span>
                  ) : (
                    <span className="count-text text-primary">{courses.length}</span>
                  )}
                </CardSubtitle>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
