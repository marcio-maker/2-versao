// script.js - COMPLETO, ROBUSTO E OTIMIZADO - VERSÃO FINAL

/* ===== CONSTANTS AND CONFIGURATION ===== */
const APP_CONFIG = {
  NAME: 'Universidade de Pais',
  VERSION: '2.1.0',
  STORAGE_PREFIX: 'up_',
  FEATURES: {
    OFFLINE_SUPPORT: true,
    ANALYTICS: true,
    PUSH_NOTIFICATIONS: false
  }
};

const VIDEO_IDS = [
  "hB1UNt93FN8", "vehTS91mObM", "2H85Q_UjF5o",
  "hB1UNt93FN8", "vehTS91mObM", "2H85Q_UjF5o",
  "hB1UNt93FN8", "vehTS91mObM"
];

const EMOJI_CATEGORIES = {
  positive: ['😊', '😌', '😄', '🤗', '😇', '🥰', '😎', '🎉'],
  neutral: ['😐', '🤔', '😶', '🧐'],
  negative: ['😟', '😕', '😞', '😔', '😣', '😠', '😢', '😨', '😰', '😩', '😤', '😭']
};

/* ===== UTILITY FUNCTIONS ===== */
const Utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Safe localStorage with error handling
  storage: {
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(`${APP_CONFIG.STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return defaultValue;
      }
    },

    set: (key, value) => {
      try {
        localStorage.setItem(`${APP_CONFIG.STORAGE_PREFIX}${key}`, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Error writing to localStorage: ${error}`);
        return false;
      }
    },

    remove: (key) => {
      try {
        localStorage.removeItem(`${APP_CONFIG.STORAGE_PREFIX}${key}`);
        return true;
      } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
        return false;
      }
    }
  },

  // Validation functions
  validate: {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    name: (name) => name && name.trim().length >= 2,
    required: (value) => value && value.toString().trim().length > 0
  },

  // Date formatting
  formatDate: (date = new Date()) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  // Generate unique IDs
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Sanitize HTML
  sanitize: (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

/* ===== COURSE DATA ===== */
const COURSE = {
  title: "Conexão Pais e Filhos",
  instructor: "Dr. Wimer Bottura Jr.",
  totalAulas: 32,
  modules: [
    {
      id: 0,
      title: "Módulo 1: Tranquilizando os Pais",
      description: "Acalmando preocupações comuns dos pais e fortalecendo a base familiar.",
      duration: "8 aulas × 8min",
      color: "#4A90E2",
      aulas: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: `Aula ${i + 1}: ${[
          "Entendendo as Preocupações",
          "Comunicação Familiar",
          "Gestão de Conflitos",
          "Estabelecendo Limites",
          "O Poder do Exemplo",
          "A Importância do Tempo Juntos",
          "Lidando com a Tecnologia",
          "Respeito Mútuo"
        ][i]}`,
        video: `https://www.youtube.com/embed/${VIDEO_IDS[i]}?rel=0`,
        duration: "8 min",
        quizId: i,
        description: `Aula essencial sobre ${[
          "entender preocupações parentais",
          "melhorar comunicação familiar",
          "gerir conflitos construtivamente",
          "estabelecer limites saudáveis",
          "o impacto do exemplo parental",
          "valor do tempo em família",
          "uso consciente da tecnologia",
          "respeito mútuo na família"
        ][i]}.`
      }))
    },
    {
      id: 1,
      title: "Módulo 2: Conectando com o Adolescente",
      description: "Técnicas avançadas de escuta, empatia e validação de sentimentos complexos.",
      duration: "8 aulas × 8min",
      color: "#FF8F00",
      aulas: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: `Aula ${i + 9}: ${[
          "A Arte de Ouvir",
          "Validando Sentimentos",
          "Conversas Difíceis",
          "Elogio Efetivo",
          "O Mundo Deles",
          "Espaço e Confiança",
          "Entendendo a Rebeldia",
          "O Papel do Humor"
        ][i]}`,
        video: `https://www.youtube.com/embed/${VIDEO_IDS[(i + 2) % VIDEO_IDS.length]}?rel=0`,
        duration: "8 min",
        quizId: i + 8,
        description: `Aula focada em ${[
          "desenvolver escuta ativa",
          "validar emoções adolescentes",
          "lidar com conversas difíceis",
          "elogiar de forma efetiva",
          "entender o universo adolescente",
          "equilibrar espaço e confiança",
          "compreender comportamentos rebeldes",
          "usar humor nas relações"
        ][i]}.`
      }))
    },
    {
      id: 2,
      title: "Módulo 3: Ferramentas de Impacto",
      description: "Estratégias práticas e ferramentas validadas para mudança de comportamento imediata.",
      duration: "8 aulas × 8min",
      color: "#9b59b6",
      aulas: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: `Aula ${i + 17}: ${[
          "O Diário da Gratidão",
          "Contratos Familiares",
          "A Roda das Emoções",
          "Reuniões de Família",
          "Reforço Positivo",
          "Consequências Naturais",
          "O Poder da Escolha",
          "Rotinas Saudáveis"
        ][i]}`,
        video: `https://www.youtube.com/embed/${VIDEO_IDS[(i + 4) % VIDEO_IDS.length]}?rel=0`,
        duration: "8 min",
        quizId: i + 16,
        description: `Aula prática sobre ${[
          "cultivar gratidão familiar",
          "criar contratos familiares",
          "identificar e gerenciar emoções",
          "realizar reuniões familiares",
          "aplicar reforço positivo",
          "estabelecer consequências naturais",
          "oferecer escolhas adequadas",
          "criar rotinas saudáveis"
        ][i]}.`
      }))
    },
    {
      id: 3,
      title: "Módulo 4: Crescendo Juntos",
      description: "Visão de longo prazo, definindo valores e construindo um legado familiar duradouro.",
      duration: "8 aulas × 8min",
      color: "#00C853",
      aulas: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: `Aula ${i + 25}: ${[
          "Definindo Valores",
          "Sonhos e Metas",
          "Legado Familiar",
          "A Jornada Continua",
          "O Que Fazer Agora",
          "Celebrando Conquistas",
          "Mais Recursos",
          "Mensagem Final"
        ][i]}`,
        video: `https://www.youtube.com/embed/${VIDEO_IDS[(i + 6) % VIDEO_IDS.length]}?rel=0`,
        duration: "8 min",
        quizId: i + 24,
        description: `Aula inspiradora sobre ${[
          "definir valores familiares",
          "estabelecer sonhos e metas",
          "construir legado familiar",
          "manter a jornada familiar",
          "próximos passos práticos",
          "celebrar conquistas familiares",
          "recursos adicionais",
          "mensagem final motivacional"
        ][i]}.`
      }))
    }
  ]
};

/* ===== QUIZ DATA ===== */
const QUIZ_DATA = {
  templates: {
    basic: {
      steps: [
        {
          question: "Qual o primeiro passo para tranquilizar as preocupações parentais?",
          options: ["Buscar a causa na criança.", "Entender suas próprias emoções."],
          answer: 1,
          explanation: "A tranquilidade começa em você. Gerenciar suas emoções é crucial para criar um ambiente familiar harmonioso."
        },
        {
          question: "Qual o pilar mais importante para estabelecer limites eficazes?",
          options: ["Ameaças e gritos.", "Consistência e amor.", "Flexibilidade total."],
          answer: 1,
          explanation: "Limites funcionam quando são aplicados de forma consistente, com amor e respeito, criando segurança emocional."
        },
        {
          question: "Quais ações promovem a paz no lar?",
          options: ["Gritar quando o filho desobedece.", "Ter reuniões familiares semanais.", "Ignorar conflitos menores."],
          answer: 1,
          explanation: "Reuniões familiares semanais aumentam a comunicação e o senso de pertencimento, promovendo paz e colaboração."
        }
      ]
    },
    advanced: {
      steps: [
        {
          question: "Como validar os sentimentos do seu filho de forma efetiva?",
          options: ["Dizer 'não se preocupe'", "Repetir o que ele disse com suas palavras", "Dar conselhos imediatos"],
          answer: 1,
          explanation: "Repetir com suas palavras mostra que você está ouvindo e compreendendo, validando os sentimentos."
        },
        {
          question: "Qual a melhor abordagem para conversas difíceis?",
          options: ["Evitar o assunto", "Escolher um momento calmo e usar 'eu'", "Confrontar imediatamente"],
          answer: 1,
          explanation: "Momento calmo e linguagem com 'eu' criam segurança para diálogos construtivos."
        },
        {
          question: "Como estabelecer confiança com adolescentes?",
          options: ["Controlar todas as atividades", "Respeitar a privacidade e manter diálogo", "Exigir obediência total"],
          answer: 1,
          explanation: "Equilíbrio entre respeito à privacidade e diálogo aberto constrói confiança duradoura."
        }
      ]
    }
  }
};

const QUIZ = [
  { id: 0, title: "Questionário Essencial", ...QUIZ_DATA.templates.basic },
  ...Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    title: `Revisão da Aula ${i + 2}`,
    steps: i < 8 ? QUIZ_DATA.templates.basic.steps : QUIZ_DATA.templates.advanced.steps
  }))
];

/* ===== APP STATE MANAGEMENT ===== */
class AppState {
  constructor() {
    this.state = {
      currentScreen: 'signup',
      moduleIndex: 0,
      aulaIndex: 0,
      currentQuizStep: 0,
      quizScores: {},
      completedAulas: {},
      bookmarkedAulas: [],
      searchQuery: '',
      lastActivity: new Date().toISOString(),
      account: {
        name: '',
        email: '',
        notifications: true,
        reminders: false,
        darkMode: false,
        createdAt: new Date().toISOString()
      },
      stats: {
        totalTimeSpent: 0,
        streak: 0,
        lastLogin: new Date().toISOString()
      },
      // Dados específicos do usuário (anotações e feedback)
      userNotes: Utils.storage.get('userNotes', ''),
      feedback: Utils.storage.get('feedback', []),
      profilePhoto: Utils.storage.get('profilePhoto', 'https://via.placeholder.com/120/4A90E2/FFFFFF?text=FP')
    };

    this.loadState();
    this.setupAutoSave();
  }

  loadState() {
    try {
      const savedState = Utils.storage.get('appState');
      if (savedState) {
        this.state = { ...this.state, ...savedState };

        // VERIFICAR SE USUÁRIO JÁ EXISTE
        if (this.state.account.name && this.state.account.email) {
          this.state.currentScreen = 'home'; // FORÇAR IR PARA HOME
        }
      }
    } catch (error) {
      console.error('Erro ao carregar estado:', error);
    }
  }
  saveState() {
    try {
      this.state.lastActivity = new Date().toISOString();
      // Salva apenas o estado principal, dados grandes como notas são salvos separadamente
      const stateToSave = { ...this.state };
      delete stateToSave.userNotes;
      delete stateToSave.feedback;
      delete stateToSave.profilePhoto;

      Utils.storage.set('appState', stateToSave);
      Utils.storage.set('lastScreen', this.state.currentScreen);

    } catch (error) {
      console.error('Erro ao salvar estado:', error);
    }
  }

  setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
      this.saveState();
    }, 30000);

    // Save before page unload
    window.addEventListener('beforeunload', () => {
      this.saveState();
    });
  }

  update(updates) {
    this.state = { ...this.state, ...updates };
    this.saveState();
  }

  resetProgress() {
    this.state.completedAulas = {};
    this.state.quizScores = {};
    this.state.bookmarkedAulas = [];
    this.state.currentQuizStep = 0;
    this.saveState();
  }

  getProgress() {
    const completedCount = Object.values(this.state.completedAulas).filter(Boolean).length;
    const totalCount = COURSE.modules.reduce((acc, mod) => acc + mod.aulas.length, 0);
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return { completedCount, totalCount, percentage };
  }

  getModuleProgress(moduleId) {
    const module = COURSE.modules[moduleId];
    let completed = 0;
    module.aulas.forEach(aula => {
      if (this.state.completedAulas[`M${moduleId}-A${aula.id}`]) {
        completed++;
      }
    });
    return { completed, total: module.aulas.length };
  }

  isAulaUnlocked(moduleId, aulaId) {
    if (moduleId === 0 && aulaId === 0) return true;

    // Se não é a primeira aula do módulo
    if (aulaId > 0) {
      const previousAulaId = aulaId - 1;
      return this.state.completedAulas[`M${moduleId}-A${previousAulaId}`] === true;
    }
    // Se é a primeira aula, verifica se o módulo anterior está completo
    else if (moduleId > 0) {
      const prevModuleId = moduleId - 1;
      const prevModuleProgress = this.getModuleProgress(prevModuleId);
      return prevModuleProgress.completed === prevModuleProgress.total;
    }

    return false;
  }
}

/* ===== CORE APP FUNCTIONALITY ===== */
class UniversidadePaisApp {
  constructor() {
    this.stateManager = new AppState();
    this.currentSearchTerm = '';
    this.navHistory = [];
    this.isDebouncing = false; // Estado para debounce de botões
    this.setupEventListeners();
    this.initApp();
  }

  initApp() {
    this.applyDarkMode();
    this.loadProfilePhoto();
    this.setupServiceWorker();
    this.trackAppLaunch();

    // Configurações adicionais
    this.setupAdditionalFeatures();

    // Initialize first screen
    const lastScreen = Utils.storage.get('lastScreen', 'signup');
    this.nav(this.stateManager.state.account.name ? 'home' : lastScreen);

    this.renderFooter(); // Renderizar o rodapé após carregar o estado
  }

  setupAdditionalFeatures() {
    try {
      // Configurar lazy loading
      if (typeof this.setupLazyLoading === 'function') this.setupLazyLoading();

      // Configurar navegação por teclado  
      if (typeof this.setupKeyboardNavigation === 'function') this.setupKeyboardNavigation();

      // Verificar conectividade
      if (typeof this.checkConnectivity === 'function') this.checkConnectivity();

      // Configurar sincronização offline
      if (typeof this.syncWhenOnline === 'function') this.syncWhenOnline();

      // Calcular streak
      if (typeof this.calculateStreak === 'function') this.calculateStreak();

      // Agendar lembretes
      if (typeof this.scheduleStudyReminders === 'function') this.scheduleStudyReminders();

      // Prefetch de recursos
      if (typeof this.prefetchResources === 'function') this.prefetchResources();

    } catch (error) {
      console.error('Erro na configuração de features adicionais:', error);
    }
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-modules');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.currentSearchTerm = e.target.value.toLowerCase();
        this.performSearch();
      }, 300));
    }

    // Notes auto-save
    const notesTextarea = document.getElementById('notes-textarea');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', Utils.debounce((e) => {
        this.stateManager.update({ userNotes: e.target.value });
      }, 500));
    }

    // Global click handler for menu
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('menu-dropdown');
      const menuButton = document.getElementById('menu-button');

      if (menu && menuButton && !menu.contains(e.target) && !menuButton.contains(e.target)) {
        this.toggleMenu(false);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.nav('home');
            break;
          case '2':
            e.preventDefault();
            this.nav('profile');
            break;
          case '/':
            e.preventDefault();
            document.getElementById('search-modules')?.focus();
            break;
        }
      }

      // Escape key closes menu
      if (e.key === 'Escape') {
        this.toggleMenu(false);
      }

      // Back navigation with backspace (when not in input)
      if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.navBack();
      }
    });

    // Online/offline detection
    window.addEventListener('online', () => {
      this.toast('Conexão restaurada!', 'success');
      this.syncWhenOnline();
    });

    window.addEventListener('offline', () => {
      this.toast('Você está offline', 'warning');
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator && APP_CONFIG.FEATURES.OFFLINE_SUPPORT) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }

  trackAppLaunch() {
    if (APP_CONFIG.FEATURES.ANALYTICS) {
      const launches = Utils.storage.get('appLaunches', 0) + 1;
      Utils.storage.set('appLaunches', launches);

      console.log(`🎯 App launched ${launches} times`);
    }
  }

  /* ===== NAVIGATION ===== */
  nav(screen, modIdx = null, aulaIdx = null) {
    this.toggleMenu(false);
    this.hideAllScreens();

    // Update state
    const updates = { currentScreen: screen };
    if (modIdx !== null) updates.moduleIndex = modIdx;
    if (aulaIdx !== null) updates.aulaIndex = aulaIdx;

    this.stateManager.update(updates);

    // Show target screen
    const targetScreen = document.getElementById(`screen-${screen}`);
    if (targetScreen) {
      targetScreen.style.display = 'block';
      targetScreen.classList.add('active');

      // Focus management for accessibility
      setTimeout(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
        }
      }, 100);
    }

    // Update navigation
    this.updateNavigation(screen);

    // Render screen-specific content
    this.renderScreen(screen, modIdx, aulaIdx);

    // Anunciar mudança de tela para acessibilidade
    this.announceScreenChange(screen);
  }

  navWithHistory(screen, modIdx = null, aulaIdx = null) {
    // Salvar estado atual no histórico
    this.navHistory.push({
      screen: this.stateManager.state.currentScreen,
      moduleIndex: this.stateManager.state.moduleIndex,
      aulaIndex: this.stateManager.state.aulaIndex
    });

    // Limitar histórico a 10 entradas
    if (this.navHistory.length > 10) {
      this.navHistory.shift();
    }

    this.nav(screen, modIdx, aulaIdx);
  }

  navBack() {
    if (this.navHistory.length > 0) {
      const previousState = this.navHistory.pop();
      this.nav(previousState.screen, previousState.moduleIndex, previousState.aulaIndex);
    } else {
      this.nav('home');
    }
  }

  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.style.display = 'none';
      screen.classList.remove('active');
    });
  }

  updateNavigation(screen) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    const navItem = document.getElementById(`nav-${screen}`);
    if (navItem) {
      navItem.classList.add('active');
    } else if (['aulas', 'aula', 'complete'].includes(screen)) {
      document.getElementById('nav-home')?.classList.add('active');
    }
  }

  renderScreen(screen, modIdx, aulaIdx) {
    switch (screen) {
      case 'signup':
        this.renderSignup();
        break;
      case 'home':
        this.renderHome();
        break;
      case 'about':
        break;
      case 'faq':
        this.renderFAQ();
        break;
      case 'notes':
        this.renderNotes();
        break;
      case 'favorites':
        this.renderFavorites();
        break;
      case 'share':
        break;
      case 'benefits':
        this.renderBenefits();
        break;
      case 'sentiments':
        this.renderSentiments();
        break;
      case 'aulas':
        if (modIdx !== null) this.stateManager.update({ moduleIndex: modIdx });
        this.renderAulas(this.stateManager.state.moduleIndex);
        break;
      case 'aula':
        if (modIdx !== null && aulaIdx !== null) {
          this.stateManager.update({
            moduleIndex: modIdx,
            aulaIndex: aulaIdx,
            currentQuizStep: 0
          });
        }
        this.renderAula(this.stateManager.state.moduleIndex, this.stateManager.state.aulaIndex);
        break;
      case 'complete':
        this.renderCompleteScreen();
        break;
      case 'profile':
        this.renderProfile();
        break;
    }
  }

  /* ===== RENDER FUNCTIONS ===== */

  renderSignup() {
    // Esconde o footer para a tela de signup
    document.querySelector('footer').style.display = 'none';
    document.querySelector('header').style.display = 'none';
  }

  renderHome() {
    document.querySelector('footer').style.display = 'flex';
    document.querySelector('header').style.display = 'flex';
    this.renderModules();
    this.updateHomeStats();
  }

  performSearch() {
    if (this.stateManager.state.currentScreen === 'home' || this.stateManager.state.currentScreen === 'aulas') {
      this.renderModules();
    }
    // Adicionar lógica de busca em outras telas se necessário
  }

  renderModules() {
    const modulesContainer = document.getElementById('modules');
    if (!modulesContainer) return;

    modulesContainer.innerHTML = ''; // Limpar antes de renderizar
    const totalProgress = this.stateManager.getProgress();
    const searchTerm = this.currentSearchTerm;

    COURSE.modules.forEach(mod => {
      const progress = this.stateManager.getModuleProgress(mod.id);
      const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
      const isLocked = mod.id > 0 && this.stateManager.getModuleProgress(mod.id - 1).completed < this.stateManager.getModuleProgress(mod.id - 1).total;

      // Filter by search
      const moduleText = `${mod.title} ${mod.description}`.toLowerCase();
      // Verifica se a busca se aplica ao título do módulo OU se a busca se aplica a alguma aula
      const matchesModule = !searchTerm || moduleText.includes(searchTerm);
      const matchesAula = mod.aulas.some(aula => `${aula.title} ${aula.description}`.toLowerCase().includes(searchTerm));

      if (searchTerm && !(matchesModule || matchesAula)) {
        return;
      }

      const navFunc = isLocked ?
        `app.toast('Conclua o módulo anterior para desbloquear.', 'warning')` :
        `app.navWithHistory('aulas', ${mod.id})`;

      const statusIcon = isLocked ? '🔒' : (progressPercent === 100 ? '✅' : '▶️');
      const statusText = isLocked ? 'Bloqueado' : (progressPercent === 100 ? 'Concluído' : 'Continuar');

      modulesContainer.innerHTML += `
                <div class="module ${isLocked ? 'locked' : ''}" onclick="${navFunc}" role="button" aria-label="${mod.title}. ${statusText}">
                    <img class="module-img" src="https://picsum.photos/seed/familia_m${mod.id}/60/60" 
                         alt="Ilustração do módulo ${mod.id}" loading="lazy">
                    <div class="module-info">
                        <h3>${mod.title}</h3>
                        <p class="muted">${mod.description}</p>
                        <div class="module-progress">
                            <progress value="${progress.completed}" max="${progress.total}" aria-label="Progresso do módulo: ${progressPercent}%"></progress>
                            <span class="progress-text">${progress.completed}/${progress.total} aulas (${progressPercent}%)</span>
                        </div>
                    </div>
                    <div class="module-status" title="${statusText}">
                        ${statusIcon}
                    </div>
                </div>
            `;
    });

    // Update total progress
    const totalProgressElement = document.getElementById('total-progress');
    if (totalProgressElement) {
      totalProgressElement.textContent =
        `${totalProgress.completedCount}/${totalProgress.totalCount} Aulas (${totalProgress.percentage}%)`;
    }

    // Quick Stats Card Update
    const quickStats = document.getElementById('quick-stats-content');
    if (quickStats) {
      quickStats.innerHTML = `
        <div class="stat-item">
            <div class="stat-number" id="stats-completed">${totalProgress.completedCount}</div>
            <div class="stat-label">Aulas Concluídas</div>
        </div>
        <div class="stat-item">
            <div class="stat-number" id="stats-percentage">${totalProgress.percentage}%</div>
            <div class="stat-label">Progresso Total</div>
        </div>
        <div class="stat-item">
            <div class="stat-number" id="stats-favorites">${this.stateManager.state.bookmarkedAulas.length}</div>
            <div class="stat-label">Aulas Favoritas</div>
        </div>
      `;
    }

    // Show empty state if no results
    if (searchTerm && modulesContainer.children.length === 0) {
      modulesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <h3>Nenhum módulo ou aula encontrado</h3>
                    <p class="muted">Tente buscar com outros termos</p>
                </div>
            `;
    }
  }

  updateHomeStats() {
    const progress = this.stateManager.getProgress();
    // Esta função foi integrada em renderModules, mas mantida para garantir a consistência
    // As atualizações de estatísticas são feitas diretamente no renderModules para garantir que os elementos existam
  }

  renderAulas(moduleId) {
    const moduleData = COURSE.modules[moduleId];
    const aulasList = document.getElementById('aulas-list');
    const aulasScreenTitle = document.getElementById('aulas-screen-title');
    const progress = this.stateManager.getModuleProgress(moduleId);

    if (!aulasList || !aulasScreenTitle) return;

    aulasScreenTitle.innerHTML = `
        <button class="icon" onclick="app.navBack()" aria-label="Voltar para a página inicial">
            <i class="fas fa-arrow-left"></i>
        </button>
        <div>
            <h2>${moduleData.title}</h2>
            <div class="muted">${progress.completed} / ${progress.total} aulas concluídas</div>
        </div>
    `;

    aulasList.innerHTML = '';

    moduleData.aulas.forEach(aula => {
      const aulaKey = `M${moduleId}-A${aula.id}`;
      const isCompleted = this.stateManager.state.completedAulas[aulaKey] === true;
      const isUnlocked = this.stateManager.isAulaUnlocked(moduleId, aula.id);
      const isBookmarked = this.stateManager.state.bookmarkedAulas.includes(aulaKey);

      const aulaClass = isCompleted ? 'completed' : (isUnlocked ? '' : 'locked');
      let iconOverlay = isCompleted ? '✅' : (isUnlocked ? '▶️' : '🔒');
      if (isBookmarked) iconOverlay = '❤️';

      const navFunc = isUnlocked ?
        `app.navWithHistory('aula', ${moduleId}, ${aula.id})` :
        `app.toast('Conclua a aula anterior para desbloquear.', 'warning')`;

      aulasList.innerHTML += `
                <div class="aula ${aulaClass}" onclick="${navFunc}" role="button" aria-label="${aula.title}. ${isCompleted ? 'Concluída.' : isUnlocked ? 'Desbloqueada.' : 'Bloqueada.'}">
                    <div class="aula-img-wrap">
                        <img class="aula-img" src="https://picsum.photos/seed/aula${moduleId}-${aula.id}/50/50" 
                             alt="Ilustração da aula" loading="lazy">
                        <div class="aula-icon-overlay">${iconOverlay}</div>
                    </div>
                    <div class="aula-info">
                        <h3>${aula.title}</h3>
                        <p class="muted">${aula.duration} • ${aula.description}</p>
                    </div>
                    <div class="aula-status">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                </div>
            `;
    });
  }

  renderAula(moduleId, aulaId) {
    document.querySelector('footer').style.display = 'none'; // Esconde o footer na tela de aula

    const moduleData = COURSE.modules[moduleId];
    const aula = moduleData.aulas[aulaId];
    if (!aula) return;

    const aulaKey = `M${moduleId}-A${aulaId}`;
    const isBookmarked = this.stateManager.state.bookmarkedAulas.includes(aulaKey);
    const quizData = QUIZ.find(q => q.id === aula.quizId);
    const currentStep = this.stateManager.state.currentQuizStep;

    // Update video and title
    document.getElementById('aula-video').src = aula.video;
    document.getElementById('aula-title').textContent = aula.title;
    document.getElementById('aula-back-btn').onclick = () => this.navBack();
    document.getElementById('aula-module-title').textContent = moduleData.title;

    // Update bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.innerHTML = isBookmarked ?
        '<i class="fas fa-bookmark"></i> Aula Marcada' :
        '<i class="far fa-bookmark"></i> Marcar Aula';
      bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
      bookmarkBtn.onclick = () => this.toggleBookmark(moduleId, aulaId);
    }

    // Render content based on quiz state
    this.renderAulaContent(moduleId, aulaId, currentStep, quizData);
  }

  renderAulaContent(moduleId, aulaId, currentStep, quizData) {
    const aulaContent = document.getElementById('aula-content');
    const markCompleteBtn = document.getElementById('mark-complete-btn');

    if (currentStep === 0) {
      // Show aula introduction
      const aula = COURSE.modules[moduleId].aulas[aulaId];
      aulaContent.innerHTML = `
                <div class="card">
                    <h3>📚 Conteúdo da Aula</h3>
                    <p class="muted">${aula.description}</p>
                    <div class="usage-tip" style="margin: 15px 0;">
                        <h4><i class="fas fa-lightbulb"></i> Pontos-chave da Aula</h4>
                        <ul style="margin-bottom: 0;">
                            <li>Técnicas práticas aplicáveis imediatamente</li>
                            <li>Exercícios para fortalecer laços familiares</li>
                            <li>Ferramentas de comunicação eficaz</li>
                        </ul>
                    </div>
                    <button class="btn" onclick="app.debounceButtonClick(this, () => app.startQuiz(${moduleId}, ${aulaId}))">
                        <i class="fas fa-play-circle"></i> Iniciar Questionário
                    </button>
                </div>
            `;
      if (markCompleteBtn) markCompleteBtn.style.display = 'none';

    } else if (currentStep > 0 && currentStep <= quizData.steps.length) {
      // Show quiz step
      this.renderQuizStep(moduleId, aulaId);
      if (markCompleteBtn) markCompleteBtn.style.display = 'none';

    } else if (currentStep > quizData.steps.length) {
      // Show quiz results
      this.renderQuizResults(moduleId, aulaId);
      if (markCompleteBtn) {
        markCompleteBtn.style.display = 'block';
        markCompleteBtn.innerHTML = '<i class="fas fa-check"></i> Marcar como Concluída';
        markCompleteBtn.onclick = () => this.debounceButtonClick(markCompleteBtn, () => this.markAulaComplete(moduleId, aulaId));
      }
    }
  }

  renderQuizStep(moduleId, aulaId) {
    const aula = COURSE.modules[moduleId].aulas[aulaId];
    const quizData = QUIZ.find(q => q.id === aula.quizId);
    const stepIndex = this.stateManager.state.currentQuizStep - 1;
    const currentStep = quizData.steps[stepIndex];
    const aulaContent = document.getElementById('aula-content');

    const optionsHtml = currentStep.options.map((option, index) => `
            <div class="option-card" onclick="app.submitAnswer(${moduleId}, ${aulaId}, ${index})">
                <span class="option-text">${option}</span>
                <span class="option-icon"></span>
            </div>
        `).join('');

    aulaContent.innerHTML = `
            <div class="card quiz-step">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="margin: 0;">${quizData.title}</h3>
                    <span class="badge" style="background: var(--primary); color: white; padding: 4px 10px; border-radius: 16px; font-weight: 600;">
                        ${this.stateManager.state.currentQuizStep}/${quizData.steps.length}
                    </span>
                </div>
                <p style="font-weight: 700; font-size: 1.1em; margin-bottom: 20px;">${currentStep.question}</p>
                <div class="options-grid" id="options-grid">
                    ${optionsHtml}
                </div>
                <div class="quiz-explanation" id="quiz-explanation" style="display: none; margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--bg-soft);">
                    <div style="background: rgba(74, 144, 226, 0.1); padding: 15px; border-radius: var(--radius); border: 1px solid rgba(74, 144, 226, 0.2);">
                        <p style="margin: 0; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-lightbulb"></i> Explicação:
                        </p>
                        <p style="margin: 8px 0 0 0; line-height: 1.4;">${currentStep.explanation}</p>
                    </div>
                    <button id="quiz-action-btn" class="btn" onclick="app.debounceButtonClick(this, () => app.nextQuizStep(${moduleId}, ${aulaId}))" style="margin-top: 15px; width: 100%;">
                        ${this.stateManager.state.currentQuizStep < quizData.steps.length ? 'Próxima Pergunta →' : 'Ver Resultados →'}
                    </button>
                </div>
            </div>
        `;
  }

  submitAnswer(moduleId, aulaId, selectedIndex) {
    try {
      const optionsGrid = document.getElementById('options-grid');
      const options = optionsGrid.querySelectorAll('.option-card');
      const quizData = QUIZ.find(q => q.id === COURSE.modules[moduleId].aulas[aulaId].quizId);
      const stepIndex = this.stateManager.state.currentQuizStep - 1;
      const currentStep = quizData.steps[stepIndex];
      const correctIndex = currentStep.answer;
      const aulaKey = `M${moduleId}-A${aulaId}`;

      // Prevent multiple submissions
      if (optionsGrid.classList.contains('answered')) return;
      optionsGrid.classList.add('answered');

      // Disable all options
      options.forEach(opt => {
        opt.style.pointerEvents = 'none';
      });

      // Show correct/incorrect states
      options.forEach((opt, index) => {
        opt.classList.remove('wrong', 'correct'); // Reset just in case
        opt.style.cursor = 'default';
        if (index === correctIndex) {
          opt.classList.add('correct');
          opt.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
          opt.setAttribute('aria-label', `${opt.textContent} (Resposta Correta)`);
        } else if (index === selectedIndex) {
          opt.classList.add('wrong');
          opt.querySelector('.option-icon').innerHTML = '<i class="fas fa-times"></i>';
          opt.setAttribute('aria-label', `${opt.textContent} (Sua Resposta, Incorreta)`);
        } else {
          opt.querySelector('.option-icon').innerHTML = '';
          opt.setAttribute('aria-label', `${opt.textContent}`);
        }
      });

      // Update score and provide feedback
      if (selectedIndex === correctIndex) {
        this.stateManager.state.quizScores[aulaKey] = (this.stateManager.state.quizScores[aulaKey] || 0) + 1;
        this.toast('🎉 Resposta Correta!', 'success');
      } else {
        this.toast('📝 Resposta Incorreta. Leia a explicação abaixo!', 'error');
      }
      this.stateManager.saveState();

      // Show explanation
      document.getElementById('quiz-explanation').style.display = 'block';

    } catch (error) {
      console.error('Erro ao processar resposta:', error);
      this.toast('Erro ao processar resposta. Tente novamente.', 'error');
    }
  }

  nextQuizStep(moduleId, aulaId) {
    this.stateManager.state.currentQuizStep++;
    this.stateManager.saveState();
    this.renderAula(moduleId, aulaId);
  }

  renderQuizResults(moduleId, aulaId) {
    const aulaContent = document.getElementById('aula-content');
    const aulaKey = `M${moduleId}-A${aulaId}`;
    const quizData = QUIZ.find(q => q.id === COURSE.modules[moduleId].aulas[aulaId].quizId);
    const score = this.stateManager.state.quizScores[aulaKey] || 0;
    const totalQuestions = quizData.steps.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isCompleted = this.stateManager.state.completedAulas[aulaKey] === true;

    let resultMessage, resultColor, resultEmoji;
    if (percentage === 100) {
      resultMessage = "Perfeito! 🎉 Você dominou completamente o conteúdo desta aula!";
      resultColor = "var(--success)";
      resultEmoji = "🏆";
    } else if (percentage >= 70) {
      resultMessage = "Ótimo trabalho! 👍 Você compreendeu a maior parte do conteúdo.";
      resultColor = "var(--primary)";
      resultEmoji = "⭐";
    } else {
      resultMessage = "Bom esforço! 💪 Recomendamos revisar a aula para consolidar o aprendizado.";
      resultColor = "var(--warning)";
      resultEmoji = "📚";
    }

    aulaContent.innerHTML = `
            <div class="card">
                <h3>${resultEmoji} Resultado do Questionário</h3>
                <p class="muted">${resultMessage}</p>
                <div style="text-align: center; margin: 25px 0;">
                    <svg class="progress-circle-svg" width="120" height="120">
                        <circle cx="60" cy="60" r="50" fill="transparent" stroke="var(--bg-soft)" stroke-width="8"/>
                        <circle class="progress-ring" cx="60" cy="60" r="50" fill="transparent" stroke="${resultColor}" stroke-width="8" stroke-dasharray="314" stroke-dashoffset="${314 - (314 * percentage / 100)}" transform="rotate(-90 60 60)"/>
                        <text x="60" y="65" text-anchor="middle" dominant-baseline="middle" style="font-weight: 800; font-size: 1.4em; fill: var(--text);">${percentage}%</text>
                    </svg>
                    <div class="muted" style="margin-top: 12px;">
                        Acertos: <strong>${score}</strong> de <strong>${totalQuestions}</strong> questões
                    </div>
                </div>
                
                ${isCompleted ? '<div class="badge-success" style="margin-bottom: 20px;">Aula já marcada como concluída.</div>' : ''}

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn ghost" onclick="app.debounceButtonClick(this, () => { app.stateManager.state.currentQuizStep = 0; app.stateManager.state.quizScores[app.stateManager.aulaKey] = 0; app.stateManager.saveState(); app.renderAula(${moduleId}, ${aulaId}); })">
                        <i class="fas fa-redo"></i> Refazer Questionário
                    </button>
                    <button class="btn" ${isCompleted ? 'disabled' : ''} onclick="app.debounceButtonClick(this, () => app.markAulaComplete(${moduleId}, ${aulaId}))">
                        <i class="fas fa-check-circle"></i> ${isCompleted ? 'Concluída' : 'Concluir Aula'}
                    </button>
                </div>
            </div>
            ${this.renderFeedbackForm(aulaKey)}
        `;
  }

  startQuiz(moduleId, aulaId) {
    this.stateManager.state.currentQuizStep = 1;
    const aulaKey = `M${moduleId}-A${aulaId}`;
    this.stateManager.state.quizScores[aulaKey] = 0; // Reset score for new attempt
    this.stateManager.saveState();
    this.renderAula(moduleId, aulaId);
  }

  markAulaComplete(moduleId, aulaId) {
    const aulaKey = `M${moduleId}-A${aulaId}`;
    if (this.stateManager.state.completedAulas[aulaKey]) {
      this.toast('Esta aula já está marcada como concluída.', 'info');
      return;
    }

    try {
      this.stateManager.state.completedAulas[aulaKey] = true;
      this.stateManager.state.currentQuizStep = 0;
      this.stateManager.saveState();

      // Track completion
      this.trackAulaCompletion(moduleId, aulaId);

      // Mostrar confetti para marcos importantes
      this.showConfetti();

      // Verificar se o módulo está completo
      const moduleProgress = this.stateManager.getModuleProgress(moduleId);
      if (moduleProgress.completed === moduleProgress.total) {
        this.toast(`🎉 Módulo ${moduleId + 1} Concluído!`, 'success', 5000);
      }

      this.navWithHistory('complete');
    } catch (error) {
      console.error('Erro ao marcar aula como concluída:', error);
      this.toast('Erro ao concluir aula. Tente novamente.', 'error');
    }
  }

  trackAulaCompletion(moduleId, aulaId) {
    try {
      const completions = Utils.storage.get('aulaCompletions', []);
      completions.push({
        moduleId,
        aulaId,
        timestamp: new Date().toISOString(),
        score: this.stateManager.state.quizScores[`M${moduleId}-A${aulaId}`] || 0
      });
      Utils.storage.set('aulaCompletions', completions);
      this.calculateStreak(); // Recalcula o streak ao completar uma aula
    } catch (error) {
      console.error('Erro ao rastrear conclusão:', error);
    }
  }

  renderCompleteScreen() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const progress = this.stateManager.getProgress();
    const color = progress.percentage < 50 ? 'var(--warning)' : progress.percentage < 90 ? 'var(--primary)' : 'var(--success)';
    const progressSvg = document.getElementById('progress-svg-ring');
    const progressText = document.getElementById('progress-num');
    const totalCircumference = 314; // 2 * Pi * 50 (r=50)

    if (progressSvg) {
      progressSvg.style.stroke = color;
      progressSvg.style.strokeDashoffset = totalCircumference - (totalCircumference * progress.percentage / 100);
    }
    if (progressText) {
      progressText.textContent = `${progress.percentage}%`;
      progressText.style.color = color;
    }

    let message = 'Seu progresso total no curso';
    if (progress.percentage === 100) {
      message = '🎉 Parabéns! Curso Concluído com Sucesso!';
    } else if (progress.percentage >= 75) {
      message = 'Ótimo progresso! Continue assim!';
    }
    document.getElementById('progress-sub').textContent = message;

    // Atualiza a sugestão de próxima ação
    const nextActionDiv = document.getElementById('complete-next-action');
    const nextAula = this.findNextUncompletedAula();
    if (nextAula) {
      nextActionDiv.innerHTML = `
        <h4 style="margin-top: 0;">Próximo Passo:</h4>
        <div class="next-aula-card" onclick="app.navWithHistory('aula', ${nextAula.moduleId}, ${nextAula.aulaId})" role="button" tabindex="0">
            <div class="next-info">
                <div class="muted">Módulo ${nextAula.moduleId + 1}</div>
                <h3 style="margin: 4px 0 0;">${nextAula.title}</h3>
            </div>
            <i class="fas fa-arrow-right"></i>
        </div>
      `;
    } else {
      nextActionDiv.innerHTML = `
        <h4 style="margin-top: 0;">Fim do Curso!</h4>
        <p class="muted">Você concluiu todas as aulas. Considere refazer alguns módulos ou revisar suas anotações.</p>
        <button class="btn" onclick="app.nav('notes')" style="width: 100%;"><i class="fas fa-sticky-note"></i> Ver Minhas Anotações</button>
      `;
    }
  }

  findNextUncompletedAula() {
    for (let m = 0; m < COURSE.modules.length; m++) {
      const module = COURSE.modules[m];
      for (let a = 0; a < module.aulas.length; a++) {
        const aulaKey = `M${m}-A${a}`;
        if (!this.stateManager.state.completedAulas[aulaKey]) {
          return {
            moduleId: m,
            aulaId: a,
            title: module.aulas[a].title
          };
        }
      }
    }
    return null; // Todas as aulas completas
  }

  /* ===== PROFILE MANAGEMENT ===== */
  renderProfile() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const { account } = this.stateManager.state;
    const progress = this.stateManager.getProgress();

    // Populate form fields
    document.getElementById('profile-name').value = account.name;
    document.getElementById('profile-email').value = account.email;
    document.getElementById('dark-mode-toggle').checked = account.darkMode;
    document.getElementById('notifications-toggle').checked = account.notifications;
    document.getElementById('reminders-toggle').checked = account.reminders;

    // Update stats
    document.getElementById('stats-completed-profile').textContent = progress.completedCount;
    document.getElementById('stats-percentage-profile').textContent = progress.percentage + '%';
    document.getElementById('stats-favorites-profile').textContent = this.stateManager.state.bookmarkedAulas.length;
    document.getElementById('stats-streak').textContent = this.stateManager.state.stats.streak;
    // Assume 8 minutes per aula for total time estimation
    const totalMinutes = progress.completedCount * 8;
    const totalHours = (totalMinutes / 60).toFixed(1).replace('.', ',');
    document.getElementById('stats-time').textContent = `${totalHours} horas`;

    // Photo
    this.loadProfilePhoto();

    // Event Listeners for toggles
    document.getElementById('dark-mode-toggle').onchange = (e) => this.toggleDarkMode(e.target.checked);
    document.getElementById('notifications-toggle').onchange = (e) => this.updateSetting('notifications', e.target.checked);
    document.getElementById('reminders-toggle').onchange = (e) => this.updateSetting('reminders', e.target.checked);
  }

  saveInitialAccount() {
    const submitButton = document.getElementById('signup-submit');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');

    submitButton.disabled = true;
    submitButton.querySelector('.btn-text').style.display = 'none';
    submitButton.querySelector('.btn-spinner').style.display = 'inline-block';

    try {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (!Utils.validate.name(name)) {
        this.toast('Por favor, insira seu nome completo.', 'error');
        return;
      }
      if (!Utils.validate.email(email)) {
        this.toast('Por favor, insira um email válido.', 'error');
        return;
      }

      this.stateManager.update({
        account: {
          ...this.stateManager.state.account,
          name: Utils.sanitize(name),
          email: Utils.sanitize(email),
          createdAt: new Date().toISOString()
        }
      });

      this.toast(`Bem-vindo(a), ${name}!`, 'success');
      this.nav('home');

    } catch (error) {
      console.error('Erro ao criar conta:', error);
      this.toast('Erro ao salvar conta. Tente novamente.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector('.btn-text').style.display = 'inline';
      submitButton.querySelector('.btn-spinner').style.display = 'none';
    }
  }

  saveAccountSettings() {
    try {
      const name = document.getElementById('profile-name').value.trim();
      const email = document.getElementById('profile-email').value.trim();

      if (!Utils.validate.name(name)) {
        this.toast('Por favor, insira um nome válido (mínimo 2 caracteres).', 'error');
        return;
      }
      if (!Utils.validate.email(email)) {
        this.toast('Por favor, insira um email válido.', 'error');
        return;
      }

      this.stateManager.update({
        account: {
          ...this.stateManager.state.account,
          name: Utils.sanitize(name),
          email: Utils.sanitize(email)
        }
      });
      this.toast('✅ Configurações salvas com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      this.toast('Erro ao salvar configurações. Tente novamente.', 'error');
    }
  }

  updateSetting(key, value) {
    this.stateManager.update({
      account: {
        ...this.stateManager.state.account,
        [key]: value
      }
    });
    this.toast(`Preferência '${key}' atualizada!`, 'info');
  }

  updateProfilePhoto(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        this.toast('Por favor, selecione uma imagem válida.', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.toast('A imagem deve ter menos de 5MB.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target.result;
        Utils.storage.set('profilePhoto', photoUrl);
        this.stateManager.state.profilePhoto = photoUrl; // Atualiza estado
        const photoElement = document.getElementById('profile-photo');
        if (photoElement) photoElement.src = photoUrl;
        this.toast('📸 Foto atualizada com sucesso!', 'success');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      this.toast('Erro ao atualizar foto. Tente novamente.', 'error');
    }
  }

  removeProfilePhoto() {
    try {
      const defaultPhoto = 'https://via.placeholder.com/120/4A90E2/FFFFFF?text=FP';
      const photoElement = document.getElementById('profile-photo');
      photoElement.src = defaultPhoto;
      Utils.storage.set('profilePhoto', defaultPhoto); // Salva o placeholder
      this.stateManager.state.profilePhoto = defaultPhoto; // Atualiza estado
      this.toast('🗑️ Foto removida', 'info');
    } catch (error) {
      console.error('Erro ao remover foto:', error);
      this.toast('Erro ao remover foto. Tente novamente.', 'error');
    }
  }

  loadProfilePhoto() {
    try {
      const savedPhoto = this.stateManager.state.profilePhoto; // Pega do estado
      const photoElement = document.getElementById('profile-photo');

      if (photoElement) {
        photoElement.src = savedPhoto;
      }
    } catch (error) {
      console.error('Erro ao carregar foto:', error);
    }
  }

  clearAllData() {
    if (confirm("ATENÇÃO: Você tem certeza que deseja APAGAR TODOS OS SEUS DADOS, incluindo progresso e anotações? Esta ação não pode ser desfeita.")) {
      try {
        localStorage.clear();
        this.toast('💣 Todos os dados apagados!', 'danger', 5000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Erro ao limpar dados:', error);
        this.toast('Erro ao limpar dados. Tente manualmente nas configurações do navegador.', 'error');
      }
    }
  }

  exportUserData() {
    try {
      const dataToExport = {
        appState: this.stateManager.state,
        userNotes: this.stateManager.state.userNotes,
        feedback: this.stateManager.state.feedback,
        profilePhoto: this.stateManager.state.profilePhoto
      };
      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `universidadedepais_backup_${Utils.formatDate(new Date()).replace(/\//g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.toast('📥 Dados exportados com sucesso!', 'success');

    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      this.toast('Erro ao exportar dados. Tente novamente.', 'error');
    }
  }

  /* ===== FAVORITES AND NOTES ===== */

  toggleBookmark(moduleId, aulaId) {
    const aulaKey = `M${moduleId}-A${aulaId}`;
    const bookmarks = this.stateManager.state.bookmarkedAulas;
    const isBookmarked = bookmarks.includes(aulaKey);

    if (isBookmarked) {
      this.stateManager.update({
        bookmarkedAulas: bookmarks.filter(key => key !== aulaKey)
      });
      this.toast('💔 Aula removida dos favoritos', 'info');
    } else {
      this.stateManager.update({
        bookmarkedAulas: [...bookmarks, aulaKey]
      });
      this.toast('❤️ Aula adicionada aos favoritos!', 'success');
    }

    // Re-render to update the button icon
    this.renderAula(moduleId, aulaId);
  }

  renderFavorites() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const favoritesContainer = document.getElementById('favorites-list');
    if (!favoritesContainer) return;

    const bookmarks = this.stateManager.state.bookmarkedAulas;

    if (bookmarks.length === 0) {
      favoritesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">❤️</div>
                    <h3>Nenhuma aula favorita</h3>
                    <p class="muted">Marque aulas importantes com o ícone de coração para encontrá-las aqui rapidamente.</p>
                </div>
            `;
      return;
    }

    favoritesContainer.innerHTML = '';
    bookmarks.forEach(aulaKey => {
      const [m, a] = aulaKey.match(/M(\d+)-A(\d+)/).slice(1).map(Number);
      const module = COURSE.modules[m];
      const aula = module.aulas[a];

      if (module && aula) {
        favoritesContainer.innerHTML += `
                    <div class="aula" onclick="app.navWithHistory('aula', ${m}, ${a})" role="button" aria-label="Aula favorita: ${aula.title}">
                        <div class="aula-img-wrap" style="background: ${module.color}">
                             <div class="aula-icon-overlay">⭐</div>
                        </div>
                        <div class="aula-info">
                            <div class="muted">Módulo ${m + 1}</div>
                            <h3>${aula.title}</h3>
                            <p class="muted">${aula.duration} • ${aula.description}</p>
                        </div>
                        <div class="aula-status">
                            <i class="fas fa-heart" style="color: var(--danger);"></i>
                        </div>
                    </div>
                `;
      }
    });
  }

  renderNotes() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const notesTextarea = document.getElementById('notes-textarea');
    if (notesTextarea) {
      notesTextarea.value = this.stateManager.state.userNotes;
    }
  }

  /* ===== ACCESSIBILITY AND UI ===== */

  toggleMenu(force) {
    const menu = document.getElementById('menu-dropdown');
    const menuButton = document.getElementById('menu-button');

    if (!menu || !menuButton) return;

    const isExpanded = menu.getAttribute('aria-hidden') === 'false';
    const shouldExpand = force !== undefined ? force : !isExpanded;

    menu.setAttribute('aria-hidden', !shouldExpand);
    menuButton.setAttribute('aria-expanded', shouldExpand);
    menu.style.display = shouldExpand ? 'block' : 'none';
  }

  toggleDarkMode(enable) {
    this.stateManager.update({
      account: {
        ...this.stateManager.state.account,
        darkMode: enable
      }
    });
    this.applyDarkMode();
    this.toast(enable ? '🌙 Modo Escuro Ativado' : '☀️ Modo Claro Ativado', 'info');
  }

  applyDarkMode() {
    const body = document.body;
    const isDarkMode = this.stateManager.state.account.darkMode;

    body.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.style.setProperty('--bg', isDarkMode ? 'var(--dark-bg)' : '#f6f8fb');
    document.documentElement.style.setProperty('--card', isDarkMode ? 'var(--dark-card)' : '#ffffff');
    document.documentElement.style.setProperty('--text', isDarkMode ? 'var(--dark-text)' : '#2c3e50');
    document.documentElement.style.setProperty('--muted', isDarkMode ? 'var(--dark-muted)' : '#7f8c8d');
    document.documentElement.style.setProperty('--bg-soft', isDarkMode ? '#242424' : '#f0f2f5'); // Usado em explicações
  }

  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');

    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
      toast.classList.add('hide');
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
  }

  announceScreenChange(screen) {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'assertive');
    announcer.classList.add('sr-only');
    announcer.textContent = `Página carregada: ${screen}`;
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
  }

  /* ===== COMPLEX FEATURES AND UI RENDERING ===== */

  // Feedback Form for Aula
  renderFeedbackForm(aulaKey) {
    const existingFeedback = this.stateManager.state.feedback.find(f => f.aulaKey === aulaKey);
    const feedbackSubmitted = existingFeedback ? 'block' : 'none';
    const feedbackFormStyle = existingFeedback ? 'none' : 'block';

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const checked = existingFeedback && existingFeedback.rating >= i ? 'checked' : '';
      starsHtml += `
            <input type="radio" id="star${i}-${aulaKey}" name="rating-${aulaKey}" value="${i}" ${checked} class="sr-only" ${existingFeedback ? 'disabled' : ''}>
            <label for="star${i}-${aulaKey}" onclick="if(!${existingFeedback}){app.setRating('${aulaKey}', ${i})}" aria-label="${i} estrelas" style="cursor: ${existingFeedback ? 'default' : 'pointer'};">
                <i class="fas fa-star"></i>
            </label>
        `;
    }

    const submittedHtml = existingFeedback ? `
        <div class="feedback-submitted-message" style="background: rgba(0, 200, 83, 0.1); padding: 15px; border-radius: var(--radius); text-align: center;">
            <p style="font-weight: 600; margin: 0; color: var(--success); display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i class="fas fa-check-circle"></i> Seu feedback foi enviado!
            </p>
            <p class="muted" style="margin: 8px 0 0;">Obrigado por avaliar esta aula.</p>
        </div>
    ` : '';

    return `
        <div id="feedback-section" class="card" style="margin-top: 20px;">
            <h3 style="margin-top: 0;">Avalie esta Aula</h3>
            
            <div id="feedback-submitted-${aulaKey}" style="display: ${feedbackSubmitted};">
                ${submittedHtml}
            </div>

            <div id="feedback-form-${aulaKey}" style="display: ${feedbackFormStyle};">
                <p>O quanto você gostou ou aprendeu com esta aula?</p>
                <div class="rating-stars" data-key="${aulaKey}">
                    ${starsHtml}
                </div>
                
                <textarea id="feedback-comment-${aulaKey}" placeholder="Opcional: Deixe um comentário ou sugestão (máx. 200 caracteres)" maxlength="200" style="margin-top: 15px; width: 100%; height: 80px;"></textarea>

                <button class="btn" style="width: 100%; margin-top: 10px;" onclick="app.submitFeedback('${aulaKey}')">
                    Enviar Avaliação
                </button>
            </div>
        </div>
    `;
  }

  setRating(aulaKey, rating) {
    const starsContainer = document.querySelector(`.rating-stars[data-key="${aulaKey}"]`);
    if (!starsContainer) return;

    starsContainer.querySelectorAll('input').forEach((input, index) => {
      if (index < rating) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });

    // Armazenar temporariamente o rating na sessão/estado para envio posterior
    const tempFeedback = this.stateManager.state.tempFeedback || {};
    tempFeedback[aulaKey] = { rating: rating };
    this.stateManager.update({ tempFeedback: tempFeedback });
  }

  submitFeedback(aulaKey) {
    const rating = (this.stateManager.state.tempFeedback?.[aulaKey] || {}).rating;
    const commentElement = document.getElementById(`feedback-comment-${aulaKey}`);
    const comment = commentElement ? Utils.sanitize(commentElement.value.trim()) : '';

    if (!rating) {
      this.toast('Por favor, selecione uma nota de 1 a 5 estrelas.', 'warning');
      return;
    }

    const newFeedback = {
      aulaKey,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    const updatedFeedback = [...this.stateManager.state.feedback.filter(f => f.aulaKey !== aulaKey), newFeedback];
    this.stateManager.update({ feedback: updatedFeedback });

    this.toast('Feedback enviado! Obrigado pela sua contribuição.', 'success', 4000);
    this.renderAula(this.stateManager.state.moduleIndex, this.stateManager.state.aulaIndex); // Re-render para mostrar a mensagem de enviado
  }

  // Sentiment Explorer
  renderSentiments() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const sentimentsContainer = document.getElementById('sentiments-container');
    if (!sentimentsContainer) return;

    sentimentsContainer.innerHTML = '';

    const categories = {
      'Positive': EMOJI_CATEGORIES.positive,
      'Neutral': EMOJI_CATEGORIES.neutral,
      'Negative': EMOJI_CATEGORIES.negative,
    };

    const colors = {
      'Positive': 'var(--success)',
      'Neutral': 'var(--warning)',
      'Negative': 'var(--danger)',
    };

    for (const category in categories) {
      const emojis = categories[category];
      const color = colors[category];

      sentimentsContainer.innerHTML += `
                <div class="sentiment-category card" style="border-left: 5px solid ${color};">
                    <h3 style="color: ${color}; margin-top: 0;">${category}</h3>
                    <div class="emoji-grid">
                        ${emojis.map(emoji => `
                            <div class="emoji-item" onclick="app.showEmojiDetails('${emoji}', '${category}', '${color}')" role="button" tabindex="0" aria-label="Emoção ${emoji}">
                                <span class="emoji">${emoji}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
    }
    this.showEmojiDetails('😊', 'Positive', 'var(--success)'); // Renderiza o primeiro por padrão
  }

  showEmojiDetails(emoji, category, color) {
    const detailsContainer = document.getElementById('sentiment-details');
    if (!detailsContainer) return;

    const details = {
      '😊': { name: 'Alegria (Joy)', tip: 'Reconheça e celebre pequenos momentos de alegria. A felicidade é contagiosa e fortalece o ambiente familiar.' },
      '😌': { name: 'Satisfação (Contentment)', tip: 'Aceite que nem todos os dias são perfeitos, mas foque na satisfação com o presente.' },
      '😄': { name: 'Felicidade (Happiness)', tip: 'Pratique a gratidão diariamente. Focar no positivo melhora o humor geral.' },
      '🤗': { name: 'Afeto (Affection)', tip: 'Mostre afeto físico e verbalmente. Abraços e palavras de incentivo são essenciais.' },
      '😇': { name: 'Calma (Calmness)', tip: 'Mantenha a calma em momentos de estresse. Sua serenidade é um modelo para seus filhos.' },
      '🥰': { name: 'Amor (Love)', tip: 'Lembre-se de expressar amor incondicional. Ele é a base de toda a conexão.' },
      '😎': { name: 'Confiança (Confidence)', tip: 'Confie na capacidade dos seus filhos de lidar com desafios, oferecendo apoio, não controle.' },
      '🎉': { name: 'Celebração (Celebration)', tip: 'Comemore conquistas, grandes e pequenas. Isso valida o esforço e constrói autoestima.' },
      '😐': { name: 'Neutro (Neutrality)', tip: 'É normal sentir-se neutro. Use esses momentos para observação e escuta sem julgamento.' },
      '🤔': { name: 'Curiosidade (Curiosity)', tip: 'Incentive a curiosidade. Faça perguntas abertas para entender a perspectiva de seu filho.' },
      '😶': { name: 'Indiferença (Indifference)', tip: 'A indiferença pode esconder mágoa. Ofereça um espaço seguro para conversas sem pressão.' },
      '🧐': { name: 'Análise (Analysis)', tip: 'Use o tempo de análise para planejar intervenções e respostas construtivas.' },
      '😟': { name: 'Preocupação (Worry)', tip: 'Nomeie sua preocupação e compartilhe-a de forma clara, focando no comportamento, não na pessoa.' },
      '😕': { name: 'Confusão (Confusion)', tip: 'Quando confuso, peça uma pausa. Retome a conversa quando os ânimos estiverem mais calmos.' },
      '😞': { name: 'Decepção (Disappointment)', tip: 'Permita-se sentir decepção. Fale sobre o sentimento em vez de culpar.' },
      '😔': { name: 'Tristeza (Sadness)', tip: 'Valide a tristeza. "Eu vejo que você está triste" é mais poderoso do que "Não fique assim".' },
      '😣': { name: 'Frustração (Frustration)', tip: 'A frustração é um sinal de que algo precisa mudar. Trabalhem juntos em soluções.' },
      '😠': { name: 'Raiva (Anger)', tip: 'A raiva é uma emoção secundária. Busque a emoção primária (medo, frustração) que a causou.' },
      '😢': { name: 'Choro (Tearfulness)', tip: 'O choro é um alívio emocional. Ofereça conforto sem tentar parar o choro imediatamente.' },
      '😨': { name: 'Medo (Fear)', tip: 'O medo é real. Ensine técnicas de respiração e ofereça segurança e proteção.' },
      '😰': { name: 'Ansiedade (Anxiety)', tip: 'A ansiedade se manifesta no corpo. Ajude a focar no presente com atividades sensoriais.' },
      '😩': { name: 'Exaustão (Exhaustion)', tip: 'Reconheça a exaustão (sua e deles). Priorize descanso e descompressão.' },
      '😤': { name: 'Descontentamento (Displeasure)', tip: 'O descontentamento persistente pode indicar um problema maior. Investigue a causa.' },
      '😭': { name: 'Angústia (Distress)', tip: 'Em momentos de angústia, priorize a segurança emocional. Apenas esteja presente.' },
    };

    const currentDetail = details[emoji] || { name: 'Emoção Desconhecida', tip: 'Detalhes não disponíveis.' };

    detailsContainer.innerHTML = `
        <div class="card" style="border-left: 5px solid ${color};">
            <div style="display: flex; align-items: center; gap: 15px;">
                <span class="emoji-large" style="font-size: 3em;">${emoji}</span>
                <div>
                    <h3 style="margin: 0; color: ${color};">${currentDetail.name}</h3>
                    <div class="muted">Categoria: ${category}</div>
                </div>
            </div>
            <div class="usage-tip" style="margin-top: 15px;">
                <h4><i class="fas fa-lightbulb"></i> Dica de Aplicação Familiar</h4>
                <p style="margin: 0; line-height: 1.5;">${currentDetail.tip}</p>
            </div>
            
            <button class="btn ghost" onclick="app.copyText('${currentDetail.name} - ${currentDetail.tip}')" style="margin-top: 15px; width: 100%;">
                <i class="fas fa-copy"></i> Copiar Dica
            </button>
        </div>
    `;
  }

  renderBenefits() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const benefitsList = document.getElementById('benefits-list');
    if (!benefitsList) return;

    benefitsList.innerHTML = `
        <div class="benefit-item card">
            <div class="icon-wrap" style="background: rgba(74, 144, 226, 0.2); color: var(--primary);"><i class="fas fa-handshake"></i></div>
            <div>
                <h3>Comunicação Reforçada</h3>
                <p class="muted">Aprenda a ouvir ativamente e a expressar sentimentos de forma que fortalece o diálogo familiar.</p>
            </div>
        </div>
        <div class="benefit-item card">
            <div class="icon-wrap" style="background: rgba(255, 143, 0, 0.2); color: var(--secondary);"><i class="fas fa-heartbeat"></i></div>
            <div>
                <h3>Maior Vínculo Emocional</h3>
                <p class="muted">Descubra técnicas para validar emoções e criar um ambiente de confiança mútua com seus filhos.</p>
            </div>
        </div>
        <div class="benefit-item card">
            <div class="icon-wrap" style="background: rgba(155, 89, 182, 0.2); color: var(--accent);"><i class="fas fa-tools"></i></div>
            <div>
                <h3>Ferramentas Práticas Imediatas</h3>
                <p class="muted">Receba estratégias testadas para lidar com birras, rebeldia e estabelecer limites saudáveis.</p>
            </div>
        </div>
        <div class="benefit-item card">
            <div class="icon-wrap" style="background: rgba(0, 200, 83, 0.2); color: var(--success);"><i class="fas fa-child"></i></div>
            <div>
                <h3>Desenvolvimento de Resiliência</h3>
                <p class="muted">Ajude seus filhos a desenvolverem habilidades socioemocionais para enfrentar os desafios da vida.</p>
            </div>
        </div>
    `;
  }

  renderFAQ() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;

    const faqData = [
      { q: "Qual o custo do curso?", a: "Este é um curso de demonstração para apresentar o conteúdo e a metodologia do Dr. Wimer Bottura Jr. Para informações sobre a versão completa e preços, visite o site oficial da Universidade de Pais (link não incluso nesta demo)." },
      { q: "O curso é voltado apenas para pais de adolescentes?", a: "O foco principal é em adolescentes, mas os módulos 1 e 3 oferecem ferramentas universais que são valiosas para pais de todas as idades." },
      { q: "Posso acessar o curso offline?", a: "Sim! Se você usar o aplicativo como um PWA (Web App Progressivo), o conteúdo base e o progresso podem ser acessados offline. Os vídeos, no entanto, dependem de conexão." },
      { q: "Como faço para entrar em contato?", a: "Para suporte técnico ou dúvidas sobre a aplicação demo, você pode usar o campo de feedback em qualquer aula ou enviar um email (somente na versão completa)." }
    ];

    faqContainer.innerHTML = faqData.map((item, index) => `
        <details class="faq-item card" style="margin-bottom: 10px;">
            <summary role="button" aria-expanded="false" aria-controls="faq-content-${index}">
                <h4 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-question-circle" style="color: var(--primary);"></i> ${item.q}
                </h4>
            </summary>
            <div class="faq-content" id="faq-content-${index}">
                <p>${item.a}</p>
            </div>
        </details>
    `).join('');
  }

  renderShareScreen() {
    document.querySelector('footer').style.display = 'flex'; // Restaura o footer
    // Conteúdo da tela de compartilhamento já está no HTML
  }

  /* ===== HELPER FUNCTIONS ===== */

  debounceButtonClick(button, callback) {
    if (this.isDebouncing) {
      this.toast('Aguarde um momento...', 'info');
      return;
    }

    this.isDebouncing = true;
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner btn-spinner" style="display: inline-block;"></div> Processando...';

    // Executa o callback
    callback();

    // Reset após 1000ms
    setTimeout(() => {
      this.isDebouncing = false;
      button.disabled = false;
      button.innerHTML = originalText;
    }, 1000);
  }

  async copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        this.toast('Texto copiado para a área de transferência!', 'success');
      } else {
        // Fallback for non-secure context or old browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.toast('Texto copiado (Fallback ativado)!', 'success');
      }
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
      this.toast('Não foi possível copiar o texto. Tente manualmente.', 'error');
    }
  }

  shareProgress() {
    const progress = this.stateManager.getProgress();
    const shareText = `Meu progresso no curso "Universidade de Pais": ${progress.percentage}% concluído! Já completei ${progress.completedCount} de ${progress.totalCount} aulas. #ConexaoPaisEFilhos`;

    if (navigator.share) {
      navigator.share({
        title: 'Meu Progresso no Curso',
        text: shareText,
        url: window.location.href,
      }).then(() => {
        this.toast('Progresso compartilhado com sucesso!', 'success');
      }).catch((error) => {
        console.error('Erro ao compartilhar:', error);
        this.toast('Compartilhamento cancelado ou falhou.', 'warning');
      });
    } else {
      this.copyText(shareText);
      this.toast('Progresso copiado para compartilhar!', 'success');
    }
  }

  shareCurrentAula() {
    const { moduleIndex, aulaIndex } = this.stateManager.state;
    const aula = COURSE.modules[moduleIndex]?.aulas[aulaIndex];

    if (!aula) {
      this.toast('Nenhuma aula selecionada para compartilhar.', 'error');
      return;
    }

    const shareText = `Estou estudando agora: "${aula.title}" do curso Universidade de Pais. Tópico essencial sobre conexão familiar! Veja: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: aula.title,
        text: shareText,
        url: window.location.href,
      }).then(() => {
        this.toast('Aula compartilhada!', 'success');
      }).catch((error) => {
        console.error('Erro ao compartilhar:', error);
        this.toast('Compartilhamento cancelado ou falhou.', 'warning');
      });
    } else {
      this.copyText(shareText);
      this.toast('Link da aula copiado para compartilhar!', 'success');
    }
  }

  /* ===== DATA AND PERFORMANCE MAINTENANCE (MOCKS/PLACEHOLDERS) ===== */

  calculateStreak() {
    // Implementação mock: apenas para fins de demonstração
    const today = new Date();
    const lastLogin = new Date(this.stateManager.state.stats.lastLogin);
    const diffTime = Math.abs(today - lastLogin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = this.stateManager.state.stats.streak;

    if (this.stateManager.getProgress().completedCount > 0) {
      if (diffDays === 1) {
        // Se logou hoje e completou algo, e o último login foi ontem
        newStreak++;
      } else if (diffDays > 1) {
        // Quebra de streak
        newStreak = 1;
      } else if (diffDays === 0) {
        // Já completou algo hoje, mantém
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 0;
    }

    this.stateManager.update({
      stats: {
        ...this.stateManager.state.stats,
        streak: newStreak,
        lastLogin: today.toISOString()
      }
    });

    return newStreak;
  }

  setupAutoBackup() {
    // Configura um backup automático completo a cada 24h
    setInterval(() => {
      const backup = {
        timestamp: new Date().toISOString(),
        appState: this.stateManager.state
      };
      Utils.storage.set('autoBackup', backup);
      console.log('✅ Backup automático concluído.');
    }, 24 * 60 * 60 * 1000); // 24 horas
  }

  setupPerformanceMonitoring() {
    // Monitoramento de performance (Exemplo)
    window.addEventListener('load', () => {
      const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
      console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
      // Aqui faria o envio para um serviço de analytics real
    });
  }

  setupErrorRecovery() {
    // Tratamento de erros globais (Exemplo)
    window.addEventListener('error', (event) => {
      console.error('Erro não capturado:', event.error);
      this.toast('Ocorreu um erro inesperado. O aplicativo tentará se recuperar.', 'danger', 5000);
      // Aqui enviaria o log de erro para o servidor
    });
  }

  setupOfflineQueue() {
    // Simulação de fila de ações offline (Exemplo)
    window.addEventListener('online', () => {
      const offlineActions = Utils.storage.get('offlineQueue', []);
      if (offlineActions.length > 0) {
        this.toast(`Sincronizando ${offlineActions.length} ações offline...`, 'info', 3000);
        Utils.storage.set('offlineQueue', []); // Limpa a fila após "sincronizar"
        this.stateManager.saveState(); // Garante que o estado mais recente seja salvo
      }
    });
  }

  syncWhenOnline() {
    // Função chamada quando a conexão é restaurada
    this.setupOfflineQueue();
  }

  scheduleStudyReminders() {
    if (this.stateManager.state.account.reminders && APP_CONFIG.FEATURES.PUSH_NOTIFICATIONS && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Em um app real, o Service Worker faria o agendamento
          console.log('Lembretes de estudo agendados.');
        }
      });
    }
  }

  prefetchResources() {
    // Pré-busca de recursos (Imagens e Vídeos do próximo módulo)
    const nextModuleId = this.stateManager.state.moduleIndex + 1;
    const nextModule = COURSE.modules[nextModuleId];
    if (nextModule) {
      nextModule.aulas.forEach(aula => {
        // Pré-carrega a imagem
        const img = new Image();
        img.src = `https://picsum.photos/seed/aula${nextModuleId}-${aula.id}/50/50`;
        // Para vídeos e outros recursos faria chamadas similares ou usaria a API prefetch
      });
      console.log(`⏳ Recursos do Módulo ${nextModuleId + 1} em pré-busca.`);
    }
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
            }
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
            }
            observer.unobserve(lazyImage);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        observer.observe(img);
      });
    }
  }

  setupKeyboardNavigation() {
    // Adiciona foco visível a elementos interativos para navegação por teclado
    document.body.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });
    document.body.addEventListener('mousedown', () => {
      document.body.classList.remove('user-is-tabbing');
    });
  }

  showConfetti() {
    if (!document.getElementById('confetti-container')) {
      const container = document.createElement('div');
      container.id = 'confetti-container';
      document.body.appendChild(container);

      // Limpa após 3 segundos
      setTimeout(() => container.remove(), 3000);
    }

    const duration = 2000;
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      startVelocity: 30,
      colors: ['#4A90E2', '#FF8F00', '#00C853', '#9b59b6']
    };

    function shoot() {
      const count = 100;
      confetti({
        ...defaults,
        particleCount: count,
        scalar: 2
      });
    }

    // Função de animação de confetes
    if (typeof confetti === 'function') {
      shoot();
      setTimeout(shoot, 50);
      setTimeout(shoot, 100);
    } else {
      console.log('Confetti not available. Simulating success with toast.');
      this.toast('Marcos importantes alcançados!', 'success', 2000);
    }
  }


  renderFooter() {
    // Adiciona o listener de cliques ao footer
    document.querySelectorAll('.nav-item').forEach(item => {
      item.onclick = () => {
        const screen = item.id.replace('nav-', '');
        this.nav(screen);
      };
      item.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const screen = item.id.replace('nav-', '');
          this.nav(screen);
        }
      };
    });
  }

}

// Inicializa o aplicativo após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new UniversidadePaisApp();
});

// Polyfill e Mocks para ambientes sem Confetti
if (typeof window.confetti !== 'function') {
  window.confetti = () => { /* No-op or custom small animation */ };
}

// Estilos de animação globais (para o confete e outras coisas)
const injectGlobalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .progress-circle-svg {
      transform: rotateY(-180deg) rotate(90deg);
    }

    /* Keyframes para transições */
    @keyframes slideIn {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .slide-in { animation: slideIn 0.3s ease-out; }
    .pulse { animation: pulse 2s infinite; }
    
    .progress-ring {
      transition: stroke-dashoffset 0.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);
};

// Carregar estilos de animação
injectGlobalStyles();

// ===== INTEGRAÇÃO COMPLETA =====
// Adicionar estas chamadas no método initApp()
const originalInitApp = UniversidadePaisApp.prototype.initApp;
UniversidadePaisApp.prototype.initApp = function() {
  // Chamar o método original
  originalInitApp.call(this);
  
  // Novas inicializações adicionadas
  this.setupAutoBackup();
  this.setupPerformanceMonitoring();
  this.setupErrorRecovery();
  this.setupOfflineQueue();
  this.setupAnimations = injectGlobalStyles; // Atribui para ser chamado no setupAdditionalFeatures
};

// ===== FUNÇÕES GLOBAIS ADICIONAIS =====
window.submitFeedback = (rating, comment) => app.submitFeedback(rating, comment);
window.recoverFromBackup = () => {
  const backup = Utils.storage.get('autoBackup');
  if (backup && confirm('Restaurar último backup automático? Isso irá substituir seu progresso atual.')) {
    app.stateManager.update(backup.appState);
    app.toast('💾 Restauração de backup concluída!', 'success', 5000);
    setTimeout(() => window.location.reload(), 1000);
  } else {
    app.toast('Nenhum backup encontrado ou restauração cancelada.', 'info');
  }
};
window.saveInitialAccount = () => app.saveInitialAccount();
window.saveAccountSettings = () => app.saveAccountSettings();
window.updateProfilePhoto = (event) => app.updateProfilePhoto(event);
window.removeProfilePhoto = () => app.removeProfilePhoto();
window.exportUserData = () => app.exportUserData();
window.clearAllData = () => app.clearAllData();
window.shareProgress = () => app.shareProgress();
window.shareCurrentAula = () => app.shareCurrentAula();
window.toggleMenu = (force) => app.toggleMenu(force);
window.nav = (screen, modIdx, aulaIdx) => app.nav(screen, modIdx, aulaIdx);