import React, { useState } from 'react';
import { verifyOtp } from '../api/auth';

function OtpModal({ email }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      alert('OTP Verified! You can now log in.');
      setLoading(false);
      window.location.href = '/login'; // optional: route to login screen
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">Verify OTP</h3>
        <p className="text-sm text-gray-600 mb-2 text-center">
          OTP sent to <span className="font-medium">{email}</span>
        </p>
        <input
          className="w-full p-2 border rounded mb-3"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className={`w-full bg-green-500 text-white py-2 rounded ${
            loading && 'opacity-70 cursor-not-allowed'
          }`}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
}

export default OtpModal;
