import React, { useState } from 'react';
import { Send, Loader2, X } from 'lucide-react';
import { createTask } from '../services/clickup';
import { FileUpload } from './FileUpload';

export function TaskForm() {
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createTask({ id, description, attachment });
      setSuccess(true);
      setId('');
      setDescription('');
      setAttachment(null);
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
          Ticket ID
        </label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter ticket ID"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          placeholder="Enter task description"
          required
          disabled={loading}
        />
      </div>

      <div className="flex items-center space-x-4">
        <FileUpload onChange={setAttachment} disabled={loading} />
        {attachment && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="truncate max-w-[150px]">{attachment.name}</span>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-sm">Task created successfully!</div>
      )}

      <button
        type="submit"
        disabled={loading || !id || !description}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </form>
  );
}