import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, AlertCircle } from 'lucide-react';
import { surveyService } from '../../services/surveyService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface SurveyResponse {
    id: number;
    userId: number;
    username: string;
    email: string;
    submittedAt: string;
}

const SurveyResponses = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [responses, setResponses] = useState<SurveyResponse[]>([]);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchResponses(parseInt(id));
        }
    }, [id]);

    const fetchResponses = async (surveyId: number) => {
        try {
            setLoading(true);
            setError(null);

            // Get survey details
            const survey = await surveyService.getSurveyById(surveyId);
            setSurveyTitle(survey.title);

            // Get responses
            const data = await surveyService.getSurveyResponses(surveyId);
            setResponses(data);
        } catch (err: any) {
            console.error('Error fetching survey responses:', err);
            setError(err.message || 'Failed to load survey responses');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                        onClick={() => navigate('/admin/surveys')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Surveys
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/surveys')}
                    className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Survey Responses</h1>
                    <p className="text-slate-400">{surveyTitle}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                        <p className="text-slate-400 text-sm">Total Responses</p>
                        <h3 className="text-2xl font-bold text-white">{responses.length}</h3>
                    </div>
                </div>
            </div>

            {/* Responses Table */}
            <div className="glass-card p-1">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">User Responses</h2>
                </div>
                {responses.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {responses.map((response) => (
                                <tr
                                    key={response.id}
                                    onClick={() => navigate(`/admin/surveys/${id}/responses/${response.userId}`)}
                                    className="group hover:bg-white/2 transition-colors cursor-pointer"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                                                {response.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                                {response.username}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-400">{response.email}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 text-sm text-slate-500">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(response.submittedAt)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">No responses yet for this survey.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyResponses;
