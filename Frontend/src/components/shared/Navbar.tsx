import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../ui/ConfirmDialog';
import SearchBar from '../search/SearchBar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="hidden lg:flex h-20 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5 items-center justify-between px-8 sticky top-0 z-50">
        {/* Search */}
        <SearchBar />

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/notifications" className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-[#151A25] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all">
              <Bell size={18} />
            </button>
          </Link>

          <div className="h-8 w-px bg-white/10"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:opacity-80 transition-opacity"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0B0E14] flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.username ? getInitials(user.username) : 'U'}
                    </span>
                  </div>
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#151A25] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                <div className="p-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLogoutDialog(true);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default Navbar;
