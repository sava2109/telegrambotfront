import { CLICKUP_CONFIG } from '../config/constants';
import { TaskData } from '../types/task';

export async function createTask({ id, description = '', attachment }: TaskData): Promise<void> {
  const queryParams = new URLSearchParams({
    custom_task_ids: 'true',
    team_id: CLICKUP_CONFIG.TEAM_ID
  });

  const response = await fetch(
    `${CLICKUP_CONFIG.API_URL}/list/${CLICKUP_CONFIG.LIST_ID}/task?${queryParams}`,
    {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_CONFIG.TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `Ticket_${id}`,
        description: `ID: ${id}\n\nDescription: ${description}`,
        assignees: []
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  const data = await response.json();
  await addAttachment(data.id, attachment);
}

async function addAttachment(taskId: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append('attachment', file);

  const response = await fetch(
    `${CLICKUP_CONFIG.API_URL}/task/${taskId}/attachment`,
    {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_CONFIG.TOKEN
      },
      body: formData
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload attachment');
  }
}