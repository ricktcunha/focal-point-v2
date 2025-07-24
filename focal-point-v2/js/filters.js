// Filtros inteligentes para contatos
const filtersContainer = document.querySelector('.filters');
let currentFilters = {
  setor: 'todos',
  tipoContato: 'todos',
  orderBy: 'setor',
};

function getSetores() {
  // Extrai apenas o nome principal do setor (antes do traço)
  const setoresPrincipais = window.CONTACTS.map(c => c.setor.split(' - ')[0].trim());
  return ['todos', ...Array.from(new Set(setoresPrincipais))];
}
function getTiposContato() {
  const tipos = window.CONTACTS.flatMap(c => c.tipoContato);
  return ['todos', ...Array.from(new Set(tipos))];
}

function renderFilters() {
  // Setor
  const setores = getSetores();
  const setorSelect = `<label>Setor <select id="filter-setor">${setores.map(setor => `<option value="${setor}">${setor.charAt(0).toUpperCase() + setor.slice(1)}</option>`).join('')}</select></label>`;
  // Tipo de contato
  const tipos = getTiposContato();
  const tipoSelect = `<label>Tipo <select id="filter-tipo">${tipos.map(tipo => `<option value="${tipo}">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>`).join('')}</select></label>`;
  // Ordenação
  const orderSelect = `<label>Ordenar por <select id="filter-order"><option value="setor">Setor</option><option value="responsavel">Nome</option></select></label>`;
  // Limpar filtros
  const clearBtn = `<button id="clear-filters" class="action-btn" type="button">Limpar filtros</button>`;
  // Contador de resultados
  const resultsCounter = `<span id="results-counter" class="results-counter" style="display: none;">0 resultados</span>`;
  
  filtersContainer.innerHTML = setorSelect + tipoSelect + orderSelect + resultsCounter + clearBtn;
  
  // Adicionar tooltips e melhorar acessibilidade
  addFilterEnhancements();
}

function addFilterEnhancements() {
  // Adicionar tooltips e melhorar acessibilidade
  const selects = filtersContainer.querySelectorAll('select');
  selects.forEach(select => {
    select.setAttribute('aria-label', select.previousElementSibling.textContent);
    select.setAttribute('title', `Filtrar por ${select.previousElementSibling.textContent.toLowerCase()}`);
  });
  
  // Adicionar indicadores visuais para filtros ativos
  updateFilterIndicators();
}

function updateFilterIndicators() {
  const hasActiveFilters = currentFilters.setor !== 'todos' || currentFilters.tipoContato !== 'todos';
  
  if (hasActiveFilters) {
    filtersContainer.classList.add('filters-active');
  } else {
    filtersContainer.classList.remove('filters-active');
  }
}

function showResultCount(count) {
  const counter = document.getElementById('results-counter');
  if (counter) {
    counter.textContent = `${count} resultado${count !== 1 ? 's' : ''}`;
    counter.style.display = 'inline-block';
    
    // Adicionar animação
    counter.style.animation = 'none';
    counter.offsetHeight; // Trigger reflow
    counter.style.animation = 'copy-pop 0.3s ease-out';
  }
}

function applyFilters(contacts) {
  let filtered = [...contacts];
  if (currentFilters.setor !== 'todos') {
    // Filtra todos os setores que começam com o setor principal selecionado
    filtered = filtered.filter(c => c.setor.split(' - ')[0].trim() === currentFilters.setor);
  }
  if (currentFilters.tipoContato !== 'todos') {
    filtered = filtered.filter(c => c.tipoContato.includes(currentFilters.tipoContato));
  }
  // Ordenação
  filtered.sort((a, b) => {
    if (currentFilters.orderBy === 'setor') {
      return a.setor.localeCompare(b.setor);
    } else {
      return a.responsavel.localeCompare(b.responsavel);
    }
  });
  return filtered;
}

function handleFilterChange() {
  currentFilters.setor = document.getElementById('filter-setor').value;
  currentFilters.tipoContato = document.getElementById('filter-tipo').value;
  currentFilters.orderBy = document.getElementById('filter-order').value;
  
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
  
  filtered = applyFilters(filtered);
  window.renderContacts(filtered);
  
  // Atualiza contador de resultados
  showResultCount(filtered.length);
  
  // Atualiza indicadores visuais
  updateFilterIndicators();
  
  // Adiciona feedback visual
  addFilterFeedback();
}

function addFilterFeedback() {
  // Adiciona feedback visual sutil quando filtros são aplicados
  const activeFilters = document.querySelectorAll('select');
  activeFilters.forEach(select => {
    if (select.value !== 'todos') {
      select.style.borderColor = 'var(--primary-green)';
      select.style.backgroundColor = 'var(--accent-green)';
      
      // Remove o feedback após um tempo
      setTimeout(() => {
        select.style.borderColor = '';
        select.style.backgroundColor = '';
      }, 500);
    }
  });
}

function handleClearFilters() {
  // Animação de limpeza
  const clearBtn = document.getElementById('clear-filters');
  clearBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    clearBtn.style.transform = '';
  }, 150);
  
  document.getElementById('filter-setor').value = 'todos';
  document.getElementById('filter-tipo').value = 'todos';
  document.getElementById('filter-order').value = 'setor';
  currentFilters = { setor: 'todos', tipoContato: 'todos', orderBy: 'setor' };
  
  handleFilterChange();
  
  // Feedback visual de limpeza
  const counter = document.getElementById('results-counter');
  if (counter) {
    counter.style.display = 'none';
  }
  
  // Mostra mensagem de confirmação
  showNotification('Filtros limpos com sucesso!', 'success');
}

function showNotification(message, type = 'info') {
  // Cria notificação temporária
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: var(--primary-green);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Anima entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove após 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Event listeners melhorados
filtersContainer.addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    handleFilterChange();
  }
});

filtersContainer.addEventListener('click', (e) => {
  if (e.target.id === 'clear-filters') {
    handleClearFilters();
  }
});

// Adiciona suporte a teclado
filtersContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.tagName === 'SELECT') {
    handleFilterChange();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
});
