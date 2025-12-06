import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/shared/DashboardLayout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/Dashboard';
import CommunityBoard from './pages/CommunityBoard';
import MyReports from './pages/MyReports';
import Profile from './pages/Profile';
import SubmitFeedback from './pages/SubmitFeedback';
import AdminDashboard from './pages/admin/AdminDashboard';
import IssuesManagement from './pages/admin/IssuesManagement';
import SurveyManagement from './pages/admin/SurveyManagement';
import UserManagement from './pages/admin/UserManagement';
import CityAreasManagement from './pages/admin/CityAreasManagement';
import Homepage from './pages/Homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          {/* Protected User Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-feedback"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SubmitFeedback />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community-board"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CommunityBoard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyReports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Dashboard Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/city-areas"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CityAreasManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/issues"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <IssuesManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/surveys"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <SurveyManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Placeholder Routes */}
          <Route path="/admin/notifications" element={<ProtectedRoute><AdminLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Notifications - Coming Soon</h1></div></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">System Settings - Coming Soon</h1></div></AdminLayout></ProtectedRoute>} />

          {/* User Placeholder Routes */}
          <Route path="/city-areas" element={<ProtectedRoute><DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">City Areas - Coming Soon</h1></div></DashboardLayout></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Notifications - Coming Soon</h1></div></DashboardLayout></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Help & Support - Coming Soon</h1></div></DashboardLayout></ProtectedRoute>} />
          <Route path="/surveys" element={<ProtectedRoute><DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Surveys - Coming Soon</h1></div></DashboardLayout></ProtectedRoute>} />

          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
