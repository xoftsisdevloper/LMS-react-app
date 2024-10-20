import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import { useGroup } from "../hooks/Groups/useGroups";


const Starter = () => {
  const {group, loading} = useGroup();
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="12" lg="12" xl="12" xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
