import React from 'react';
import PropTypes from 'prop-types';

const GoalCard = ({ goal }) => {
    const {
        id,
        name = 'Unnamed Goal',
        description = 'No description provided',
        target = 0,
        current = 0,
        unit = 'units',
        startDate,
    } = goal || {};

    const safeTarget = typeof target === 'number' ? target : 0;
    const safeCurrent = typeof current === 'number' ? current : 0;

    const progress = safeTarget > 0 ? Math.min((safeCurrent / safeTarget) * 100, 100) : 0;

    const startDateDisplay = startDate ? new Date(startDate).toLocaleDateString() : null;


    const progressBar = (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            {safeTarget > 0 && safeCurrent === 0 ? (
                 <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `0%` }}>
                     <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold ">
                            {`${progress.toFixed(0)}%`}
                        </span>
                </div>
            ) : (
               <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}>
                   <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold ">
                       {`${progress.toFixed(0)}%`}
                   </span>
               </div>
            )}
           
           {safeTarget === 0 && safeCurrent === 0 && (
               <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs italic font-bold">
                     No target set, no progress recorded.
               </span>
            )}
        </div>
    );


    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 w-full sm:w-auto">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-700">{description}</p>
            {startDateDisplay && (
                <p className="text-sm text-gray-500">
                    Start Date: {startDateDisplay}
                </p>
            )}
            <div className="w-full">
                {progressBar}
            </div>
            <p className="text-sm text-gray-600">
                {safeCurrent} / {safeTarget} {unit}
            </p>
        </div>
    );
};

GoalCard.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        target: PropTypes.number,
        current: PropTypes.number,
        unit: PropTypes.string,
        startDate: PropTypes.string,
    }).isRequired,
};

export default GoalCard;