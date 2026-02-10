# StudyApp – Procesy Poznawcze

Aplikacja do nauki z quizami i fiszkami. Glassmorphism UI.

## Struktura projektu

```
studyapp/
├── index.html          # Strona logowania
├── dashboard.html      # Panel główny
├── quiz-pp.html        # Quiz: Procesy Poznawcze (210 pytań)
├── flashcards.html     # Fiszki
├── other.html          # Placeholder na przyszłe quizy
├── vercel.json         # Konfiguracja Vercel
├── css/
│   └── theme.css       # Wspólny motyw (liquid glass)
├── js/
│   ├── auth.js         # Moduł autoryzacji
│   └── nav.js          # Nawigacja
└── data/
    ├── quiz-pp-data.js     # 210 pytań z Procesów Poznawczych
    └── flashcards-data.js  # Dane fiszek
```

## Logowanie

- **Login:** `Zimbardo`
- **Hasło:** `Maruszewski`

## Deploy na Vercel przez GitHub

1. Stwórz nowe repozytorium na GitHub
2. Wrzuć pliki do repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJ-USER/studyapp.git
   git push -u origin main
   ```
3. Wejdź na [vercel.com](https://vercel.com) i zaloguj się kontem GitHub
4. Kliknij **"Add New Project"**
5. Zaimportuj swoje repozytorium
6. Vercel automatycznie wykryje statyczną stronę – kliknij **Deploy**
7. Gotowe! Strona dostępna pod adresem `twoj-projekt.vercel.app`

## Funkcje

- Logowanie z zabezpieczeniem sesji (sessionStorage)
- Quiz z 210 pytań z natychmiastowym feedbackiem
- Tryb losowy (30 pytań)
- Filtrowanie błędnych odpowiedzi
- Fiszki z odwracaniem kart i śledzeniem postępu
- Kategorie tematyczne
- Responsywny design (mobile-first)
- Motyw liquid glass
