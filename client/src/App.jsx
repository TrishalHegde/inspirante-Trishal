import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentEvents from './pages/StudentEvents';
import MyRegistrations from './pages/MyRegistrations';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="student" />}>
            <Route path="/student" element={<StudentEvents />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
