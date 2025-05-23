import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateClassroomForm = () => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get('/api/users/teachers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTeachers(response.data);
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/classrooms', { name, capacity, teacherId: selectedTeacher }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Redirect or show success message
    } catch (error) {
      console.error('Failed to create classroom', error);
    }
  };

  return (
    <div>
      <h2>Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Capacity</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} min="1" required />
        </div>
        <div>
          <label>Teacher</label>
          <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} required>
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.email}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateClassroomForm;
