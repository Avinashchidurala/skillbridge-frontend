import React, { useState } from 'react';
import axiosClient from '../api/axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      await axiosClient.post('/api/student/uploadResume', formData);
      alert('Resume uploaded successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed.');
    }
    setUploading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Your Resume</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="w-full mb-3 p-2 border rounded"
        onChange={handleChange}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full bg-green-500 text-white py-2 rounded ${
          uploading && 'opacity-70 cursor-not-allowed'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  );
}

export default ResumeUpload;
