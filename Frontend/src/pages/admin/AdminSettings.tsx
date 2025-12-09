import { useState } from 'react';
import { Shield, Bell, Database, Mail, Globe, Lock, AlertCircle, CheckCircle, Save } from 'lucide-react';
import Button3D from '../../components/ui/Button3D';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        // System Settings
        maintenanceMode: false,
        allowNewRegistrations: true,
        requireEmailVerification: true,

        // Notification Settings
        emailNotifications: true,
        issueStatusNotifications: true,
        newUserNotifications: false,
        systemAlerts: true,

        // Security Settings
        sessionTimeout: '30',
        maxLoginAttempts: '5',
        passwordMinLength: '8',

        // Data Management
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetentionDays: '365',

        // Email Configuration
        smtpHost: 'smtp.example.com',
        smtpPort: '587',
        smtpUsername: 'admin@elytra.com',

        // General
        siteName: 'Elytra',
        supportEmail: 'support@elytra.com',
        timezone: 'UTC',
    });

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

    const handleToggle = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }));
    };

    const handleInputChange = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-700'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
                    <p className="text-slate-400">Configure system-wide settings and preferences.</p>
                </div>
                <Button3D
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    variant="blue"
                    size="lg"
                >
                    <div className="flex items-center gap-2">
                        {saveStatus === 'saving' ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : saveStatus === 'success' ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 w-4 h-4" />
                                Save
                            </>
                        )}
                    </div>
                </Button3D>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Settings */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">System Settings</h2>
                            <p className="text-xs text-slate-400">Core system configuration</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Maintenance Mode</p>
                                <p className="text-xs text-slate-400 mt-1">Disable public access temporarily</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.maintenanceMode}
                                onChange={() => handleToggle('maintenanceMode')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Allow New Registrations</p>
                                <p className="text-xs text-slate-400 mt-1">Enable user sign-ups</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.allowNewRegistrations}
                                onChange={() => handleToggle('allowNewRegistrations')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Email Verification Required</p>
                                <p className="text-xs text-slate-400 mt-1">Require email confirmation for new users</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.requireEmailVerification}
                                onChange={() => handleToggle('requireEmailVerification')}
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Notifications</h2>
                            <p className="text-xs text-slate-400">Manage notification preferences</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Email Notifications</p>
                                <p className="text-xs text-slate-400 mt-1">Send notifications via email</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Issue Status Updates</p>
                                <p className="text-xs text-slate-400 mt-1">Notify users of issue changes</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.issueStatusNotifications}
                                onChange={() => handleToggle('issueStatusNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">New User Alerts</p>
                                <p className="text-xs text-slate-400 mt-1">Get notified of new registrations</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.newUserNotifications}
                                onChange={() => handleToggle('newUserNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">System Alerts</p>
                                <p className="text-xs text-slate-400 mt-1">Critical system notifications</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.systemAlerts}
                                onChange={() => handleToggle('systemAlerts')}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Security</h2>
                            <p className="text-xs text-slate-400">Security and authentication settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Session Timeout (minutes)</label>
                            <input
                                type="number"
                                value={settings.sessionTimeout}
                                onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Max Login Attempts</label>
                            <input
                                type="number"
                                value={settings.maxLoginAttempts}
                                onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Password Minimum Length</label>
                            <input
                                type="number"
                                value={settings.passwordMinLength}
                                onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Database className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Data Management</h2>
                            <p className="text-xs text-slate-400">Backup and data retention settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">Automatic Backups</p>
                                <p className="text-xs text-slate-400 mt-1">Enable scheduled backups</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.autoBackup}
                                onChange={() => handleToggle('autoBackup')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Backup Frequency</label>
                            <select
                                value={settings.backupFrequency}
                                onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            >
                                <option value="hourly">Hourly</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Data Retention (days)</label>
                            <input
                                type="number"
                                value={settings.dataRetentionDays}
                                onChange={(e) => handleInputChange('dataRetentionDays', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Configuration */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Email Configuration</h2>
                            <p className="text-xs text-slate-400">SMTP server settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">SMTP Host</label>
                            <input
                                type="text"
                                value={settings.smtpHost}
                                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">SMTP Port</label>
                            <input
                                type="text"
                                value={settings.smtpPort}
                                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">SMTP Username</label>
                            <input
                                type="email"
                                value={settings.smtpUsername}
                                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">General</h2>
                            <p className="text-xs text-slate-400">Basic application settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => handleInputChange('siteName', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Support Email</label>
                            <input
                                type="email"
                                value={settings.supportEmail}
                                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleInputChange('timezone', e.target.value)}
                                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time</option>
                                <option value="America/Chicago">Central Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                                <option value="Europe/London">London</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                                <option value="Asia/Karachi">Karachi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="glass-card p-6 border-l-4 border-amber-500">
                <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Important Notice</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Changes to system settings will affect all users. Please ensure you understand the impact of each setting before saving.
                            Some settings may require a system restart to take effect.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
