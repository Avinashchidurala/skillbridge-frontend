import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios';

function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/api/student/exams')
      .then((res) => {
        setExams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Failed to load exams.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Your Exams</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500 text-center">No exams found.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="mb-4 border p-4 rounded bg-gray-50">
              <h3 className="text-lg font-semibold text-blue-600">{exam.title}</h3>
              <p className="text-sm text-gray-600">Subject: {exam.subject}</p>
              <p className="text-sm text-gray-600">Date: {exam.date}</p>
              <p className="text-sm text-gray-600">Duration: {exam.duration} mins</p>
              <span
                className={`inline-block px-2 py-1 mt-2 rounded text-white text-xs ${
                  exam.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              >
                {exam.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExamList;
