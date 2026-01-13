import React, { useState, useEffect } from 'react';
import { flashcardData, openQuestions, multipleChoiceQuestions, shuffleArray } from './data.js';

const rainbow = 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd)';

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

  const startFlash = () => {
    setCards(shuffleArray([...flashcardData]));
    setIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setView('flash');
  };

  const startLearn = () => {
    const c = shuffleArray([...flashcardData]).slice(0, 12);
    setLearnCards(c);
    setLearnIdx(0);
    setLearnOk([]);
    setLearnFb(null);
    genLearnQ(c, 0);
    setView('learn');
  };

  const genLearnQ = (c, i) => {
    const correct = c[i];
    const others = shuffleArray(flashcardData.filter(x => x.id !== correct.id)).slice(0, 3);
    setLearnOpts(shuffleArray([correct, ...others]));
  };

  const startTest = () => {
    setTestQ(shuffleArray([...openQuestions]));
    setTestA({});
    setTestDone(false);
    setView('test');
  };

  const startMc = () => {
    setMcQ(shuffleArray([...multipleChoiceQuestions]));
    setMcA({});
    setMcDone(false);
    setView('mc');
  };

  const startWrite = () => {
    setWriteCards(shuffleArray([...flashcardData]).slice(0, 15));
    setWriteIdx(0);
    setWriteAns('');
    setWriteFb(null);
    setWriteOk(0);
    setView('write');
  };

  const startMatch = () => {
    const sel = shuffleArray([...flashcardData]).slice(0, 8);
    setMatchTerms(shuffleArray(sel.map(x => ({ id: x.id, text: x.term }))));
    setMatchDefs(shuffleArray(sel.map(x => ({ id: x.id, text: x.definition.slice(0, 50) + '...' }))));
    setMatchSel(null);
    setMatched([]);
    setMatchTime(0);
    setView('match');
  };

  const flashResp = (ok) => {
    if (ok) setKnown([...known, cards[idx].id]);
    else setUnknown([...unknown, cards[idx].id]);
    if (idx < cards.length - 1) {
      setIdx(idx + 1);
      setFlipped(false);
    } else setView('flash-res');
  };

  const learnAns = (opt) => {
    const correct = learnCards[learnIdx];
    const ok = opt.id === correct.id;
    setLearnFb({ ok, ans: correct.definition });
    if (ok) setLearnOk([...learnOk, correct.id]);
  };

  const learnNext = () => {
    if (learnIdx < learnCards.length - 1) {
      const ni = learnIdx + 1;
      setLearnIdx(ni);
      setLearnFb(null);
      genLearnQ(learnCards, ni);
    } else setView('learn-res');
  };

  const matchClick = (item, type) => {
    if (matched.includes(item.id)) return;
    if (!matchSel) setMatchSel({ ...item, type });
    else {
      if (matchSel.type !== type && matchSel.id === item.id) {
        setMatched([...matched, item.id]);
      }
      setMatchSel(null);
    }
  };

  const testScore = () => testQ.filter(q => {
    const a = testA[q.id] || '';
    return q.keywords.some(k => a.toLowerCase().includes(k.toLowerCase()));
  }).length;

  const mcScore = () => mcQ.filter(q => mcA[q.id] === q.correct).length;

  const s = {
    app: { minHeight: '100vh', background: '#1a1a2e', fontFamily: 'system-ui', color: '#fff', padding: 20 },
    card: { background: '#2d2d44', borderRadius: 15, padding: 25, marginBottom: 20 },
    btn: { padding: '12px 24px', borderRadius: 10, border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 15 },
    input: { width: '100%', padding: 15, background: '#1a1a2e', border: '2px solid #3d3d5c', borderRadius: 10, color: '#fff', fontSize: 16, boxSizing: 'border-box' }
  };

  if (view === 'home') {
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ background: rainbow, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 32 }}>StudyRetro</h1>
          <p style={{ color: '#888', marginBottom: 30 }}>Psychologia Rozwojowa - {flashcardData.length} fiszek</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {[
              { icon: '🎴', title: 'Fiszki', fn: startFlash, color: '#667eea' },
              { icon: '📚', title: 'Ucz sie', fn: startLearn, color: '#11998e' },
              { icon: '📝', title: 'Test otwarty', fn: startTest, color: '#f39c12' },
              { icon: '✅', title: 'Test ABC', fn: startMc, color: '#3498db' },
              { icon: '✍️', title: 'Pisanie', fn: startWrite, color: '#e74c3c' },
              { icon: '🔗', title: 'Dopasuj', fn: startMatch, color: '#9b59b6' }
            ].map((m, i) => (
              <div key={i} onClick={m.fn} style={{ ...s.card, cursor: 'pointer', borderTop: `4px solid ${m.color}` }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{m.icon}</div>
                <h3 style={{ margin: 0 }}>{m.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'flash') {
    const c = cards[idx];
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <span style={{ color: '#888' }}>{idx + 1}/{cards.length}</span>
            <div><span style={{ color: '#38ef7d' }}>✓{known.length}</span> <span style={{ color: '#f45c43' }}>✗{unknown.length}</span></div>
          </div>
          <div onClick={() => setFlipped(!flipped)} style={{ ...s.card, minHeight: 300, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: flipped ? 'rgba(56,239,125,0.1)' : 'rgba(102,126,234,0.1)' }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 15 }}>{flipped ? 'DEFINICJA' : 'TERMIN'}</div>
            <h2 style={{ fontSize: 22, margin: 0 }}>{flipped ? c.definition : c.term}</h2>
            {!flipped && <p style={{ color: '#666', marginTop: 30 }}>Kliknij aby odwrocic</p>}
          </div>
          {flipped && (
            <div style={{ display: 'flex', gap: 15 }}>
              <button onClick={() => flashResp(false)} style={{ ...s.btn, background: '#e74c3c', color: '#fff', flex: 1 }}>✗ Nie umiem</button>
              <button onClick={() => flashResp(true)} style={{ ...s.btn, background: '#27ae60', color: '#fff', flex: 1 }}>✓ Umiem</button>
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
      <div style={s.app}>
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: pct >= 70 ? '#27ae60' : '#e74c3c', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 36, fontWeight: 'bold' }}>{pct}%</span>
          </div>
          <h2>Wynik: {score}/{total}</h2>
          <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: 30 }}>
            <button onClick={restart} style={{ ...s.btn, background: '#667eea', color: '#fff' }}>Powtorz</button>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: '#3d3d5c', color: '#fff' }}>Menu</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'learn') {
    const c = learnCards[learnIdx];
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <span style={{ color: '#888' }}>{learnIdx + 1}/{learnCards.length}</span>
          </div>
          <div style={s.card}>
            <div style={{ fontSize: 12, color: '#888' }}>POJECIE</div>
            <h2 style={{ marginBottom: 25 }}>{c.term}</h2>
            {!learnFb && learnOpts.map((opt, i) => (
              <button key={opt.id} onClick={() => learnAns(opt)} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 15, marginBottom: 10, background: '#1a1a2e' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                {opt.definition}
              </button>
            ))}
            {learnFb && (
              <div style={{ padding: 20, borderRadius: 12, background: learnFb.ok ? 'rgba(39,174,96,0.2)' : 'rgba(231,76,60,0.2)', border: `2px solid ${learnFb.ok ? '#27ae60' : '#e74c3c'}` }}>
                <p style={{ fontWeight: 'bold', color: learnFb.ok ? '#27ae60' : '#e74c3c' }}>{learnFb.ok ? '✓ Dobrze!' : '✗ Zle'}</p>
                <p style={{ background: '#1a1a2e', padding: 15, borderRadius: 10 }}>{learnFb.ans}</p>
                <button onClick={learnNext} style={{ ...s.btn, background: '#667eea', color: '#fff', marginTop: 15 }}>Dalej</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'test') {
    const score = testScore();
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <h2 style={{ margin: 0 }}>Test otwarty</h2>
            {testDone && <span style={{ color: '#38ef7d' }}>{score}/{testQ.length}</span>}
          </div>
          {!testDone ? (
            <>
              {testQ.map((q, i) => (
                <div key={q.id} style={s.card}>
                  <p style={{ fontWeight: 'bold' }}>{i + 1}. {q.question}</p>
                  <textarea value={testA[q.id] || ''} onChange={e => setTestA({ ...testA, [q.id]: e.target.value })} placeholder="Odpowiedz..." style={{ ...s.input, minHeight: 80 }} />
                </div>
              ))}
              <button onClick={() => setTestDone(true)} style={{ ...s.btn, background: '#667eea', color: '#fff', width: '100%' }}>Sprawdz</button>
            </>
          ) : (
            <>
              <div style={{ ...s.card, textAlign: 'center', background: 'rgba(102,126,234,0.2)' }}>
                <h3>Wynik: {Math.round((score / testQ.length) * 100)}%</h3>
              </div>
              {testQ.map((q, i) => {
                const a = testA[q.id] || '';
                const ok = q.keywords.some(k => a.toLowerCase().includes(k.toLowerCase()));
                return (
                  <div key={q.id} style={{ ...s.card, borderLeft: `4px solid ${ok ? '#27ae60' : '#e74c3c'}` }}>
                    <p><span>{ok ? '✓' : '✗'}</span> {i + 1}. {q.question}</p>
                    <p style={{ background: '#1a1a2e', padding: 10, borderRadius: 8 }}>Twoja: {a || '-'}</p>
                    <p style={{ background: 'rgba(39,174,96,0.1)', padding: 10, borderRadius: 8, color: '#27ae60' }}>Wzor: {q.answer}</p>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 15 }}>
                <button onClick={startTest} style={{ ...s.btn, background: '#667eea', color: '#fff', flex: 1 }}>Powtorz</button>
                <button onClick={() => setView('home')} style={{ ...s.btn, background: '#3d3d5c', color: '#fff', flex: 1 }}>Menu</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (view === 'mc') {
    const score = mcScore();
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <h2 style={{ margin: 0 }}>Test ABC</h2>
            {mcDone && <span style={{ color: '#38ef7d' }}>{score}/{mcQ.length}</span>}
          </div>
          {!mcDone ? (
            <>
              {mcQ.map((q, i) => (
                <div key={q.id} style={s.card}>
                  <p style={{ fontWeight: 'bold' }}>{i + 1}. {q.question}</p>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => setMcA({ ...mcA, [q.id]: oi })} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 8, background: mcA[q.id] === oi ? 'rgba(102,126,234,0.3)' : '#1a1a2e', border: mcA[q.id] === oi ? '2px solid #667eea' : '2px solid #3d3d5c' }}>
                      {String.fromCharCode(65 + oi)}. {opt}
                    </button>
                  ))}
                </div>
              ))}
              <button onClick={() => setMcDone(true)} style={{ ...s.btn, background: '#667eea', color: '#fff', width: '100%' }}>Sprawdz</button>
            </>
          ) : (
            <>
              <div style={{ ...s.card, textAlign: 'center', background: 'rgba(102,126,234,0.2)' }}>
                <h3>Wynik: {Math.round((score / mcQ.length) * 100)}%</h3>
              </div>
              {mcQ.map((q, i) => {
                const ok = mcA[q.id] === q.correct;
                return (
                  <div key={q.id} style={{ ...s.card, borderLeft: `4px solid ${ok ? '#27ae60' : '#e74c3c'}` }}>
                    <p><span>{ok ? '✓' : '✗'}</span> {i + 1}. {q.question}</p>
                    {q.options.map((opt, oi) => (
                      <p key={oi} style={{ padding: '5px 10px', borderRadius: 5, background: oi === q.correct ? 'rgba(39,174,96,0.2)' : oi === mcA[q.id] ? 'rgba(231,76,60,0.2)' : 'transparent', color: oi === q.correct ? '#27ae60' : '#fff' }}>
                        {String.fromCharCode(65 + oi)}. {opt} {oi === q.correct && '✓'}
                      </p>
                    ))}
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 15 }}>
                <button onClick={startMc} style={{ ...s.btn, background: '#667eea', color: '#fff', flex: 1 }}>Powtorz</button>
                <button onClick={() => setView('home')} style={{ ...s.btn, background: '#3d3d5c', color: '#fff', flex: 1 }}>Menu</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (view === 'write') {
    const c = writeCards[writeIdx];
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <span style={{ color: '#888' }}>{writeIdx + 1}/{writeCards.length}</span>
            <span style={{ color: '#38ef7d' }}>✓{writeOk}</span>
          </div>
          <div style={s.card}>
            <div style={{ background: 'rgba(102,126,234,0.2)', padding: 20, borderRadius: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#888' }}>TERMIN</div>
              <h2 style={{ margin: 0 }}>{c.term}</h2>
            </div>
            <textarea value={writeAns} onChange={e => setWriteAns(e.target.value)} disabled={!!writeFb} placeholder="Wpisz definicje..." style={{ ...s.input, minHeight: 100 }} />
            {!writeFb ? (
              <button onClick={() => {
                const words = c.definition.toLowerCase().split(' ').filter(w => w.length > 4);
                const ok = words.some(w => writeAns.toLowerCase().includes(w));
                setWriteFb({ ok, ans: c.definition });
                if (ok) setWriteOk(writeOk + 1);
              }} disabled={!writeAns.trim()} style={{ ...s.btn, background: '#e74c3c', color: '#fff', width: '100%', marginTop: 15, opacity: writeAns.trim() ? 1 : 0.5 }}>Sprawdz</button>
            ) : (
              <div style={{ marginTop: 20 }}>
                <div style={{ padding: 20, borderRadius: 12, background: writeFb.ok ? 'rgba(39,174,96,0.2)' : 'rgba(231,76,60,0.2)', border: `2px solid ${writeFb.ok ? '#27ae60' : '#e74c3c'}` }}>
                  <p style={{ fontWeight: 'bold', color: writeFb.ok ? '#27ae60' : '#e74c3c' }}>{writeFb.ok ? '✓ Dobrze!' : '✗ Zapamietaj'}</p>
                  <p style={{ background: '#1a1a2e', padding: 15, borderRadius: 10 }}>{writeFb.ans}</p>
                </div>
                <button onClick={() => {
                  if (writeIdx < writeCards.length - 1) {
                    setWriteIdx(writeIdx + 1);
                    setWriteAns('');
                    setWriteFb(null);
                  } else setView('write-res');
                }} style={{ ...s.btn, background: '#667eea', color: '#fff', width: '100%', marginTop: 15 }}>Dalej</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'match') {
    if (matched.length === 8) {
      return (
        <div style={s.app}>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 80 }}>🎉</div>
            <h2>Wszystko dopasowane!</h2>
            <p style={{ fontSize: 36, color: '#38ef7d' }}>{Math.floor(matchTime / 60)}:{(matchTime % 60).toString().padStart(2, '0')}</p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
              <button onClick={startMatch} style={{ ...s.btn, background: '#9b59b6', color: '#fff' }}>Jeszcze raz</button>
              <button onClick={() => setView('home')} style={{ ...s.btn, background: '#3d3d5c', color: '#fff' }}>Menu</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={s.app}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setView('home')} style={{ ...s.btn, background: 'none', color: '#fff' }}>← Menu</button>
            <span style={{ color: '#38ef7d' }}>{matched.length}/8</span>
            <span style={{ color: '#888' }}>{Math.floor(matchTime / 60)}:{(matchTime % 60).toString().padStart(2, '0')}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <h4 style={{ color: '#667eea' }}>TERMINY</h4>
              {matchTerms.map(t => (
                <button key={t.id} onClick={() => matchClick(t, 'term')} disabled={matched.includes(t.id)} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: matched.includes(t.id) ? 'default' : 'pointer', opacity: matched.includes(t.id) ? 0.4 : 1, background: matchSel?.id === t.id && matchSel?.type === 'term' ? 'rgba(102,126,234,0.3)' : '#2d2d44', border: matched.includes(t.id) ? '2px solid #27ae60' : matchSel?.id === t.id ? '2px solid #667eea' : '2px solid #3d3d5c' }}>{t.text}</button>
              ))}
            </div>
            <div>
              <h4 style={{ color: '#e74c3c' }}>DEFINICJE</h4>
              {matchDefs.map(d => (
                <button key={d.id} onClick={() => matchClick(d, 'def')} disabled={matched.includes(d.id)} style={{ ...s.card, width: '100%', textAlign: 'left', cursor: matched.includes(d.id) ? 'default' : 'pointer', opacity: matched.includes(d.id) ? 0.4 : 1, fontSize: 14, background: matchSel?.id === d.id && matchSel?.type === 'def' ? 'rgba(231,76,60,0.3)' : '#2d2d44', border: matched.includes(d.id) ? '2px solid #27ae60' : matchSel?.id === d.id ? '2px solid #e74c3c' : '2px solid #3d3d5c' }}>{d.text}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
