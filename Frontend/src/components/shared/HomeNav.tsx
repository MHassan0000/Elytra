import { Link } from 'react-router-dom';
import Button3D from '../../components/ui/Button3D';
import { useAuth } from '../../context/AuthContext';


const HomeNav = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 relative">
                        <img src="/images/logo.png" alt="logo" />
                    </div>
                    <span className="text-3xl font-bold text-white tracking-tight">Elytra</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
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
                <div className="flex items-center gap-4">
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
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Sign in →
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors"
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
