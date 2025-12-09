import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, AlertTriangle, MapPin, FileText, Settings, X } from 'lucide-react';

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const AdminSidebar = ({ isOpen = true, onClose }: AdminSidebarProps) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleNavClick = () => {
        // Close sidebar on mobile when nav item is clicked
        if (onClose) {
            onClose();
        }
    };

    const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
        <Link
            to={to}
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive(to)
                ? 'bg-linear-to-r from-blue-600/10 to-cyan-600/10 text-white border-l-2 border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className={`w-5 h-5 transition-colors ${isActive(to) ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
            <span>{label}</span>
        </Link>
    );

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && onClose && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-72 bg-[#10141D] border-r border-white/5 flex flex-col h-screen
                lg:sticky lg:top-0
                fixed top-0 left-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-20 flex items-center px-8 border-b border-white/5 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl">
                            <img src="/images/logo.png" alt="Logo" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                            <Link to="/" onClick={handleNavClick}>
                                Elytra
                                <span className="text-2xl font-bold bg-clip-text text-orange-400">  Admin</span>
                            </Link>
                        </span>
                    </div>

                    {/* Close button for mobile */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 flex items-center justify-center transition-all"
                        >
                            <X size={20} className="text-slate-400 hover:text-white" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Management Section */}
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                            Management
                        </div>
                        <div className="space-y-1">
                            <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
                            <NavItem to="/admin/users" icon={Users} label="Users" />
                            <NavItem to="/admin/issues" icon={AlertTriangle} label="Issues" />
                            <NavItem to="/admin/city-areas" icon={MapPin} label="City Areas" />
                        </div>
                    </div>

                    {/* Surveys Section */}
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                            Feedback
                        </div>
                        <div className="space-y-1">
                            <NavItem to="/admin/surveys" icon={FileText} label="Surveys" />
                        </div>
                    </div>

                    {/* Config Section */}
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4">
                            System
                        </div>
                        <div className="space-y-1">
                            <NavItem to="/admin/settings" icon={Settings} label="Settings" />
                        </div>
                    </div>
                </nav>

                {/* Admin Profile Snippet */}
                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                            AD
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">System Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
