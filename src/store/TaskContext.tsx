import React, { createContext, useContext, useState } from 'react';
import { TaskFormState } from '../types/task';

interface TaskContextType {
  formData: TaskFormState;
  updateFormData: (data: Partial<TaskFormState>) => void;
  resetForm: () => void;
}

const initialState: TaskFormState = {
  id: '',
  description: '',
  attachment: null,
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<TaskFormState>(initialState);

  const updateFormData = (data: Partial<TaskFormState>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return (
    <TaskContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}