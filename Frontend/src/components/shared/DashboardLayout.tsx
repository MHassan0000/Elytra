import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import HamburgerButton from '../ui/HamburgerButton';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../ui/ConfirmDialog';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const { user, logout } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = async () => {
        await logout();
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    return (
        <>
            <div className="min-h-screen bg-[#0B0E14] flex">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header with Hamburger */}
                    <div className="lg:hidden h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#10141D]">
                        <div className="flex items-center gap-4">
                            <HamburgerButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
                            <span className="text-xl font-bold text-white">Elytra</span>
                        </div>

                        {/* Mobile User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                                className="hover:opacity-80 transition-opacity"
                            >
                                {user?.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.username}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/30"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 p-0.5">
                                        <div className="w-full h-full rounded-full bg-[#0B0E14] flex items-center justify-center">
                                            <span className="text-sm font-bold text-white">
                                                {user?.username ? getInitials(user.username) : 'U'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {showMobileDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowMobileDropdown(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-[#151A25] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                        <div className="p-3 border-b border-white/5">
                                            <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                                            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setShowMobileDropdown(false);
                                                setShowLogoutDialog(true);
                                            }}
                                            className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                        >
                                            <span>🚪</span>
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <Navbar />
                    <main className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-7xl mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onConfirm={handleLogout}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                variant="danger"
            />
        </>
    );
};

export default DashboardLayout;
