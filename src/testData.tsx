import type { Task } from "./types/TaskTypes";
import {
  FaTshirt,
  FaLaptop,
  FaMobileAlt,
  FaCouch,
  FaAppleAlt,
  FaBook,
  FaDumbbell,
  FaCar,
} from "react-icons/fa";

export const testTasks: Task[] = [
  {
    id: 1,
    title: "Prepare monthly sales report",
    description:
      "Analyze last month's sales and prepare the report for the board meeting.",
    category: "electronics", // 🔹 match con testCategories
    priority: "high",
    dueDate: new Date("2025-09-15"),
    completed: false,
    createdAt: new Date("2025-09-01T10:00:00Z"),
    updatedAt: new Date("2025-09-05T14:30:00Z"),
    assignee: {
      id: "u1",
      name: "John Doe",
      avatarUrl: "https://example.com/avatar1.jpg",
      email: "",
    },
  },
  {
    id: 2,
    title: "Grocery shopping",
    description: "Buy vegetables, fruits, and milk for the week.",
    category: "food", // 🔹 alimentos
    priority: "medium",
    dueDate: new Date("2025-09-10"),
    completed: false,
    createdAt: new Date("2025-09-02T09:15:00Z"),
    assignee: {
      id: "u2",
      name: "Jane Smith",
      avatarUrl: "https://example.com/avatar2.jpg",
      email: "",
    },
  },
  {
    id: 3,
    title: "Doctor appointment",
    description: "Annual health check-up at 10:30 AM.",
    category: "sports", // 🔹 lo asociamos a deportes
    priority: "high",
    dueDate: new Date("2025-09-12"),
    completed: false,
    createdAt: new Date("2025-09-03T11:00:00Z"),
    assignee: {
      id: "u3",
      name: "Alice Johnson",
      avatarUrl: "https://example.com/avatar3.jpg",
      email: "",
    },
  },
  {
    id: 4,
    title: "Read new book",
    description: "Finish reading 'Atomic Habits' by James Clear.",
    category: "books", // 🔹 match con Libros
    priority: "low",
    dueDate: new Date("2025-09-30"),
    completed: false,
    createdAt: new Date("2025-09-04T08:00:00Z"),
    assignee: {
      id: "u4",
      name: "Michael Brown",
      avatarUrl: "https://example.com/avatar4.jpg",
      email: "",
    },
  },
  {
    id: 5,
    title: "Team meeting",
    description: "Weekly sync with the development team.",
    category: "clothing", // 🔹 lo puse en Ropa como ejemplo
    priority: "medium",
    dueDate: new Date("2025-09-09"),
    completed: true,
    createdAt: new Date("2025-09-01T09:00:00Z"),
    updatedAt: new Date("2025-09-08T16:45:00Z"),
    assignee: {
      id: "u5",
      name: "Emma Wilson",
      avatarUrl: "https://example.com/avatar5.jpg",
      email: "",
    },
  },
];

export const testCategories = [
  {
    id: "clothing",
    name: "clothing",
    description: "Clothing and fashion for all ages.",
    icon: "FaTshirt",
    color: "#3b82f6",
    size: 28,
  },
  {
    id: "electronics",
    name: "electronics",
    description: "Computers, accessories, and gadgets.",
    icon: "FaLaptop",
    color: "#4b5563",
    size: 28,
  },
  {
    id: "mobiles",
    name: "mobiles",
    description: "Smartphones and mobile devices.",
    icon: "FaMobileAlt",
    color: "#10b981",
    size: 28,
  },
  {
    id: "furniture",
    name: "furniture",
    description: "Home and office furniture items.",
    icon: "FaCouch",
    color: "#f97316",
    size: 28,
  },
  {
    id: "food",
    name: "food",
    description: "Fresh products and groceries.",
    icon: "FaAppleAlt",
    color: "#ef4444",
    size: 28,
  },
  {
    id: "books",
    name: "books",
    description: "Books for education, literature, and entertainment.",
    icon: "FaBook",
    color: "#8b5cf6",
    size: 28,
  },
  {
    id: "sports",
    name: "sports",
    description: "Sports equipment and accessories.",
    icon: "FaDumbbell",
    color: "#6366f1",
    size: 28,
  },
  {
    id: "automotive",
    name: "automotive",
    description: "Vehicle accessories and spare parts.",
    icon: "FaCar",
    color: "#f59e0b",
    size: 28,
  },
];


export const iconMap: Record<string, React.ElementType> = {
  FaTshirt,
  FaLaptop,
  FaMobileAlt,
  FaCouch,
  FaAppleAlt,
  FaBook,
  FaDumbbell,
  FaCar,
};

export const colorMap: Record<string, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#10b981",
  yellow: "#f59e0b",
  purple: "#8b5cf6",
  pink: "#ec4899",
  indigo: "#6366f1",
  orange: "#f97316",
  teal: "#14b8a6",
  gray: "#6b7280",
  emerald: "#059669",
  rose: "#f43f5e",
  sky: "#0ea5e9",
  amber: "#d97706",
  lime: "#65a30d",
  cyan: "#06b6d4",
};
