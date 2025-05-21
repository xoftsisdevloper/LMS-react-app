import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTests } from "../../hooks/Tests/useTest";
import { useCourse } from "../../hooks/Courses/useCourses";
import { Button } from "reactstrap";
import { useDeleteTests } from "../../hooks/Tests/deleteTest";
import { useTestStatusChange } from "../../hooks/Tests/testStatusChange";
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addButton: {
    backgroundColor: "#0147ab",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    padding: "12px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px",
    textTransform: "capitalize",
  },
  actionContainer: {
    display: "flex",
    gap: "10px",
  },
  actionButton: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#007bff",
  },
};

const TestOverview = () => {
  const navigate = useNavigate();
  const { tests, loading } = useTests();
  const { course } = useCourse();
  const { deleteTest, loading: deleteLoading } = useDeleteTests();
  const { changeStatus } = useTestStatusChange();
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Tests data:", tests);
  const handleEdit = (id) => {
    navigate(`/instructor/test/${id}`);
    console.log("Edit Test button clicked for test ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteTest(id);
      console.log("Delete response:", result);
      // Optionally refresh the test list here
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleAddTest = () => {
    navigate("/instructor/test/new");
    console.log("Add Test button clicked");
  };

  const filteredTests = tests?.data?.filter((test) =>
    test.test_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h5>
          <b>Test Overview</b>
        </h5>
        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search Tests..."
            className="form-control"
            style={{ maxWidth: "200px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={styles.addButton} onClick={handleAddTest}>
            Add Test
          </button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Test Name</th>
            <th style={styles.th}>Test Type</th>
            <th style={styles.th}>Test Subject</th>
            <th style={styles.th}>Test Lesson</th>
            <th style={styles.th}>Created By</th>
            <th style={styles.th}>Total Questions</th>
            <th style={styles.th}>Total Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests?.data?.length > 0 ? (
            filteredTests.map((test, index) => (
              <tr key={index}>
                <td style={styles.td}>{test.test_name}</td>
                <td style={styles.td}>{test.test_type}</td>
                <td style={styles.td}>
                  {test?.test_subject?.name || "Unknown Subject"}
                </td>
                <td style={styles.td}>
                  {test?.test_lesson?.name || "Unknown Subject"}
                </td>
                <td style={styles.td}>
                  {test.created_by?.username || "admin"}{" "}
                  {test.created_by?.username ? `(${test.created_by.role})` : ""}{" "}
                </td>
                <td style={styles.td}>
                  {test.test_questions ? test.test_questions.length : "N/A"}
                </td>
                <td style={styles.td}>
                  <div class="form-check form-switch">
                    <label htmlFor="chekbox" className="text-capitalize">
                      {test.test_status}
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={test.test_status === "enabled"}
                      onChange={(e) => {
                        const newStatus = e.target.checked
                          ? "enabled"
                          : "disabled";
                        changeStatus(test._id, newStatus);
                        window.location.reload();
                      }}
                    />
                  </div>
                </td>
                <td className="text-nowrap">
                  <Button
                    color="warning"
                    className="me-2"
                    size="sm"
                    onClick={() => handleEdit(test._id)}
                  >
                    <i className="bi bi-pen-fill"></i>
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => handleDelete(test._id)}
                    size="sm"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No tests available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestOverview;
