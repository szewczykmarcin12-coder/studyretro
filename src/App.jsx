import React, { useState, useEffect } from 'react';
import { flashcardData, openQuestions, multipleChoiceQuestions, shuffleArray } from './data.js';

export default function App() {
  const [view, setView] = useState('home');
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [learnCards, setLearnCards] = useState([]);
  const [learnIdx, setLearnIdx] = useState(0);
  const [learnOpts, setLearnOpts] = useState([]);
  const [learnFb, setLearnFb] = useState(null);
  const [learnOk, setLearnOk] = useState([]);
  const [testQ, setTestQ] = useState([]);
  const [testA, setTestA] = useState({});
  const [testDone, setTestDone] = useState(false);
  const [mcQ, setMcQ] = useState([]);
  const [mcA, setMcA] = useState({});
  const [mcDone, setMcDone] = useState(false);
  const [writeCards, setWriteCards] = useState([]);
  const [writeIdx, setWriteIdx] = useState(0);
  const [writeAns, setWriteAns] = useState('');
  const [writeFb, setWriteFb] = useState(null);
  const [writeOk, setWriteOk] = useState(0);
  const [matchTerms, setMatchTerms] = useState([]);
  const [matchDefs, setMatchDefs] = useState([]);
  const [matchSel, setMatchSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const [matchTime, setMatchTime] = useState(0);

  useEffect(() => {
    let t;
    if (view === 'match' && matched.length < 8) {
      t = setInterval(() => setMatchTime(x => x + 1), 1000);
    }
    return () => clearInterval(t);
  }, [view, matched]);

  const startFlash = () => { setCards(shuffleArray([...flashcardData])); setIdx(0); setFlipped(false); setKnown([]); setUnknown([]); setView('flash'); };
  const startLearn = () => { const c = shuffleArray([...flashcardData]).slice(0, 12); setLearnCards(c); setLearnIdx(0); setLearnOk([]); setLearnFb(null); genLearnQ(c, 0); setView('learn'); };
  const genLearnQ = (c, i) => { const correct = c[i]; const others = shuffleArray(flashcardData.filter(x => x.id !== correct.id)).slice(0, 3); setLearnOpts(shuffleArray([correct, ...others])); };
  const startTest = () => { setTestQ(shuffleArray([...openQuestions])); setTestA({}); setTestDone(false); setView('test'); };
  const startMc = () => { setMcQ(shuffleArray([...multipleChoiceQuestions])); setMcA({}); setMcDone(false); setView('mc'); };
  const startWrite = () => { setWriteCards(shuffleArray([...flashcardData]).slice(0, 15)); setWriteIdx(0); setWriteAns(''); setWriteFb(null); setWriteOk(0); setView('write'); };
  const startMatch = () => { const sel = shuffleArray([...flashcardData]).slice(0, 8); setMatchTerms(shuffleArray(sel.map(x => ({ id: x.id, text: x.term })))); setMatchDefs(shuffleArray(sel.map(x => ({ id: x.id, text: x.definition.slice(0, 50) + '...' })))); setMatchSel(null); setMatched([]); setMatchTime(0); setView('match'); };

  const flashResp = (ok) => { if (ok) setKnown([...known, cards[idx].id]); else setUnknown([...unknown, cards[idx].id]); if (idx < cards.length - 1) { setIdx(idx + 1); setFlipped(false); } else setView('flash-res'); };
  const learnAns = (opt) => { const correct = learnCards[learnIdx]; const ok = opt.id === correct.id; setLearnFb({ ok, ans: correct.definition }); if (ok) setLearnOk([...learnOk, correct.id]); };
  const learnNext = () => { if (learnIdx < learnCards.length - 1) { const ni = learnIdx + 1; setLearnIdx(ni); setLearnFb(null); genLearnQ(learnCards, ni); } else setView('learn-res'); };
  const matchClick = (item, type) => { if (matched.includes(item.id)) return; if (!matchSel) setMatchSel({ ...item, type }); else { if (matchSel.type !== type && matchSel.id === item.id) setMatched([...matched, item.id]); setMatchSel(null); } };
  const testScore = () => testQ.filter(q => { const a = testA[q.id] || ''; return q.keywords.some(k => a.toLowerCase().includes(k.toLowerCase())); }).length;
  const mcScore = () => mcQ.filter(q => mcA[q.id] === q.correct).length;

  const c = { bg: '#0a092d', card: '#2e3856', accent: '#4255ff', text: '#fff', muted: '#939bb4', border: '#3b4a6b', success: '#23b26d', error: '#ff6b6b', yellow: '#ffcd1f' };

  if (view === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 700 }}>
            <div style={{ width: 32, height: 32, background: c.accent, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q</div>
            Quizlet
          </div>
          <input placeholder="Wyszukaj fiszki" style={{ width: 400, padding: '10px 16px', background: c.card, border: 'none', borderRadius: 8, color: c.text, fontSize: 14 }} />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 220, padding: '24px 16px', borderRight: '1px solid ' + c.border }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, background: c.accent, marginBottom: 4 }}>🏠 Strona glowna</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, color: c.muted, marginBottom: 4 }}>📁 Twoje zasoby</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, color: c.muted }}>🔔 Powiadomienia</div>
          </div>
          <div style={{ flex: 1, padding: '24px 40px' }}>
            <h1 style={{ marginBottom: 24 }}>Twoje zasoby</h1>
            <div style={{ display: 'flex', gap: 16, borderBottom: '2px solid ' + c.border, paddingBottom: 16, marginBottom: 24 }}>
              <span style={{ borderBottom: '2px solid ' + c.accent, paddingBottom: 16, marginBottom: -18 }}>Zestawy fiszek</span>
              <span style={{ color: c.muted }}>Klasy</span>
              <span style={{ color: c.muted }}>Foldery</span>
            </div>
            <div onClick={() => setView('set')} style={{ background: c.card, borderRadius: 12, padding: '16px 20px', cursor: 'pointer', border: '1px solid ' + c.border }}>
              <div style={{ fontSize: 12, color: c.muted, marginBottom: 4 }}>{flashcardData.length} pojec</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Psychologia rozwojowa - baza</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'set') {
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setView('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 700, cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, background: c.accent, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q</div>
            Quizlet
          </div>
          <input placeholder="Szukaj probnych testow" style={{ width: 400, padding: '10px 16px', background: c.card, border: 'none', borderRadius: 8, color: c.text, fontSize: 14 }} />
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Psychologia rozwojowa - baza</h1>
          <p style={{ color: c.muted, marginBottom: 24 }}><span style={{ color: c.yellow }}>⚡</span> Tego zestawu uczylo sie 39 osob w ciagu ostatniego dnia</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
            <button onClick={startFlash} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#58a6ff' }}>📄</span> Fiszki</button>
            <button onClick={startLearn} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#58cc8d' }}>🔄</span> Ucz sie</button>
            <button onClick={startMc} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#58a6ff' }}>📝</span> Test</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
            <button onClick={startWrite} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#a78bfa' }}>🧩</span> Pisanie</button>
            <button onClick={startTest} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#34d399' }}>💬</span> Test otwarty</button>
            <button onClick={startMatch} style={{ background: c.card, border: '2px solid ' + c.border, borderRadius: 12, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#60a5fa' }}>🔗</span> Dopasowania</button>
          </div>
          <div style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border }}>
            <div style={{ padding: 24, borderBottom: '1px solid ' + c.border }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 8 }}>Pojecia 🔊</div>
              <h3>{flashcardData[0].term}</h3>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 16 }}>Wybierz odpowiedz</div>
              {shuffleArray([...flashcardData]).slice(0, 4).map((opt, i) => (
                <div key={i} style={{ background: c.bg, border: '2px solid ' + c.border, borderRadius: 8, padding: '16px 20px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: c.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>{i + 1}</span>
                  <span>{opt.definition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'flash') {
    const card = cards[idx];
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>{idx + 1} / {cards.length}</span>
          <div><span style={{ color: c.success, marginRight: 16 }}>✓ {known.length}</span><span style={{ color: c.error }}>✗ {unknown.length}</span></div>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ height: 4, background: c.border, borderRadius: 2, marginBottom: 24 }}><div style={{ height: '100%', background: c.accent, width: ((idx + 1) / cards.length * 100) + '%', borderRadius: 2 }} /></div>
          <div onClick={() => setFlipped(!flipped)} style={{ background: c.card, borderRadius: 16, minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', padding: 40, textAlign: 'center', border: '1px solid ' + c.border }}>
            <div style={{ fontSize: 12, color: c.muted, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>{flipped ? 'Definicja' : 'Pojecie'}</div>
            <h2 style={{ fontSize: 28, fontWeight: 400 }}>{flipped ? card.definition : card.term}</h2>
            {!flipped && <p style={{ color: c.muted, marginTop: 40 }}>Kliknij, aby odwrocic</p>}
          </div>
          {flipped && (
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button onClick={() => flashResp(false)} style={{ flex: 1, background: c.error, border: 'none', borderRadius: 8, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>✗ Jeszcze sie ucze</button>
              <button onClick={() => flashResp(true)} style={{ flex: 1, background: c.success, border: 'none', borderRadius: 8, padding: '16px', color: c.text, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>✓ Znam!</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'flash-res' || view === 'learn-res' || view === 'write-res') {
    const score = view === 'flash-res' ? known.length : view === 'learn-res' ? learnOk.length : writeOk;
    const total = view === 'flash-res' ? cards.length : view === 'learn-res' ? learnCards.length : writeCards.length;
    const pct = Math.round((score / total) * 100);
    const restart = view === 'flash-res' ? startFlash : view === 'learn-res' ? startLearn : startWrite;
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot do zestawu</button>
        </div>
        <div style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: pct >= 70 ? c.success : c.error, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 48, fontWeight: 700 }}>{pct}%</span>
          </div>
          <h2 style={{ marginBottom: 8 }}>Swietna robota!</h2>
          <p style={{ color: c.muted, marginBottom: 32 }}>Poprawnie: {score} z {total}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={restart} style={{ background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powtorz</button>
            <button onClick={() => setView('set')} style={{ background: c.card, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powrot</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'learn') {
    const card = learnCards[learnIdx];
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>Ucz sie • {learnIdx + 1}/{learnCards.length}</span>
          <span style={{ color: c.success }}>Opanowane: {learnOk.length}</span>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ height: 4, background: c.border, borderRadius: 2, marginBottom: 24 }}><div style={{ height: '100%', background: c.accent, width: ((learnIdx + 1) / learnCards.length * 100) + '%', borderRadius: 2 }} /></div>
          <div style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border }}>
            <div style={{ padding: 32, borderBottom: '1px solid ' + c.border }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 12 }}>Pojecia 🔊</div>
              <h2 style={{ fontSize: 24, fontWeight: 400 }}>{card.term}</h2>
            </div>
            <div style={{ padding: 32 }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 16 }}>Wybierz odpowiedz</div>
              {!learnFb && learnOpts.map((opt, i) => (
                <button key={opt.id} onClick={() => learnAns(opt)} style={{ width: '100%', background: c.bg, border: '2px solid ' + c.border, borderRadius: 8, padding: '16px 20px', color: c.text, fontSize: 15, textAlign: 'left', cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: c.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
                  <span>{opt.definition}</span>
                </button>
              ))}
              {learnFb && (
                <div>
                  <div style={{ padding: 20, borderRadius: 12, background: learnFb.ok ? 'rgba(35,178,109,0.15)' : 'rgba(255,107,107,0.15)', border: '2px solid ' + (learnFb.ok ? c.success : c.error), marginBottom: 16 }}>
                    <p style={{ fontWeight: 600, color: learnFb.ok ? c.success : c.error, marginBottom: 12 }}>{learnFb.ok ? '✓ Wspaniale!' : '✗ Niepoprawnie'}</p>
                    <p style={{ color: c.muted }}>{learnFb.ans}</p>
                  </div>
                  <button onClick={learnNext} style={{ width: '100%', background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Kontynuuj</button>
                </div>
              )}
              {!learnFb && <p style={{ color: c.muted, fontSize: 14, textAlign: 'right', marginTop: 8, cursor: 'pointer' }}>Nie znasz odpowiedzi?</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'mc') {
    const score = mcScore();
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>Test</span>
          {mcDone && <span style={{ color: c.success }}>{score}/{mcQ.length}</span>}
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
          {!mcDone ? (
            <>
              {mcQ.map((q, i) => (
                <div key={q.id} style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, marginBottom: 24, padding: 24 }}>
                  <p style={{ fontWeight: 600, marginBottom: 20 }}>{i + 1}. {q.question}</p>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => setMcA({ ...mcA, [q.id]: oi })} style={{ width: '100%', background: mcA[q.id] === oi ? 'rgba(66,85,255,0.2)' : c.bg, border: '2px solid ' + (mcA[q.id] === oi ? c.accent : c.border), borderRadius: 8, padding: '16px 20px', color: c.text, fontSize: 15, textAlign: 'left', cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ width: 28, height: 28, borderRadius: 6, background: mcA[q.id] === oi ? c.accent : c.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>{String.fromCharCode(65 + oi)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              ))}
              <button onClick={() => setMcDone(true)} style={{ width: '100%', background: c.accent, border: 'none', borderRadius: 8, padding: '16px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Sprawdz odpowiedzi</button>
            </>
          ) : (
            <>
              <div style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, textAlign: 'center', padding: 32, marginBottom: 24 }}>
                <h2 style={{ fontSize: 32 }}>{Math.round((score / mcQ.length) * 100)}%</h2>
                <p style={{ color: c.muted }}>{score} z {mcQ.length} poprawnych</p>
              </div>
              {mcQ.map((q, i) => {
                const ok = mcA[q.id] === q.correct;
                return (
                  <div key={q.id} style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, marginBottom: 16, borderLeft: '4px solid ' + (ok ? c.success : c.error), padding: 20 }}>
                    <p style={{ marginBottom: 12 }}><span style={{ marginRight: 8 }}>{ok ? '✓' : '✗'}</span>{i + 1}. {q.question}</p>
                    {q.options.map((opt, oi) => (
                      <p key={oi} style={{ padding: '8px 12px', borderRadius: 6, marginBottom: 4, background: oi === q.correct ? 'rgba(35,178,109,0.15)' : oi === mcA[q.id] && !ok ? 'rgba(255,107,107,0.15)' : 'transparent', color: oi === q.correct ? c.success : c.text }}>{String.fromCharCode(65 + oi)}. {opt} {oi === q.correct && '✓'}</p>
                    ))}
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={startMc} style={{ flex: 1, background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powtorz</button>
                <button onClick={() => setView('set')} style={{ flex: 1, background: c.card, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powrot</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (view === 'test') {
    const score = testScore();
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>Test otwarty</span>
          {testDone && <span style={{ color: c.success }}>{score}/{testQ.length}</span>}
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
          {!testDone ? (
            <>
              {testQ.map((q, i) => (
                <div key={q.id} style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, marginBottom: 24, padding: 24 }}>
                  <p style={{ fontWeight: 600, marginBottom: 16 }}>{i + 1}. {q.question}</p>
                  <textarea value={testA[q.id] || ''} onChange={e => setTestA({ ...testA, [q.id]: e.target.value })} placeholder="Wpisz odpowiedz..." style={{ width: '100%', background: c.bg, border: '2px solid ' + c.border, borderRadius: 8, padding: 16, color: c.text, fontSize: 16, minHeight: 100, resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button onClick={() => setTestDone(true)} style={{ width: '100%', background: c.accent, border: 'none', borderRadius: 8, padding: '16px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Sprawdz odpowiedzi</button>
            </>
          ) : (
            <>
              <div style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, textAlign: 'center', padding: 32, marginBottom: 24 }}>
                <h2 style={{ fontSize: 32 }}>{Math.round((score / testQ.length) * 100)}%</h2>
                <p style={{ color: c.muted }}>{score} z {testQ.length} poprawnych</p>
              </div>
              {testQ.map((q, i) => {
                const a = testA[q.id] || '';
                const ok = q.keywords.some(k => a.toLowerCase().includes(k.toLowerCase()));
                return (
                  <div key={q.id} style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border, marginBottom: 16, borderLeft: '4px solid ' + (ok ? c.success : c.error), padding: 20 }}>
                    <p style={{ marginBottom: 12 }}><span style={{ marginRight: 8 }}>{ok ? '✓' : '✗'}</span>{i + 1}. {q.question}</p>
                    <div style={{ background: c.bg, padding: 12, borderRadius: 8, marginBottom: 8 }}><p style={{ color: c.muted, fontSize: 12, marginBottom: 4 }}>Twoja odpowiedz:</p><p>{a || '(brak)'}</p></div>
                    <div style={{ background: 'rgba(35,178,109,0.1)', padding: 12, borderRadius: 8 }}><p style={{ color: c.success, fontSize: 12, marginBottom: 4 }}>Wzorcowa odpowiedz:</p><p>{q.answer}</p></div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={startTest} style={{ flex: 1, background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powtorz</button>
                <button onClick={() => setView('set')} style={{ flex: 1, background: c.card, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powrot</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (view === 'write') {
    const card = writeCards[writeIdx];
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>Pisanie • {writeIdx + 1}/{writeCards.length}</span>
          <span style={{ color: c.success }}>✓ {writeOk}</span>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ height: 4, background: c.border, borderRadius: 2, marginBottom: 24 }}><div style={{ height: '100%', background: c.accent, width: ((writeIdx + 1) / writeCards.length * 100) + '%', borderRadius: 2 }} /></div>
          <div style={{ background: c.card, borderRadius: 16, border: '1px solid ' + c.border }}>
            <div style={{ padding: 32, borderBottom: '1px solid ' + c.border }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 12 }}>Definicja</div>
              <h2 style={{ fontSize: 20, fontWeight: 400 }}>{card.definition}</h2>
            </div>
            <div style={{ padding: 32 }}>
              <div style={{ color: c.muted, fontSize: 12, marginBottom: 12 }}>Wpisz termin</div>
              <input value={writeAns} onChange={e => setWriteAns(e.target.value)} disabled={!!writeFb} placeholder="Wpisz odpowiedz..." style={{ width: '100%', background: c.bg, border: '2px solid ' + c.border, borderRadius: 8, padding: 16, color: c.text, fontSize: 16, boxSizing: 'border-box' }} />
              {!writeFb ? (
                <button onClick={() => { const ok = card.term.toLowerCase().split(' ').some(w => w.length > 3 && writeAns.toLowerCase().includes(w)); setWriteFb({ ok, ans: card.term }); if (ok) setWriteOk(writeOk + 1); }} disabled={!writeAns.trim()} style={{ width: '100%', background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer', marginTop: 16, opacity: writeAns.trim() ? 1 : 0.5 }}>Sprawdz</button>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <div style={{ padding: 20, borderRadius: 12, background: writeFb.ok ? 'rgba(35,178,109,0.15)' : 'rgba(255,107,107,0.15)', border: '2px solid ' + (writeFb.ok ? c.success : c.error) }}>
                    <p style={{ fontWeight: 600, color: writeFb.ok ? c.success : c.error, marginBottom: 8 }}>{writeFb.ok ? '✓ Poprawnie!' : '✗ Niepoprawnie'}</p>
                    <p style={{ color: c.muted }}>Odpowiedz: <strong style={{ color: c.text }}>{writeFb.ans}</strong></p>
                  </div>
                  <button onClick={() => { if (writeIdx < writeCards.length - 1) { setWriteIdx(writeIdx + 1); setWriteAns(''); setWriteFb(null); } else setView('write-res'); }} style={{ width: '100%', background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>Kontynuuj</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'match') {
    if (matched.length === 8) {
      return (
        <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
          <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px' }}>
            <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          </div>
          <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
            <h2 style={{ marginBottom: 8 }}>Swietnie!</h2>
            <p style={{ color: c.muted, fontSize: 20, marginBottom: 32 }}>Czas: {Math.floor(matchTime / 60)}:{(matchTime % 60).toString().padStart(2, '0')}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button onClick={startMatch} style={{ background: c.accent, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Zagraj ponownie</button>
              <button onClick={() => setView('set')} style={{ background: c.card, border: 'none', borderRadius: 8, padding: '12px 24px', color: c.text, fontWeight: 600, cursor: 'pointer' }}>Powrot</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'system-ui', color: c.text }}>
        <div style={{ background: c.bg, borderBottom: '1px solid ' + c.border, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setView('set')} style={{ background: 'none', border: 'none', color: c.muted, fontSize: 14, cursor: 'pointer' }}>← Powrot</button>
          <span style={{ color: c.muted }}>Dopasowania</span>
          <div><span style={{ color: c.success, marginRight: 24 }}>{matched.length}/8</span><span style={{ color: c.muted }}>⏱ {Math.floor(matchTime / 60)}:{(matchTime % 60).toString().padStart(2, '0')}</span></div>
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              {matchTerms.map(t => (
                <button key={t.id} onClick={() => matchClick(t, 'term')} disabled={matched.includes(t.id)} style={{ width: '100%', background: matchSel?.id === t.id && matchSel?.type === 'term' ? 'rgba(66,85,255,0.2)' : c.card, border: '2px solid ' + (matched.includes(t.id) ? c.success : matchSel?.id === t.id && matchSel?.type === 'term' ? c.accent : c.border), borderRadius: 12, padding: 20, color: c.text, textAlign: 'left', cursor: matched.includes(t.id) ? 'default' : 'pointer', marginBottom: 12, opacity: matched.includes(t.id) ? 0.4 : 1 }}>{t.text}</button>
              ))}
            </div>
            <div>
              {matchDefs.map(d => (
                <button key={d.id} onClick={() => matchClick(d, 'def')} disabled={matched.includes(d.id)} style={{ width: '100%', background: matchSel?.id === d.id && matchSel?.type === 'def' ? 'rgba(66,85,255,0.2)' : c.card, border: '2px solid ' + (matched.includes(d.id) ? c.success : matchSel?.id === d.id && matchSel?.type === 'def' ? c.accent : c.border), borderRadius: 12, padding: 20, color: c.text, fontSize: 14, textAlign: 'left', cursor: matched.includes(d.id) ? 'default' : 'pointer', marginBottom: 12, opacity: matched.includes(d.id) ? 0.4 : 1 }}>{d.text}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
