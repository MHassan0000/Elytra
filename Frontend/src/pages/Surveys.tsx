import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';
import { surveyService, type Survey } from '../services/surveyService';
import { useUser } from '../context/UserContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Surveys = () => {
    const navigate = useNavigate();
    const { userId } = useUser();
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submittedSurveys, setSubmittedSurveys] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await surveyService.getActiveSurveys();
            setSurveys(data);

            // Check which surveys user has submitted
            const submitted = new Set<number>();
            for (const survey of data) {
                const hasSubmitted = await surveyService.hasUserSubmittedSurvey(survey.id, userId);
                if (hasSubmitted) {
                    submitted.add(survey.id);
                }
            }
            setSubmittedSurveys(submitted);
        } catch (err) {
            console.error('Error fetching surveys:', err);
            setError('Failed to load surveys');
        } finally {
            setLoading(false);
        }
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
                        onClick={fetchSurveys}
                        className="btn-gradient px-6 py-3"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ClipboardList className="text-violet-400" size={32} />
                    Community Surveys
                </h1>
                <p className="text-slate-400">Help us improve your community by sharing your feedback</p>
            </div>

            {/* Surveys Grid */}
            {surveys.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Active Surveys</h3>
                    <p className="text-slate-400">Check back later for new surveys</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surveys.map((survey) => {
                        const isSubmitted = submittedSurveys.has(survey.id);
                        return (
                            <div
                                key={survey.id}
                                className="glass-card p-6 glass-card-hover relative overflow-hidden"
                            >
                                {/* Status Badge */}
                                {isSubmitted && (
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                            <CheckCircle2 size={12} />
                                            Completed
                                        </div>
                                    </div>
                                )}

                                {/* Survey Icon */}
                                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-2xl mb-4">
                                    📝
                                </div>

                                {/* Survey Info */}
                                <h3 className="text-lg font-bold text-white mb-2">{survey.title}</h3>
                                <p className="text-sm text-slate-400 mb-4 line-clamp-3">{survey.description}</p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock size={14} />
                                        <span>{new Date(survey.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/surveys/${survey.id}`)}
                                        disabled={isSubmitted}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isSubmitted
                                                ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                                                : 'bg-violet-500 hover:bg-violet-600 text-white'
                                            }`}
                                    >
                                        {isSubmitted ? 'Submitted' : 'Take Survey'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Surveys;
