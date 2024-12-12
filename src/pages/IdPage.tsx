import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTaskContext } from '../store/TaskContext';

export function IdPage() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/details');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Enter Ticket ID</h2>
        <p className="mt-2 text-gray-600">Please provide the ticket identifier</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
            Ticket ID
          </label>
          <input
            id="id"
            type="text"
            value={formData.id}
            onChange={(e) => updateFormData({ id: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter ticket ID"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </form>
    </div>
  );
}