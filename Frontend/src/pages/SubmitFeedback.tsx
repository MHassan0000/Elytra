import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { issueService } from '../services/issueService';
import { locationService } from '../services/locationService';
import { Priority } from '../types/types';
import type { City, Zone, Area } from '../types/types';
import { useToast } from '../components/ui/Toast';

const SubmitFeedback = () => {
    const navigate = useNavigate();
    const { userId } = useUser();
    const { showToast, ToastContainer } = useToast();

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        category: string;
        cityId: string;
        zoneId: string;
        areaId: string;
        priority: Priority;
    }>({
        title: '',
        description: '',
        category: '',
        cityId: '',
        zoneId: '',
        areaId: '',
        priority: Priority.MEDIUM,
    });

    const [cities, setCities] = useState<City[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Fetch cities on mount
        const fetchCities = async () => {
            try {
                const data = await locationService.getAllCities();
                setCities(data);
            } catch (err) {
                console.error('Error fetching cities:', err);
                showToast('Failed to load cities', 'error');
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        // Fetch zones when city changes
        if (formData.cityId) {
            const fetchZones = async () => {
                try {
                    setLoading(true);
                    const data = await locationService.getZonesByCityId(Number(formData.cityId));
                    setZones(data);
                    setFormData(prev => ({ ...prev, zoneId: '', areaId: '' }));
                    setAreas([]);
                } catch (err) {
                    console.error('Error fetching zones:', err);
                    showToast('Failed to load zones', 'error');
                } finally {
                    setLoading(false);
                }
            };
            fetchZones();
        } else {
            setZones([]);
            setAreas([]);
        }
    }, [formData.cityId]);

    useEffect(() => {
        // Fetch areas when zone changes
        if (formData.zoneId) {
            const fetchAreas = async () => {
                try {
                    setLoading(true);
                    const data = await locationService.getAreasByZoneId(Number(formData.zoneId));
                    setAreas(data);
                    setFormData(prev => ({ ...prev, areaId: '' }));
                } catch (err) {
                    console.error('Error fetching areas:', err);
                    showToast('Failed to load areas', 'error');
                } finally {
                    setLoading(false);
                }
            };
            fetchAreas();
        } else {
            setAreas([]);
        }
    }, [formData.zoneId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const issueData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                status: 'PENDING' as const,
            };

            await issueService.createIssue(
                issueData,
                userId,
                formData.cityId ? Number(formData.cityId) : undefined,
                formData.zoneId ? Number(formData.zoneId) : undefined,
                formData.areaId ? Number(formData.areaId) : undefined
            );

            showToast('Issue submitted successfully!', 'success');

            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                cityId: '',
                zoneId: '',
                areaId: '',
                priority: Priority.MEDIUM,
            });

            // Redirect to My Reports after a short delay
            setTimeout(() => {
                navigate('/my-reports');
            }, 1500);
        } catch (err) {
            console.error('Error submitting feedback:', err);
            showToast('Failed to submit issue. Please try again.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const categories = ['Infrastructure', 'Sanitation', 'Water Supply', 'Electricity', 'Traffic', 'Other'];
    const priorities = ['LOW', 'MEDIUM', 'HIGH'];

    return (
        <>
            <ToastContainer />
            <div className="space-y-8">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Submit Feedback</h1>
                        <p className="text-slate-400">Report an issue or suggest an improvement.</p>
                    </div>
                </div>

                <div className="glass-card p-8 max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Issue Details</h3>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Issue Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Brief description of the issue"
                                    required
                                    className="input-dark w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Detailed Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Provide detailed information about the issue..."
                                    rows={6}
                                    required
                                    className="input-dark w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                        className="input-dark w-full"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Priority</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                                        className="input-dark w-full"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority.charAt(0) + priority.slice(1).toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Location</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">City *</label>
                                    <select
                                        value={formData.cityId}
                                        onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                                        required
                                        className="input-dark w-full"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Zone *</label>
                                    <select
                                        value={formData.zoneId}
                                        onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                                        required
                                        disabled={!formData.cityId || loading}
                                        className="input-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Select Zone</option>
                                        {zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>{zone.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Area *</label>
                                    <select
                                        value={formData.areaId}
                                        onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
                                        required
                                        disabled={!formData.zoneId || loading}
                                        className="input-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Select Area</option>
                                        {areas.map((area) => (
                                            <option key={area.id} value={area.id}>{area.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-white/5">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-gradient flex-1 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                disabled={submitting}
                                className="px-8 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubmitFeedback;
