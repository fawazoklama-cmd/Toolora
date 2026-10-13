import React, { createContext, useContext, useState } from 'react';
import {
  addToolToHistory,
  clearStoredHistory,
  getStoredHistory,
  removeToolFromHistory,
} from '../lib/storage';
import { CategoryId, ToolHistoryItem } from '../types';

interface HistoryContextType {
  history: ToolHistoryItem[];
  recordToolVisit: (item: { id: string; slug: string; name: string; icon: string; category: CategoryId }) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ToolHistoryItem[]>(() => getStoredHistory());

  const recordToolVisit = (item: { id: string; slug: string; name: string; icon: string; category: CategoryId }) => {
    const updated = addToolToHistory(item);
    setHistory(updated);
  };

  const removeFromHistory = (id: string) => {
    const updated = removeToolFromHistory(id);
    setHistory(updated);
  };

  const clearHistory = () => {
    clearStoredHistory();
    setHistory([]);
  };

  return (
    <HistoryContext.Provider
      value={{ history, recordToolVisit, removeFromHistory, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useToolHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useToolHistory must be used within a HistoryProvider');
  }
  return context;
};
