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
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white text-xl font-bold">
                        A
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">Elytra Admin</h1>
                        <p className="text-slate-400 text-xs">Management Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-4">
                    <h4 className="text-white font-bold text-sm mb-1">Admin Mode</h4>
                    <p className="text-orange-100 text-xs">Full access enabled</p>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
