import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios';

function ExamResultEntry() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient.get('/api/teacher/exams').then((res) => setExams(res.data));
  }, []);

  const fetchStudents = async (examId) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/teacher/exams/${examId}/students`);
      setStudents(res.data);
      setResults({});
    } catch {
      alert('Failed to load students.');
    }
    setLoading(false);
  };

  const handleResultChange = (studentId, value) => {
    setResults({ ...results, [studentId]: value });
  };

  const handleSubmit = async () => {
    try {
      await axiosClient.post(`/api/teacher/exams/${selectedExamId}/results`, results);
      alert('Results submitted successfully!');
    } catch {
      alert('Failed to submit results.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Enter Exam Results</h2>

      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedExamId}
        onChange={(e) => {
          setSelectedExamId(e.target.value);
          fetchStudents(e.target.value);
        }}
      >
        <option value="">Select Exam</option>
        {exams.map((exam) => (
          <option key={exam.id} value={exam.id}>
            {exam.title} — {exam.date}
          </option>
        ))}
      </select>

      {students.map((student) => (
        <div key={student.id} className="flex items-center gap-2 mb-3">
          <span className="w-1/2">{student.name}</span>
          <input
            type="number"
            placeholder="Marks"
            className="w-1/2 p-2 border rounded"
            onChange={(e) => handleResultChange(student.id, e.target.value)}
          />
        </div>
      ))}

      {students.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          Submit Results
        </button>
      )}
    </div>
  );
}

export default ExamResultEntry;
