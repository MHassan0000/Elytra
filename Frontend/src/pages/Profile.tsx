const Profile = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3">
                            H
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Hassan</h2>
                        <p className="text-sm text-slate-600">hassan@example.com</p>
                    </div>
                    <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                            Change Avatar
                        </button>
                        <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Account Information */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Account Information</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Hassan"
                                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    defaultValue="hassan@example.com"
                                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    defaultValue="+92 300 1234567"
                                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                <input
                                    type="text"
                                    defaultValue="Lahore"
                                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <textarea
                                rows={3}
                                defaultValue="Block A, Gulberg, Lahore"
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                            />
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                                Save Changes
                            </button>
                            <button type="button" className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h3>
                <div className="space-y-3">
                    {[
                        'Email notifications for new issues in my area',
                        'Push notifications for report updates',
                        'Weekly summary emails',
                        'Notifications when someone upvotes my report'
                    ].map((pref, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked={i !== 2} className="w-4 h-4" />
                            <span className="text-sm text-slate-700">{pref}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
