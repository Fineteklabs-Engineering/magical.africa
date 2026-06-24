import { useState } from 'react';
import { dictionaryData } from '../data/dictionaryData';
import '../styles/tribe-dictionary.css';

const TribeDictionary = ({ tribe, tribeName }) => {
  const [dictSearch, setDictSearch] = useState('');
  const [dictResult, setDictResult] = useState(null);
  const [dictSearched, setDictSearched] = useState(false);

  const tribeDict = dictionaryData[tribeName?.toLowerCase()];

  const handleDictSearch = () => {
    if (!dictSearch.trim() || !tribeDict) return;
    const query = dictSearch.trim().toLowerCase();
    const found = tribeDict.words.find(
      (w) =>
        w.word.toLowerCase().includes(query) ||
        w.translation.toLowerCase().includes(query)
    );
    setDictResult(found || null);
    setDictSearched(true);
  };

  const speak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="tp-dict-wrapper">

      {/* ── TOP ROW: Word of Day (left) + Search & Video (right) ── */}
      <div className="tp-dict-top-row">

        {/* ── LEFT: Word of the Day ── */}
        {tribeDict?.wordOfTheDay && (() => {
          const wod = tribeDict.wordOfTheDay;
          const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          });
          return (
            <div className="tp-dict-wod">
              <p className="tp-dict-wod-label">Word of the Day</p>
              <p className="tp-dict-wod-date">{today}</p>

              <div className="tp-dict-wod-word">{wod.word}</div>
              <p className="tp-dict-wod-pos">{wod.partOfSpeech}</p>

              <div className="tp-dict-wod-pronunciation">
                <button
                  className="tp-dict-audio-btn"
                  title="Hear pronunciation"
                  onClick={() => speak(wod.word)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                </button>
                <span className="tp-dict-wod-phonetic">[{wod.pronunciation}]</span>
              </div>

              <p className="tp-dict-wod-translation">{wod.translation}</p>
              <p className="tp-dict-wod-example">{wod.example}</p>

              <button
                className="tp-dict-wod-btn"
                onClick={() => {
                  if (!tribeDict?.words?.length) return;
                  const random = tribeDict.words[Math.floor(Math.random() * tribeDict.words.length)];
                  setDictResult(random);
                  setDictSearched(true);
                  setDictSearch(random.word);
                }}
              >
                Get Random Word
              </button>
            </div>
          );
        })()}

        {/* ── RIGHT: Search bar + Video ── */}
        <div className="tp-dict-right">

          {/* Search */}
          <div className="tp-dict-search-wrap">
            <div className="tp-dict-search-bar">
              <svg className="tp-dict-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="tp-dict-search-input"
                type="text"
                placeholder={`Search any ${tribe?.name} word…`}
                value={dictSearch}
                onChange={(e) => {
                  setDictSearch(e.target.value);
                  setDictSearched(false);
                  setDictResult(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleDictSearch()}
              />
              {dictSearch && (
                <button
                  className="tp-dict-search-clear"
                  onClick={() => { setDictSearch(''); setDictResult(null); setDictSearched(false); }}
                >✕</button>
              )}
            </div>
            <button className="tp-dict-search-btn" onClick={handleDictSearch}>Search</button>
          </div>

          {/* Search result */}
          {dictSearched && (
            dictResult ? (
              <div className="tp-dict-result">
                <div className="tp-dict-result-word">{dictResult.word}</div>
                <div className="tp-dict-result-row">
                  <span className="tp-dict-result-pos">{dictResult.partOfSpeech}</span>
                  <button
                    className="tp-dict-audio-btn tp-dict-audio-btn--sm"
                    title="Hear pronunciation"
                    onClick={() => speak(dictResult.word)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  </button>
                  <span className="tp-dict-result-phonetic">[{dictResult.pronunciation}]</span>
                </div>
                <p className="tp-dict-result-translation">{dictResult.translation}</p>
                <p className="tp-dict-result-example">{dictResult.example}</p>
              </div>
            ) : (
              <div className="tp-dict-result tp-dict-result--empty">
                <p>No result found for "<strong>{dictSearch}</strong>". Try another word.</p>
              </div>
            )
          )}

          {/* Video */}
          <div className="tp-dict-video">
            {tribeDict?.wordOfTheDay?.videoUrl ? (
              <iframe
                src={tribeDict.wordOfTheDay.videoUrl}
                title={`${tribe?.name} language video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="tp-dict-video-frame"
              />
            ) : (
              <div className="tp-dict-video-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none"/>
                </svg>
                <p>{tribe?.name} Language Video</p>
               
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default TribeDictionary;