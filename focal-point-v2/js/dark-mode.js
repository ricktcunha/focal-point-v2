// Alternância de modo escuro/claro
const darkBtn = document.getElementById('toggle-dark');
const darkIcon = document.getElementById('dark-icon');

function setDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem('focalpoint_dark', enabled ? '1' : '0');
  darkIcon.textContent = enabled ? '☀️' : '🌙';
  darkBtn.setAttribute('aria-label', enabled ? 'Ativar modo claro' : 'Ativar modo escuro');
}

function getDarkPref() {
  const local = localStorage.getItem('focalpoint_dark');
  if (local !== null) return local === '1';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

darkBtn.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', () => {
  setDarkMode(getDarkPref());
}); 