import { ToolHistoryItem } from '../types';

const FAVORITES_KEY = 'toolora_favorites';
const HISTORY_KEY = 'toolora_history';
const THEME_KEY = 'toolora_theme';
const MAX_HISTORY_ITEMS = 50;

export const safeLocalStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

// Favorites management
export const getStoredFavorites = (): string[] => {
  return safeLocalStorage.get<string[]>(FAVORITES_KEY, []);
};

export const saveStoredFavorites = (favorites: string[]): boolean => {
  return safeLocalStorage.set(FAVORITES_KEY, favorites);
};

export const toggleStoredFavorite = (toolId: string): string[] => {
  const current = getStoredFavorites();
  const exists = current.includes(toolId);
  const updated = exists ? current.filter((id) => id !== toolId) : [...current, toolId];
  saveStoredFavorites(updated);
  return updated;
};

// History management (stores tool metadata only; never sensitive data or passwords)
export const getStoredHistory = (): ToolHistoryItem[] => {
  return safeLocalStorage.get<ToolHistoryItem[]>(HISTORY_KEY, []);
};

export const addToolToHistory = (item: Omit<ToolHistoryItem, 'timestamp'>): ToolHistoryItem[] => {
  const current = getStoredHistory().filter((h) => h.id !== item.id);
  const updated: ToolHistoryItem[] = [
    {
      ...item,
      timestamp: Date.now(),
    },
    ...current,
  ].slice(0, MAX_HISTORY_ITEMS);

  safeLocalStorage.set(HISTORY_KEY, updated);
  return updated;
};

export const removeToolFromHistory = (toolId: string): ToolHistoryItem[] => {
  const current = getStoredHistory();
  const updated = current.filter((h) => h.id !== toolId);
  safeLocalStorage.set(HISTORY_KEY, updated);
  return updated;
};

export const clearStoredHistory = (): void => {
  safeLocalStorage.remove(HISTORY_KEY);
};

// Export and Import preferences
export interface ExportData {
  version: string;
  exportedAt: string;
  favorites: string[];
  history: ToolHistoryItem[];
  theme: string;
}

export const exportUserData = (): string => {
  const data: ExportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    favorites: getStoredFavorites(),
    history: getStoredHistory(),
    theme: safeLocalStorage.get<string>(THEME_KEY, 'system'),
  };
  return JSON.stringify(data, null, 2);
};

export const importUserData = (jsonString: string): { success: boolean; message: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Format data JSON tidak valid.' };
    }

    if (Array.isArray(parsed.favorites)) {
      saveStoredFavorites(parsed.favorites.filter((f: unknown) => typeof f === 'string'));
    }

    if (Array.isArray(parsed.history)) {
      safeLocalStorage.set(HISTORY_KEY, parsed.history.slice(0, MAX_HISTORY_ITEMS));
    }

    if (parsed.theme && typeof parsed.theme === 'string') {
      safeLocalStorage.set(THEME_KEY, parsed.theme);
    }

    return { success: true, message: 'Data preferensi berhasil dipulihkan!' };
  } catch {
    return { success: false, message: 'Gagal memproses file cadangan. Pastikan file JSON valid.' };
  }
};
