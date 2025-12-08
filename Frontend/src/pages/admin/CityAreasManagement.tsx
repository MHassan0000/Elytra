import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, AlertCircle, X } from 'lucide-react';
import { locationService } from '../../services/locationService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { City, Zone, Area } from '../../types/types';

interface CityWithStats extends City {
    zoneCount: number;
    areaCount: number;
}

const CityAreasManagement = () => {
    const [cities, setCities] = useState<CityWithStats[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [showCityModal, setShowCityModal] = useState(false);
    const [showZoneModal, setShowZoneModal] = useState(false);
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [newCityName, setNewCityName] = useState('');
    const [newZoneName, setNewZoneName] = useState('');
    const [newAreaName, setNewAreaName] = useState('');
    const [selectedZoneForArea, setSelectedZoneForArea] = useState<number | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: number } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [citiesData, zonesData, areasData] = await Promise.all([
                locationService.getAllCities(),
                locationService.getAllZones(),
                locationService.getAllAreas(),
            ]);

            // Calculate stats for each city
            const citiesWithStats = citiesData.map(city => ({
                ...city,
                zoneCount: zonesData.filter(z => z.cityId === city.id).length,
                areaCount: areasData.filter(a => {
                    const zone = zonesData.find(z => z.id === a.zoneId);
                    return zone?.cityId === city.id;
                }).length,
            }));

            setCities(citiesWithStats);
            setZones(zonesData);
            setAreas(areasData);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCity = async () => {
        if (!newCityName.trim()) return;
        try {
            await locationService.createCity({ name: newCityName });
            setNewCityName('');
            setShowCityModal(false);
            fetchData();
        } catch (err: any) {
            alert('Failed to create city: ' + (err.message || 'Unknown error'));
        }
    };

    const handleCreateZone = async () => {
        if (!newZoneName.trim() || !selectedCity) return;
        try {
            await locationService.createZone({ name: newZoneName }, selectedCity);
            setNewZoneName('');
            setShowZoneModal(false);
            fetchData();
        } catch (err: any) {
            alert('Failed to create zone: ' + (err.message || 'Unknown error'));
        }
    };

    const handleCreateArea = async () => {
        if (!newAreaName.trim() || !selectedZoneForArea) return;
        try {
            await locationService.createArea({ name: newAreaName }, selectedZoneForArea);
            setNewAreaName('');
            setShowAreaModal(false);
            setSelectedZoneForArea(null);
            fetchData();
        } catch (err: any) {
            alert('Failed to create area: ' + (err.message || 'Unknown error'));
        }
    };

    const handleDelete = async (type: string, id: number) => {
        try {
            if (type === 'city') {
                await locationService.deleteCity(id);
            } else if (type === 'zone') {
                await locationService.deleteZone(id);
            } else if (type === 'area') {
                await locationService.deleteArea(id);
            }
            setDeleteConfirm(null);
            fetchData();
        } catch (err: any) {
            alert(`Failed to delete ${type}: ` + (err.message || 'Unknown error'));
        }
    };

    const getCityZones = (cityId: number) => zones.filter(z => z.cityId === cityId);
    const getZoneAreas = (zoneId: number) => areas.filter(a => a.zoneId === zoneId);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">City Areas Management</h1>
                    <p className="text-slate-400">Manage geographical zones and areas.</p>
                </div>
                <button
                    onClick={() => setShowCityModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add City
                </button>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() => setSelectedCity(selectedCity === city.id ? null : city.id)}
                        className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 group ${selectedCity === city.id
                                ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                : 'hover:border-white/10'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{city.name}</h3>
                            <MapPin className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                                <span className="text-slate-400 text-sm">Zones</span>
                                <span className="font-bold text-white">{city.zoneCount}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                                <span className="text-slate-400 text-sm">Areas</span>
                                <span className="font-bold text-white">{city.areaCount}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6 pt-4 border-t border-white/5">
                            {deleteConfirm?.type === 'city' && deleteConfirm?.id === city.id ? (
                                <div className="flex gap-2 w-full">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete('city', city.id); }}
                                        className="flex-1 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 text-sm font-medium transition-all"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}
                                        className="flex-1 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm font-medium transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ type: 'city', id: city.id }); }}
                                    className="flex-1 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected City Details */}
            {selectedCity && (
                <div className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {cities.find(c => c.id === selectedCity)?.name} - Zones & Areas
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowZoneModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Zone
                            </button>
                            <button
                                onClick={() => setShowAreaModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Area
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {getCityZones(selectedCity).map((zone) => (
                            <div key={zone.id} className="p-6 rounded-2xl bg-[#0B0E14] border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">{zone.name}</h3>
                                    {deleteConfirm?.type === 'zone' && deleteConfirm?.id === zone.id ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete('zone', zone.id)}
                                                className="px-2 py-1 bg-rose-500 text-white text-xs rounded hover:bg-rose-600"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(null)}
                                                className="px-2 py-1 bg-slate-600 text-white text-xs rounded hover:bg-slate-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm({ type: 'zone', id: zone.id })}
                                            className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-slate-400 mb-4">{getZoneAreas(zone.id).length} areas</p>
                                <div className="space-y-2">
                                    {getZoneAreas(zone.id).map((area) => (
                                        <div key={area.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                            <span className="text-sm text-slate-300">{area.name}</span>
                                            {deleteConfirm?.type === 'area' && deleteConfirm?.id === area.id ? (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleDelete('area', area.id)}
                                                        className="px-2 py-0.5 bg-rose-500 text-white text-xs rounded"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="px-2 py-0.5 bg-slate-600 text-white text-xs rounded"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteConfirm({ type: 'area', id: area.id })}
                                                    className="text-slate-500 hover:text-rose-400 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* City Modal */}
            {showCityModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowCityModal(false)}>
                    <div className="glass-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Add New City</h3>
                            <button onClick={() => setShowCityModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="City name"
                            value={newCityName}
                            onChange={(e) => setNewCityName(e.target.value)}
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 mb-6"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateCity}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                Create City
                            </button>
                            <button
                                onClick={() => setShowCityModal(false)}
                                className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Zone Modal */}
            {showZoneModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowZoneModal(false)}>
                    <div className="glass-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Add New Zone</h3>
                            <button onClick={() => setShowZoneModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Zone name"
                            value={newZoneName}
                            onChange={(e) => setNewZoneName(e.target.value)}
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 mb-6"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateZone}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                Create Zone
                            </button>
                            <button
                                onClick={() => setShowZoneModal(false)}
                                className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Area Modal */}
            {showAreaModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAreaModal(false)}>
                    <div className="glass-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Add New Area</h3>
                            <button onClick={() => setShowAreaModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <select
                            value={selectedZoneForArea || ''}
                            onChange={(e) => setSelectedZoneForArea(parseInt(e.target.value))}
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 mb-4"
                        >
                            <option value="">Select Zone</option>
                            {selectedCity && getCityZones(selectedCity).map(zone => (
                                <option key={zone.id} value={zone.id}>{zone.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Area name"
                            value={newAreaName}
                            onChange={(e) => setNewAreaName(e.target.value)}
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 mb-6"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateArea}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                Create Area
                            </button>
                            <button
                                onClick={() => setShowAreaModal(false)}
                                className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CityAreasManagement;
