import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/curriculum';
import { playAudio } from '../utils/audioHelpers';

export const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lesson = id ? getTopicById(id) : null;

  if (!lesson) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <button onClick={() => navigate('/')} className="text-finland-blue underline">Back home</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/')} className="text-finland-blue hover:underline font-bold">
            &larr; Back to Dashboard
        </button>
        <button 
            onClick={() => navigate(`/quiz/${id}`)}
            className="bg-finland-blue text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-finland-dark transition-colors"
        >
            Start Quiz &rarr;
        </button>
      </div>
      
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{lesson.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{lesson.description}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-finland-blue dark:text-blue-300">Vocabulary (Sanasto)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {lesson.vocab.map((word, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-finland-blue transition-colors group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{word.fi}</h3>
                    <p className="text-md text-slate-600 dark:text-slate-400">{word.en}</p>
                  </div>
                  <button 
                    className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-finland-blue hover:text-white dark:bg-slate-700 dark:hover:bg-blue-500 transition-colors"
                    title="Speak"
                    aria-label={`Listen to ${word.fi}`}
                    onClick={() => playAudio(word.fi)}
                  >
                    🔊
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 italic">{word.context}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-finland-blue dark:text-blue-300">Sentences (Lauseet)</h2>
          <div className="space-y-4">
            {lesson.sentences.map((s, idx) => (
              <div key={idx} className="bg-finland-light dark:bg-slate-900/50 p-6 rounded-xl border border-blue-100 dark:border-slate-700">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-xl font-medium mb-1 text-slate-900 dark:text-white">{s.fi}</p>
                        <p className="text-slate-600 dark:text-slate-400">{s.en}</p>
                    </div>
                    <button 
                    className="p-2 text-slate-400 hover:text-finland-blue transition-colors"
                    title="Speak Sentence"
                    onClick={() => playAudio(s.fi)}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};