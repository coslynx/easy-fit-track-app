import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useFetch } from '../../../hooks/useFetch';
import { sanitizeInput, formatDate } from '../../../utils/helpers';

const GoalForm = ({ goal, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [target, setTarget] = useState(0);
    const [current, setCurrent] = useState(0);
    const [unit, setUnit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const { fetch } = useFetch();


    useEffect(() => {
        if (goal) {
            setName(goal.name || '');
            setDescription(goal.description || '');
            setTarget(goal.target || 0);
            setCurrent(goal.current || 0);
            setUnit(goal.unit || '');
            setStartDate(formatDate(goal.startDate) || '');
        }
    }, [goal]);

    const validateForm = () => {
        let isValid = true;
        if (!name.trim()) isValid = false;
        if (!target) isValid = false;
        if (!unit.trim()) isValid = false;
        setFormValid(isValid);
        return isValid;
    };


    const handleInputChange = (event, sanitizedValue, inputType) => {
        switch (inputType) {
            case 'name':
                setName(sanitizedValue);
                break;
            case 'description':
                setDescription(sanitizedValue);
                break;
            case 'target':
                const parsedTarget = Number(sanitizedValue);
                    if(isNaN(parsedTarget)) {
                        setTarget(0);
                    } else {
                         setTarget(parsedTarget);
                    }
                break;
            case 'current':
                const parsedCurrent = Number(sanitizedValue);
                    if (isNaN(parsedCurrent)) {
                        setCurrent(0)
                    } else {
                        setCurrent(parsedCurrent)
                    }
                break;
            case 'unit':
                setUnit(sanitizedValue);
                break;
            case 'startDate':
                setStartDate(sanitizedValue);
                break;
            default:
                break;
        }
        validateForm();
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setApiError('');


        const goalData = {
            name: name.trim(),
            description: description.trim(),
            target: Number(target),
            current: Number(current),
            unit: unit.trim(),
            startDate: startDate.trim()
        };


        try {
            const response = goal
                ? await fetch(`/api/goals/${goal.id}`, 'PUT', goalData)
                : await fetch('/api/goals', 'POST', goalData);

            if (response) {
                setLoading(false);
                 if (onCancel) {
                    onCancel(true);
                } else {
                    clearForm();
                }
            }
        } catch (error) {
            setApiError(error.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };


    const clearForm = () => {
        setName('');
        setDescription('');
        setTarget(0);
        setCurrent(0);
        setUnit('');
        setStartDate('');
    };

    const handleCancel = () => {
       if (onCancel) {
            onCancel(false);
        } else {
            clearForm();
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 max-w-md w-full"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">
                {goal ? 'Edit Goal' : 'Add New Goal'}
            </h2>
            <Input
                type="text"
                placeholder="Goal Name"
                value={name}
                onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'name')}
                label="Goal Name"
                name="name"
                className="mb-4"
            />
            <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'description')}
                label="Description"
                name="description"
                className="mb-4"
            />
             <Input
                type="number"
                placeholder="Target Value"
                value={target}
                 onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'target')}
                label="Target"
                name="target"
                className="mb-4"
            />
              <Input
                type="number"
                placeholder="Current Value"
                value={current}
                onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'current')}
                label="Current"
                name="current"
                className="mb-4"
            />
            <Input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'unit')}
                label="Unit"
                name="unit"
                className="mb-4"
            />
              <Input
                  type="text"
                  placeholder="Start Date"
                  value={startDate}
                 onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'startDate')}
                 label="Start Date"
                name="startDate"
                className="mb-4"
            />
            {apiError && (
                <p className="text-red-500 text-sm italic text-center mb-4">{apiError}</p>
            )}
            <div className="flex gap-2 justify-end">
            <Button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300"
            >
                Cancel
            </Button>
                <Button
                    type="submit"
                    disabled={loading || !formValid}
                >
                    {loading ? 'Loading...' : goal ? 'Update Goal' : 'Add Goal'}
                </Button>
            </div>
        </form>
    );
};

GoalForm.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        target: PropTypes.number,
        current: PropTypes.number,
        unit: PropTypes.string,
        startDate: PropTypes.string,
    }),
    onCancel: PropTypes.func,
};

export default GoalForm;