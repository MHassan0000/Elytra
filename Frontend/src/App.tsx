import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Homepage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/submit-feedback"
          element={
            <DashboardLayout>
              <SubmitFeedback />
            </DashboardLayout>
          }
        />
        <Route
          path="/community-board"
          element={
            <DashboardLayout>
              <CommunityBoard />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-reports"
          element={
            <DashboardLayout>
              <MyReports />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/city-areas"
          element={
            <AdminLayout>
              <CityAreasManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/issues"
          element={
            <AdminLayout>
              <IssuesManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/surveys"
          element={
            <AdminLayout>
              <SurveyManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          }
        />

        {/* Admin Placeholder Routes */}
        <Route path="/admin/notifications" element={<AdminLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Notifications - Coming Soon</h1></div></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">System Settings - Coming Soon</h1></div></AdminLayout>} />

        {/* User Placeholder Routes */}
        <Route path="/city-areas" element={<DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">City Areas - Coming Soon</h1></div></DashboardLayout>} />
        <Route path="/notifications" element={<DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Notifications - Coming Soon</h1></div></DashboardLayout>} />
        <Route path="/help" element={<DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Help & Support - Coming Soon</h1></div></DashboardLayout>} />
        <Route path="/surveys" element={<DashboardLayout><div className="ml-56 mt-14 p-6"><h1 className="text-4xl font-bold text-white">Surveys - Coming Soon</h1></div></DashboardLayout>} />

        {/* Redirect to dashboard by default */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
