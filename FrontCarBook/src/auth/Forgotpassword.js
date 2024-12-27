import React, { useState } from 'react';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== '') {
            setLoading(true);
            setError('');
            setMessage('');
            try {
                const response = await fetch('http://localhost:8080/api/v1/login/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                if (response.ok) {
                    setMessage('A reset link has been sent to your email.');
                } else {
                    setError('Failed to send reset link. Try again later.');
                }
            } catch (error) {
                setError('Failed to send reset link. Try again later.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Email field cannot be empty.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
                <p className="text-gray-600 mb-4">Enter your email to receive a password reset link.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`bg-customYellow text-white py-2 px-4 rounded w-full hover:bg-yellow-600 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
