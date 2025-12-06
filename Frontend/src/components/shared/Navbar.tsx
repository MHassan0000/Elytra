import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
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
    <nav className="h-20 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full bg-[#151A25] border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-slate-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center  gap-6">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-[#151A25] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all m-5">
            🔔
          </button>

        </div>

        <div className="h-8 w-px bg-white/10"></div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">{user?.username || 'User'}</p>
              <p className="text-xs text-slate-400">{user?.email || ''}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-[#0B0E14] flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user?.username ? getInitials(user.username) : 'U'}
                </span>
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#151A25] border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <div className="p-3 border-b border-white/5">
                <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
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
  );
};

export default Navbar;
