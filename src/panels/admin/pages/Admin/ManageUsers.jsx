import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Table from '../../components/Table';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      const usersData = [
        { username: 'john_doe', role: 'Admin', status: 'Active' },
        { username: 'jane_smith', role: 'Instructor', status: 'Inactive' },
      ];
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const headers = ['Username', 'Role', 'Status'];

  return (
    <div className="manage-users">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h1>Manage Users</h1>
          <Table headers={headers} data={users} actions={true} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
