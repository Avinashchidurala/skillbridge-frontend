import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axios';

function ExamCreate() {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    duration: '',
    date: '',
    batchId: '',
    courseId: '',
  });

  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient.get('/api/teacher/batches').then((res) => setBatches(res.data));
    axiosClient.get('/api/teacher/courses').then((res) => setCourses(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await axiosClient.post('/api/teacher/exams', form);
      alert('Exam created successfully!');
      setForm({ title: '', subject: '', duration: '', date: '', batchId: '', courseId: '' });
    } catch {
      alert('Failed to create exam.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Exam</h2>

      <input name="title" placeholder="Exam Title" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.title} />
      <input name="subject" placeholder="Subject" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.subject} />
      <input name="duration" placeholder="Duration (mins)" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.duration} />
      <input name="date" type="date" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.date} />

      <select name="batchId" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.batchId}>
        <option value="">Select Batch</option>
        {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>

      <select name="courseId" className="w-full p-2 border rounded mb-3" onChange={handleChange} value={form.courseId}>
        <option value="">Select Course</option>
        {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        {loading ? 'Creating...' : 'Create Exam'}
      </button>
    </div>
  );
}

export default ExamCreate;