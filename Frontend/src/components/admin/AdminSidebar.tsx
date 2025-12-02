import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive(to)
                    ? 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10 text-white border-l-2 border-blue-500'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <span className={`text-lg transition-colors ${isActive(to) ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`}>
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
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                        A
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Elytra Admin
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Management Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Management
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/admin/dashboard" icon="📊" label="Dashboard" />
                        <NavItem to="/admin/users" icon="👥" label="Users" />
                        <NavItem to="/admin/issues" icon="⚠️" label="Issues" />
                        <NavItem to="/admin/city-areas" icon="🏙️" label="City Areas" />
                    </div>
                </div>

                {/* Surveys Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Feedback
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/admin/surveys" icon="📝" label="Surveys" />
                    </div>
                </div>

                {/* Config Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        System
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/admin/settings" icon="⚙️" label="Settings" />
                    </div>
                </div>
            </nav>

            {/* Admin Profile Snippet */}
            <div className="p-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Admin User</p>
                        <p className="text-xs text-slate-400 truncate">System Administrator</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
