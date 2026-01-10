import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { useApp } from '../contexts/AppContext';
import { createBlob, decode, decodeAudioData } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

export const LivePractice = () => {
  const { settings } = useApp();
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Initialize
  useEffect(() => {
    return () => {
        stopSession();
    };
  }, []);

  const stopSession = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (inputAudioContextRef.current) {
        inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
    }
    // We can't explicitly close the session object from here easily without storing it, 
    // but closing the contexts and stream stops the flow.
    setConnected(false);
    setMicActive(false);
  };

  const startSession = async () => {
    if (!settings.apiKey) return;

    try {
        const ai = new GoogleGenAI({ apiKey: settings.apiKey });
        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        
        inputAudioContextRef.current = inputAudioContext;
        outputAudioContextRef.current = outputAudioContext;
        const outputNode = outputAudioContext.createGain();
        outputNode.connect(outputAudioContext.destination);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-12-2025',
            callbacks: {
                onopen: () => {
                    setConnected(true);
                    setMicActive(true);
                    setMessages(p => [...p, {role: 'system', text: 'Connected! Start speaking.'}]);
                    
                    const source = inputAudioContext.createMediaStreamSource(stream);
                    const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                    
                    scriptProcessor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromise.then(session => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    };
                    
                    source.connect(scriptProcessor);
                    scriptProcessor.connect(inputAudioContext.destination);
                },
                onmessage: async (msg: LiveServerMessage) => {
                    // Handle Transcription for UI
                    if (msg.serverContent?.outputTranscription) {
                         // Real-time updates could go here, simplifying for block messages
                    }
                    if (msg.serverContent?.turnComplete) {
                        // Could append to chat log
                    }

                    // Handle Audio
                    const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (audioData) {
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
                        const audioBuffer = await decodeAudioData(
                            decode(audioData),
                            outputAudioContext,
                            24000,
                            1
                        );
                        const source = outputAudioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputNode);
                        source.addEventListener('ended', () => {
                            sourcesRef.current.delete(source);
                        });
                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += audioBuffer.duration;
                        sourcesRef.current.add(source);
                    }
                },
                onclose: () => {
                    setConnected(false);
                    setMessages(p => [...p, {role: 'system', text: 'Connection closed.'}]);
                },
                onerror: (err) => {
                    console.error(err);
                    setMessages(p => [...p, {role: 'system', text: 'Error occurred.'}]);
                }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                systemInstruction: "You are a friendly Finnish tutor. Speak slowly and clearly. Alternate between Finnish and English to explain. Your goal is to help a beginner practice basic conversation.",
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                }
            }
        });
        
        sessionPromiseRef.current = sessionPromise;

    } catch (e) {
        console.error(e);
        alert("Failed to connect to microphone or API.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
        <div className="p-4 bg-slate-800 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
                &times; Close
            </button>
            <h2 className="font-bold text-lg">Live Tutor 🇫🇮</h2>
            <div className={`h-3 w-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${micActive ? 'bg-finland-blue scale-110 shadow-[0_0_50px_rgba(0,53,128,0.6)]' : 'bg-slate-700'}`}>
                <span className="text-6xl">
                    {micActive ? '🗣️' : '😶'}
                </span>
            </div>
            
            <div className="max-w-md">
                <p className="text-xl font-light">
                    {connected 
                        ? "Listening... Speak in English or Finnish." 
                        : "Ready to practice? Click Start."}
                </p>
                <p className="text-sm text-gray-400 mt-4">
                    The AI will listen to you and respond with voice audio.
                </p>
            </div>

            <div className="flex gap-4">
                {!connected ? (
                    <button 
                        onClick={startSession}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-transform hover:scale-105"
                    >
                        Start Conversation
                    </button>
                ) : (
                    <button 
                        onClick={stopSession}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg"
                    >
                        End Session
                    </button>
                )}
            </div>
        </div>
        
        {/* Captions / Logs could go here if transcription was fully enabled and stored */}
        <div className="p-4 bg-slate-950 h-32 overflow-y-auto text-sm text-gray-500 font-mono">
             {messages.map((m, i) => (
                 <div key={i}><span className="font-bold uppercase">{m.role}:</span> {m.text}</div>
             ))}
        </div>
    </div>
  );
};