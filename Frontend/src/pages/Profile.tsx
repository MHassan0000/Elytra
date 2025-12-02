const Profile = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="glass-card p-8 text-center h-fit">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 p-1 mb-6">
                        <div className="w-full h-full rounded-full bg-[#151A25] flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">H</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">Hassan</h2>
                    <p className="text-slate-400 mb-6">hassan@example.com</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl font-bold text-white">12</p>
                            <p className="text-xs text-slate-500">Reports</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl font-bold text-white">45</p>
                            <p className="text-xs text-slate-500">Upvotes</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="btn-gradient w-full py-3">
                            Change Avatar
                        </button>
                        <button className="w-full py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                    <input type="text" defaultValue="Hassan" className="input-dark w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <input type="email" defaultValue="hassan@example.com" className="input-dark w-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                                    <input type="tel" defaultValue="+92 300 1234567" className="input-dark w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">City</label>
                                    <input type="text" defaultValue="Lahore" className="input-dark w-full" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
                                <textarea rows={3} defaultValue="Block A, Gulberg, Lahore" className="input-dark w-full" />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-gradient px-8 py-3">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                        <div className="space-y-4">
                            {[
                                'Email notifications for new issues in my area',
                                'Push notifications for report updates',
                                'Weekly summary emails',
                                'Notifications when someone upvotes my report'
                            ].map((pref, i) => (
                                <label key={i} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="relative">
                                        <input type="checkbox" defaultChecked={i !== 2} className="peer sr-only" />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                    </div>
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{pref}</span>
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
