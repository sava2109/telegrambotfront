import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, X, ArrowLeft } from 'lucide-react';
import { useTaskContext } from '../store/TaskContext';
import { FileUpload } from '../components/FileUpload';
import { createTask } from '../services/clickup';

export function DetailsPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attachment) {
      setError('Please upload an attachment');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTask(formData);
      resetForm();
      navigate('/success');
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
        <p className="mt-2 text-gray-600">Add description and attachment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Enter task description"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Attachment (Required)
          </label>
          <div className="flex items-center space-x-4">
            <FileUpload
              onChange={(file) => updateFormData({ attachment: file })}
              disabled={loading}
            />
            {formData.attachment && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="truncate max-w-[150px]">{formData.attachment.name}</span>
                <button
                  type="button"
                  onClick={() => updateFormData({ attachment: null })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            type="submit"
            disabled={loading || !formData.attachment}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}