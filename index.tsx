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

const MODES = {
  fast: { 
    maxQuestions: 5, 
    optionsCount: 12, 
    label: "Fast", 
    sub: "Max 5 questions",
    desc: "In a rush? Get broad suggestions quickly based on key details."
  },
  balanced: { 
    maxQuestions: 15, 
    optionsCount: 8, 
    label: "Balanced", 
    sub: "Max 15 questions",
    desc: "The sweet spot. A smart mix of detail and speed for great results."
  },
  deep: { 
    maxQuestions: 100, 
    optionsCount: 12, 
    label: "Deep Dive", 
    sub: "Up to 100 questions",
    desc: "An exhaustive search. We'll keep asking until we find the perfect match."
  }
};

const RETAILERS = [
  { name: 'Trendyol', url: (q: string) => `https://www.trendyol.com/sr?q=${encodeURIComponent(q)}` },
  { name: 'Hepsiburada', url: (q: string) => `https://www.hepsiburada.com/ara?q=${encodeURIComponent(q)}` },
  { name: 'Çiçeksepeti', url: (q: string) => `https://www.ciceksepeti.com/arama?query=${encodeURIComponent(q)}` },
  { name: 'Amazon TR', url: (q: string) => `https://www.amazon.com.tr/s?k=${encodeURIComponent(q)}` }
];

// --- Gemini Setup ---

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

// --- Types ---

type Mode = 'deep' | 'balanced' | 'fast';
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
  const [mode, setMode] = useState<Mode>('balanced');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [data, setData] = useState<StepResponse | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastAction, setLastAction] = useState<() => void>(() => {});

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
        // Randomize start times and parameters so they don't move in unison
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

  }, [themeIndex, appState, data, errorMsg]);

  // --- Logic ---

  const handleStart = async (selectedMode: Mode) => {
    setMode(selectedMode);
    setAppState('loading');
    
    // Initial Prompt
    const prompt = "Start the session. Ask 'Who are you buying this gift for?'.";
    
    const action = () => fetchNextStep(selectedMode, [], prompt);
    setLastAction(() => action);
    await action();
  };

  const handleReset = () => {
    setHistory([]);
    setData(null);
    setCustomInput("");
    setErrorMsg("");
    setAppState('intro');
    setThemeIndex(0); // Reset to first theme or keep random
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

    const action = () => fetchNextStep(mode, newHistory, "");
    setLastAction(() => action);
    await action();
  };

  const fetchNextStep = async (currentMode: Mode, currentHistory: HistoryItem[], initialPrompt: string) => {
    try {
      const modeConfig = MODES[currentMode];
      const questionCount = currentHistory.filter(h => h.role === 'model').length;
      
      const systemInstruction = `
        You are Gifty, a sophisticated gift recommendation assistant using Gemini.
        Your goal is to discover the perfect gift through a series of thoughtful questions.
        
        Mode Settings:
        - Mode: ${currentMode}
        - Max Questions: ${modeConfig.maxQuestions}
        - Current Question: ${questionCount + 1}
        - Required Option Count: ${modeConfig.optionsCount}
        
        Instructions:
        1. LANGUAGE PROTOCOL: 
           - All 'question' and 'options' fields MUST be in ENGLISH.
           - The conversation must flow in English.
        2. If starting, ask "Who are you buying this gift for?".
        3. Progressively narrow down interests and personality.
        4. STRICTLY PROHIBITED: Do not ask any questions about price, budget, or money. Assume budget is flexible.
        5. Provide exactly ${modeConfig.optionsCount} concise, distinct answer options in ENGLISH.
        6. If you have sufficient data OR Current Question >= Max Questions, set 'isFinal' to true and provide 6-10 curated recommendations.
        7. If 'isFinal' is true, set 'question' to a concluding phrase in ENGLISH like "Here are some curated ideas." and keep options empty.
        8. CRITICAL EXCEPTION - TURKISH OUTPUT: When 'isFinal' is true, the items in the 'recommendations' array MUST be specific gift product names translated into TURKISH. This is the ONLY place Turkish is allowed. This is required for search links on Turkish retailers. Example: Return "Kablosuz Kulaklık" (Turkish) instead of "Wireless Headphones".
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
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 800, 
          letterSpacing: '-1px', 
          margin: 0, 
          color: theme.text 
        }}>
          gifty<span style={{color: theme.accent}}>.</span>
        </h1>
        
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

      <div ref={containerRef} style={{ width: '100%', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div ref={contentRef} style={{ width: '100%', maxWidth: '800px', padding: '0 2rem 4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {appState === 'intro' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="stagger-in" style={{ 
                marginBottom: '3rem', 
                textAlign: 'center', 
                fontWeight: 300, 
                fontSize: '1.5rem',
                opacity: 0.8,
                maxWidth: '500px'
              }}>
                Tell us a little about who you're shopping for, and we'll handle the rest.
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', width: '100%' }}>
                {(Object.keys(MODES) as Mode[]).map((m) => (
                  <button
                    key={m}
                    className="stagger-in"
                    onClick={() => handleStart(m)}
                    style={{
                      ...cardStyle,
                      padding: '2rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      height: '100%'
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', duration: 0.1 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', duration: 0.1 });
                    }}
                  >
                    <span style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 700, 
                      marginBottom: '0.25rem',
                      color: theme.primary
                    }}>
                      {MODES[m].label}
                    </span>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      marginBottom: '1rem',
                      opacity: 0.6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {MODES[m].sub}
                    </span>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      opacity: 0.8, 
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {MODES[m].desc}
                    </p>
                  </button>
                ))}
              </div>
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
              <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .spinner { animation: spin 0.8s ease-in-out infinite; }
              `}</style>
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
                marginBottom: '3rem'
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
                      textAlign: 'center'
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
                style={{ width: '100%', maxWidth: '500px', position: 'relative' }}
              >
                <input
                  type="text"
                  placeholder="Type your own answer..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 3.5rem 1.25rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: 'rgba(255,255,255,0.4)', // Slightly transparent
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'background-color 0.1s'
                  }}
                  onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.8)'}
                  onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.4)'}
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