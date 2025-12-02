import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/city-areas', label: 'City Areas', icon: '🏙️' },
        { path: '/admin/issues', label: 'Issues Management', icon: '📋' },
        { path: '/admin/surveys', label: 'Survey Management', icon: '📝' },
        { path: '/admin/users', label: 'User Management', icon: '👥' },
        { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
        { path: '/admin/settings', label: 'System Settings', icon: '⚙️' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-slate-800 text-white shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            <aside
                className={`fixed left-4 top-4 bottom-4 w-64 z-40 flex flex-col transition-transform duration-300 ease-in-out rounded-3xl glass-card
                    ${isOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'}
                `}
            >
                {/* Logo Section */}
                <div className="p-6 flex items-center gap-3 border-b border-white/5 mx-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-lg shadow-lg shadow-orange-500/40 text-white">
                        ⚡
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-wide uppercase">Elytra Admin</h1>
                        <p className="text-[10px] text-gray-400 font-medium">MANAGEMENT PANEL</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive(item.path)
                                    ? 'bg-slate-800 shadow-md'
                                    : 'hover:bg-white/5'
                                }
                            `}
                        >
                            <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                                ${isActive(item.path)
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40'
                                    : 'bg-slate-800 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                                }
                            `}>
                                <span className="text-sm">{item.icon}</span>
                            </div>
                            <span className={`text-sm font-medium ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mx-2 mb-2">
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-orange-600 to-orange-400 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-white font-bold text-sm mb-1">Admin Mode</h4>
                            <p className="text-white/80 text-xs">Full access enabled</p>
                        </div>
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default AdminSidebar;
