import { useState } from 'react';
import ActionButton from '../../components/admin/ActionButton';

const CityAreasManagement = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const cities = [
        {
            id: 1,
            name: 'Lahore',
            zones: 12,
            areas: 145,
            issues: 456,
        },
        {
            id: 2,
            name: 'Karachi',
            zones: 18,
            areas: 234,
            issues: 789,
        },
        {
            id: 3,
            name: 'Islamabad',
            zones: 8,
            areas: 98,
            issues: 234,
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">City Areas Management</h1>
                <p className="text-sm text-gray-400">
                    Manage cities, zones, and areas
                </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 flex gap-3">
                <ActionButton icon="➕" label="Add New City" onClick={() => { }} />
                <ActionButton icon="🏙️" label="Add Zone" onClick={() => { }} variant="secondary" />
                <ActionButton icon="📍" label="Add Area" onClick={() => { }} variant="secondary" />
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        className="rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(26, 31, 58, 0.6)',
                            border: selectedCity === city.name ? '2px solid #f97316' : '1px solid rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                        }}
                        onClick={() => setSelectedCity(city.name)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{city.name}</h3>
                            <span className="text-2xl">🏙️</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Zones</span>
                                <span className="font-semibold text-white">{city.zones}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Areas</span>
                                <span className="font-semibold text-white">{city.areas}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Active Issues</span>
                                <span className="font-semibold text-orange-400">{city.issues}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                            <button className="flex-1 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
                                Edit
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected City Details */}
            {selectedCity && (
                <div
                    className="rounded-xl p-6"
                    style={{
                        background: 'rgba(26, 31, 58, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedCity} - Zones & Areas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {['Zone A', 'Zone B', 'Zone C'].map((zone, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">{zone}</h3>
                                <p className="text-sm text-gray-400 mb-3">12 areas</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-1.5 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors">
                                        Manage
                                    </button>
                                    <button className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
                                        Edit
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
