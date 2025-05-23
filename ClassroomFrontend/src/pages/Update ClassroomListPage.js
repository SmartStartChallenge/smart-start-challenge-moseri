import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassroomListPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      const response = await axios.get('/api/classrooms', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClassrooms(response.data);
    };
    fetchClassrooms();
  }, []);

  const filteredClassrooms = classrooms.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Classrooms</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Teacher</th>
            <th>Learners</th>
          </tr>
        </thead>
        <tbody>
          {filteredClassrooms.map(classroom => (
            <tr key={classroom.id}>
              <td>{classroom.name}</td>
              <td>{classroom.capacity}</td>
              <td>{classroom.teacher.email}</td>
              <td>
                <ul>
                  {classroom.learners.map(learner => (
                    <li key={learner.id}>{learner.email}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomListPage;
