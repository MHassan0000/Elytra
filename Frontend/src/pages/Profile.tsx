const Profile = () => {
    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8 animate-fadeIn">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Profile Settings ⚙️
                </h1>
                <p className="text-lg text-gray-400">
                    Manage your account and preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="card text-center">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                            H
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">Hassan</h2>
                        <p className="text-sm text-gray-400 mb-4">hassan@example.com</p>
                        <button className="btn-secondary w-full mb-2">
                            Change Avatar
                        </button>
                        <button className="btn-secondary w-full">
                            Edit Profile
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="card mt-6">
                        <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Reports Submitted</span>
                                <span className="font-bold text-white">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Upvotes</span>
                                <span className="font-bold text-white">45</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Issues Resolved</span>
                                <span className="font-bold text-green-400">8</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Member Since</span>
                                <span className="font-bold text-white">Jan 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Hassan"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="hassan@example.com"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="+92 300 1234567"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Lahore"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Address
                                </label>
                                <textarea
                                    rows={3}
                                    defaultValue="Block A, Gulberg, Lahore"
                                    className="w-full"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    Save Changes
                                </button>
                                <button type="button" className="btn-secondary px-8">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Notification Preferences */}
                    <div className="card mt-6">
                        <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Email notifications for new issues in my area', checked: true },
                                { label: 'Push notifications for report updates', checked: true },
                                { label: 'Weekly summary emails', checked: false },
                                { label: 'Notifications when someone upvotes my report', checked: true },
                            ].map((pref, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        defaultChecked={pref.checked}
                                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">{pref.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
