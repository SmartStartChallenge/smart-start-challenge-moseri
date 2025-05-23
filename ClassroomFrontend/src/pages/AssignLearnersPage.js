import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignLearnersPage = () => {
  const { id } = useParams();
  const [learners, setLearners] = useState([]);
  const [selectedLearners, setSelectedLearners] = useState([]);

  useEffect(() => {
    const fetchLearners = async () => {
      const response = await axios.get('/api/users/learners', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLearners(response.data);
    };
    fetchLearners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/classrooms/${id}/assign-learners`, selectedLearners, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Redirect or show success message
    } catch (error) {
      console.error('Failed to assign learners', error);
    }
  };

  return (
    <div>
      <h2>Assign Learners</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Learners</label>
          <select multiple value={selectedLearners} onChange={(e) => setSelectedLearners([...e.target.selectedOptions].map(option => option.value))}>
            {learners.map(learner => (
              <option key={learner.id} value={learner.id}>{learner.email}</option>
            ))}
          </select>
        </div>
        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default AssignLearnersPage;
