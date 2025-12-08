import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, AlertCircle, Plus, X, Trash2 } from 'lucide-react';
import { surveyService } from '../../services/surveyService';
import type { Survey } from '../../services/surveyService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

interface SurveyWithCount extends Survey {
    responseCount: number;
}

interface Question {
    id: string;
    question: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'rating';
    options?: string[];
    required: boolean;
}

const SurveyManagement = () => {
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState<SurveyWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [surveyToDelete, setSurveyToDelete] = useState<{ id: number; title: string } | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await surveyService.getAllSurveys();
            setSurveys(data as SurveyWithCount[]);
        } catch (err: any) {
            console.error('Error fetching surveys:', err);
            setError(err.message || 'Failed to load surveys');
        } finally {
            setLoading(false);
        }
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            question: '',
            type: 'text',
            required: true,
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addOption = (questionId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const options = q.options || [];
                return { ...q, options: [...options, ''] };
            }
            return q;
        }));
    };

    const updateOption = (questionId: string, optionIndex: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.options) {
                const newOptions = [...q.options];
                newOptions[optionIndex] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const removeOption = (questionId: string, optionIndex: number) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.options) {
                return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
            }
            return q;
        }));
    };

    const handleCreateSurvey = async () => {
        if (!title.trim()) {
            alert('Please enter a survey title');
            return;
        }
        if (questions.length === 0) {
            alert('Please add at least one question');
            return;
        }

        // Validate questions
        for (const q of questions) {
            if (!q.question.trim()) {
                alert('All questions must have text');
                return;
            }
            if ((q.type === 'radio' || q.type === 'checkbox') && (!q.options || q.options.length < 2)) {
                alert('Radio and checkbox questions must have at least 2 options');
                return;
            }
        }

        try {
            setCreating(true);
            const surveyData = {
                title,
                description,
                questions: JSON.stringify(questions),
                isActive: true,
            };

            await surveyService.createSurvey(surveyData);

            // Reset form
            setTitle('');
            setDescription('');
            setQuestions([]);
            setShowCreateModal(false);

            // Refresh surveys list
            fetchSurveys();
        } catch (err: any) {
            console.error('Error creating survey:', err);
            alert('Failed to create survey: ' + (err.message || 'Unknown error'));
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteSurvey = (surveyId: number, surveyTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSurveyToDelete({ id: surveyId, title: surveyTitle });
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!surveyToDelete) return;
        try {
            await surveyService.deleteSurvey(surveyToDelete.id);
            setShowDeleteDialog(false);
            setSurveyToDelete(null);
            fetchSurveys();
        } catch (err: any) {
            console.error('Error deleting survey:', err);
            alert('Failed to delete survey: ' + (err.message || 'Unknown error'));
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchSurveys}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Survey Management</h1>
                    <p className="text-slate-400">View and manage community surveys and responses.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Create Survey
                </button>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Survey Title</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Description</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Responses</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Created</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {surveys.map((survey) => (
                                <tr
                                    key={survey.id}
                                    onClick={() => navigate(`/admin/surveys/${survey.id}/responses`)}
                                    className="group hover:bg-white/2 transition-colors cursor-pointer"
                                >
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                            <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                                {survey.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-slate-400 max-w-xs xl:max-w-md truncate">
                                            {survey.description}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm text-slate-300">{survey.responseCount || 0}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${survey.isActive
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                            }`}>
                                            {survey.isActive ? 'Active' : 'Closed'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm text-slate-500 whitespace-nowrap">
                                        {formatDate(survey.createdAt)}
                                    </td>
                                    <td className="py-4 px-6 text-right whitespace-nowrap">
                                        <button
                                            onClick={(e) => handleDeleteSurvey(survey.id, survey.title, e)}
                                            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                            title="Delete survey"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {surveys.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">No surveys found.</p>
                    </div>
                )}
            </div>

            {/* Create Survey Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
                    <div className="glass-card p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Create New Survey</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Survey Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter survey title"
                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter survey description (optional)"
                                    rows={3}
                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 resize-none"
                                />
                            </div>

                            {/* Questions */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium text-white">Questions *</label>
                                    <button
                                        onClick={addQuestion}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Question
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {questions.map((question, index) => (
                                        <div key={question.id} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1 space-y-3">
                                                    <input
                                                        type="text"
                                                        value={question.question}
                                                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                                        placeholder="Enter question"
                                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500/50"
                                                    />

                                                    <div className="flex gap-3">
                                                        <select
                                                            value={question.type}
                                                            onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                                                            className="bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500/50"
                                                        >
                                                            <option value="text">Short Text</option>
                                                            <option value="textarea">Long Text</option>
                                                            <option value="radio">Single Choice</option>
                                                            <option value="checkbox">Multiple Choice</option>
                                                            <option value="rating">Rating (1-5)</option>
                                                        </select>

                                                        <label className="flex items-center gap-2 text-sm text-slate-300">
                                                            <input
                                                                type="checkbox"
                                                                checked={question.required}
                                                                onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                                                                className="rounded border-white/10"
                                                            />
                                                            Required
                                                        </label>
                                                    </div>

                                                    {/* Options for radio/checkbox */}
                                                    {(question.type === 'radio' || question.type === 'checkbox') && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-slate-400">Options</span>
                                                                <button
                                                                    onClick={() => addOption(question.id)}
                                                                    className="text-xs text-blue-400 hover:text-blue-300"
                                                                >
                                                                    + Add Option
                                                                </button>
                                                            </div>
                                                            {question.options?.map((option, optIndex) => (
                                                                <div key={optIndex} className="flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={option}
                                                                        onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                                                                        placeholder={`Option ${optIndex + 1}`}
                                                                        className="flex-1 bg-[#0B0E14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
                                                                    />
                                                                    <button
                                                                        onClick={() => removeOption(question.id, optIndex)}
                                                                        className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeQuestion(question.id)}
                                                    className="flex-shrink-0 p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {questions.length === 0 && (
                                        <div className="text-center py-8 text-slate-400 text-sm">
                                            No questions added yet. Click "Add Question" to get started.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleCreateSurvey}
                                    disabled={creating}
                                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {creating ? 'Creating...' : 'Create Survey'}
                                </button>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => {
                    setShowDeleteDialog(false);
                    setSurveyToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Survey"
                message={`Are you sure you want to delete "${surveyToDelete?.title}"? This will permanently delete the survey and all its responses. This action cannot be undone.`}
                confirmText="Delete Survey"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default SurveyManagement;
