// Renderização dos cards de contato
function renderContacts(contacts) {
  const container = document.getElementById('contacts-container');
  container.innerHTML = '';
  if (!contacts.length) {
    document.getElementById('empty-state').hidden = false;
    return;
  }
  document.getElementById('empty-state').hidden = true;
  // Favoritos no topo
  const favs = getFavorites();
  const sorted = [...contacts].sort((a, b) => {
    const aFav = favs.includes(a.email);
    const bFav = favs.includes(b.email);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });
  sorted.forEach((contact, idx) => {
    const card = document.createElement('article');
    card.className = 'contact-card';
    card.tabIndex = 0;
    card.setAttribute('aria-label', `Contato: ${contact.nome} do setor ${contact.setor}`);

    // Header
    const header = document.createElement('div');
    header.className = 'contact-header';
    header.innerHTML = `
      <span class="contact-sector-tag"><b>Setor:</b> ${contact.setor}</span>
      <span class="contact-name"><b>Área:</b> ${contact.nome}</span>
      <button class="contact-favorite${isFavorite(contact.email) ? ' favorited' : ''}" title="Favoritar contato" aria-label="Favoritar contato" data-email="${contact.email}">${isFavorite(contact.email) ? '★' : '☆'}</button>
    `;
    card.appendChild(header);

    // Info
    const info = document.createElement('div');
    info.className = 'contact-info';
    info.innerHTML = `
      <div><span class="contact-label">Responsável:</span> <span class="contact-value">${contact.responsavel}</span></div>
      <div><span class="contact-label">E-mail:</span> <span class="contact-value"><a href="mailto:${contact.email}" tabindex="-1">${contact.email}</a></span></div>
      <div><span class="contact-label">Telefone:</span> <span class="contact-value">${formatPhone(contact.contato)}${contact.ramal ? ` / Ramal: ${contact.ramal}` : ''}</span></div>
    `;
    card.appendChild(info);

    // Ações
    const actions = document.createElement('div');
    actions.className = 'contact-actions';
    // Click-to-call (pega só o primeiro número)
    const tel = extractPhone(contact.contato);
    if (tel) {
      actions.innerHTML += `<button class="action-btn" title="Ligar" aria-label="Ligar para ${contact.responsavel}" onclick="window.open('tel:${tel}')">📞 Ligar</button>`;
    }
    // Click-to-email
    actions.innerHTML += `<button class="action-btn" title="Enviar e-mail" aria-label="Enviar e-mail para ${contact.responsavel}" onclick="window.open('mailto:${contact.email}')">✉️ E-mail</button>`;
    // Copiar info
    actions.innerHTML += `<button class="action-btn copy-btn" title="Copiar informações" aria-label="Copiar informações do contato" data-idx="${idx}">📋 Copiar</button>`;
    card.appendChild(actions);

    container.appendChild(card);
  });
}

// Utilitário para formatar telefone (mantém ramal)
function formatPhone(phone) {
  return phone.replace(/(\d{2})\s?(\d{4,5})-?(\d{4})/g, '($1) $2-$3');
}
// Extrai o primeiro número de telefone para click-to-call
function extractPhone(phone) {
  const match = phone.match(/\(\d{2}\)\s?\d{4,5}-?\d{4}/);
  return match ? match[0].replace(/\D/g, '') : '';
}

// Funções de favoritos
function getFavorites() {
  return JSON.parse(localStorage.getItem('focalpoint_favorites') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('focalpoint_favorites', JSON.stringify(favs));
}
function isFavorite(email) {
  return getFavorites().includes(email);
}
function toggleFavorite(email) {
  let favs = getFavorites();
  if (favs.includes(email)) {
    favs = favs.filter(e => e !== email);
  } else {
    favs.push(email);
  }
  setFavorites(favs);
}

// Copiar informações para área de transferência
function handleCopy(e) {
  if (e.target.classList.contains('copy-btn')) {
    const idx = e.target.getAttribute('data-idx');
    const c = window.CONTACTS[idx];
    const text = `Setor: ${c.setor}\nResponsável: ${c.responsavel}\nE-mail: ${c.email}\nContato: ${c.contato}`;
    navigator.clipboard.writeText(text);
    e.target.textContent = '✅ Copiado!';
    e.target.classList.add('copied');
    setTimeout(() => {
      e.target.textContent = '📋 Copiar';
      e.target.classList.remove('copied');
    }, 1200);
  }
}

// Evento para favoritar
function handleFavorite(e) {
  if (e.target.classList.contains('contact-favorite')) {
    const email = e.target.getAttribute('data-email');
    toggleFavorite(email);
    // Re-renderiza mantendo filtros/busca
    const searchValue = document.getElementById('search-input').value;
    let filtered = window.CONTACTS;
    if (searchValue) {
      filtered = window.CONTACTS.filter(c =>
        c.setor.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.responsavel.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.contato.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (typeof applyFilters === 'function') {
      filtered = applyFilters(filtered);
    }
    renderContacts(filtered);
  }
}

// Acessibilidade: navegação por teclado nos cards
function focusNextCard(current, direction) {
  const cards = Array.from(document.querySelectorAll('.contact-card'));
  const idx = cards.indexOf(current);
  if (idx === -1) return;
  const nextIdx = direction === 'next' ? idx + 1 : idx - 1;
  if (cards[nextIdx]) cards[nextIdx].focus();
}
document.addEventListener('keydown', (e) => {
  const active = document.activeElement;
  if (active && active.classList.contains('contact-card')) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNextCard(active, 'next');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusNextCard(active, 'prev');
    }
  }
});
// Atalhos globais
document.addEventListener('keydown', (e) => {
  const searchInput = document.getElementById('search-input');
  if (e.key === 'Escape') {
    // Limpar busca
    if (document.activeElement === searchInput) {
      searchInput.value = '';
      window.renderContacts(window.CONTACTS);
      if (typeof showResultCount === 'function') showResultCount(window.CONTACTS.length);
    }
  } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    // Focar busca
    e.preventDefault();
    searchInput.focus();
  } else if (e.key === 'Enter' && document.activeElement === searchInput) {
    // Buscar (já é dinâmico, mas força sugestão sumir)
    document.getElementById('search-suggestions').classList.remove('active');
  }
});
// Foco visível
const style = document.createElement('style');
style.innerHTML = `
  .contact-card:focus { outline: 2px solid var(--primary-green); outline-offset: 2px; }
  .action-btn:focus, .contact-favorite:focus { outline: 2px solid var(--primary-green-light); outline-offset: 2px; }
`;
document.head.appendChild(style);

document.getElementById('contacts-container').addEventListener('click', handleCopy);
document.getElementById('contacts-container').addEventListener('click', handleFavorite);

document.addEventListener('DOMContentLoaded', () => {
  renderContacts(window.CONTACTS);
});
