import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/features/goals/GoalCard';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const { data, loading, error, fetch } = useFetch('/api/goals');


    useEffect(() => {
        if (!authUser) {
            navigate('/');
        } else {
           fetch();
        }
    }, [authUser, navigate, fetch]);


    useEffect(() => {
        if (error) {
            console.error('Error fetching goals:', error);
            setApiError(error);
        } else {
            setApiError(null);
        }
    }, [error]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 gap-4">
                <p className="text-gray-700 text-center">Loading goals...</p>
            </div>
        );
    }


    if (apiError) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 gap-4">
                <p className="text-red-500 text-center">Error: {apiError}</p>
            </div>
        );
    }
    
    
    if (!data) {
        return (
          <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 gap-4">
             <p className="text-gray-700 text-center">No goals found.</p>
          </div>
        )
      }
    
    if (!Array.isArray(data)) {
        console.warn('Data from useFetch does not have the correct data structure:', data);
      return (
          <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 gap-4">
             <p className="text-gray-700 text-center">An error occurred while loading goals.</p>
          </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 gap-4">
            <div className="flex flex-wrap gap-4 justify-center w-full max-w-4xl">
                {data.length > 0 ? (
                    data.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))
                ) : (
                    <p className="text-gray-700 text-center">No goals found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;