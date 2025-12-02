import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/city-areas', label: 'City Areas', icon: '🏙️' },
        { path: '/admin/issues', label: 'Issues', icon: '📋' },
        { path: '/admin/surveys', label: 'Surveys', icon: '📝' },
        { path: '/admin/users', label: 'Users', icon: '👥' },
        { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
        { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/80 shadow-2xl shadow-blue-900/40 flex flex-col z-50">
            {/* Logo */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white text-xl font-extrabold shadow-[0_0_20px_rgba(251,146,60,0.6)]">
                        A
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-base tracking-wide">Elytra Admin</h1>
                        <p className="text-slate-400 text-[11px] uppercase tracking-[0.18em]">Management Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-orange-500/90 text-white shadow-[0_10px_25px_rgba(249,115,22,0.45)]'
                                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white hover:shadow-[0_8px_18px_rgba(15,23,42,0.85)]'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800/80">
                <div className="glass rounded-2xl p-4">
                    <h4 className="text-white font-semibold text-xs mb-1 tracking-wide">Admin Mode</h4>
                    <p className="text-slate-300 text-[11px]">Full access enabled for system configuration.</p>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
