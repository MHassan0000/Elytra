import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, AlertCircle } from 'lucide-react';
import { surveyService } from '../../services/surveyService';
import type { Survey } from '../../services/surveyService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface SurveyWithCount extends Survey {
    responseCount: number;
}

const SurveyManagement = () => {
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState<SurveyWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await surveyService.getAllSurveys();
            // The backend should return surveys with response counts
            setSurveys(data as SurveyWithCount[]);
        } catch (err: any) {
            console.error('Error fetching surveys:', err);
            setError(err.message || 'Failed to load surveys');
        } finally {
            setLoading(false);
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
                                            <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
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
        </div>
    );
};

export default SurveyManagement;
