// AirSch.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './admin.module.css';

const AirSch = () => {
    const [schedules, setSchedules] = useState([]);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    // Fetch schedules from the API
    fetch('http://localhost:4000/api/getAll')
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error('Error fetching schedules:', error));
  }, []);

  const handleEditClick = (scheduleId) => {
    setEditingScheduleId(scheduleId);
    const scheduleToEdit = schedules.find((schedule) => schedule._id === scheduleId);
    setEditedFields({ ...scheduleToEdit });
  };

  const handleSaveClick = async () => {
    try {
        const { _id, ...fieldsWithoutId } = editedFields;

        console.log('Sending update request with data:', fieldsWithoutId);

        const response = await fetch(`http://localhost:4000/api/update/${editingScheduleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fieldsWithoutId),
        });

        if (response.ok) {
            const updatedSchedule = await response.json();
            setSchedules((prevSchedules) =>
              prevSchedules.map((schedule) => (schedule._id === updatedSchedule._id ? updatedSchedule : schedule))
            );
            setEditingScheduleId(null);
          } else {
            console.error('Error updating schedule:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating schedule:', error);
    }
};

  

  const handleDeleteClick = async (scheduleId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete/${scheduleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule._id !== scheduleId));
      } else {
        console.error('Error deleting schedule:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingScheduleId(null);
  };

  const handleInputChange = (e, fieldName) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [fieldName]: e.target.value,
    }));
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
          <i className={`fas ${styles.faHome}`}></i> Airway Schedule
        </h2>
      </div>

      <div className={styles.card}>
        <h3>Schedule List</h3>
        <table>
          <thead>
            <tr>
              <th>FlightName</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Stop</th>
              <th>FlightNumber</th>
              {/* Add more fields based on your API response */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule._id}>
                {/* Replace 'Field1', 'Field2', 'Field3' with your actual field names */}
                <td>
  {editingScheduleId === schedule._id ? (
    <input
      type="text"
      value={editedFields.FlightName}
      onChange={(e) => handleInputChange(e, 'FlightName')}
    />
  ) : (
    schedule.FlightName
  )}
</td>
<td>
  {editingScheduleId === schedule._id ? (
    <input
      type="text"
      value={editedFields.Departure}
      onChange={(e) => handleInputChange(e, 'Departure')}
    />
  ) : (
    schedule.Departure
  )}
</td>
<td>
  {editingScheduleId === schedule._id ? (
    <input
      type="text"
      value={editedFields.Arrival}
      onChange={(e) => handleInputChange(e, 'Arrival')}
    />
  ) : (
    schedule.Arrival
  )}
</td>
<td>
  {editingScheduleId === schedule._id ? (
    <input
      type="text"
      value={editedFields.Stop}
      onChange={(e) => handleInputChange(e, 'Stop')}
    />
  ) : (
    schedule.Stop
  )}
</td>
<td>
  {editingScheduleId === schedule._id ? (
    <input
      type="text"
      value={editedFields.FlightNumber}
      onChange={(e) => handleInputChange(e, 'FlightNumber')}
    />
  ) : (
    schedule.FlightNumber
  )}
</td>

                <td>
                  {editingScheduleId === schedule._id ? (
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
                      <button type="button" onClick={() => handleEditClick(schedule._id)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(schedule._id)}>
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

export default AirSch;
