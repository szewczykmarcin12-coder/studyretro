var SUBJECTS = {
  pp:      { name: "Procesy Poznawcze", icon: "🧠", color: "purple", hasQuiz: true, hasFlash: true },
  bio:     { name: "Biofizjologiczne podstawy zachowania", icon: "🧬", color: "teal", hasQuiz: false, hasFlash: false },
  emo:     { name: "Emocje, motywacja i mechanizmy kontroli", icon: "❤️‍🔥", color: "pink", hasQuiz: false, hasFlash: false },
  zloz:    { name: "Złożone procesy poznawcze", icon: "🔮", color: "orange", hasQuiz: false, hasFlash: false },
  rozwoj:  { name: "Psychologia rozwoju człowieka w biegu życia II", icon: "👶", color: "blue", hasQuiz: false, hasFlash: false },
  stosow:  { name: "Wybrane problemy psychologii stosowanej", icon: "⚙️", color: "yellow", hasQuiz: false, hasFlash: false },
  trening: { name: "Trening psychologiczny I", icon: "🎯", color: "red", hasQuiz: false, hasFlash: false },
  tech:    { name: "Technologia informacyjna dla psychologów", icon: "💻", color: "cyan", hasQuiz: false, hasFlash: false }
};

function getSubjectId() {
  var params = new URLSearchParams(window.location.search);
  return params.get("id") || "pp";
}

function getSubject() {
  var id = getSubjectId();
  return SUBJECTS[id] || SUBJECTS.pp;
}
