import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBan, faTrophy } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
  const [usersData, setUsersData] = useState([
    { _id: "670c27f94ec95067ffac419b", username: "Alwin", email: "alwin@singam.com", isAdmin: true, isActive: true, role: "student" },
    { _id: "someotherid", username: "Babu", email: "babu@example.com", isAdmin: false, isActive: true, role: "teacher" },
    { _id: "anotherone", username: "Charlie", email: "charlie@test.org", isAdmin: false, isActive: false, role: "student" },
    { _id: "yetanother", username: "David", email: "david@school.net", isAdmin: true, isActive: true, role: "admin" },
    { _id: "lastone", username: "Eve", email: "eve@work.com", isAdmin: false, isActive: false, role: "teacher" },
    { _id: "sixthuser", username: "Fiona", email: "fiona@home.org", isAdmin: false, isActive: true, role: "student" },
    { _id: "seventhuser", username: "George", email: "george@office.com", isAdmin: true, isActive: false, role: "admin" },
    { _id: "eighthuser", username: "Hannah", email: "hannah@uni.edu", isAdmin: false, isActive: true, role: "teacher" },
    { _id: "ninthuser", username: "Ian", email: "ian@company.net", isAdmin: true, isActive: true, role: "student" },
    { _id: "tenthuser", username: "Jane", email: "jane@email.com", isAdmin: false, isActive: false, role: "teacher" },
  ]);

  const [filters, setFilters] = useState({ username: '', email: '', role: '', isAdmin: '', isActive: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return usersData.filter(user => {
      return (
        (!filters.username || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
        (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.role || user.role.toLowerCase().includes(filters.role.toLowerCase())) &&
        (filters.isAdmin === '' || user.isAdmin.toString() === filters.isAdmin) &&
        (filters.isActive === '' || user.isActive.toString() === filters.isActive)
      );
    });
  }, [usersData, filters]);

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [filteredUsers, currentPage]);

  const editUser = (user) => {
    console.log('Edit user:', user);
  };

  const deleteUser = (user) => {
    console.log('Delete user:', user);
  };

  const toggleBlockUser = (user) => {
    setUsersData(prev =>
      prev.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u)
    );
  };

  const viewLeaderboard = (user) => {
    console.log('View leaderboard for:', user);
  };

  return (
    <div className="user-list-user">
      <h2 className="list-heading-user">Users</h2>
      <div className="table-container-user">
        <table className="user-table-user">
          <thead className="table-header-user">
            <tr>
              {['Username', 'Email', 'Role'].map((header, idx) => (
                <th key={idx} className="header-cell-user text-dark">
                  {header}
                  <input
                    type="text"
                    name={header.toLowerCase()}
                    value={filters[header.toLowerCase()]}
                    onChange={handleFilterChange}
                    placeholder="Filter"
                    className="filter-input-user"
                  />
                </th>
              ))}
              <th className="header-cell-user">
                Admin
                <select name="isAdmin" value={filters.isAdmin} onChange={handleFilterChange} className="filter-select-user">
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
              <th className="header-cell-user">
                Status
                <select name="isActive" value={filters.isActive} onChange={handleFilterChange} className="filter-select-user">
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="true">In Active</option>
                  <option value="false">Blocked</option>
                </select>
              </th>
              <th className="header-cell-user">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body-user">
            {paginatedUsers.length > 0 ? paginatedUsers.map(user => (
              <tr key={user._id} className="row-user">
                <td className="cell-user">{user.username}</td>
                <td className="cell-user">{user.email}</td>
                <td className="cell-user">
                  <span className={`role-badge-user role-${user.role}`}>{user.role.toUpperCase()}</span>
                </td>
                <td className="cell-user">
                  <div className={`admin-indicator-user ${user.isAdmin ? 'is-admin' : 'not-admin'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </div>
                </td>
                <td className="cell-user">
                  <span className={`status-badge-user ${user.isActive ? 'active' : 'blocked'}`}>
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="cell-user actions-cell-user text-nowrap">
                  <button onClick={() => editUser(user)} className="action-button-user edit-user">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => deleteUser(user)} className="action-button-user delete-user">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => toggleBlockUser(user)} className={`action-button-user block-user ${user.isActive ? 'block' : 'unblock'}`}>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button onClick={() => viewLeaderboard(user)} className="action-button-user user-leaderboard">
                    <FontAwesomeIcon icon={faTrophy} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr className="row-user empty-row-user">
                <td className="cell-user empty-cell-user" colSpan="6">No user data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="pagination-user">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="pagination-button-user">
            Previous
          </button>
          <span className="pagination-info-user">{currentPage} / {pageCount}</span>
          <button disabled={currentPage === pageCount} onClick={() => setCurrentPage(prev => prev + 1)} className="pagination-button-user">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList 
