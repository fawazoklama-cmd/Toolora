export type CategoryId =
  | 'math'
  | 'text'
  | 'developer'
  | 'security'
  | 'design'
  | 'converter'
  | 'image'
  | 'social'
  | 'file'
  | 'datetime'
  | 'finance'
  | 'generators';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: CategoryId[];
  icon: string;
  keywords: string[];
  featured?: boolean;
}

export interface ToolHistoryItem {
  id: string;
  slug: string;
  name: string;
  icon: string;
  category: CategoryId;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
