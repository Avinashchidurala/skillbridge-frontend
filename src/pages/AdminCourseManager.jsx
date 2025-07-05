import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios';

function AdminCourseManager() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', subject: '', duration: '' });
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await axiosClient.get('/api/admin/courses');
      setCourses(res.data);
    } catch {
      alert('Failed to load courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    if (!form.title || !form.subject || !form.duration) return;
    setLoading(true);
    try {
      await axiosClient.post('/api/admin/courses', form);
      setForm({ title: '', subject: '', duration: '' });
      fetchCourses();
    } catch {
      alert('Failed to add course.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axiosClient.delete(`/api/admin/courses/${id}`);
      fetchCourses();
    } catch {
      alert('Failed to delete course.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Courses</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          className="p-2 border rounded"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded"
          name="duration"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleAddCourse}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Adding...' : 'Add Course'}
      </button>

      <ul>
        {courses.map((course) => (
          <li key={course.id} className="flex justify-between items-center border p-3 mb-2 rounded bg-gray-50">
            <div>
              <strong>{course.title}</strong> — {course.subject} ({course.duration} mins)
            </div>
            <button
              onClick={() => handleDelete(course.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCourseManager;
