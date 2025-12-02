import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'actions', 'settings']);

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive(to)
                    ? 'bg-gradient-to-r from-violet-600/10 to-pink-600/10 text-white border-l-2 border-violet-500'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <span className={`text-lg transition-colors ${isActive(to) ? 'text-violet-400' : 'text-slate-500 group-hover:text-white'}`}>
                {icon}
            </span>
            <span>{label}</span>
        </Link>
    );

    return (
        <aside className="w-72 bg-[#10141D] border-r border-white/5 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">
                        E
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Elytra
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Main Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Overview
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/dashboard" icon="📊" label="Dashboard" />
                        <NavItem to="/community-board" icon="👥" label="Community Board" />
                        <NavItem to="/my-reports" icon="📋" label="My Reports" />
                    </div>
                </div>

                {/* Actions Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Actions
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/submit-feedback" icon="✍️" label="Submit Feedback" />
                        <NavItem to="/surveys" icon="📝" label="Surveys" />
                    </div>
                </div>

                {/* Settings Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Settings
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/profile" icon="⚙️" label="Profile" />
                        <NavItem to="/notifications" icon="🔔" label="Notifications" />
                    </div>
                </div>
            </nav>

            {/* User Profile Snippet */}
            <div className="p-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                        MJ
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Mark Johnson</p>
                        <p className="text-xs text-slate-400 truncate">mark@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
