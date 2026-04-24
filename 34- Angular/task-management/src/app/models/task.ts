export interface Task {
  id: string | number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: string;
  tags: string;
  isDone: boolean;
  userId?: number;
}
