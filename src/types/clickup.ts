export interface TaskPayload {
  id: string;
  description: string;
  attachment?: File | null;
}

export interface ClickUpTaskResponse {
  id: string;
  [key: string]: any;
}