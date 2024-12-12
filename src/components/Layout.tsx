import React from 'react';
import { ClipboardList } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-center">
          <ClipboardList className="w-12 h-12 text-blue-600" />
        </div>
        {children}
      </div>
    </div>
  );
}