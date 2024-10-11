import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import StudentHeader from "../components/students-view/StudentHeader";

const StudentFullLayout = () => {
  return (
    <main>
      <StudentHeader />
          {/* <Container className="p-4" fluid> */}
            <Outlet />
          {/* </Container> */}
    </main>
  );
};

export default StudentFullLayout;
