import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export function FileUpload({ onChange, disabled }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
        <Upload className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-sm text-gray-600">Upload Attachment</span>
      </div>
    </div>
  );
}