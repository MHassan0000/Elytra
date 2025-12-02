import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/city-areas', label: 'City Areas', icon: '🏙️' },
        { path: '/submit-feedback', label: 'Submit Feedback', icon: '📝' },
        { path: '/community-board', label: 'Community Board', icon: '👥' },
        { path: '/my-reports', label: 'My Reports', icon: '📋' },
        { path: '/notifications', label: 'Notifications', icon: '🔔' },
        { path: '/profile', label: 'Profile', icon: '⚙️' },
        { path: '/help', label: 'Help', icon: '❓' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        E
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">Elytra</h1>
                        <p className="text-slate-400 text-xs">City Management</p>
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
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-4">
                    <h4 className="text-white font-bold text-sm mb-1">Need Help?</h4>
                    <p className="text-blue-100 text-xs mb-3">Check our documentation</p>
                    <button className="w-full bg-white text-blue-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                        View Docs
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
