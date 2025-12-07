import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Delete Report?',
    message = 'Are you sure you want to delete this report? This action cannot be undone.'
}: DeleteConfirmModalProps) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="glass-card max-w-md w-full p-6 animate-scaleIn">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="text-red-400" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="text-slate-400" size={20} />
                    </button>
                </div>

                {/* Message */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-lg shadow-red-500/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
