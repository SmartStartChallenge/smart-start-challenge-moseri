import { useEffect, useState } from 'react';

export default function ClassroomsPage() {

return (
    <div className="container mt-4">
      <h1>Classrooms</h1>
 
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
          {classrooms.map(classroom => (
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
