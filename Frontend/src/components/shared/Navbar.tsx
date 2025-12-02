import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Get current page name from path
  const getPageName = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    if (path.includes('admin')) return 'Admin Dashboard';
    return path.split('/').pop()?.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Dashboard';
  };

  return (
    <nav className="fixed top-4 right-4 left-4 lg:left-[290px] h-20 z-30 transition-all duration-300">
      <div className="glass-card h-full px-6 flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Pages</span>
            <span>/</span>
            <span className="text-white">{getPageName()}</span>
          </div>
          <h2 className="text-white font-bold text-lg">{getPageName()}</h2>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-[#0f172a] border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Type here..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-48"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-sm font-semibold">Sign In</span>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">👤</div>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              ⚙️
            </button>
            <button className="text-gray-400 hover:text-white transition-colors relative">
              🔔
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;