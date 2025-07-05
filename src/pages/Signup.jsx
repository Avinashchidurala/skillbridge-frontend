import React, { useState } from 'react';
import { signup } from '../api/auth';
import OtpModal from '../components/OtpModal';
import { jwtDecode } from 'jwt-decode'; // ✅

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', role: 'STUDENT' });
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await signup(form);
      alert('OTP sent to your email.');
      setShowOtp(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <select
        className="w-full mb-3 p-2 border rounded"
        name="role"
        onChange={handleChange}
      >
        <option value="STUDENT">Student</option>
        <option value="TEACHER">Teacher</option>
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        onClick={handleSignup}
      >
        Sign Up
      </button>

      {showOtp && <OtpModal email={form.email} />}
    </div>
  );
}

export default Signup;
