import { jwtDecode } from 'jwt-decode';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  return (
    <DashboardLayout role={decoded.role}>
      <h2 className="text-xl font-bold mb-2">🛠️ Welcome, {decoded.name}</h2>
      <p className="text-gray-600 mb-4">You’re logged in as an admin. Manage SkillBridge below:</p>

      <div className="flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => navigate('/admin/batches')}
        >
          Manage Batches
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => navigate('/admin/courses')}
        >
          Manage Courses
        </button>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
