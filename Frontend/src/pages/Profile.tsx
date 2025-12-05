import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { userService } from '../services/userService';
import { issueService } from '../services/issueService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useToast } from '../components/ui/Toast';

const Profile = () => {
    const { currentUser, userId, refreshUser } = useUser();
    const { showToast, ToastContainer } = useToast();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const [stats, setStats] = useState({
        totalReports: 0,
        totalUpvotes: 0,
    });

    const [notifications, setNotifications] = useState({
        emailNewIssues: true,
        pushReportUpdates: true,
        weeklySummary: false,
        upvoteNotifications: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);

                // Fetch user stats
                const issueStats = await issueService.getUserIssueStats(userId);

                // Get total upvotes given by user (count of upvotes)
                // Note: This is a simplified version. In production, you'd have a dedicated endpoint
                const totalUpvotes = 0; // Placeholder - would need backend endpoint

                setStats({
                    totalReports: issueStats.total,
                    totalUpvotes: totalUpvotes,
                });

                // Set form data from current user
                if (currentUser) {
                    setFormData({
                        username: currentUser.username,
                        email: currentUser.email,
                    });
                }

                // Load notification preferences from localStorage
                const savedPrefs = localStorage.getItem('notificationPreferences');
                if (savedPrefs) {
                    setNotifications(JSON.parse(savedPrefs));
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
                showToast('Failed to load profile data', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, currentUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);

            await userService.updateUser(userId, {
                username: formData.username,
                email: formData.email,
            });

            // Refresh user data
            await refreshUser();

            showToast('Profile updated successfully!', 'success');
        } catch (err) {
            console.error('Error updating profile:', err);
            showToast('Failed to update profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        const newNotifications = {
            ...notifications,
            [key]: !notifications[key],
        };
        setNotifications(newNotifications);

        // Save to localStorage (will be replaced with backend when implemented)
        localStorage.setItem('notificationPreferences', JSON.stringify(newNotifications));
        showToast('Notification preferences updated', 'success');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <ToastContainer />
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-white">Profile Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="glass-card p-8 text-center h-fit">
                        <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-tr from-violet-600 to-pink-600 p-1 mb-6">
                            <div className="w-full h-full rounded-full bg-[#151A25] flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">
                                    {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{currentUser?.username || 'User'}</h2>
                        <p className="text-slate-400 mb-6">{currentUser?.email || 'user@example.com'}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
                                <p className="text-xs text-slate-500">Reports</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-2xl font-bold text-white">{stats.totalUpvotes}</p>
                                <p className="text-xs text-slate-500">Upvotes</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="w-full py-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm font-medium">
                                {currentUser?.role || 'USER'}
                            </div>
                            <div className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                                {currentUser?.status || 'ACTIVE'}
                            </div>
                        </div>
                    </div>

                    {/* Settings Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="input-dark w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input-dark w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (currentUser) {
                                                setFormData({
                                                    username: currentUser.username,
                                                    email: currentUser.email,
                                                });
                                            }
                                        }}
                                        className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="btn-gradient px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                            <div className="space-y-4">
                                {[
                                    { key: 'emailNewIssues', label: 'Email notifications for new issues in my area' },
                                    { key: 'pushReportUpdates', label: 'Push notifications for report updates' },
                                    { key: 'weeklySummary', label: 'Weekly summary emails' },
                                    { key: 'upvoteNotifications', label: 'Notifications when someone upvotes my report' }
                                ].map((pref) => (
                                    <label
                                        key={pref.key}
                                        className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={notifications[pref.key as keyof typeof notifications]}
                                                onChange={() => handleNotificationChange(pref.key as keyof typeof notifications)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                        </div>
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{pref.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
