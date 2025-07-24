# Diretório de Contatos - Adubos Real

Um diretório de contatos internos com interface moderna e funcionalidades avançadas de busca e filtros.

## ✨ Melhorias Implementadas

### 🎨 Modo Escuro com Tom Verde

- **Paleta de cores verde escuro**: Implementado um tema escuro com tons de verde (#0a1a0a, #0f2a0f) para melhor harmonia visual
- **Transições suaves**: Animações de transição entre modo claro e escuro
- **Cores adaptativas**: Todos os elementos se adaptam automaticamente ao tema

### 🔍 Filtros Melhorados

- **Interface moderna**: Design limpo com bordas arredondadas e sombras sutis
- **Indicadores visuais**:
  - Ponto pulsante quando filtros estão ativos
  - Feedback visual ao aplicar filtros
  - Contador de resultados em tempo real
- **Melhor usabilidade**:
  - Tooltips informativos
  - Suporte completo a teclado
  - Animações de hover e focus
  - Layout responsivo para mobile

### 📱 Responsividade

- **Mobile-first**: Interface otimizada para dispositivos móveis
- **Layout adaptativo**: Filtros se reorganizam em coluna em telas menores
- **Touch-friendly**: Botões e elementos otimizados para toque

### 🎯 Funcionalidades de Usabilidade

- **Notificações**: Feedback visual para ações do usuário
- **Animações**: Transições suaves e feedback visual
- **Acessibilidade**: Suporte completo a navegação por teclado
- **Contador de resultados**: Mostra quantos contatos foram encontrados

## 🚀 Como Usar

1. **Busca**: Digite no campo de busca para filtrar por setor, nome, e-mail ou telefone
2. **Filtros**: Use os dropdowns para filtrar por categoria, tipo de contato e ordenação
3. **Limpar**: Clique em "Limpar filtros" para resetar todos os filtros
4. **Modo Escuro**: Clique no botão da lua/sol no canto superior direito

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript vanilla (ES6+)
- LocalStorage para persistência de dados

## 📁 Estrutura do Projeto

```
focal-point-v2/
├── index.html          # Página principal
├── css/
│   ├── main.css        # Estilos principais e tema escuro
│   ├── components.css  # Componentes e filtros
│   └── responsive.css  # Media queries
├── js/
│   ├── utils.js        # Dados dos contatos
│   ├── main.js         # Renderização dos cards
│   ├── search.js       # Funcionalidade de busca
│   ├── filters.js      # Sistema de filtros
│   └── dark-mode.js    # Alternância de tema
└── README.md           # Documentação
```

## 🎨 Paleta de Cores

### Modo Claro

- Verde primário: #10b981
- Verde escuro: #059669
- Verde claro: #34d399
- Fundo: #ffffff
- Superfície: #f9fafb

### Modo Escuro

- Fundo: #0a1a0a
- Superfície: #0f2a0f
- Verde primário: #22c55e
- Verde escuro: #16a34a
- Verde claro: #4ade80

## 🔧 Funcionalidades

- ✅ Busca em tempo real
- ✅ Filtros por categoria e tipo
- ✅ Ordenação por setor ou nome
- ✅ Favoritos com persistência
- ✅ Copiar informações para clipboard
- ✅ Click-to-call e click-to-email
- ✅ Modo escuro/claro
- ✅ Interface responsiva
- ✅ Navegação por teclado
- ✅ Animações e feedback visual
