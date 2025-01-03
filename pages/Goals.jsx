import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/features/goals/GoalCard';
import GoalForm from '../components/features/goals/GoalForm';
import Button from '../components/common/Button';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../context/AuthContext';

const Goals = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const [showForm, setShowForm] = useState(false);
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

    const handleFormToggle = () => {
        setShowForm(!showForm);
    };

    const handleFormCancel = (submitted) => {
      setShowForm(false);
        if(submitted) {
            fetch()
        }
    };


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
            <div className="w-full max-w-4xl flex justify-between items-center mb-4">
               <h2 className="text-2xl font-bold text-gray-800">My Goals</h2>
                <Button onClick={handleFormToggle}>
                   {showForm ? 'Cancel' : 'Add New Goal'}
                </Button>
            </div>
            {showForm && <GoalForm onCancel={handleFormCancel} />}
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

Goals.propTypes = {
    onCancel: PropTypes.func,
}

export default Goals;