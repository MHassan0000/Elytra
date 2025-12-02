import { useState } from 'react';

const SubmitFeedback = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        city: '',
        zone: '',
        area: '',
        priority: 'medium',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Feedback submitted:', formData);
    };

    const categories = ['Infrastructure', 'Sanitation', 'Water Supply', 'Electricity', 'Traffic', 'Other'];
    const priorities = ['low', 'medium', 'high'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold text-slate-900">Submit Feedback</h1>

            {/* Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Issue Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Brief description of the issue"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Provide detailed information about the issue..."
                            rows={6}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            >
                                {priorities.map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="City name"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Zone *</label>
                            <input
                                type="text"
                                value={formData.zone}
                                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                                placeholder="Zone/Sector"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Area *</label>
                            <input
                                type="text"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                placeholder="Specific area"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                            Submit Feedback
                        </button>
                        <button type="button" className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitFeedback;
