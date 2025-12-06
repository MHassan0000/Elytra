import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/authService';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleOAuth2Redirect = async () => {
            const token = searchParams.get('token');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                setError(errorParam);
                setTimeout(() => navigate('/login?error=' + encodeURIComponent(errorParam)), 2000);
                return;
            }

            if (token) {
                try {
                    // Store the token
                    authService.setToken(token);

                    // Fetch user data to verify token and update context
                    await authService.getCurrentUser();

                    // Navigate to dashboard
                    navigate('/dashboard', { replace: true });
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    authService.removeToken();
                    setError('Failed to authenticate');
                    setTimeout(() => navigate('/login?error=auth_failed'), 2000);
                }
            } else {
                setError('No token received');
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        handleOAuth2Redirect();
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                {error ? (
                    <>
                        <div className="text-red-500 text-xl mb-4">⚠️</div>
                        <p className="text-red-400">{error}</p>
                        <p className="mt-2 text-gray-500 text-sm">Redirecting to login...</p>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-400">Completing authentication...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default OAuth2RedirectHandler;
