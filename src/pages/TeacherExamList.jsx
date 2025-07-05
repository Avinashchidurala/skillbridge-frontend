import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios';

function TeacherExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      const res = await axiosClient.get('/api/teacher/exams');
      setExams(res.data);
    } catch {
      alert('Failed to load exams.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam?')) return;
    try {
      await axiosClient.delete(`/api/teacher/exams/${id}`);
      fetchExams();
    } catch {
      alert('Failed to delete exam.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Your Created Exams</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500 text-center">No exams found.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="border p-4 mb-3 rounded bg-gray-50">
              <h3 className="text-lg font-semibold text-blue-600">{exam.title}</h3>
              <p className="text-sm text-gray-600">Subject: {exam.subject}</p>
              <p className="text-sm text-gray-600">Date: {exam.date}</p>
              <p className="text-sm text-gray-600">Batch: {exam.batchName}</p>
              <p className="text-sm text-gray-600">Course: {exam.courseTitle}</p>
              <button
                onClick={() => handleDelete(exam.id)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherExamList;
