import React, { useState } from 'react';
import { login } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(form);
      const token = res.data.token;

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);

      alert(`Welcome ${decoded.name}!`);

      const role = decoded.role;
      if (role === 'STUDENT') window.location.href = '/dashboard/student';
      else if (role === 'TEACHER') window.location.href = '/dashboard/teacher';
      else if (role === 'ADMIN') window.location.href = '/dashboard/admin';
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full ${
          loading && 'opacity-70 cursor-not-allowed'
        }`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}

export default Login;
