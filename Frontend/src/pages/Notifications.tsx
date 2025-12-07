import { useState, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { notificationService, type Notification } from '../services/notificationService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Notifications = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await notificationService.getUserNotifications(userId);
            setNotifications(data);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId: number) => {
        try {
            await notificationService.markAsRead(notificationId);
            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
            );
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    const handleDelete = async (notificationId: number) => {
        try {
            await notificationService.deleteNotification(notificationId);
            setNotifications(prev => prev.filter(n => n.id !== notificationId));
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'ISSUE_RESOLVED':
                return '✅';
            case 'ISSUE_IN_PROGRESS':
                return '🔄';
            case 'ISSUE_UPDATE':
                return '📝';
            case 'SYSTEM_ANNOUNCEMENT':
                return '📢';
            default:
                return '🔔';
        }
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'ISSUE_RESOLVED':
                return 'from-emerald-500 to-teal-500';
            case 'ISSUE_IN_PROGRESS':
                return 'from-blue-500 to-cyan-500';
            case 'ISSUE_UPDATE':
                return 'from-violet-500 to-purple-500';
            case 'SYSTEM_ANNOUNCEMENT':
                return 'from-pink-500 to-rose-500';
            default:
                return 'from-slate-500 to-slate-600';
        }
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays === 1) return '1d ago';
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={fetchNotifications}
                        className="btn-gradient px-6 py-3"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Bell className="text-violet-400" size={32} />
                        Notifications
                        {unreadCount > 0 && (
                            <span className="px-3 py-1 rounded-full bg-violet-500 text-white text-sm font-medium">
                                {unreadCount} new
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-400">Stay updated on your reports and community activities</p>
                </div>
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Notifications</h3>
                    <p className="text-slate-400">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`glass-card p-5 flex items-start gap-4 transition-all ${!notification.isRead ? 'border-l-4 border-violet-500' : ''
                                }`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${getNotificationColor(notification.type)} flex items-center justify-center text-2xl shrink-0`}>
                                {getNotificationIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1">
                                        {notification.issueTitle && (
                                            <h4 className="text-white font-semibold mb-1">
                                                {notification.issueTitle}
                                            </h4>
                                        )}
                                        <p className="text-slate-300 text-sm">{notification.message}</p>
                                    </div>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">
                                        {formatTimeAgo(notification.createdAt)}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-3">
                                    {notification.issueId && (
                                        <button
                                            onClick={() => navigate(`/my-reports`)}
                                            className="text-xs px-3 py-1 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors"
                                        >
                                            View Report
                                        </button>
                                    )}
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <Check size={12} />
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
