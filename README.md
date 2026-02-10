# StudyApp

Aplikacja do nauki z quizami i fiszkami tematycznymi. Glassmorphism UI.

## Struktura projektu

```
studyapp/
├── index.html           # Logowanie
├── dashboard.html       # Panel z przedmiotami
├── subject.html         # Strona przedmiotu (quiz/fiszki/wkrótce)
├── quiz-pp.html         # Quiz: Procesy Poznawcze (210 pytań)
├── flashcards.html      # Fiszki (tematyczne wg przedmiotu)
├── vercel.json          # Konfiguracja Vercel
├── css/theme.css        # Motyw liquid glass
├── js/auth.js           # Autoryzacja (sessionStorage)
├── js/nav.js            # Nawigacja
├── data/subjects.js     # Rejestr przedmiotów
├── data/quiz-pp-data.js # 210 pytań
└── data/flashcards-data.js  # Fiszki per przedmiot
```

## Przedmioty

| Przedmiot | Quiz | Fiszki |
|-----------|------|--------|
| Procesy Poznawcze | ✅ 210 pytań | ✅ 55 fiszek |
| Biofizjologiczne podstawy zachowania | 🔜 | 🔜 |
| Emocje, motywacja i mechanizmy kontroli | 🔜 | 🔜 |
| Złożone procesy poznawcze | 🔜 | 🔜 |
| Psychologia rozwoju człowieka w biegu życia II | 🔜 | 🔜 |
| Wybrane problemy psychologii stosowanej | 🔜 | 🔜 |
| Trening psychologiczny I | 🔜 | 🔜 |
| Technologia informacyjna dla psychologów | 🔜 | 🔜 |

## Logowanie

- **Login:** `Zimbardo`
- **Hasło:** `Maruszewski`

## Deploy na Vercel

1. Stwórz repo na GitHub i wrzuć pliki:
   ```bash
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/USER/studyapp.git
   git push -u origin main
   ```
2. Na [vercel.com](https://vercel.com) → **Add New Project** → zaimportuj repo → **Deploy**

## Dodawanie nowego przedmiotu

1. Dodaj pytania do `data/quiz-NOWY-data.js`
2. Dodaj fiszki do `data/flashcards-data.js` (klucz w obiekcie `FLASHCARDS_BY_SUBJECT`)
3. Ustaw `hasQuiz: true` / `hasFlash: true` w `data/subjects.js`
4. Stwórz stronę quizu analogicznie do `quiz-pp.html`
