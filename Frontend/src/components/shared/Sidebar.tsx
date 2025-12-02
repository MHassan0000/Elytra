import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        E
                    </div>
                    <span className="font-semibold text-slate-900">Elytra</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                {/* Main Section */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('main')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">📊</span>
                        <span>Dashboard</span>
                        <span className="ml-auto">{expandedSections.includes('main') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('main') && (
                        <div className="space-y-1">
                            <Link
                                to="/dashboard"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/dashboard')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Overview
                            </Link>
                            <Link
                                to="/community-board"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/community-board')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Community Board
                            </Link>
                            <Link
                                to="/my-reports"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/my-reports')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                My Reports
                            </Link>
                        </div>
                    )}
                </div>

                {/* Actions Section */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('actions')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">⚡</span>
                        <span>Actions</span>
                        <span className="ml-auto">{expandedSections.includes('actions') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('actions') && (
                        <div className="space-y-1">
                            <Link
                                to="/submit-feedback"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/submit-feedback')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Submit Feedback
                            </Link>
                            <Link
                                to="/surveys"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/surveys')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Surveys
                            </Link>
                        </div>
                    )}
                </div>

                {/* Settings Section */}
                <div>
                    <button
                        onClick={() => toggleSection('settings')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">⚙️</span>
                        <span>Settings</span>
                        <span className="ml-auto">{expandedSections.includes('settings') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('settings') && (
                        <div className="space-y-1">
                            <Link
                                to="/profile"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/profile')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/notifications"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/notifications')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Notifications
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
                <p>System Status: <span className="text-emerald-600 font-medium">All Good</span></p>
                <p className="mt-1">Last Login: {new Date().toLocaleDateString()}</p>
            </div>
        </aside>
    );
};

export default Sidebar;
