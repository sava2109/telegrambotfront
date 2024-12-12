export interface TaskData {
  id: string;
  description?: string;
  attachment: File;
}

export interface TaskFormState {
  id: string;
  description: string;
  attachment: File | null;
}