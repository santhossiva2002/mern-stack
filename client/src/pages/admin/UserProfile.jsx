// UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './admin.module.css'; // Replace with the actual CSS file name

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    // Fetch users from the API
    fetch('http://localhost:4000/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user._id === userId);
    setEditedFields({ ...userToEdit });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFields),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
        );
        setEditingUserId(null);
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleInputChange = (e, fieldName) => {
    setEditedFields({ ...editedFields, [fieldName]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <ul>
          <li>
            <Link to="/Admin">
              <i className={`fas ${styles.faHome}`}></i> Home
            </Link>
          </li>
          <li>
            <Link to="/userProfile">
              <i className={`fas ${styles.faUser}`}></i> User Profile
            </Link>
          </li>
          <li>
            <Link to="/airSch">
              <i className={`fas ${styles.faPlane}`}></i> Schedule
            </Link>
          </li>
          <li>
            <Link to="/FeedbackForm">
              <i className={`fas ${styles.faComments}`}></i> Feedback
            </Link>
          </li>
          <li>
            <Link to="/AdminLogin">
              <i className={`fas ${styles.faSignOutAlt}`}></i> Logout
            </Link>
          </li>
        </ul>
      </div>


      <div className={styles.card}>
        <h2>
          <i className={`fas ${styles.faHome}`}></i>User Profile
        </h2>
      </div>

      <div className={styles.card}>
        <h3>User List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editedFields.username}
                      onChange={(e) => handleInputChange(e, 'username')}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editedFields.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.password}</td>
                <td>{user.createdAt}</td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button type="button" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleEditClick(user._id)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(user._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
