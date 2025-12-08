import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, AlertCircle } from 'lucide-react';
import { surveyService } from '../../services/surveyService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface ResponseData {
    id: number;
    surveyId: number;
    surveyTitle: string;
    surveyDescription: string;
    questions: string;
    userId: number;
    username: string;
    email: string;
    responses: string;
    submittedAt: string;
}

const SurveyResponseDetails = () => {
    const { surveyId, userId } = useParams<{ surveyId: string; userId: string }>();
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [parsedQuestions, setParsedQuestions] = useState<any[]>([]);
    const [parsedResponses, setParsedResponses] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (surveyId && userId) {
            fetchResponseDetails(parseInt(surveyId), parseInt(userId));
        }
    }, [surveyId, userId]);

    const fetchResponseDetails = async (sId: number, uId: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await surveyService.getSurveyResponseByUser(sId, uId);
            setResponseData(data);

            // Parse questions and responses
            try {
                const questions = JSON.parse(data.questions);
                const responses = JSON.parse(data.responses);
                setParsedQuestions(questions);
                setParsedResponses(responses);
            } catch (parseErr) {
                console.error('Error parsing survey data:', parseErr);
            }
        } catch (err: any) {
            console.error('Error fetching response details:', err);
            setError(err.message || 'Failed to load response details');
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

    const renderAnswer = (question: any, answer: any) => {
        if (question.type === 'rating') {
            return (
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-2xl ${star <= answer ? 'text-yellow-400' : 'text-slate-600'}`}>
                            ★
                        </span>
                    ))}
                    <span className="ml-2 text-slate-400">({answer}/5)</span>
                </div>
            );
        } else if (question.type === 'checkbox' && Array.isArray(answer)) {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {answer.map((item: string, idx: number) => (
                        <li key={idx} className="text-white">{item}</li>
                    ))}
                </ul>
            );
        } else {
            return <p className="text-white">{answer || 'No answer provided'}</p>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !responseData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error || 'Response not found'}</p>
                    <button
                        onClick={() => navigate(`/admin/surveys/${surveyId}/responses`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Responses
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
                    onClick={() => navigate(`/admin/surveys/${surveyId}/responses`)}
                    className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Survey Response Details</h1>
                    <p className="text-slate-400">{responseData.surveyTitle}</p>
                </div>
            </div>

            {/* User Info */}
            <div className="glass-card p-6">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white">
                        {responseData.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-3">{responseData.username}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Mail className="w-4 h-4 text-slate-500" />
                                <span>{responseData.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                <span>Submitted {formatDate(responseData.submittedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Survey Description */}
            {responseData.surveyDescription && (
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-2">Survey Description</h3>
                    <p className="text-slate-400">{responseData.surveyDescription}</p>
                </div>
            )}

            {/* Questions and Answers */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Responses</h2>
                {parsedQuestions.map((question, index) => (
                    <div key={question.id || index} className="glass-card p-6">
                        <div className="mb-4">
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">{question.question}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                                        {question.type} {question.required && '• Required'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pl-11">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                {renderAnswer(question, parsedResponses[question.id])}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyResponseDetails;
