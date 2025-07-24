// Busca dinâmica em tempo real com debounce
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('search-suggestions');
let searchTimeout = null;

function highlightTerm(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function filterContacts(query) {
  if (!query) return window.CONTACTS;
  const q = query.trim().toLowerCase();
  return window.CONTACTS.filter(c =>
    c.setor.toLowerCase().includes(q) ||
    c.responsavel.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.contato.toLowerCase().includes(q)
  );
}

function showSuggestions(query) {
  if (!query) {
    suggestionsBox.classList.remove('active');
    suggestionsBox.innerHTML = '';
    return;
  }
  const q = query.trim().toLowerCase();
  const found = window.CONTACTS.filter(c =>
    c.setor.toLowerCase().includes(q) ||
    c.responsavel.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.contato.toLowerCase().includes(q)
  ).slice(0, 5);
  if (!found.length) {
    suggestionsBox.innerHTML = '<li>Nenhum resultado</li>';
    suggestionsBox.classList.add('active');
    return;
  }
  suggestionsBox.innerHTML = found.map(c =>
    `<li tabindex="0">${highlightTerm(c.setor, q)} - ${highlightTerm(c.responsavel, q)}</li>`
  ).join('');
  suggestionsBox.classList.add('active');
}

function handleSearchInput(e) {
  const value = e.target.value;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const filtered = filterContacts(value);
    window.renderContacts(filtered);
    showSuggestions(value);
    showResultCount(filtered.length);
  }, 300);
}

function showResultCount(count) {
  let counter = document.getElementById('result-count');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'result-count';
    counter.style.textAlign = 'right';
    counter.style.color = 'var(--text-secondary)';
    counter.style.fontSize = '0.98rem';
    counter.style.margin = '0 0.7rem 0.5rem 0';
    searchInput.parentNode.appendChild(counter);
  }
  counter.textContent = `${count} resultado${count === 1 ? '' : 's'}`;
}

searchInput.addEventListener('input', handleSearchInput);

// Sugestão por clique ou teclado
suggestionsBox.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    searchInput.value = e.target.textContent.split(' - ')[0];
    searchInput.dispatchEvent(new Event('input'));
    suggestionsBox.classList.remove('active');
  }
});
suggestionsBox.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName === 'LI') {
    searchInput.value = e.target.textContent.split(' - ')[0];
    searchInput.dispatchEvent(new Event('input'));
    suggestionsBox.classList.remove('active');
  }
});

// Limpar busca
const clearBtn = document.getElementById('clear-search');
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  window.renderContacts(window.CONTACTS);
  showSuggestions('');
  showResultCount(window.CONTACTS.length);
  searchInput.focus();
});

// Inicializa contador
document.addEventListener('DOMContentLoaded', () => {
  showResultCount(window.CONTACTS.length);
});
