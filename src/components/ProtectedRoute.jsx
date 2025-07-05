import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅


function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      alert('Access denied.');
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
