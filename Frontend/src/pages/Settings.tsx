import { useState } from 'react';
import { Upload, Loader2, User, Mail, Shield, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user, updateProfile, refreshUser } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setMessage({ type: 'error', text: 'Username cannot be empty' });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            await updateProfile({ username });
            await refreshUser();
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select an image file' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    await updateProfile({ profilePicture: reader.result as string });
                    await refreshUser();
                    setMessage({ type: 'success', text: 'Profile picture updated!' });
                } catch (error: any) {
                    setMessage({ type: 'error', text: error.message || 'Failed to upload picture' });
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to upload picture' });
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400">Manage your account settings and preferences</p>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-4 rounded-xl border ${message.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Profile Picture Section */}
            <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <User size={20} className="text-violet-400" />
                    Profile Picture
                </h2>

                <div className="flex items-center gap-6">
                    {user?.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt={user.username}
                            className="w-24 h-24 rounded-full object-cover border-2 border-violet-500/30"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}

                    <div>
                        <label className="btn-gradient px-6 py-3 cursor-pointer inline-flex items-center gap-2">
                            <Upload size={18} />
                            {loading ? 'Uploading...' : 'Upload Picture'}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePictureUpload}
                                disabled={loading}
                            />
                        </label>
                        <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <User size={20} className="text-violet-400" />
                    Profile Information
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#151A25] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                            placeholder="Enter username"
                            disabled={loading}
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <Mail size={16} />
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full bg-[#151A25]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                            disabled
                        />
                        <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Role (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <Shield size={16} />
                            Role
                        </label>
                        <input
                            type="text"
                            value={user?.role || 'USER'}
                            className="w-full bg-[#151A25]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    {/* Provider (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <Key size={16} />
                            Authentication Provider
                        </label>
                        <input
                            type="text"
                            value={user?.provider || 'LOCAL'}
                            className="w-full bg-[#151A25]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-gradient px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
