import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ResumeUpload from './pages/ResumeUpload';
import ProfileUpdate from './pages/ProfileUpdate';
import ExamList from './pages/ExamList';
import AdminBatchManager from './pages/AdminBatchManager';
import AdminCourseManager from './pages/AdminCourseManager';
import ExamCreate from './pages/ExamCreate';
import TeacherExamList from './pages/TeacherExamList';
import ExamResultEntry from './pages/ExamResultEntry';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/teacher/exams/results"
  element={
    <ProtectedRoute allowedRoles={['TEACHER']}>
      <ExamResultEntry />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute allowedRoles={['TEACHER']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      
       <Route
  path="/teacher/exams"
  element={
    <ProtectedRoute allowedRoles={['TEACHER']}>
      <TeacherExamList />
    </ProtectedRoute>
  }
/>

        <Route
  path="/resume"
  element={
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <ResumeUpload />
    </ProtectedRoute>
  }
/>
<Route
  path="/exams"
  element={
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <ExamList />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <ProfileUpdate />
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminCourseManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/exams/create"
          element={
            <ProtectedRoute allowedRoles={['TEACHER']}>
              <ExamCreate />
            </ProtectedRoute>
          }
        />

      <Route
        path="/admin/batches"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminBatchManager />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
