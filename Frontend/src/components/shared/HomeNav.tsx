import { Link } from 'react-router-dom';
import Button3D from '../../components/ui/Button3D';
import { useAuth } from '../../context/AuthContext';


const HomeNav = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative">
                        <img src="/images/logo.png" alt="logo" />
                    </div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">Elytra</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    <Link
                        to="/features"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        to="/docs"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Docs
                    </Link>
                    <Link
                        to="/resources"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Resources
                    </Link>
                </div>

                {/* Auth Buttons - Conditional Rendering */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {isAuthenticated ? (
                        <Button3D
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                    // Redirect based on user role
                                    const dashboardUrl = user?.role === 'ADMIN'
                                        ? '/admin/dashboard'
                                        : '/dashboard';
                                    window.location.href = dashboardUrl;
                                }, 200);
                            }}
                            variant="primary"
                            size="md"
                        >
                            Dashboard
                        </Button3D>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Sign in →
                            </Link>
                            <Link
                                to="/register"
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white text-black text-xs sm:text-sm font-bold hover:bg-slate-200 transition-colors"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default HomeNav;
