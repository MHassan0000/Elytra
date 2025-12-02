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
        // Handle form submission
    };

    const categories = ['Infrastructure', 'Sanitation', 'Water Supply', 'Electricity', 'Traffic', 'Other'];
    const priorities = ['low', 'medium', 'high'];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Submit Feedback 📝
                    </h1>
                    <p className="text-lg text-gray-400">
                        Report an issue or suggest an improvement for your city
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="card">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Issue Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Brief description of the issue"
                                required
                                className="w-full"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Detailed Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Provide detailed information about the issue..."
                                rows={6}
                                required
                                className="w-full"
                            />
                        </div>

                        {/* Category and Priority */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full"
                                >
                                    {priorities.map((priority) => (
                                        <option key={priority} value={priority}>
                                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder="City name"
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Zone *
                                </label>
                                <input
                                    type="text"
                                    value={formData.zone}
                                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                                    placeholder="Zone/Sector"
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Area *
                                </label>
                                <input
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    placeholder="Specific area"
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="btn-primary flex-1">
                                Submit Feedback
                            </button>
                            <button type="button" className="btn-secondary px-8">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitFeedback;
