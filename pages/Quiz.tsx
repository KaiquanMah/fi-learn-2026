import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/curriculum';
import { useApp } from '../contexts/AppContext';
import { gradeUserAnswer, GradeResult } from '../services/gradingService';

// Simple sound synthesis to avoid external assets
const playSound = (type: 'correct' | 'wrong', enabled: boolean) => {
    if (!enabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'correct') {
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }
};

export const Quiz = () => {
  const { id } = useParams();
  const { settings } = useApp();
  const navigate = useNavigate();
  const lesson = id ? getTopicById(id) : null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && feedbackRef.current) {
        feedbackRef.current.focus();
    }
  }, [result]);

  if (!lesson) return <div>Lesson not found</div>;
  if (!settings.apiKey) return <div className="p-8 text-center">Please enter an API key to take the quiz.</div>;

  const quizItems = [
    ...lesson.vocab.map(v => ({ type: 'word', question: v.en, target: v.fi })),
    ...lesson.sentences.map(s => ({ type: 'sentence', question: s.en, target: s.fi }))
  ];

  const currentItem = quizItems[currentIndex];
  const progressPercentage = ((currentIndex) / quizItems.length) * 100;

  const handleCheck = async () => {
    if (!userAnswer.trim()) return;
    
    setGrading(true);
    try {
        const grade = await gradeUserAnswer(
            settings.apiKey!,
            currentItem.question,
            userAnswer,
            currentItem.target
        );
        setResult(grade);
        if (grade.correct) {
            setScore(s => s + 1);
            playSound('correct', settings.soundEffects);
        } else {
            playSound('wrong', settings.soundEffects);
        }
    } catch (e) {
        console.error(e);
        setResult({ correct: false, feedback: "Error connecting to AI tutor." });
    } finally {
        setGrading(false);
    }
  };

  const handleNext = () => {
    setResult(null);
    setUserAnswer('');
    if (currentIndex < quizItems.length - 1) {
        setCurrentIndex(c => c + 1);
    } else {
        setCompleted(true);
    }
  };

  if (completed) {
    return (
        <div className="container mx-auto p-8 max-w-lg text-center flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
            <p className="text-2xl mb-8">Score: {score} / {quizItems.length}</p>
            <div className="flex gap-4 justify-center">
                <button onClick={() => navigate(`/lesson/${id}`)} className="text-finland-blue font-bold hover:underline px-4 py-2">Review</button>
                <button onClick={() => navigate('/')} className="bg-finland-blue text-white px-8 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">Back Home</button>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-[70vh] flex flex-col">
        {/* Progress Bar (US-7) */}
        <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-finland-blue transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

        <div className="mb-4 flex justify-between items-center text-sm text-gray-500">
            <span>Question {currentIndex + 1} of {quizItems.length}</span>
            <button onClick={() => navigate(`/lesson/${id}`)} className="hover:text-red-500">Exit</button>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center">
            <h2 className="text-xl text-gray-500 dark:text-gray-400 mb-2">Translate to Finnish</h2>
            <p className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">{currentItem.question}</p>

            {!result ? (
                <>
                    <input 
                        type="text" 
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        placeholder="Type your answer..."
                        className="w-full text-xl p-4 border-2 rounded-xl mb-4 focus:border-finland-blue focus:ring-4 focus:ring-blue-50 outline-none dark:bg-slate-900 dark:border-slate-700 dark:focus:ring-blue-900 transition-all"
                        autoFocus
                    />
                    <button 
                        onClick={handleCheck}
                        disabled={grading || !userAnswer}
                        className="w-full bg-finland-blue text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:bg-finland-dark transition-colors shadow-lg"
                    >
                        {grading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                Checking...
                            </span>
                        ) : 'Check Answer'}
                    </button>
                </>
            ) : (
                <div 
                    ref={feedbackRef}
                    tabIndex={-1}
                    className={`p-6 rounded-xl border-2 mb-6 outline-none focus:ring-2 focus:ring-offset-2 ${result.correct ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}
                    aria-live="polite"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl" role="img" aria-hidden="true">{result.correct ? '✅' : '❌'}</span>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{result.correct ? 'Correct!' : 'Not quite.'}</h3>
                    </div>
                    <p className="text-lg mb-4 text-slate-800 dark:text-slate-200">{result.feedback}</p>
                    {!result.correct && (
                        <div className="text-sm opacity-75">
                            Target: <span className="font-mono font-bold select-all">{currentItem.target}</span>
                        </div>
                    )}
                    <button 
                        onClick={handleNext}
                        className={`w-full mt-4 py-3 rounded-lg font-bold text-white shadow-md transition-transform active:scale-95 ${result.correct ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}
                        autoFocus
                    >
                        Continue &rarr;
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};