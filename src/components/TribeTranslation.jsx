import { useState } from 'react';
import '../styles/tribe-translation.css';

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16V4m0 0L3 8m4-4l4 4"/>
    <path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const SpeakIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const TribeTranslation = ({ tribe, tribeName }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [direction, setDirection] = useState('en-to-tribe'); // 'en-to-tribe' | 'tribe-to-en'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 300;

  const langName = tribe?.language?.name || `${tribe?.name} language`;

  const fromLabel = direction === 'en-to-tribe' ? 'English' : langName;
  const toLabel   = direction === 'en-to-tribe' ? langName : 'English';

  const handleSwap = () => {
    setDirection((d) => (d === 'en-to-tribe' ? 'tribe-to-en' : 'en-to-tribe'));
    setInputText(outputText);
    setOutputText('');
    setCharCount(outputText.length);
    setError('');
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setInputText(val);
    setCharCount(val.length);
    setOutputText('');
    setError('');
  };

  const handleTranslate = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    setOutputText('');

    const prompt = direction === 'en-to-tribe'
      ? `You are an expert linguist specialising in African languages. Translate the following English text into ${langName} (the language of the ${tribe?.name} people of Africa). Provide ONLY the translation — no explanations, no romanisation notes, no extra text. If the language uses a Latin script, provide that. If some words have no direct equivalent, use the closest natural phrase.\n\nText to translate: "${trimmed}"`
      : `You are an expert linguist specialising in African languages. Translate the following ${langName} text (the language of the ${tribe?.name} people of Africa) into English. Provide ONLY the English translation — no explanations, no extra text.\n\nText to translate: "${trimmed}"`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || 'Translation failed.');
      }

      const text = data.content
        ?.filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim();

      setOutputText(text || 'No translation returned.');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSpeak = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const quickPhrases = [
    'Hello, how are you?',
    'Thank you very much.',
    'What is your name?',
    'Welcome to our home.',
    'The land is beautiful.',
  ];

  return (
    <div className="tp-trans-wrapper">

      {/* ── Header ── */}
      <div className="tp-trans-header">
        <div>
          <h2 className="tp-trans-title">Translate</h2>
          <p className="tp-trans-subtitle">
            Translate between English and {langName} using AI.
          </p>
        </div>
      </div>

      {/* ── Direction bar ── */}
      <div className="tp-trans-direction-bar">
        <div className="tp-trans-lang-pill tp-trans-lang-pill--from">
          {fromLabel}
        </div>
        <button
          className="tp-trans-swap-btn"
          onClick={handleSwap}
          title="Swap languages"
        >
          <SwapIcon />
        </button>
        <div className="tp-trans-lang-pill tp-trans-lang-pill--to">
          {toLabel}
        </div>
      </div>

      {/* ── Main panels ── */}
      <div className="tp-trans-panels">

        {/* INPUT panel */}
        <div className="tp-trans-panel tp-trans-panel--input">
          <div className="tp-trans-panel-header">
            <span className="tp-trans-panel-lang">{fromLabel}</span>
            {inputText && (
              <button
                className="tp-trans-icon-btn"
                onClick={() => handleSpeak(inputText)}
                title="Listen"
              >
                <SpeakIcon />
              </button>
            )}
          </div>
          <textarea
            className="tp-trans-textarea"
            placeholder={`Type in ${fromLabel}…`}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleTranslate();
            }}
          />
          <div className="tp-trans-panel-footer">
            <span className={`tp-trans-charcount ${charCount >= MAX_CHARS ? 'tp-trans-charcount--limit' : ''}`}>
              {charCount}/{MAX_CHARS}
            </span>
            <button
              className="tp-trans-translate-btn"
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
            >
              {loading ? (
                <span className="tp-trans-spinner" />
              ) : (
                'Translate'
              )}
            </button>
          </div>
        </div>

        {/* OUTPUT panel */}
        <div className={`tp-trans-panel tp-trans-panel--output ${loading ? 'tp-trans-panel--loading' : ''}`}>
          <div className="tp-trans-panel-header">
            <span className="tp-trans-panel-lang">{toLabel}</span>
            <div className="tp-trans-output-actions">
              {outputText && (
                <>
                  <button
                    className="tp-trans-icon-btn"
                    onClick={() => handleSpeak(outputText)}
                    title="Listen"
                  >
                    <SpeakIcon />
                  </button>
                  <button
                    className={`tp-trans-icon-btn ${copied ? 'tp-trans-icon-btn--copied' : ''}`}
                    onClick={handleCopy}
                    title="Copy"
                  >
                    {copied ? '✓' : <CopyIcon />}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="tp-trans-output-body">
            {loading && (
              <div className="tp-trans-loading-state">
                <div className="tp-trans-loading-dots">
                  <span /><span /><span />
                </div>
                <p>Translating…</p>
              </div>
            )}
            {!loading && error && (
              <div className="tp-trans-error">{error}</div>
            )}
            {!loading && !error && outputText && (
              <p className="tp-trans-output-text">{outputText}</p>
            )}
            {!loading && !error && !outputText && (
              <p className="tp-trans-placeholder">Translation will appear here.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick phrases ── */}
      {direction === 'en-to-tribe' && (
        <div className="tp-trans-quick">
          <p className="tp-trans-quick-label">Quick phrases</p>
          <div className="tp-trans-quick-list">
            {quickPhrases.map((phrase) => (
              <button
                key={phrase}
                className="tp-trans-quick-chip"
                onClick={() => {
                  setInputText(phrase);
                  setCharCount(phrase.length);
                  setOutputText('');
                  setError('');
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default TribeTranslation;