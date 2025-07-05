import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardLayout({ children, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">Role: {role}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

export default DashboardLayout;
