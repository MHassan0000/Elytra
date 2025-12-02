import { useState } from 'react';

interface AreaSelectorProps {
    onAreaChange?: (city: string, zone: string, area: string) => void;
}

const AreaSelector = ({ onAreaChange }: AreaSelectorProps) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    // Mock data - replace with actual data from API
    const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi'];
    const zones: Record<string, string[]> = {
        Lahore: ['Gulberg', 'DHA', 'Johar Town', 'Model Town'],
        Karachi: ['Clifton', 'DHA', 'Gulshan', 'Saddar'],
        Islamabad: ['F-6', 'F-7', 'G-9', 'I-8'],
        Rawalpindi: ['Satellite Town', 'Bahria Town', 'Saddar', 'Chaklala'],
    };
    const areas: Record<string, string[]> = {
        Gulberg: ['Block A', 'Block B', 'Block C', 'Main Boulevard'],
        DHA: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
        'Johar Town': ['Block A', 'Block B', 'Block C', 'Block D'],
        'Model Town': ['Block A', 'Block B', 'Block C', 'Link Road'],
    };

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        setSelectedZone('');
        setSelectedArea('');
    };

    const handleZoneChange = (zone: string) => {
        setSelectedZone(zone);
        setSelectedArea('');
    };

    const handleAreaChange = (area: string) => {
        setSelectedArea(area);
        if (onAreaChange) {
            onAreaChange(selectedCity, selectedZone, area);
        }
    };

    return (
        <div className="card glass-hover">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📍</span>
                <h3 className="text-lg font-bold text-white">Select Your Area</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* City Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        City
                    </label>
                    <select
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full"
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Zone Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Zone
                    </label>
                    <select
                        value={selectedZone}
                        onChange={(e) => handleZoneChange(e.target.value)}
                        disabled={!selectedCity}
                        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">Select Zone</option>
                        {selectedCity &&
                            zones[selectedCity]?.map((zone) => (
                                <option key={zone} value={zone}>
                                    {zone}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Area Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Area
                    </label>
                    <select
                        value={selectedArea}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        disabled={!selectedZone}
                        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">Select Area</option>
                        {selectedZone &&
                            areas[selectedZone]?.map((area) => (
                                <option key={area} value={area}>
                                    {area}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {selectedCity && selectedZone && selectedArea && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-300">
                        <span className="font-semibold">Selected Location:</span> {selectedArea},{' '}
                        {selectedZone}, {selectedCity}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AreaSelector;
