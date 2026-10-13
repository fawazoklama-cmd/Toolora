import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { HistoryProvider } from './context/HistoryContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';

import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <HistoryProvider>
          <ToastProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tools" element={<AllToolsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/categories/:slug" element={<CategoryDetailPage />} />
                  <Route path="/tools/:slug" element={<ToolDetailPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </ToastProvider>
        </HistoryProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
