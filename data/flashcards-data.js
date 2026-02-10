var FLASHCARDS = [
  // Percepcja
  {cat:"Percepcja",front:"Bodziec dystalny",back:"Obiekt lub zjawisko w środowisku zewnętrznym, które powoduje powstanie wrażeń zmysłowych."},
  {cat:"Percepcja",front:"Bodziec proksymalny",back:"Bodziec odbierany bezpośrednio przez narządy zmysłów, np. światło padające na siatkówkę."},
  {cat:"Percepcja",front:"Transdukcja",back:"Przekształcanie energii fizycznej lub chemicznej na sygnał nerwowy (impuls). Np. światło → impulsy nerwowe."},
  {cat:"Percepcja",front:"Prawo Webera",back:"Dotyczy ledwie dostrzegalnej różnicy (JND). Stosunek ΔI/I = const. Dla światła stała Webera ≈ 0,2."},
  {cat:"Percepcja",front:"Psychofizyka",back:"Nauka zajmująca się badaniem relacji między stymulacją fizyczną a doświadczeniem psychicznym. Fechner – kluczowa postać."},
  {cat:"Percepcja",front:"Teoria detekcji sygnałów",back:"Model odróżniania sygnału od szumu. Wyniki: trafienie (hit), fałszywy alarm, pudło (miss), poprawne odrzucenie."},
  {cat:"Percepcja",front:"Adaptacja sensoryczna",back:"Utrata zdolności komórek recepcyjnych do reagowania po okresie niezmieniającej się stymulacji."},
  {cat:"Percepcja",front:"Deprywacja sensoryczna",back:"Znaczne i przedłużone obniżenie stymulacji → halucynacje, labilność emocjonalna, spadek zdolności poznawczych."},
  {cat:"Percepcja",front:"Stałość percepcyjna",back:"Mechanizm pozwalający na niezmienność percepcji mimo zmieniających się warunków (np. wielkość, jasność, kształt)."},
  {cat:"Percepcja",front:"Bodziec podprogowy",back:"Stymulacja wystarczająco silna, aby pobudzić organy sensoryczne, ale zbyt słaba, aby ją świadomie zauważyć."},

  // Widzenie
  {cat:"Widzenie",front:"Czopki vs pręciki",back:"Czopki: widzenie barwne, szczegóły, plamka żółta. Pręciki: widzenie w ciemności, peryferyjne."},
  {cat:"Widzenie",front:"Plamka żółta (dołek centralny)",back:"Centralna część siatkówki z największym skupieniem czopków. Odpowiada za najostrzejsze widzenie."},
  {cat:"Widzenie",front:"Teoria trójchromatyczna",back:"Oko posiada trzy rodzaje czopków reagujących na różne długości fal świetlnych (czerwony, zielony, niebieski)."},
  {cat:"Widzenie",front:"Stereopsja",back:"Podstawowy mechanizm percepcji głębi, oparty na różnicy obrazów na obu siatkówkach (dysparat binokularny)."},
  {cat:"Widzenie",front:"Akinetopsja",back:"Niedostrzeganie ruchu przedmiotów – skutek uszkodzenia obszaru MT/V5."},
  {cat:"Widzenie",front:"Zjawisko fi",back:"Postrzeganie płynnego ruchu z dwóch punktów w szybkim następstwie (4-5 razy na sekundę)."},
  {cat:"Widzenie",front:"Zakręt wrzecionowaty",back:"Obszar mózgu odpowiedzialny za rozpoznawanie twarzy i obiektów wizualnych. Uszkodzenie → prozopagnozja."},

  // Iluzje i teorie
  {cat:"Teorie percepcji",front:"Teoria ekologiczna Gibsona",back:"Bezpośrednie poznawanie rzeczywistości. Afordancje – funkcjonalne aspekty obiektów dostrzegane bezpośrednio."},
  {cat:"Teorie percepcji",front:"Teoria Gestalt",back:"Całość jest czymś więcej niż suma części. Prawa: wspólnego losu, bliskości, podobieństwa, domknięcia."},
  {cat:"Teorie percepcji",front:"Konstruktywizm",back:"Umysł aktywnie tworzy wewnętrzne odzwierciedlenia zewnętrznych obiektów (top-down processing)."},
  {cat:"Teorie percepcji",front:"Cykl percepcyjny Neissera",back:"Spostrzeganie to ciągły proces. Może zaczynać się od informacji w otoczeniu, schematu pamięciowego lub eksploracji."},
  {cat:"Teorie percepcji",front:"Geony (Biederman)",back:"Geometryczne komponenty strukturalne – podstawowe kształty 3D, z których składa się percepcja obiektów."},
  {cat:"Teorie percepcji",front:"Sześcian Neckera",back:"Przykład dwuznaczności percepcyjnej – ta sama figura może być widziana na dwa sposoby."},
  {cat:"Teorie percepcji",front:"Reprezentacjonizm",back:"Umysł poznaje rzeczywistość za pośrednictwem własnych kategorii poznawczych (nie bezpośrednio)."},

  // Słuch
  {cat:"Słuch",front:"Amplituda vs głośność",back:"Amplituda to cecha fizyczna fali. Głośność to jej subiektywny odpowiednik (doświadczenie psychiczne)."},
  {cat:"Słuch",front:"Teoria miejsca",back:"Dźwięki o różnej wysokości aktywują różne obszary błony podstawnej w ślimaku."},
  {cat:"Słuch",front:"Zasada salwy",back:"Rozszerzenie teorii częstotliwości – grupy neuronów 'strzelają' na zmianę, odwzorowując częstotliwość."},
  {cat:"Słuch",front:"Błona podstawna",back:"Struktura w uchu wewnętrznym odpowiedzialna za różnicowanie wysokości dźwięków."},

  // Uwaga
  {cat:"Uwaga",front:"3 systemy uwagi Posnera",back:"Orientacyjna (przesuwanie zasobów), wykonawcza (selekcja reakcji, hamowanie), wzbudzeniowa (alert)."},
  {cat:"Uwaga",front:"Filtr Broadbenta",back:"Wczesna selekcja – informacje filtrowane na zasadzie 'wszystko albo nic' na wczesnym etapie."},
  {cat:"Uwaga",front:"Teoria osłabiacza (Treisman)",back:"Kompromis: informacja z nieśledzonego kanału jest osłabiana, ale nie całkowicie blokowana."},
  {cat:"Uwaga",front:"Teoria zasobów (Kahneman)",back:"Uwaga jako ograniczone zasoby, które są alokowane między zadania. Pojemność zależy od pobudzenia."},
  {cat:"Uwaga",front:"Mrugnięcie uwagowe",back:"Niezauważanie celu prezentowanego 200-500 ms po innym celu w szybkiej serii bodźców."},
  {cat:"Uwaga",front:"Pop-out (wyskakiwanie)",back:"Obiekt natychmiast znajdujący się w polu wzrokowym niezależnie od liczby dystraktorów – przeszukiwanie równoległe."},
  {cat:"Uwaga",front:"Efekt Stroopa",back:"Interferencja między automatycznym czytaniem a nazywaniem koloru druku – jedno z najsłynniejszych zjawisk uwagi."},
  {cat:"Uwaga",front:"Prawo Yerkesa-Dodsona",back:"Odwrócone U: optimum wykonania przy średnim pobudzeniu. Za niskie lub za wysokie pobudzenie pogarsza wyniki."},
  {cat:"Uwaga",front:"Prymowanie",back:"Zwiększenie efektywności przetwarzania bodźca po wcześniejszej ekspozycji na bodziec pokrewny."},

  // Pamięć
  {cat:"Pamięć",front:"Pacjent H.M.",back:"Padaczka → usunięcie hipokampa → amnezja następcza. Zachowana pamięć proceduralna (rysowanie w lustrze)."},
  {cat:"Pamięć",front:"Liczba Millera (7±2)",back:"Pojemność pamięci krótkotrwałej wynosi około 7 (±2) elementów."},
  {cat:"Pamięć",front:"Model Baddeleya (pamięć robocza)",back:"Centralny system wykonawczy + pętla fonologiczna + szkicownik wzrokowo-przestrzenny + bufor epizodyczny."},
  {cat:"Pamięć",front:"Teoria poziomów przetwarzania",back:"Craik i Lockhart: zapamiętywanie zależy od głębokości przetwarzania (powierzchowne → głębokie/semantyczne)."},
  {cat:"Pamięć",front:"Model Atkinsona-Shiffrina",back:"Blokowy model: pamięć sensoryczna → krótkotrwała (STM) → długotrwała (LTM). Powtarzanie przenosi do LTM."},
  {cat:"Pamięć",front:"Konsolidacja",back:"Stopniowe stabilizowanie się śladu pamięciowego. Synaptyczna (godziny) vs systemowa (znacznie dłużej)."},
  {cat:"Pamięć",front:"Interferencja retroaktywna",back:"Nowa wiedza oddziałuje wstecznie destruktywnie na starszą (nowe zakłóca stare)."},
  {cat:"Pamięć",front:"Elizabeth Loftus",back:"Badaczka fałszywych wspomnień. Loftus i Palmer (1974) – wpływ pytań sugerujących na pamięć świadków."},
  {cat:"Pamięć",front:"Efekt pierwszeństwa i świeżości",back:"Lepsze zapamiętywanie elementów z początku (LTM) i końca (STM) listy."},
  {cat:"Pamięć",front:"Elaboracja",back:"Czynnik pozytywnie wpływający na zapamiętywanie – rozbudowane przetwarzanie informacji."},

  // Wiedza i reprezentacje
  {cat:"Wiedza",front:"Teoria podwójnego kodowania (Paivio)",back:"Człowiek tworzy reprezentacje w dwóch systemach: werbalnym (logogeny) i niewerbalnym (imageny)."},
  {cat:"Wiedza",front:"Teoria prototypów (Rosch)",back:"Kategorie mają strukturę gradientową. Prototyp = najbardziej typowy egzemplarz kategorii."},
  {cat:"Wiedza",front:"Afantazja",back:"Niemożność tworzenia wyobrażeń (obrazów umysłowych)."},
  {cat:"Wiedza",front:"Model ACT* (Anderson)",back:"Deklaratywna wiedza (fakty) i proceduralna (reguły). Można przekształcać deklaratywną w proceduralną."},
  {cat:"Wiedza",front:"Ramy (Minsky)",back:"Stałe elementy struktury + 'okienka' (sloty) na elastyczne, zmienne informacje."},
  {cat:"Wiedza",front:"Wiedza 'że' i 'jak' (Ryle)",back:"Dwa rodzaje wiedzy: deklaratywna ('że' – fakty) i proceduralna ('jak' – umiejętności)."},

  // Świadomość
  {cat:"Świadomość",front:"Qualia",back:"Jakościowo swoiste, subiektywne stany świadomości – prywatne, niewyrażalne, dostępne tylko podmiotowi."},
  {cat:"Świadomość",front:"Chiński pokój (Searle)",back:"Eksperyment myślowy: manipulacja symbolami bez rozumienia nie jest prawdziwą inteligencją."},
  {cat:"Świadomość",front:"Koneksjonizm",back:"Modelowanie procesów poznawczych przy użyciu sieci neuropodobnych (sztucznych sieci neuronowych)."},
  {cat:"Świadomość",front:"Świadomość wg Blocka",back:"Trzy rodzaje: fenomenalna (qualia), dostępu (informacja dostępna do raportowania), samoświadomość."},
  {cat:"Świadomość",front:"Dennett o umyśle",back:"Umysł to 'armia idiotów' – wiele prostych procesów tworzących złudzenie jednolitej świadomości."}
];
