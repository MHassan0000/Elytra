const Navbar = () => {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-slate-600">ORGANIZATION</h2>
        <select className="text-sm border border-slate-300 rounded px-3 py-1.5 bg-white">
          <option>City Management - 2025</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded">
          <span className="text-slate-600">🔔</span>
        </button>
        <button className="p-2 hover:bg-slate-100 rounded">
          <span className="text-slate-600">⚙️</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium">
          U
        </div>
      </div>
    </nav>
  );
};

export default Navbar;