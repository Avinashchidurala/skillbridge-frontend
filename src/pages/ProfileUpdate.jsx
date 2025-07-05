import React, { useState } from 'react';
import axiosClient from '../api/axios';

function ProfileUpdate() {
  const [form, setForm] = useState({
    name: '',
    password: '',
    profileImage: null,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0] });
  };

  const handleSave = async () => {
    setSaving(true);

    const data = new FormData();
    data.append('name', form.name);
    data.append('password', form.password);
    if (form.profileImage) {
      data.append('profileImage', form.profileImage);
    }

    try {
      await axiosClient.put('/api/student/updateProfile', data);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed.');
    }

    setSaving(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Update Profile</h2>

      <input
        className="w-full p-2 border rounded mb-3"
        name="name"
        placeholder="New Name"
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded mb-3"
        name="password"
        type="password"
        placeholder="New Password"
        onChange={handleChange}
      />
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border rounded mb-3"
        onChange={handleImageChange}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full bg-indigo-600 text-white py-2 rounded ${
          saving && 'opacity-70 cursor-not-allowed'
        }`}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}

export default ProfileUpdate;
