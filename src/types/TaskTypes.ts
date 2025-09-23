export type Priority = "high" | "medium" | "low";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  assignee: User;
}

export type OrderType = "title" | "date" | "priority";

export interface TaskCounts {
  total: number;
  completed: number;
  pending: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string; // nombre del icono: "FaTshirt"
  color?: string; // hex, tailwind, rgb, etc.
  size?: number; // opcional: tamaño del icono
}
