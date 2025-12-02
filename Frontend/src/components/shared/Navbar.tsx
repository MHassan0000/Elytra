const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 h-18 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 z-40 rounded-b-lg lg:rounded-b-none">
      <div className="h-full px-6 lg:px-10 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-900/70 border border-slate-700/70 text-white placeholder-slate-400 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600/80 shadow-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full bg-slate-900/60 border border-slate-700/70 text-slate-400 hover:text-white hover:border-blue-500/80 transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800/80">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Hassan</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
              H
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;