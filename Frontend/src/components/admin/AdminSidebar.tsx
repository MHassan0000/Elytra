import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminSidebar = () => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(['identity']);

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
                    <span className="font-semibold text-slate-900">Elytra Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                {/* Identity & Access Section */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('identity')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">👥</span>
                        <span>Management</span>
                        <span className="ml-auto">{expandedSections.includes('identity') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('identity') && (
                        <div className="space-y-1">
                            <Link
                                to="/admin/dashboard"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/dashboard')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/users"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/users')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Users
                            </Link>
                            <Link
                                to="/admin/issues"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/issues')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Issues
                            </Link>
                            <Link
                                to="/admin/city-areas"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/city-areas')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                City Areas
                            </Link>
                        </div>
                    )}
                </div>

                {/* Surveys Section */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('surveys')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">📊</span>
                        <span>Surveys</span>
                        <span className="ml-auto">{expandedSections.includes('surveys') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('surveys') && (
                        <div className="space-y-1">
                            <Link
                                to="/admin/surveys"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/surveys')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                All Surveys
                            </Link>
                        </div>
                    )}
                </div>

                {/* Configurations Section */}
                <div>
                    <button
                        onClick={() => toggleSection('config')}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2 w-full"
                    >
                        <span className="text-emerald-600">⚙️</span>
                        <span>Configurations</span>
                        <span className="ml-auto">{expandedSections.includes('config') ? '▼' : '▶'}</span>
                    </button>
                    {expandedSections.includes('config') && (
                        <div className="space-y-1">
                            <Link
                                to="/admin/settings"
                                className={`block px-4 py-2 text-sm rounded ${isActive('/admin/settings')
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                Settings
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
                <p>System Status: <span className="text-emerald-600 font-medium">All Good</span></p>
                <p className="mt-1">Admin Mode Active</p>
            </div>
        </aside>
    );
};

export default AdminSidebar;
