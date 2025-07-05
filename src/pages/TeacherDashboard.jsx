import DashboardLayout from '../components/DashboardLayout';
import { jwtDecode } from 'jwt-decode'; // ✅


function TeacherDashboard() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  return (
    <DashboardLayout role={decoded.role}>
      <h2 className="text-xl font-bold mb-2">👩‍🎓 Welcome, {decoded.name}</h2>
      <p className="text-gray-600">You’re logged in as a TeacherDashboard. Let’s get learning!</p>
    </DashboardLayout>
  );
}

export default TeacherDashboard;
