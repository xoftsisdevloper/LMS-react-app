import React, { useState } from 'react';
const ApprovalManagement = () => {
  const [requests, setRequests] = useState([
    { id: 1, username: 'John Doe', course: 'React Basics', status: 'pending' },
    { id: 2, username: 'Jane Smith', course: 'Advanced JavaScript', status: 'pending' },
    { id: 3, username: 'Michael Brown', course: 'Vue Essentials', status: 'pending' },
    { id: 4, username: 'lolo salamanca', course: 'Vue Essentials', status: 'pending' },
    { id: 5, username: 'hector salamanca', course: 'Vue Essentials', status: 'pending' },
    { id: 6, username: 'don eladio', course: 'Vue Essentials', status: 'pending' },
    { id: 7, username: 'don juan', course: 'Vue Essentials', status: 'pending' },
    { id: 8, username: 'gutovo fring', course: 'Vue Essentials', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'approved' } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'rejected' } : req
      )
    );
  };

  return (
    <div className="approval-list">
      <h2 className="list-heading-approval">Approval Management</h2>

      <div className="table-container-approval">
        <table className="approval-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Course</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.username}</td>
                  <td>{req.course}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        req.status === 'pending'
                          ? 'status-pending'
                          : req.status === 'approved'
                          ? 'status-approved'
                          : 'status-rejected'
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {req.status === 'pending' ? (
                      <div className="action-buttons">
                        <button
                          className="action-button-approve"
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="action-button-reject"
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <em>No actions</em>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row-approval">
                <td colSpan="4">No approval requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalManagement;
