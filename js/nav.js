/* ═══ NAV MODULE ═══ */
function buildNav(activePage) {
  var pages = [
    { id: "dashboard", label: "Start", href: "dashboard.html" },
    { id: "quiz-pp", label: "Procesy Poznawcze", href: "quiz-pp.html" },
    { id: "flashcards", label: "Fiszki", href: "flashcards.html" },
    { id: "other", label: "Inne", href: "other.html" }
  ];

  var linksHtml = pages.map(function(p) {
    var cls = "nav-link" + (p.id === activePage ? " active" : "");
    return '<a class="' + cls + '" href="' + p.href + '">' + p.label + '</a>';
  }).join("");

  linksHtml += '<a class="nav-link logout" href="#" onclick="Auth.logout();return false">Wyloguj</a>';

  var nav = document.createElement("nav");
  nav.className = "topnav";
  nav.innerHTML = '<div class="topnav-inner">'
    + '<a class="brand" href="dashboard.html">StudyApp</a>'
    + '<div class="nav-links">' + linksHtml + '</div>'
    + '</div>';

  document.body.insertBefore(nav, document.body.firstChild);
}
