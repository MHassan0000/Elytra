import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { issueService } from '../services/issueService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useToast } from '../components/ui/Toast';

const Profile = () => {

    const { user, updateProfile } = useAuth();
    const { showToast, ToastContainer } = useToast();

    const [formData, setFormData] = useState({
        username: '',
        profilePicture: '',
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

                // Fetch user stats if user is authenticated
                if (user?.id) {
                    const issueStats = await issueService.getUserIssueStats(user.id);
                    setStats({
                        totalReports: issueStats.total,
                        totalUpvotes: 0, // Placeholder - would need backend endpoint
                    });
                }

                // Set form data from authenticated user
                if (user) {
                    setFormData({
                        username: user.username,
                        profilePicture: user.profilePicture || '',
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
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);

            await updateProfile({
                username: formData.username,
                profilePicture: formData.profilePicture || undefined,
            });

            showToast('Profile updated successfully!', 'success');
        } catch (err: any) {
            console.error('Error updating profile:', err);
            showToast(err.message || 'Failed to update profile', 'error');
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
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{user?.username || 'User'}</h2>
                        <p className="text-slate-400 mb-6">{user?.email || 'user@example.com'}</p>

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
                                {user?.role || 'USER'}
                            </div>
                            <div className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                                {user?.status || 'ACTIVE'}
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
                                            value={user?.email || ''}
                                            disabled
                                            className="input-dark w-full opacity-50 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (user) {
                                                setFormData({
                                                    username: user.username,
                                                    profilePicture: user.profilePicture || '',
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
