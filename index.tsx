import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";
import gsap from 'gsap';

// --- Configuration & Constants ---

// 15 Curated Themes: Optimized for eye comfort (WCAG AA/AAA contrast) and aesthetic appeal.
const THEMES = [
  // 1. Classic Clean (High Contrast)
  { bg: "#ffffff", text: "#0f172a", primary: "#2563eb", secondary: "#f1f5f9", accent: "#3b82f6" },
  // 2. Soft Charcoal (Dark Mode Friendly)
  { bg: "#18181b", text: "#e4e4e7", primary: "#a1a1aa", secondary: "#27272a", accent: "#d4d4d8" },
  // 3. Warm Sepia (Reading Mode)
  { bg: "#fdf6e3", text: "#433422", primary: "#b58900", secondary: "#eee8d5", accent: "#cb4b16" },
  // 4. Midnight Navy (Deep Blue)
  { bg: "#0f172a", text: "#e2e8f0", primary: "#38bdf8", secondary: "#1e293b", accent: "#7dd3fc" },
  // 5. Mint Sage (Calm Nature)
  { bg: "#ecfdf5", text: "#064e3b", primary: "#10b981", secondary: "#d1fae5", accent: "#34d399" },
  // 6. Royal Amethyst (Rich Purple)
  { bg: "#2e1065", text: "#f3e8ff", primary: "#c084fc", secondary: "#4c1d95", accent: "#d8b4fe" },
  // 7. Airy Sky (Light Blue)
  { bg: "#f0f9ff", text: "#0c4a6e", primary: "#0ea5e9", secondary: "#e0f2fe", accent: "#38bdf8" },
  // 8. Deep Forest (Dark Green)
  { bg: "#022c22", text: "#ecfdf5", primary: "#2dd4bf", secondary: "#115e59", accent: "#5eead4" },
  // 9. Gentle Rose (Soft Pink)
  { bg: "#fff1f2", text: "#881337", primary: "#f43f5e", secondary: "#ffe4e6", accent: "#fb7185" },
  // 10. Slate Grey (Neutral Dark)
  { bg: "#27272a", text: "#fafafa", primary: "#71717a", secondary: "#3f3f46", accent: "#a1a1aa" },
  // 11. Sunset Earth (Warm Orange)
  { bg: "#fff7ed", text: "#7c2d12", primary: "#ea580c", secondary: "#ffedd5", accent: "#fb923c" },
  // 12. Ocean Depth (Blue Contrast)
  { bg: "#172554", text: "#dbeafe", primary: "#60a5fa", secondary: "#1e3a8a", accent: "#93c5fd" },
  // 13. Lavender Haze (Soft Purple)
  { bg: "#faf5ff", text: "#581c87", primary: "#a855f7", secondary: "#f3e8ff", accent: "#c084fc" },
  // 14. Olive Garden (Earthy Green)
  { bg: "#f7fee7", text: "#365314", primary: "#65a30d", secondary: "#ecfccb", accent: "#84cc16" },
  // 15. True OLED (Maximum Black)
  { bg: "#000000", text: "#e5e5e5", primary: "#bb86fc", secondary: "#1f1f1f", accent: "#03dac6" }
];

const RETAILERS = [
  { name: 'Trendyol', url: (q: string) => `https://www.trendyol.com/sr?q=${encodeURIComponent(q)}` },
  { name: 'Hepsiburada', url: (q: string) => `https://www.hepsiburada.com/ara?q=${encodeURIComponent(q)}` },
  { name: 'Çiçeksepeti', url: (q: string) => `https://www.ciceksepeti.com/arama?query=${encodeURIComponent(q)}` },
  { name: 'Amazon TR', url: (q: string) => `https://www.amazon.com.tr/s?k=${encodeURIComponent(q)}` }
];

// --- Gemini Setup ---

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

// --- Types ---

type AppState = 'intro' | 'loading' | 'question' | 'results' | 'error';

interface HistoryItem {
  role: 'model' | 'user';
  text: string;
}

interface StepResponse {
  question: string;
  options: string[];
  isFinal: boolean;
  recommendations: string[];
}

// --- Helper Functions ---

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateContentWithRetry(
  modelName: string,
  prompt: string,
  config: any,
  retries = 3,
  backoff = 1000
): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config
    });
    return response;
  } catch (error: any) {
    // Retry on 429 (Too Many Requests) or 503 (Service Unavailable)
    if (retries > 0 && (error?.status === 429 || error?.code === 429 || error?.status === 503)) {
      console.warn(`API Error ${error.status || error.code}. Retrying in ${backoff}ms...`);
      await wait(backoff);
      return generateContentWithRetry(modelName, prompt, config, retries - 1, backoff * 2);
    }
    throw error;
  }
}

// --- Icons ---
const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', opacity: 0.6 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// --- Components ---

const App = () => {
  const [appState, setAppState] = useState<AppState>('intro');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [data, setData] = useState<StepResponse | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastAction, setLastAction] = useState<() => void>(() => { });
  const [showInfo, setShowInfo] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rainbowTrackRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // Randomize theme on data change
  useEffect(() => {
    if (appState === 'question' || appState === 'results') {
      const nextTheme = Math.floor(Math.random() * THEMES.length);
      setThemeIndex(nextTheme);
    }
  }, [data, appState]);

  // GSAP Animations
  useLayoutEffect(() => {
    const theme = THEMES[themeIndex];

    // Animate Background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundColor: theme.bg,
        duration: 1.2,
        ease: "power2.inOut"
      });
    }

    // Animate Text Color
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        color: theme.text,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }

    // Staggered Entry for Content
    if (contentRef.current) {
      const staggerItems = contentRef.current.querySelectorAll('.stagger-in');
      if (staggerItems.length > 0) {
        gsap.fromTo(staggerItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "transform" }
        );
      }
    }

    // Wiggly Bubble Animation for Results
    if (appState === 'results') {
      const bubbles = document.querySelectorAll('.wiggle-bubble');
      bubbles.forEach((bubble) => {
        gsap.to(bubble, {
          rotation: "random(-3, 3)",
          x: "random(-3, 3)",
          y: "random(-3, 3)",
          duration: "random(2, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: "random(0, 1)"
        });
      });
    }

    // Infinite Rainbow Loop (Start Button)
    if (rainbowTrackRef.current) {
      // Kill existing tweens to prevent stacking if component re-renders
      gsap.killTweensOf(rainbowTrackRef.current);

      // Move from 0% to -50% (exactly one period of the duplicated gradient)
      gsap.to(rainbowTrackRef.current, {
        xPercent: -50,
        duration: 20, // Very slow
        ease: "none",
        repeat: -1
      });
    }

  }, [themeIndex, appState, data, errorMsg]);

  // --- Logic ---

  const handleStart = async () => {
    setAppState('loading');

    // Initial Prompt
    const prompt = "Start the session. Ask 'Who are you buying this gift for?'.";

    const action = () => fetchNextStep([], prompt);
    setLastAction(() => action);
    await action();
  };

  const handleReset = () => {
    setHistory([]);
    setData(null);
    setCustomInput("");
    setErrorMsg("");
    setAppState('intro');
    setThemeIndex(0);
  };

  const handleAnswer = async (answer: string) => {
    const newHistory: HistoryItem[] = [
      ...history,
      { role: 'model', text: data?.question || '' },
      { role: 'user', text: answer }
    ];
    setHistory(newHistory);
    setAppState('loading');
    setCustomInput("");

    const action = () => fetchNextStep(newHistory, "");
    setLastAction(() => action);
    await action();
  };

  const fetchNextStep = async (currentHistory: HistoryItem[], initialPrompt: string) => {
    try {
      const questionCount = currentHistory.filter(h => h.role === 'model').length;

      const systemInstruction = `
        You are Gifty, a sophisticated gift recommendation assistant using Gemini.
        Your goal is to discover the perfect gift through a series of thoughtful questions.
        
        Mode Settings:
        - Max Questions: 7
        - Current Question Index: ${questionCount + 1}
        
        Instructions:
        1. LANGUAGE PROTOCOL: 
           - All 'question' and 'options' fields MUST be in ENGLISH.
           - The conversation must flow in English.
        2. If starting (History is empty), ask "Who are you buying this gift for?".
        3. STRICT RULE: The second question (Question Index 2) MUST ask about the "Age Range" of the recipient.
        4. Progressively narrow down interests and personality.
        5. STRICTLY PROHIBITED: Do not ask any questions about price, budget, or money. Assume budget is flexible.
        6. Provide 8-12 concise, distinct answer options in ENGLISH for every question.
        7. If you have sufficient data OR Current Question >= 7, set 'isFinal' to true and provide 6-10 curated recommendations.
        8. If 'isFinal' is true, set 'question' to a concluding phrase in ENGLISH like "Here are some curated ideas." and keep options empty.
        9. CRITICAL EXCEPTION - TURKISH OUTPUT: When 'isFinal' is true, the items in the 'recommendations' array MUST be specific gift product names translated into TURKISH. This is the ONLY place Turkish is allowed. Example: Return "Kablosuz Kulaklık" instead of "Wireless Headphones".
      `;

      let userPrompt = initialPrompt;
      if (!userPrompt) {
        userPrompt = `Based on the conversation so far, determine the next step. History: ${JSON.stringify(currentHistory)}`;
      }

      const response = await generateContentWithRetry(
        MODEL_NAME,
        userPrompt,
        {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              isFinal: { type: Type.BOOLEAN },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["question", "options", "isFinal"]
          }
        }
      );

      const jsonText = response.text;
      if (jsonText) {
        const parsed = JSON.parse(jsonText) as StepResponse;
        setData(parsed);
        if (parsed.isFinal) {
          setAppState('results');
        } else {
          setAppState('question');
        }
      }
    } catch (error: any) {
      console.error("Gemini Error:", error);
      let message = "Something went wrong. Please check your connection and try again.";
      if (error?.status === 429 || error?.code === 429) {
        message = "We're receiving too many requests right now. Please wait a moment and try again.";
      }
      setErrorMsg(message);
      setAppState('error');
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleAnswer(customInput.trim());
    }
  };

  const handleRetry = () => {
    setAppState('loading');
    setErrorMsg("");
    lastAction();
  };

  // --- Styles Helper ---
  const theme = THEMES[themeIndex];

  // Minimalistic button style
  const cardStyle = {
    backgroundColor: theme.secondary,
    color: theme.text,
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    borderRadius: '16px',
    transition: 'transform 0.1s, box-shadow 0.1s',
  };

  const primaryBtnStyle = {
    backgroundColor: theme.primary,
    color: theme.bg,
    border: 'none',
    borderRadius: '50px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  return (
    <div ref={bgRef} style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0s', position: 'relative' }}>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s ease-in-out infinite; }
        
        .rainbow-btn {
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        
        .rainbow-btn:hover {
           transform: scale(1.05);
           box-shadow: 0 12px 24px rgba(0,0,0,0.2);
           color: #fff !important;
           text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Top Bar */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <h1
          onClick={handleReset}
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            margin: 0,
            color: theme.text,
            cursor: 'pointer',
            userSelect: 'none'
          }}>
          gifty<span style={{ color: theme.accent }}>.</span>
        </h1>

        {appState !== 'intro' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              <div style={{
                cursor: 'help',
                opacity: 0.6,
                color: theme.text,
                transition: 'opacity 0.1s'
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
              >
                <InfoIcon />
              </div>

              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '10px',
                backgroundColor: theme.text,
                color: theme.bg,
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                width: '200px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                opacity: showInfo ? 1 : 0,
                visibility: showInfo ? 'visible' : 'hidden',
                transition: 'opacity 0.2s, visibility 0.2s',
                zIndex: 20,
                pointerEvents: 'none',
                textAlign: 'center',
                lineHeight: 1.4,
                fontWeight: 500
              }}>
                Tip: Use the text box to combine options or add details.
              </div>
            </div>

            <button
              onClick={handleReset}
              aria-label="Restart"
              style={{
                background: 'transparent',
                border: 'none',
                color: theme.text,
                cursor: 'pointer',
                padding: '8px',
                opacity: 0.6,
                transition: 'opacity 0.1s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <RefreshIcon />
            </button>
          </div>
        )}
      </div>

      <div ref={containerRef} style={{ width: '100%', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div ref={contentRef} style={{ width: '100%', maxWidth: '800px', padding: '0 2rem 4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {appState === 'intro' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="stagger-in" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Find the Perfect Gift.
                </h2>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', lineHeight: 1.6, margin: '0 auto' }}>
                  Gifty asks you a few simple questions to understand who you're buying for.
                  Within 7 steps, we'll curate a list of personalized recommendations just for you.
                </p>
              </div>

              <div className="stagger-in" style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { title: "Smart AI", desc: "Powered by Gemini" },
                  { title: "Quick", desc: "Under 2 mins" }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '1rem', border: `1px solid ${theme.secondary}`, borderRadius: '12px'
                  }}>
                    <span style={{ fontWeight: 700, color: theme.primary }}>{item.title}</span>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.desc}</span>
                  </div>
                ))}
              </div>

              <button
                className="stagger-in rainbow-btn"
                onClick={handleStart}
                onMouseEnter={() => rainbowTrackRef.current && gsap.to(rainbowTrackRef.current, { opacity: 1, duration: 0.4 })}
                onMouseLeave={() => rainbowTrackRef.current && gsap.to(rainbowTrackRef.current, { opacity: 0, duration: 0.4 })}
                style={{
                  ...primaryBtnStyle,
                  padding: '1.5rem 4rem',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
              >
                {/* 
                  GSAP Seamless Loop Structure:
                  - Double width container moving left.
                  - Scaled and rotated for "splash" effect.
                  - Two identical gradients side-by-side.
                */}
                <div
                  ref={rainbowTrackRef}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '300%', // Extra width for rotation safety
                    height: '600%', // Massive height for rotation safety
                    display: 'flex',
                    opacity: 0, // Hidden by default, fades in on hover
                    zIndex: 0,
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%) rotate(-25deg)', // Centered and Angled
                    backgroundColor: '#FF3B30', // Fix for gap line: match the start/end color of gradient
                  }}
                >
                  <div style={{ flex: 1, background: 'linear-gradient(90deg, #FF3B30, #007AFF, #FFCC00, #FF2D55, #FF3B30)' }}></div>
                  {/* Add negative margin to force overlap and prevent subpixel gap */}
                  <div style={{ flex: 1, marginLeft: '-1px', background: 'linear-gradient(90deg, #FF3B30, #007AFF, #FFCC00, #FF2D55, #FF3B30)' }}></div>
                </div>

                <span style={{ position: 'relative', zIndex: 1 }}>Start Experience</span>
              </button>
            </div>
          )}

          {appState === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
              <div className="spinner" style={{
                width: '50px',
                height: '50px',
                border: `3px solid ${theme.secondary}`,
                borderTop: `3px solid ${theme.primary}`,
                borderRadius: '50%'
              }}></div>
            </div>
          )}

          {appState === 'error' && (
            <div className="stagger-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', textAlign: 'center' }}>
              <div style={{ color: theme.accent, marginBottom: '1.5rem' }}>
                <AlertTriangleIcon />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                Oops!
              </h2>
              <p style={{ maxWidth: '400px', opacity: 0.8, marginBottom: '2rem', lineHeight: '1.6' }}>
                {errorMsg}
              </p>
              <button
                onClick={handleRetry}
                style={{
                  ...primaryBtnStyle,
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.1 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.1 })}
              >
                Try Again
              </button>
            </div>
          )}

          {appState === 'question' && data && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="stagger-in" style={{
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '90%',
                fontWeight: 600,
                lineHeight: 1.2
              }}>
                {data.question}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                width: '100%',
                maxWidth: '800px',
                marginBottom: '2rem'
              }}>
                {data.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="stagger-in"
                    onClick={() => handleAnswer(option)}
                    style={{
                      ...cardStyle,
                      padding: '1.25rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: theme.secondary,
                      color: theme.text,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.02, backgroundColor: theme.primary, color: theme.bg, duration: 0.1 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, backgroundColor: theme.secondary, color: theme.text, duration: 0.1 });
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <form
                className="stagger-in"
                onSubmit={handleCustomSubmit}
                style={{ width: '100%', maxWidth: '500px', position: 'relative', marginTop: '1rem' }}
              >
                <input
                  type="text"
                  placeholder="Type to combine options or add details..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 3.5rem 1.25rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: theme.secondary,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'background-color 0.1s'
                  }}
                  onFocus={(e) => gsap.to(e.target, { filter: 'brightness(1.1)', duration: 0.2 })}
                  onBlur={(e) => gsap.to(e.target, { filter: 'brightness(1)', duration: 0.2 })}
                />
                <button
                  type="submit"
                  aria-label="Submit"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: theme.primary,
                    color: theme.bg,
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s'
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.1 })}
                >
                  <ArrowRightIcon />
                </button>
              </form>
            </div>
          )}

          {appState === 'results' && data && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="stagger-in" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 800 }}>
                Perfect Picks
              </h2>
              <p className="stagger-in" style={{ marginBottom: '3rem', opacity: 0.7, fontSize: '1.2rem' }}>
                Tap a bubble to shop.
              </p>

              <div style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '3rem',
                justifyContent: 'center'
              }}>
                {data.recommendations?.map((gift, idx) => {
                  const retailer = RETAILERS[idx % RETAILERS.length];
                  return (
                    <a
                      key={idx}
                      href={retailer.url(gift)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stagger-in wiggle-bubble"
                      style={{
                        ...cardStyle,
                        padding: '1.2rem 2rem',
                        borderRadius: '50px', // Pill/Bubble shape
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transformOrigin: 'center center',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { scale: 1.1, backgroundColor: theme.primary, color: theme.bg, duration: 0.2 });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, backgroundColor: theme.secondary, color: theme.text, duration: 0.2 });
                      }}
                    >
                      {gift}
                      <ExternalLinkIcon />
                    </a>
                  );
                })}
              </div>

              <button
                className="stagger-in"
                onClick={handleReset}
                style={{
                  ...primaryBtnStyle,
                  padding: '1.2rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.1 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.1 })}
              >
                Find Another Gift
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);