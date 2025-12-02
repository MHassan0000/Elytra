import { useState } from 'react';

const CityAreasManagement = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const cities = [
        { id: 1, name: 'Lahore', zones: 12, areas: 145, issues: 456 },
        { id: 2, name: 'Karachi', zones: 18, areas: 234, issues: 789 },
        { id: 3, name: 'Islamabad', zones: 8, areas: 98, issues: 234 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">City Areas Management</h1>
                    <p className="text-slate-400">Manage geographical zones and areas.</p>
                </div>
                <button className="btn-gradient px-6 py-3 shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-600">
                    + Add City
                </button>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() => setSelectedCity(city.name)}
                        className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 group ${selectedCity === city.name
                                ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                : 'hover:border-white/10'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{city.name}</h3>
                            <span className="text-3xl bg-white/5 p-2 rounded-xl">🏙️</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                                <span className="text-slate-400 text-sm">Zones</span>
                                <span className="font-bold text-white">{city.zones}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                                <span className="text-slate-400 text-sm">Areas</span>
                                <span className="font-bold text-white">{city.areas}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <span className="text-blue-300 text-sm">Active Issues</span>
                                <span className="font-bold text-blue-400">{city.issues}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6 pt-4 border-t border-white/5">
                            <button className="flex-1 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all">
                                Edit
                            </button>
                            <button className="py-2 px-3 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-sm font-medium transition-all">
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected City Details */}
            {selectedCity && (
                <div className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">{selectedCity} - Zones & Areas</h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300">View All Zones →</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Zone A', 'Zone B', 'Zone C'].map((zone, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-[#0B0E14] border border-white/5 hover:border-white/10 transition-all">
                                <h3 className="text-lg font-bold text-white mb-2">{zone}</h3>
                                <p className="text-sm text-slate-400 mb-4">12 areas mapped</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 text-sm font-medium transition-all">
                                        Manage
                                    </button>
                                    <button className="py-2 px-3 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                        ✏️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CityAreasManagement;
