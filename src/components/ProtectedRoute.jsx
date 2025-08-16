
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../slices/Auth';

function ProtectedRoute({children}) {
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const time = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearInterval(time);
    }, []);

    if (Loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-30 h-30 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Loading ...
                    </p>
                </div>
            </div>
        );
    }

    try {
        if (!user) {
            return navigate("/login");
        }
    } catch (error) {
        console.error("Navigation error:", error);
    }

    return children;
}

export default ProtectedRoute;
