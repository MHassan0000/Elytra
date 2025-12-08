import { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, AlertCircle, X, ChevronDown, ChevronRight } from 'lucide-react';
import { locationService } from '../../services/locationService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import type { City, Zone, Area } from '../../types/types';

interface CityWithStats extends City {
    zoneCount: number;
    areaCount: number;
}

const CityAreasManagement = () => {
    const [cities, setCities] = useState<CityWithStats[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [expandedCities, setExpandedCities] = useState<Set<number>>(new Set());
    const [expandedZones, setExpandedZones] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [showCityModal, setShowCityModal] = useState(false);
    const [showZoneModal, setShowZoneModal] = useState(false);
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [newCityName, setNewCityName] = useState('');
    const [newZoneName, setNewZoneName] = useState('');
    const [newAreaName, setNewAreaName] = useState('');
    const [selectedCityForZone, setSelectedCityForZone] = useState<number | null>(null);
    const [selectedZoneForArea, setSelectedZoneForArea] = useState<number | null>(null);

    // Delete confirmation
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ type: 'city' | 'zone' | 'area'; id: number; name: string } | null>(null);

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

            console.log('Fetched cities:', citiesData);
            console.log('Fetched zones:', zonesData);
            console.log('Fetched areas:', areasData);

            // Store zones and areas first
            setZones(zonesData);
            setAreas(areasData);

            // Calculate stats for each city
            const citiesWithStats: CityWithStats[] = citiesData.map(city => {
                const cityZones = zonesData.filter(z => z.cityId === city.id);
                const cityAreas = areasData.filter(a => {
                    const zone = zonesData.find(z => z.id === a.zoneId);
                    return zone?.cityId === city.id;
                });

                console.log(`City ${city.name} (ID: ${city.id}):`, {
                    zones: cityZones.length,
                    areas: cityAreas.length
                });

                return {
                    ...city,
                    zoneCount: cityZones.length,
                    areaCount: cityAreas.length,
                };
            });

            setCities(citiesWithStats);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCity = async () => {
        if (!newCityName.trim()) {
            alert('Please enter a city name');
            return;
        }
        try {
            await locationService.createCity({ name: newCityName.trim() });
            setNewCityName('');
            setShowCityModal(false);
            await fetchData(); // Refresh data
        } catch (err: any) {
            console.error('Create city error:', err);
            alert('Failed to create city: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        }
    };

    const handleCreateZone = async () => {
        if (!newZoneName.trim()) {
            alert('Please enter a zone name');
            return;
        }
        if (!selectedCityForZone) {
            alert('Please select a city');
            return;
        }
        try {
            await locationService.createZone({ name: newZoneName.trim() }, selectedCityForZone);
            setNewZoneName('');
            setShowZoneModal(false);
            setSelectedCityForZone(null);
            await fetchData(); // Refresh data
        } catch (err: any) {
            console.error('Create zone error:', err);
            alert('Failed to create zone: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        }
    };

    const handleCreateArea = async () => {
        if (!newAreaName.trim()) {
            alert('Please enter an area name');
            return;
        }
        if (!selectedZoneForArea) {
            alert('Please select a zone');
            return;
        }
        try {
            await locationService.createArea({ name: newAreaName.trim() }, selectedZoneForArea);
            setNewAreaName('');
            setShowAreaModal(false);
            setSelectedZoneForArea(null);
            await fetchData(); // Refresh data
        } catch (err: any) {
            console.error('Create area error:', err);
            alert('Failed to create area: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        }
    };

    const handleDeleteClick = (type: 'city' | 'zone' | 'area', id: number, name: string) => {
        setDeleteTarget({ type, id, name });
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        try {
            if (deleteTarget.type === 'city') {
                await locationService.deleteCity(deleteTarget.id);
            } else if (deleteTarget.type === 'zone') {
                await locationService.deleteZone(deleteTarget.id);
            } else if (deleteTarget.type === 'area') {
                await locationService.deleteArea(deleteTarget.id);
            }
            setShowDeleteDialog(false);
            setDeleteTarget(null);
            await fetchData(); // Refresh data
        } catch (err: any) {
            console.error(`Delete ${deleteTarget.type} error:`, err);
            alert(`Failed to delete ${deleteTarget.type}: ` + (err.response?.data?.error || err.message || 'Unknown error'));
        }
    };

    const toggleCity = (cityId: number) => {
        const newExpanded = new Set(expandedCities);
        if (newExpanded.has(cityId)) {
            newExpanded.delete(cityId);
        } else {
            newExpanded.add(cityId);
        }
        setExpandedCities(newExpanded);
    };

    const toggleZone = (zoneId: number) => {
        const newExpanded = new Set(expandedZones);
        if (newExpanded.has(zoneId)) {
            newExpanded.delete(zoneId);
        } else {
            newExpanded.add(zoneId);
        }
        setExpandedZones(newExpanded);
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
                    <h1 className="text-3xl font-bold text-white mb-2">City & Areas Management</h1>
                    <p className="text-slate-400">Manage cities, zones, and areas for issue reporting.</p>
                </div>
                <button
                    onClick={() => setShowCityModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add City
                </button>
            </div>

            {/* Cities List */}
            <div className="space-y-4">
                {cities.map((city) => (
                    <div key={city.id} className="glass-card overflow-hidden">
                        {/* City Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div className="flex items-center gap-4 flex-1">
                                <button
                                    onClick={() => toggleCity(city.id)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    {expandedCities.has(city.id) ? (
                                        <ChevronDown className="w-5 h-5" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5" />
                                    )}
                                </button>
                                <MapPin className="w-6 h-6 text-blue-400" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{city.name}</h3>
                                    <p className="text-sm text-slate-400">
                                        {city.zoneCount} zone{city.zoneCount !== 1 ? 's' : ''} • {city.areaCount} area{city.areaCount !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedCityForZone(city.id);
                                        setShowZoneModal(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                                >
                                    Add Zone
                                </button>
                                <button
                                    onClick={() => handleDeleteClick('city', city.id, city.name)}
                                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                    title="Delete city"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Zones List */}
                        {expandedCities.has(city.id) && (
                            <div className="p-6 space-y-3">
                                {getCityZones(city.id).map((zone) => (
                                    <div key={zone.id} className="bg-white/5 rounded-lg overflow-hidden">
                                        {/* Zone Header */}
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3 flex-1">
                                                <button
                                                    onClick={() => toggleZone(zone.id)}
                                                    className="text-slate-400 hover:text-white transition-colors"
                                                >
                                                    {expandedZones.has(zone.id) ? (
                                                        <ChevronDown className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                                                <span className="text-white font-medium">{zone.name}</span>
                                                <span className="text-sm text-slate-400">
                                                    ({getZoneAreas(zone.id).length} area{getZoneAreas(zone.id).length !== 1 ? 's' : ''})
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedZoneForArea(zone.id);
                                                        setShowAreaModal(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors text-sm"
                                                >
                                                    Add Area
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick('zone', zone.id, zone.name)}
                                                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                    title="Delete zone"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Areas List */}
                                        {expandedZones.has(zone.id) && (
                                            <div className="px-4 pb-4 space-y-2">
                                                {getZoneAreas(zone.id).map((area) => (
                                                    <div
                                                        key={area.id}
                                                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                                            <span className="text-slate-300 text-sm">{area.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteClick('area', area.id, area.name)}
                                                            className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                            title="Delete area"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {getZoneAreas(zone.id).length === 0 && (
                                                    <p className="text-slate-500 text-sm text-center py-2">
                                                        No areas in this zone
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {getCityZones(city.id).length === 0 && (
                                    <p className="text-slate-500 text-center py-4">
                                        No zones in this city. Click "Add Zone" to create one.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {cities.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 mb-4">No cities found. Create your first city to get started.</p>
                        <button
                            onClick={() => setShowCityModal(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add City
                        </button>
                    </div>
                )}
            </div>

            {/* Add City Modal */}
            {showCityModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCityModal(false)}>
                    <div className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add New City</h2>
                            <button onClick={() => setShowCityModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newCityName}
                            onChange={(e) => setNewCityName(e.target.value)}
                            placeholder="Enter city name"
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-violet-500/50"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateCity()}
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateCity}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
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

            {/* Add Zone Modal */}
            {showZoneModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowZoneModal(false)}>
                    <div className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add New Zone</h2>
                            <button onClick={() => setShowZoneModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white mb-2">City</label>
                            <div className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-slate-300">
                                {cities.find(c => c.id === selectedCityForZone)?.name || 'Unknown City'}
                            </div>
                        </div>
                        <input
                            type="text"
                            value={newZoneName}
                            onChange={(e) => setNewZoneName(e.target.value)}
                            placeholder="Enter zone name"
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-violet-500/50"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateZone()}
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateZone}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
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

            {/* Add Area Modal */}
            {showAreaModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAreaModal(false)}>
                    <div className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add New Area</h2>
                            <button onClick={() => setShowAreaModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white mb-2">Zone</label>
                            <div className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-slate-300">
                                {(() => {
                                    const zone = zones.find(z => z.id === selectedZoneForArea);
                                    const city = cities.find(c => c.id === zone?.cityId);
                                    return zone && city ? `${city.name} - ${zone.name}` : 'Unknown Zone';
                                })()}
                            </div>
                        </div>
                        <input
                            type="text"
                            value={newAreaName}
                            onChange={(e) => setNewAreaName(e.target.value)}
                            placeholder="Enter area name"
                            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-violet-500/50"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateArea()}
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateArea}
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
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

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => {
                    setShowDeleteDialog(false);
                    setDeleteTarget(null);
                }}
                onConfirm={confirmDelete}
                title={`Delete ${deleteTarget?.type}`}
                message={`Are you sure you want to delete "${deleteTarget?.name}"? ${deleteTarget?.type === 'city'
                        ? 'This will also delete all zones and areas within this city.'
                        : deleteTarget?.type === 'zone'
                            ? 'This will also delete all areas within this zone.'
                            : 'This action cannot be undone.'
                    }`}
                confirmText={`Delete ${deleteTarget?.type}`}
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default CityAreasManagement;
