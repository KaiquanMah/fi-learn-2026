import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { Settings } from './pages/Settings';
import { LivePractice } from './pages/LivePractice';
import { Quiz } from './pages/Quiz';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="p-4 text-center text-sm text-gray-500 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
      <p>SuomiStart © 2025. Learning Finnish made accessible.</p>
    </footer>
    <ApiKeyModal />
  </div>
);

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="lesson/:id" element={<Lesson />} />
            <Route path="quiz/:id" element={<Quiz />} />
          </Route>
          <Route path="/live-practice" element={<LivePractice />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;