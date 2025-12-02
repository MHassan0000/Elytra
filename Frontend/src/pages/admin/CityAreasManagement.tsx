import { useState } from 'react';

const CityAreasManagement = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const cities = [
        { id: 1, name: 'Lahore', zones: 12, areas: 145, issues: 456 },
        { id: 2, name: 'Karachi', zones: 18, areas: 234, issues: 789 },
        { id: 3, name: 'Islamabad', zones: 8, areas: 98, issues: 234 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">City Areas Management</h1>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                    + Add City
                </button>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() => setSelectedCity(city.name)}
                        className={`bg-white border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow ${selectedCity === city.name ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">{city.name}</h3>
                            <span className="text-2xl">🏙️</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Zones</span>
                                <span className="font-medium text-slate-900">{city.zones}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Areas</span>
                                <span className="font-medium text-slate-900">{city.areas}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Active Issues</span>
                                <span className="font-medium text-emerald-600">{city.issues}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                            <button className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
                                Edit
                            </button>
                            <button className="px-3 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected City Details */}
            {selectedCity && (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">{selectedCity} - Zones & Areas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Zone A', 'Zone B', 'Zone C'].map((zone, index) => (
                            <div key={index} className="border border-slate-200 rounded-lg p-4">
                                <h3 className="font-medium text-slate-900 mb-1">{zone}</h3>
                                <p className="text-sm text-slate-600 mb-3">12 areas</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                                        Manage
                                    </button>
                                    <button className="px-3 py-1.5 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
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
