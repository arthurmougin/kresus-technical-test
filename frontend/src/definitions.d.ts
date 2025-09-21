export interface User {
  email: string;
  // Add other user fields as needed
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export enum TodoPriority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export type Todo = {
  id?: number;
  title: string;
  content: string;
  priority: TodoPriority;
  executionDate?: Date | string | null;
};
