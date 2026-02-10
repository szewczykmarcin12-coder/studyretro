/* ═══ AUTH MODULE ═══ */
var Auth = (function() {
  var CREDENTIALS = { login: "Zimbardo", password: "Maruszewski" };
  var SESSION_KEY = "studyapp_auth";

  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function login(user, pass) {
    if (user === CREDENTIALS.login && pass === CREDENTIALS.password) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = "index.html";
      return false;
    }
    return true;
  }

  return { isLoggedIn: isLoggedIn, login: login, logout: logout, requireAuth: requireAuth };
})();
