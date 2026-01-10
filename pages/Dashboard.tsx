import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { UserType } from '../types';
import { curriculumLevels } from '../data/curriculum';

export const Dashboard = () => {
  const { settings } = useApp();

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-2 text-finland-blue dark:text-blue-300">Moi! Welcome back.</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Current Goal: <span className="font-semibold text-finland-blue dark:text-white">{settings.userType} Path</span>
        </p>
        
        <Link to="/live-practice" className="block">
          <div className="bg-gradient-to-r from-finland-blue to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              🎙️ Live Conversation Tutor
            </h2>
            <p className="opacity-90 max-w-xl">
              Practice speaking Finnish in real-time. The AI adapts to your level.
              <span className="block mt-2 font-bold underline decoration-white/30 group-hover:decoration-white transition-all">Start Speaking &rarr;</span>
            </p>
          </div>
        </Link>
      </div>

      <div className="space-y-12">
        {curriculumLevels.map((level) => (
          <section key={level.id} className="relative">
             <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{level.title}</h2>
                <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {level.topics.map((topic) => (
                  <Link to={`/lesson/${topic.id}`} key={topic.id} className="group">
                    <div className="h-full bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-finland-blue dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          📖
                        </div>
                        {/* Mock status indicator */}
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-finland-blue dark:group-hover:text-blue-300">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {topic.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center text-sm font-medium text-finland-blue dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Start Lesson</span>
                        <span>&rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
             </div>
          </section>
        ))}
      </div>
    </div>
  );
};