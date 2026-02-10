/* ═══ NAV MODULE ═══ */
function buildNav(activePage) {
  var nav = document.createElement("nav");
  nav.className = "topnav";
  nav.innerHTML = '<div class="topnav-inner">'
    + '<a class="brand" href="dashboard.html">StudyApp</a>'
    + '<div class="nav-links">'
    + '<a class="nav-link' + (activePage === "dashboard" ? " active" : "") + '" href="dashboard.html">Start</a>'
    + '<a class="nav-link logout" href="#" onclick="Auth.logout();return false">Wyloguj</a>'
    + '</div></div>';
  document.body.insertBefore(nav, document.body.firstChild);
}
