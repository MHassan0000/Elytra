import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { surveyService, type Survey, type SurveyQuestion, type SurveyResponseData } from '../services/surveyService';
import { useUser } from '../context/UserContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SurveyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { userId } = useUser();
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [responses, setResponses] = useState<SurveyResponseData>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchSurvey();
    }, [id]);

    const fetchSurvey = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const data = await surveyService.getSurveyById(parseInt(id));
            setSurvey(data);

            // Parse questions from JSON
            const parsedQuestions: SurveyQuestion[] = JSON.parse(data.questions);
            setQuestions(parsedQuestions);

            // Initialize responses
            const initialResponses: SurveyResponseData = {};
            parsedQuestions.forEach(q => {
                if (q.type === 'checkbox') {
                    initialResponses[q.id] = [];
                } else if (q.type === 'rating') {
                    initialResponses[q.id] = 0;
                } else {
                    initialResponses[q.id] = '';
                }
            });
            setResponses(initialResponses);
        } catch (err) {
            console.error('Error fetching survey:', err);
            setError('Failed to load survey');
        } finally {
            setLoading(false);
        }
    };

    const handleResponseChange = (questionId: string, value: string | string[] | number) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required questions
        const missingRequired = questions.filter(q =>
            q.required && (
                !responses[q.id] ||
                (Array.isArray(responses[q.id]) && (responses[q.id] as string[]).length === 0) ||
                responses[q.id] === ''
            )
        );

        if (missingRequired.length > 0) {
            setError('Please answer all required questions');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            await surveyService.submitSurveyResponse(parseInt(id!), userId, responses);
            setSuccess(true);
            setTimeout(() => {
                navigate('/surveys');
            }, 2000);
        } catch (err: any) {
            console.error('Error submitting survey:', err);
            setError(err.response?.data?.error || 'Failed to submit survey');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error && !survey) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/surveys')}
                        className="btn-gradient px-6 py-3"
                    >
                        Back to Surveys
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="glass-card p-12 text-center max-w-md">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                    <p className="text-slate-400 mb-6">Your response has been submitted successfully</p>
                    <button
                        onClick={() => navigate('/surveys')}
                        className="btn-gradient px-6 py-3"
                    >
                        Back to Surveys
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/surveys')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Surveys
                </button>
                <h1 className="text-3xl font-bold text-white mb-2">{survey?.title}</h1>
                <p className="text-slate-400">{survey?.description}</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400">
                    {error}
                </div>
            )}

            {/* Survey Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="glass-card p-6">
                        <label className="block text-white font-medium mb-4">
                            {index + 1}. {question.question}
                            {question.required && <span className="text-red-400 ml-1">*</span>}
                        </label>

                        {question.type === 'text' && (
                            <textarea
                                value={responses[question.id] as string}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="w-full bg-[#151A25] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all min-h-[100px]"
                                placeholder="Type your answer here..."
                                required={question.required}
                            />
                        )}

                        {question.type === 'radio' && question.options && (
                            <div className="space-y-3">
                                {question.options.map((option) => (
                                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            checked={responses[question.id] === option}
                                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                            className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                                            required={question.required}
                                        />
                                        <span className="text-slate-300 group-hover:text-white transition-colors">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === 'checkbox' && question.options && (
                            <div className="space-y-3">
                                {question.options.map((option) => (
                                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={(responses[question.id] as string[]).includes(option)}
                                            onChange={(e) => {
                                                const current = responses[question.id] as string[];
                                                const updated = e.target.checked
                                                    ? [...current, option]
                                                    : current.filter(v => v !== option);
                                                handleResponseChange(question.id, updated);
                                            }}
                                            className="w-4 h-4 text-violet-500 focus:ring-violet-500 rounded"
                                        />
                                        <span className="text-slate-300 group-hover:text-white transition-colors">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === 'rating' && (
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => handleResponseChange(question.id, rating)}
                                        className={`w-12 h-12 rounded-lg font-bold transition-all ${responses[question.id] === rating
                                                ? 'bg-violet-500 text-white scale-110'
                                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gradient px-8 py-3 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Submit Survey
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SurveyDetail;
