import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Plus } from 'lucide-react';

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Task Created Successfully!</h2>
        <p className="mt-2 text-gray-600">Your task has been created in ClickUp</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Another Task
      </button>
    </div>
  );
}