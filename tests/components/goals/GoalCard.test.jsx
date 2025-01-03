import React from 'react';
import { render, screen } from '@testing-library/react';
import GoalCard from '../../../components/features/goals/GoalCard';

describe('GoalCard Component', () => {
    it('renders with valid goal data, showing correct information and accessibility attributes', () => {
        const goal = {
            id: '123',
            name: 'Test Goal',
            description: 'Test description',
            target: 100,
            current: 50,
            unit: 'kg',
            startDate: '2024-01-01T00:00:00.000Z',
        };

        render(<GoalCard goal={goal} />);

        expect(screen.getByRole('heading', { level: 3, name: 'Test Goal' })).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Start Date: 1/1/2024')).toBeInTheDocument();

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute('aria-valuenow', '50');
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
        expect(screen.getByText('50 / 100 kg')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
    });
    
     it('renders correct message when target and current are zero', () => {
          const goal = {
              id: '123',
              name: 'Test Goal',
              description: 'Test description',
              target: 0,
              current: 0,
              unit: 'kg',
              startDate: '2024-01-01T00:00:00.000Z',
          };

          render(<GoalCard goal={goal} />);
         const message = screen.getByText('No target set, no progress recorded.');
          expect(message).toBeInTheDocument();
          expect(screen.queryByRole('progressbar')).toBeNull();

      });
    
     it('does not display start date when startDate is not present', () => {
         const goal = {
              id: '123',
             name: 'Test Goal',
              description: 'Test description',
              target: 100,
             current: 50,
             unit: 'kg',
          };
          render(<GoalCard goal={goal} />);
         expect(screen.queryByText(/start date/i)).toBeNull();
    });
    
      it('renders with default values for null goal', () => {
        render(<GoalCard goal={null} />);
           expect(screen.getByRole('heading', { level: 3, name: 'Unnamed Goal' })).toBeInTheDocument();
          expect(screen.getByText('No description provided')).toBeInTheDocument();
           expect(screen.getByText('No target set, no progress recorded.')).toBeInTheDocument();
    });
    
    it('renders with progress bar when current is 0 and target is greater than 0', () => {
        const goal = {
            id: '123',
            name: 'Test Goal',
            description: 'Test description',
            target: 100,
            current: 0,
            unit: 'kg',
            startDate: '2024-01-01T00:00:00.000Z',
        };
        
        render(<GoalCard goal={goal} />);
        
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute('aria-valuenow', '0');
        expect(screen.getByText('0%')).toBeInTheDocument();
    });
    
      it('handles non-number target and current values', () => {
        const goal = {
            id: '123',
            name: 'Test Goal',
            description: 'Test description',
            target: 'abc',
            current: 'def',
            unit: 'kg',
            startDate: '2024-01-01T00:00:00.000Z',
        };

        render(<GoalCard goal={goal} />);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
          expect(progressBar).toHaveAttribute('aria-valuenow', '0');
          expect(screen.getByText('0%')).toBeInTheDocument();
          expect(screen.getByText('0 / 0 kg')).toBeInTheDocument()
    });

});