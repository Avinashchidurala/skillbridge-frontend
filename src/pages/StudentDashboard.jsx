import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

function StudentDashboard() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  return (
    <DashboardLayout role={decoded.role}>
      <h2 className="text-xl font-bold mb-2">👩‍🎓 Hello, {decoded.name}</h2>
      <p className="text-gray-600 mb-4">Welcome to your student dashboard!</p>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        onClick={() => navigate('/resume')}
      >
        Upload Resume
      </button>
    </DashboardLayout>
  );
}

export default StudentDashboard;
