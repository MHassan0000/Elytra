import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomeNav = () => {
    const { isAuthenticated } = useAuth();

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
                    {['Features', 'Resources', 'Docs'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons - Conditional Rendering */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                        >
                            Dashboard →
                        </Link>
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
