import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Edit, ClipboardList, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    // Get user initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive(to)
                ? 'bg-linear-to-r from-violet-600/10 to-pink-600/10 text-white border-l-2 border-violet-500'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon
                size={18}
                className={`transition-colors ${isActive(to) ? 'text-violet-400' : 'text-slate-500 group-hover:text-white'
                    }`}
            />
            <span>{label}</span>
        </Link>
    );

    return (
        <aside className="w-72 bg-[#10141D] border-r border-white/5 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl">
                        <Link to="/">
                            <img src="/images/logo.png" alt="" />

                        </Link>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                        <Link to="/">
                            Elytra
                        </Link>
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
                        <NavItem to="/dashboard" icon={Home} label="Dashboard" />
                        <NavItem to="/community-board" icon={Users} label="Community Board" />
                        <NavItem to="/my-reports" icon={FileText} label="My Reports" />
                    </div>
                </div>

                {/* Actions Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Actions
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/submit-feedback" icon={Edit} label="Submit Feedback" />
                        <NavItem to="/surveys" icon={ClipboardList} label="Surveys" />
                    </div>
                </div>

                {/* Settings Section */}
                <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                        Settings
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/settings" icon={Settings} label="Settings" />
                        <NavItem to="/notifications" icon={Bell} label="Notifications" />
                    </div>
                </div>
            </nav>

            {/* User Profile Snippet */}
            <div className="p-6 border-t border-white/5">
                <Link to="/settings" className="block">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-200 group">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                                {user?.username ? getInitials(user.username) : 'U'}
                            </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">
                                {user?.username || 'User'}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                {user?.email || 'Loading...'}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
