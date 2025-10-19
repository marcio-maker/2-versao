// script.js - COMPLETO, ROBUSTO E OTIMIZADO - VERSÃO FINAL CORRIGIDA

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
            aulas: Array.from({length: 8}, (_, i) => ({
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
            aulas: Array.from({length: 8}, (_, i) => ({
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
            aulas: Array.from({length: 8}, (_, i) => ({
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
            aulas: Array.from({length: 8}, (_, i) => ({
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
            }
        };
        
        this.loadState();
        this.setupAutoSave();
    }

    loadState() {
        try {
            const savedState = Utils.storage.get('appState');
            if (savedState) {
                this.state = { ...this.state, ...savedState };
                
                // VERIFICAÇÃO CRÍTICA: Se usuário já existe, vai direto para home
                if (this.state.account.name && this.state.account.email) {
                    this.state.currentScreen = 'home';
                }
            }
        } catch (error) {
            console.error('Erro ao carregar estado:', error);
        }
    }

    saveState() {
        try {
            this.state.lastActivity = new Date().toISOString();
            Utils.storage.set('appState', this.state);
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

        if (aulaId > 0) {
            const previousAulaId = aulaId - 1;
            return this.state.completedAulas[`M${moduleId}-A${previousAulaId}`] === true;
        } else if (moduleId > 0) {
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
        
        // Initialize first screen - CORREÇÃO CRÍTICA AQUI
        setTimeout(() => {
            this.nav(this.stateManager.state.currentScreen);
        }, 100);
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
                switch(e.key) {
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
    renderHome() {
        this.renderModules();
        this.updateHomeStats();
    }

    renderModules() {
        const modulesContainer = document.getElementById('modules');
        if (!modulesContainer) return;

        const totalProgress = this.stateManager.getProgress();
        const searchTerm = this.currentSearchTerm;

        modulesContainer.innerHTML = '';

        COURSE.modules.forEach(mod => {
            const progress = this.stateManager.getModuleProgress(mod.id);
            const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
            const isLocked = mod.id > 0 && this.stateManager.getModuleProgress(mod.id - 1).completed < this.stateManager.getModuleProgress(mod.id - 1).total;

            // Filter by search
            const moduleText = `${mod.title} ${mod.description}`.toLowerCase();
            if (searchTerm && !moduleText.includes(searchTerm)) {
                return;
            }

            const navFunc = isLocked ? 
                `app.toast('Conclua o módulo anterior para desbloquear.', 'warning')` : 
                `app.navWithHistory('aulas', ${mod.id})`;

            const statusIcon = isLocked ? '🔒' : (progressPercent === 100 ? '✅' : '▶️');
            const statusText = isLocked ? 'Bloqueado' : (progressPercent === 100 ? 'Concluído' : 'Continuar');

            modulesContainer.innerHTML += `
                <div class="module ${isLocked ? 'locked' : ''}" onclick="${navFunc}">
                    <img class="module-img" src="https://picsum.photos/seed/familia_m${mod.id}/60/60" 
                         alt="${mod.title}" loading="lazy">
                    <div class="module-info">
                        <h3>${mod.title}</h3>
                        <p>${mod.description}</p>
                        <div class="module-progress">
                            <progress value="${progress.completed}" max="${progress.total}"></progress>
                            <span class="progress-text">${progress.completed}/${progress.total} aulas</span>
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

        // Show empty state if no results
        if (searchTerm && modulesContainer.children.length === 0) {
            modulesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <h3>Nenhum módulo encontrado</h3>
                    <p class="muted">Tente buscar com outros termos</p>
                </div>
            `;
        }
    }

    updateHomeStats() {
        const progress = this.stateManager.getProgress();
        
        document.getElementById('stats-completed').textContent = progress.completedCount;
        document.getElementById('stats-percentage').textContent = progress.percentage + '%';
        document.getElementById('stats-favorites').textContent = this.stateManager.state.bookmarkedAulas.length;
    }

    renderAulas(moduleId) {
        const moduleData = COURSE.modules[moduleId];
        const aulasList = document.getElementById('aulas-list');
        const progress = this.stateManager.getModuleProgress(moduleId);

        if (!aulasList) return;

        document.getElementById('module-title').textContent = moduleData.title;
        document.getElementById('module-progress').textContent = `${progress.completed} / ${progress.total}`;

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
                <div class="aula ${aulaClass}" onclick="${navFunc}">
                    <div class="aula-img-wrap">
                        <img class="aula-img" src="https://picsum.photos/seed/aula${moduleId}-${aula.id}/50/50" 
                             alt="${aula.title}" loading="lazy">
                        <div class="aula-icon-overlay">${iconOverlay}</div>
                    </div>
                    <div class="aula-info">
                        <h3>${aula.title}</h3>
                        <p>${aula.duration} • ${aula.description}</p>
                    </div>
                    <div class="aula-status">
                        ${isCompleted ? 'Concluída' : ''}
                    </div>
                </div>
            `;
        });
    }

    renderAula(moduleId, aulaId) {
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

        // Update bookmark button
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            bookmarkBtn.innerHTML = isBookmarked ? 
                '<i class="fas fa-bookmark"></i> Aula Marcada' : 
                '<i class="far fa-bookmark"></i> Marcar Aula';
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
                    <div style="background: var(--bg); padding: 15px; border-radius: var(--radius); margin: 15px 0;">
                        <h4 style="margin-top: 0;">🎯 O que você vai aprender:</h4>
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
                    <span class="badge" style="background: var(--primary); color: white; padding: 4px 8px; border-radius: 12px;">
                        ${this.stateManager.state.currentQuizStep}/${quizData.steps.length}
                    </span>
                </div>
                <p style="font-weight: 600; font-size: 1.1em; margin-bottom: 20px;">${currentStep.question}</p>
                <div class="options-grid">
                    ${optionsHtml}
                </div>
                <div class="quiz-explanation" id="quiz-explanation" style="display: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--bg);">
                    <div style="background: rgba(74, 144, 226, 0.1); padding: 15px; border-radius: var(--radius);">
                        <p style="margin: 0; font-weight: 600; color: var(--primary);">💡 Explicação:</p>
                        <p style="margin: 8px 0 0 0;">${currentStep.explanation}</p>
                    </div>
                    <button id="quiz-action-btn" class="btn" onclick="app.debounceButtonClick(this, () => app.nextQuizStep(${moduleId}, ${aulaId}))" 
                            style="margin-top: 15px; width: 100%;">
                        ${this.stateManager.state.currentQuizStep < quizData.steps.length ? 
                          'Próxima Pergunta →' : 'Ver Resultados →'}
                    </button>
                </div>
            </div>
        `;
    }

    submitAnswer(moduleId, aulaId, selectedIndex) {
        try {
            const options = document.querySelectorAll('.option-card');
            const quizData = QUIZ.find(q => q.id === COURSE.modules[moduleId].aulas[aulaId].quizId);
            const stepIndex = this.stateManager.state.currentQuizStep - 1;
            const currentStep = quizData.steps[stepIndex];
            const correctIndex = currentStep.answer;
            const aulaKey = `M${moduleId}-A${aulaId}`;

            // Disable all options
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });

            // Show correct/incorrect states
            options.forEach((opt, index) => {
                if (index === correctIndex) {
                    opt.classList.add('correct');
                    opt.querySelector('.option-icon').innerHTML = '✓';
                } else if (index === selectedIndex) {
                    opt.classList.add('wrong');
                    opt.querySelector('.option-icon').innerHTML = '✕';
                }
            });

            // Update score
            if (selectedIndex === correctIndex) {
                this.stateManager.state.quizScores[aulaKey] = (this.stateManager.state.quizScores[aulaKey] || 0) + 1;
                this.toast('🎉 Resposta Correta!', 'success');
            } else {
                this.toast('📝 Resposta Incorreta. Aprenda com o erro!', 'error');
            }

            this.stateManager.saveState();
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
                    <div class="progress-circle" style="border-color: ${resultColor}; color: ${resultColor}; width: 100px; height: 100px;">
                        <div style="font-weight: 800; font-size: 1.2em;">${percentage}%</div>
                    </div>
                    <div class="muted" style="margin-top: 12px;">
                        Acertos: <strong>${score}</strong> de <strong>${totalQuestions}</strong> questões
                    </div>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn ghost" onclick="app.debounceButtonClick(this, () => { app.stateManager.state.currentQuizStep = 0; app.stateManager.saveState(); app.renderAula(${moduleId}, ${aulaId}); })">
                        <i class="fas fa-redo"></i> Refazer Questionário
                    </button>
                    <button class="btn" onclick="app.debounceButtonClick(this, () => app.markAulaComplete(${moduleId}, ${aulaId}))">
                        <i class="fas fa-check-circle"></i> Concluir Aula
                    </button>
                </div>
            </div>
        `;
    }

    startQuiz(moduleId, aulaId) {
        this.stateManager.state.currentQuizStep = 1;
        const aulaKey = `M${moduleId}-A${aulaId}`;
        this.stateManager.state.quizScores[aulaKey] = 0;
        this.stateManager.saveState();
        this.renderAula(moduleId, aulaId);
    }

    markAulaComplete(moduleId, aulaId) {
        try {
            const aulaKey = `M${moduleId}-A${aulaId}`;
            this.stateManager.state.completedAulas[aulaKey] = true;
            this.stateManager.state.currentQuizStep = 0;
            this.stateManager.saveState();
            
            // Track completion
            this.trackAulaCompletion(moduleId, aulaId);
            
            // Mostrar confetti para marcos importantes
            this.showConfetti();
            
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
        } catch (error) {
            console.error('Erro ao rastrear conclusão:', error);
        }
    }

    renderCompleteScreen() {
        const progress = this.stateManager.getProgress();
        const color = progress.percentage < 50 ? 'var(--warning)' : 
                     progress.percentage < 90 ? 'var(--primary)' : 'var(--success)';

        document.getElementById('progress-num').textContent = `${progress.percentage}%`;
        document.getElementById('progress-circle').style.borderColor = color;
        document.getElementById('progress-circle').style.color = color;

        let message = 'Seu progresso total no curso';
        if (progress.percentage === 100) {
            message = '🎉 Parabéns! Curso Concluído com Sucesso!';
        } else if (progress.percentage >= 75) {
            message = 'Ótimo progresso! Continue assim!';
        }

        document.getElementById('progress-sub').textContent = message;
    }

    /* ===== PROFILE MANAGEMENT ===== */
    renderProfile() {
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
                    name,
                    email
                }
            });

            this.toast('✅ Configurações salvas com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            this.toast('Erro ao salvar configurações. Tente novamente.', 'error');
        }
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
                const photoElement = document.getElementById('profile-photo');
                photoElement.src = e.target.result;
                Utils.storage.set('profilePhoto', e.target.result);
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
            Utils.storage.remove('profilePhoto');
            this.toast('🗑️ Foto removida', 'info');
        } catch (error) {
            console.error('Erro ao remover foto:', error);
            this.toast('Erro ao remover foto. Tente novamente.', 'error');
        }
    }

    loadProfilePhoto() {
        try {
            const savedPhoto = Utils.storage.get('profilePhoto');
            if (savedPhoto) {
                const photoElement = document.getElementById('profile-photo');
                if (photoElement) photoElement.src = savedPhoto;
            }
        } catch (error) {
            console.error('Erro ao carregar foto:', error);
        }
    }

    /* ===== BOOKMARKS AND FAVORITES ===== */
    toggleBookmark(moduleId, aulaId) {
        try {
            const aulaKey = `M${moduleId}-A${aulaId}`;
            const bookmarkBtn = document.getElementById('bookmark-btn');
            const index = this.stateManager.state.bookmarkedAulas.indexOf(aulaKey);

            if (index > -1) {
                this.stateManager.state.bookmarkedAulas.splice(index, 1);
                if (bookmarkBtn) {
                    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i> Marcar Aula';
                }
                this.toast('📚 Aula removida dos favoritos', 'info');
            } else {
                this.stateManager.state.bookmarkedAulas.push(aulaKey);
                if (bookmarkBtn) {
                    bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Aula Marcada';
                }
                this.toast('❤️ Aula adicionada aos favoritos!', 'success');
            }
            this.stateManager.saveState();
        } catch (error) {
            console.error('Erro ao alternar favorito:', error);
            this.toast('Erro ao atualizar favoritos. Tente novamente.', 'error');
        }
    }

    renderFavorites() {
        const favoritesList = document.getElementById('favorites-list');
        if (!favoritesList) return;
        
        favoritesList.innerHTML = '';
        
        if (this.stateManager.state.bookmarkedAulas.length === 0) {
            favoritesList.innerHTML = `
                <div class="card">
                    <div class="empty-state">
                        <div class="icon">❤️</div>
                        <h3>Nenhuma aula favorita</h3>
                        <p class="muted">Marque aulas como favoritas para vê-las aqui</p>
                        <button class="btn" onclick="app.navWithHistory('home')">
                            <i class="fas fa-compass"></i> Explorar Aulas
                        </button>
                    </div>
                </div>
            `;
            return;
        }
        
        this.stateManager.state.bookmarkedAulas.forEach(key => {
            const [modId, aulaId] = key.replace('M', '').replace('A', '').split('-').map(Number);
            const moduleData = COURSE.modules[modId];
            const aula = moduleData.aulas[aulaId];
            
            favoritesList.innerHTML += `
                <div class="aula" onclick="app.navWithHistory('aula', ${modId}, ${aulaId})">
                    <div class="aula-img-wrap">
                        <img class="aula-img" src="https://picsum.photos/seed/aula${modId}-${aulaId}/50/50" 
                             alt="${aula.title}" loading="lazy">
                        <div class="aula-icon-overlay">❤️</div>
                    </div>
                    <div class="aula-info">
                        <h3>${aula.title}</h3>
                        <p>Módulo ${modId + 1} • ${aula.duration}</p>
                    </div>
                    <div class="aula-status">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            `;
        });
    }

    /* ===== NOTES MANAGEMENT ===== */
    renderNotes() {
        try {
            // Render notes list
            this.renderNotesList();
        } catch (error) {
            console.error('Erro ao renderizar anotações:', error);
            this.toast('Erro ao carregar anotações.', 'error');
        }
    }

    renderNotesList(filter = 'all') {
        const notesList = document.getElementById('notes-list');
        if (!notesList) return;

        try {
            const notes = Utils.storage.get('userNotesList', []);
            
            let filteredNotes = notes;
            if (filter === 'favorite') {
                filteredNotes = notes.filter(note => note.favorite);
            } else if (filter === 'recent') {
                // Show last 10 notes
                filteredNotes = notes.slice(0, 10);
            }

            if (filteredNotes.length === 0) {
                notesList.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">📝</div>
                        <h3>Nenhuma anotação encontrada</h3>
                        <p class="muted">${filter === 'all' ? 'Comece criando sua primeira anotação!' : 
                                        filter === 'favorite' ? 'Nenhuma anotação favoritada ainda' : 
                                        'Nenhuma anotação recente'}</p>
                    </div>
                `;
                return;
            }

            notesList.innerHTML = filteredNotes.map(note => `
                <div class="note-item ${note.favorite ? 'favorite' : ''}">
                    <div class="note-header">
                        <div class="note-title">${Utils.sanitize(note.title)}</div>
                        <div class="note-date">${new Date(note.createdAt).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <div class="note-content">${Utils.sanitize(note.content)}</div>
                    <div class="note-actions">
                        <button class="btn ghost" onclick="app.toggleNoteFavorite('${note.id}')">
                            <i class="fas ${note.favorite ? 'fa-star' : 'fa-star-o'}"></i>
                            ${note.favorite ? 'Favorita' : 'Favoritar'}
                        </button>
                        <button class="btn ghost" onclick="app.deleteNote('${note.id}')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Erro ao renderizar lista de anotações:', error);
            notesList.innerHTML = `
                <div class="empty-state">
                    <div class="icon">❌</div>
                    <h3>Erro ao carregar anotações</h3>
                    <p class="muted">Tente recarregar a página</p>
                </div>
            `;
        }
    }

    saveNote() {
        try {
            const title = document.getElementById('note-title').value.trim();
            const content = document.getElementById('note-content').value.trim();
            const isFavorite = document.getElementById('note-favorite').checked;

            if (!title || !content) {
                this.toast('Por favor, preencha título e conteúdo.', 'error');
                return;
            }

            const notes = Utils.storage.get('userNotesList', []);
            const newNote = {
                id: Utils.generateId(),
                title,
                content,
                favorite: isFavorite,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            notes.unshift(newNote); // Add to beginning
            Utils.storage.set('userNotesList', notes);

            this.toast('📝 Anotação salva com sucesso!', 'success');
            
            // Reset form
            document.getElementById('note-title').value = '';
            document.getElementById('note-content').value = '';
            document.getElementById('note-favorite').checked = false;
            
            // Refresh notes list
            this.renderNotesList();
        } catch (error) {
            console.error('Erro ao salvar anotação:', error);
            this.toast('Erro ao salvar anotação. Tente novamente.', 'error');
        }
    }

    toggleNoteFavorite(noteId) {
        try {
            const notes = Utils.storage.get('userNotesList', []);
            const noteIndex = notes.findIndex(note => note.id === noteId);
            
            if (noteIndex > -1) {
                notes[noteIndex].favorite = !notes[noteIndex].favorite;
                notes[noteIndex].updatedAt = new Date().toISOString();
                Utils.storage.set('userNotesList', notes);
                
                this.renderNotesList();
                this.toast(
                    notes[noteIndex].favorite ? '⭐ Anotação favoritada!' : '📝 Anotação desfavoritada', 
                    'success'
                );
            }
        } catch (error) {
            console.error('Erro ao alternar favorito da anotação:', error);
            this.toast('Erro ao atualizar anotação.', 'error');
        }
    }

    deleteNote(noteId) {
        try {
            if (confirm('Tem certeza que deseja excluir esta anotação?')) {
                const notes = Utils.storage.get('userNotesList', []);
                const filteredNotes = notes.filter(note => note.id !== noteId);
                Utils.storage.set('userNotesList', filteredNotes);
                
                this.renderNotesList();
                this.toast('🗑️ Anotação excluída', 'warning');
            }
        } catch (error) {
            console.error('Erro ao excluir anotação:', error);
            this.toast('Erro ao excluir anotação.', 'error');
        }
    }

    filterNotes(filterType) {
        this.renderNotesList(filterType);
        
        // Update active filter button
        document.querySelectorAll('.notes-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    clearNotes() {
        try {
            if (confirm('Tem certeza que deseja limpar TODAS as anotações? Esta ação não pode ser desfeita.')) {
                Utils.storage.remove('userNotesList');
                this.renderNotesList();
                this.toast('🗑️ Todas as anotações foram limpas', 'warning');
            }
        } catch (error) {
            console.error('Erro ao limpar anotações:', error);
            this.toast('Erro ao limpar anotações.', 'error');
        }
    }

    shareNotes() {
        try {
            const notes = Utils.storage.get('userNotesList', []);
            if (notes.length === 0) {
                this.toast('Não há anotações para compartilhar.', 'warning');
                return;
            }

            const notesText = notes.map(note => 
                `=== ${note.title} ===\n${note.content}\n\n`
            ).join('');

            if (navigator.share) {
                navigator.share({
                    title: 'Minhas Anotações - Universidade de Pais',
                    text: notesText.substring(0, 100) + (notesText.length > 100 ? '...' : ''),
                    url: window.location.href
                }).then(() => this.toast('📤 Anotações compartilhadas!', 'success'))
                  .catch(() => this.fallbackShare(notesText));
            } else {
                this.fallbackShare(notesText);
            }
        } catch (error) {
            console.error('Erro ao compartilhar anotações:', error);
            this.toast('Erro ao compartilhar anotações.', 'error');
        }
    }

    fallbackShare(text) {
        try {
            navigator.clipboard.writeText(text).then(() => {
                this.toast('📋 Anotações copiadas para a área de transferência!', 'success');
            }).catch(() => {
                this.toast('❌ Não foi possível compartilhar as anotações', 'error');
            });
        } catch (error) {
            console.error('Erro no fallback share:', error);
            this.toast('Erro ao compartilhar.', 'error');
        }
    }

    downloadNotes() {
        try {
            const notes = Utils.storage.get('userNotesList', []);
            if (notes.length === 0) {
                this.toast('Não há anotações para exportar.', 'warning');
                return;
            }

            const notesText = notes.map(note => 
                `=== ${note.title} ===\nData: ${new Date(note.createdAt).toLocaleDateString('pt-BR')}\n${note.content}\n\n`
            ).join('');

            const blob = new Blob([notesText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `anotacoes-universidade-pais-${Utils.formatDate()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.toast('💾 Anotações exportadas com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar anotações:', error);
            this.toast('Erro ao exportar anotações.', 'error');
        }
    }

    /* ===== SHARING FUNCTIONALITY ===== */
    shareApp() {
        try {
            const shareData = {
                title: 'Universidade de Pais',
                text: 'Descubra o curso Conexão Pais e Filhos - Fortalecendo laços familiares através de técnicas comprovadas!',
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => this.toast('✅ App compartilhado!', 'success'))
                    .catch(() => this.fallbackShare(shareData.url));
            } else {
                this.fallbackShare(shareData.url);
            }
        } catch (error) {
            console.error('Erro ao compartilhar app:', error);
            this.toast('Erro ao compartilhar.', 'error');
        }
    }

    shareCurrentAula() {
        try {
            const { moduleIndex, aulaIndex } = this.stateManager.state;
            const aula = COURSE.modules[moduleIndex].aulas[aulaIndex];
            const shareData = {
                title: `Aula: ${aula.title}`,
                text: `Confira esta aula do curso Conexão Pais e Filhos: "${aula.title}"`,
                url: `${window.location.href}#aula-${moduleIndex}-${aulaIndex}`
            };

            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => this.toast('✅ Aula compartilhada!', 'success'))
                    .catch(() => this.fallbackShare(shareData.text));
            } else {
                this.fallbackShare(shareData.text);
            }
        } catch (error) {
            console.error('Erro ao compartilhar aula:', error);
            this.toast('Erro ao compartilhar aula.', 'error');
        }
    }

    shareProgress() {
        try {
            const progress = this.stateManager.getProgress();
            const shareText = `🎯 Meu progresso no curso Conexão Pais e Filhos: ${progress.percentage}% completos (${progress.completedCount}/${progress.totalCount} aulas)!`;

            if (navigator.share) {
                navigator.share({
                    title: 'Meu Progresso - Universidade de Pais',
                    text: shareText,
                    url: window.location.href
                }).then(() => this.toast('📊 Progresso compartilhado!', 'success'))
                  .catch(() => this.fallbackShare(shareText));
            } else {
                this.fallbackShare(shareText);
            }
        } catch (error) {
            console.error('Erro ao compartilhar progresso:', error);
            this.toast('Erro ao compartilhar progresso.', 'error');
        }
    }

    shareOnWhatsApp() {
        try {
            const text = 'Descubra o curso Conexão Pais e Filhos - Fortalecendo laços familiares!';
            const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
            window.open(url, '_blank');
            this.toast('Compartilhando no WhatsApp...', 'info');
        } catch (error) {
            console.error('Erro ao compartilhar no WhatsApp:', error);
            this.toast('Erro ao compartilhar no WhatsApp.', 'error');
        }
    }

    shareOnFacebook() {
        try {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
            this.toast('Compartilhando no Facebook...', 'info');
        } catch (error) {
            console.error('Erro ao compartilhar no Facebook:', error);
            this.toast('Erro ao compartilhar no Facebook.', 'error');
        }
    }

    shareOnTwitter() {
        try {
            const text = 'Conheça o curso Conexão Pais e Filhos!';
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
            this.toast('Compartilhando no Twitter...', 'info');
        } catch (error) {
            console.error('Erro ao compartilhar no Twitter:', error);
            this.toast('Erro ao compartilhar no Twitter.', 'error');
        }
    }

    copyShareLink() {
        try {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.toast('🔗 Link copiado para a área de transferência!', 'success');
            }).catch(() => {
                // Fallback
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                this.toast('🔗 Link copiado!', 'success');
            });
        } catch (error) {
            console.error('Erro ao copiar link:', error);
            this.toast('Erro ao copiar link.', 'error');
        }
    }

    /* ===== BENEFITS AND SENTIMENTS ===== */
    renderBenefits() {
        this.setupBenefitCards();
    }

    setupBenefitCards() {
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach(card => {
            card.addEventListener('click', function() {
                const benefitTitle = this.querySelector('h3').textContent;
                const benefitDescription = this.querySelector('p').textContent;
                app.toast(`💫 ${benefitTitle}: ${benefitDescription.substring(0, 80)}...`, 'info');
            });
        });
    }

    filterBenefits(category) {
        const cards = document.querySelectorAll('.benefit-card');
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    renderSentiments() {
        this.setupEmotionCards();
    }

    setupEmotionCards() {
        const emotionCards = document.querySelectorAll('.sentiment-card');
        emotionCards.forEach(card => {
            card.addEventListener('click', function() {
                const emotionName = this.querySelector('strong').textContent;
                const emotionDesc = this.querySelector('.emotion-desc').textContent;
                app.toast(`😊 ${emotionName}: ${emotionDesc}`, 'info');
            });
        });
    }

    filterEmotions(category) {
        const cards = document.querySelectorAll('.sentiment-card');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /* ===== FAQ ===== */
    renderFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    toggleFAQ(element) {
        const faqItem = element.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        } else {
            faqItem.classList.remove('active');
        }
    }

    sendContactMessage() {
        try {
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value.trim();

            // Validation
            if (!name || !email || !subject || !message) {
                this.toast('Por favor, preencha todos os campos.', 'error');
                return;
            }

            if (!Utils.validate.email(email)) {
                this.toast('Por favor, insira um email válido.', 'error');
                return;
            }

            // Show loading state
            this.showLoading(true);

            // Simulate API call
            setTimeout(() => {
                this.showLoading(false);
                
                // Save contact message locally
                const contacts = Utils.storage.get('contactMessages', []);
                contacts.push({
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString()
                });
                Utils.storage.set('contactMessages', contacts);

                this.toast(`✅ Obrigado, ${name}! Sua mensagem foi enviada. Responderemos em até 48h.`, 'success');
                
                // Reset form
                document.getElementById('contact-name').value = '';
                document.getElementById('contact-email').value = '';
                document.getElementById('contact-subject').selectedIndex = 0;
                document.getElementById('contact-message').value = '';
            }, 2000);
        } catch (error) {
            console.error('Erro ao enviar mensagem de contato:', error);
            this.toast('Erro ao enviar mensagem. Tente novamente.', 'error');
        }
    }

    /* ===== SEARCH FUNCTIONALITY ===== */
    performSearch() {
        if (this.stateManager.state.currentScreen === 'home') {
            this.renderModules();
        }
    }

    /* ===== UI UTILITIES ===== */
    toggleMenu(force = null) {
        const menu = document.getElementById('menu-dropdown');
        const menuButton = document.getElementById('menu-button');
        
        if (!menu || !menuButton) return;

        const isActive = menu.classList.contains('active');
        const shouldShow = force === true || (force === null && !isActive);

        if (shouldShow) {
            menu.classList.add('active');
            menuButton.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
        } else {
            menu.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
        }
    }

    toast(message, type = 'info', duration = 4000) {
        try {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');
            toast.innerHTML = `
                <i class="fas fa-${this.getToastIcon(type)}" aria-hidden="true"></i>
                <span>${message}</span>
            `;
            
            container.appendChild(toast);

            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 10);

            // Auto-remove
            setTimeout(() => {
                toast.classList.remove('show');
                toast.classList.add('hide');
                
                setTimeout(() => {
                    if (toast.parentNode === container) {
                        container.removeChild(toast);
                    }
                }, 500);
            }, duration);
        } catch (error) {
            console.error('Erro ao mostrar toast:', error);
        }
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showLoading(show = true) {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.display = show ? 'flex' : 'none';
        }

        // Also show loading state on buttons
        if (show) {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.add('loading');
            });
        } else {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('loading');
            });
        }
    }

    applyDarkMode() {
        const { darkMode } = this.stateManager.state.account;
        document.body.classList.toggle('dark-mode', darkMode);
    }

    toggleDarkMode(checkbox) {
        this.stateManager.update({
            account: {
                ...this.stateManager.state.account,
                darkMode: checkbox.checked
            }
        });
        this.applyDarkMode();
        this.toast(checkbox.checked ? '🌙 Modo Escuro Ativado' : '☀️ Modo Claro Ativado', 'info');
    }

    handleNotificationToggle(checkbox) {
        this.stateManager.update({
            account: {
                ...this.stateManager.state.account,
                notifications: checkbox.checked
            }
        });
        this.toast(checkbox.checked ? '🔔 Notificações Ativadas' : '🔕 Notificações Desativadas', 'info');
    }

    handleReminderToggle(checkbox) {
        this.stateManager.update({
            account: {
                ...this.stateManager.state.account,
                reminders: checkbox.checked
            }
        });
        this.toast(checkbox.checked ? '⏰ Lembretes Ativados' : '⏰ Lembretes Desativados', 'info');
    }

    /* ===== DATA MANAGEMENT ===== */
    exportUserData() {
        try {
            const userData = {
                app: APP_CONFIG,
                exportDate: new Date().toISOString(),
                account: this.stateManager.state.account,
                progress: this.stateManager.getProgress(),
                completedAulas: this.stateManager.state.completedAulas,
                bookmarkedAulas: this.stateManager.state.bookmarkedAulas,
                quizScores: this.stateManager.state.quizScores,
                stats: this.stateManager.state.stats,
                notes: Utils.storage.get('userNotesList', [])
            };
            
            const dataStr = JSON.stringify(userData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `universidade-pais-backup-${Utils.formatDate()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            
            this.toast('💾 Dados exportados com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.toast('Erro ao exportar dados.', 'error');
        }
    }

    clearAllData() {
        try {
            if (confirm('🚨 ATENÇÃO: Tem certeza que deseja limpar TODOS os dados?\n\nIsso irá resetar:\n• Todo seu progresso\n• Anotações\n• Configurações\n• Histórico\n\nEsta ação NÃO pode ser desfeita!')) {
                this.showLoading(true);
                
                // Clear all app data
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(APP_CONFIG.STORAGE_PREFIX)) {
                        localStorage.removeItem(key);
                    }
                });
                
                setTimeout(() => {
                    this.showLoading(false);
                    this.toast('🗑️ Todos os dados foram limpos. Recarregando...', 'warning');
                    setTimeout(() => location.reload(), 2000);
                }, 1500);
            }
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            this.toast('Erro ao limpar dados.', 'error');
        }
    }

    /* ===== SIGNUP AND AUTH ===== */
    saveInitialAccount() {
        try {
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const submitBtn = document.getElementById('signup-submit');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            // Validation
            let isValid = true;

            if (!Utils.validate.name(name)) {
                nameInput.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                nameInput.style.borderColor = 'var(--success)';
            }

            if (!Utils.validate.email(email)) {
                emailInput.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                emailInput.style.borderColor = 'var(--success)';
            }

            if (!isValid) {
                this.toast('Por favor, corrija os campos destacados.', 'error');
                return;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Simulate API call
            setTimeout(() => {
                this.stateManager.update({
                    account: {
                        ...this.stateManager.state.account,
                        name,
                        email,
                        createdAt: new Date().toISOString()
                    },
                    currentScreen: 'home'
                });

                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }

                this.toast(`🎉 Bem-vindo(a), ${name}! Prepare-se para transformar sua família.`, 'success');
                this.navWithHistory('home');
            }, 1500);
        } catch (error) {
            console.error('Erro ao salvar conta inicial:', error);
            this.toast('Erro ao criar conta. Tente novamente.', 'error');
        }
    }

    /* ===== NOVAS FUNCIONALIDADES OTIMIZADAS ===== */
    
    // Prevenção de duplo clique em botões
    debounceButtonClick(element, callback, delay = 1000) {
        if (element.classList.contains('clicked')) return;
        
        element.classList.add('clicked');
        callback();
        
        setTimeout(() => {
            element.classList.remove('clicked');
        }, delay);
    }

    // Sistema de histórico de navegação
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

    // Anúncios de acessibilidade
    announceScreenChange(screenName) {
        const announcement = document.getElementById('a11y-announcement');
        if (announcement) {
            announcement.textContent = `Navegou para: ${this.getScreenName(screenName)}`;
            
            // Limpar após 3 segundos
            setTimeout(() => {
                announcement.textContent = '';
            }, 3000);
        }
    }

    getScreenName(screen) {
        const screenNames = {
            'home': 'Página Inicial',
            'aulas': 'Lista de Aulas',
            'aula': 'Aula',
            'profile': 'Perfil',
            'notes': 'Anotações',
            'favorites': 'Favoritos',
            'faq': 'Perguntas Frequentes',
            'benefits': 'Benefícios',
            'sentiments': 'Gestão de Emoções',
            'share': 'Compartilhar',
            'complete': 'Progresso'
        };
        return screenNames[screen] || screen;
    }

    // Função para calcular streak de login
    calculateStreak() {
        try {
            const lastLogin = new Date(this.stateManager.state.stats.lastLogin);
            const today = new Date();
            const diffTime = Math.abs(today - lastLogin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Login consecutivo
                this.stateManager.state.stats.streak++;
            } else if (diffDays > 1) {
                // Quebrou a sequência
                this.stateManager.state.stats.streak = 1;
            }
            
            this.stateManager.state.stats.lastLogin = today.toISOString();
            this.stateManager.saveState();
        } catch (error) {
            console.error('Erro ao calcular streak:', error);
        }
    }

    // Função para atualizar tempo gasto
    updateTimeSpent(minutes) {
        try {
            this.stateManager.state.stats.totalTimeSpent += minutes;
            this.stateManager.saveState();
            
            // Atualizar estatísticas na UI se estiver na tela de perfil
            if (this.stateManager.state.currentScreen === 'profile') {
                this.renderProfile();
            }
        } catch (error) {
            console.error('Erro ao atualizar tempo gasto:', error);
        }
    }

    // Agendar lembretes de estudo
    scheduleStudyReminders() {
        if (!this.stateManager.state.account.reminders) return;

        try {
            // Verificar se há aulas pendentes
            const progress = this.stateManager.getProgress();
            if (progress.percentage < 100) {
                const nextAula = this.findNextPendingAula();
                if (nextAula) {
                    const reminderTime = new Date();
                    reminderTime.setHours(19, 0, 0); // 19:00

                    if (reminderTime > new Date()) {
                        setTimeout(() => {
                            if ("Notification" in window && Notification.permission === "granted") {
                                new Notification("📚 Lembrete de Estudo", {
                                    body: `Hora de continuar sua jornada! Próxima aula: ${nextAula.title}`,
                                    icon: "/icon-192.png"
                                });
                            }
                        }, reminderTime - new Date());
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao agendar lembretes:', error);
        }
    }

    // Encontrar próxima aula pendente
    findNextPendingAula() {
        try {
            for (let moduleId = 0; moduleId < COURSE.modules.length; moduleId++) {
                const module = COURSE.modules[moduleId];
                for (let aulaId = 0; aulaId < module.aulas.length; aulaId++) {
                    const aulaKey = `M${moduleId}-A${aulaId}`;
                    if (!this.stateManager.state.completedAulas[aulaKey] && 
                        this.stateManager.isAulaUnlocked(moduleId, aulaId)) {
                        return {
                            moduleId,
                            aulaId,
                            title: module.aulas[aulaId].title,
                            moduleTitle: module.title
                        };
                    }
                }
            }
            return null;
        } catch (error) {
            console.error('Erro ao encontrar próxima aula:', error);
            return null;
        }
    }

    // Lazy loading para imagens
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Prefetch de recursos
    prefetchResources() {
        // Prefetch próximos módulos
        const nextModuleId = this.stateManager.state.moduleIndex + 1;
        if (nextModuleId < COURSE.modules.length) {
            const nextModule = COURSE.modules[nextModuleId];
            nextModule.aulas.forEach(aula => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = aula.video;
                document.head.appendChild(link);
            });
        }
    }

    // Verificar status de conectividade
    checkConnectivity() {
        const statusElement = document.getElementById('connectivity-status');
        if (!statusElement) return;

        if (navigator.onLine) {
            statusElement.style.display = 'none';
        } else {
            statusElement.style.display = 'flex';
            statusElement.innerHTML = `
                <i class="fas fa-wifi"></i>
                <span>Você está offline</span>
            `;
        }
    }

    // Sincronizar dados quando online
    syncWhenOnline() {
        window.addEventListener('online', () => {
            this.toast('Conexão restaurada - sincronizando dados...', 'success');
            
            // Tentar sincronizar dados pendentes
            const pendingActions = Utils.storage.get('pendingActions', []);
            if (pendingActions.length > 0) {
                pendingActions.forEach(action => {
                    // Processar ações pendentes
                    console.log('Processando ação pendente:', action);
                });
                Utils.storage.set('pendingActions', []);
            }
        });
    }

    // Melhorar navegação por teclado
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navegação entre módulos com teclado
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const currentScreen = this.stateManager.state.currentScreen;
                
                if (currentScreen === 'aula') {
                    const { moduleIndex, aulaIndex } = this.stateManager.state;
                    const module = COURSE.modules[moduleIndex];
                    
                    if (e.key === 'ArrowRight' && aulaIndex < module.aulas.length - 1) {
                        // Próxima aula
                        this.navWithHistory('aula', moduleIndex, aulaIndex + 1);
                    } else if (e.key === 'ArrowLeft' && aulaIndex > 0) {
                        // Aula anterior
                        this.navWithHistory('aula', moduleIndex, aulaIndex - 1);
                    }
                }
            }
            
            // Atalho para busca
            if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                document.getElementById('search-modules')?.focus();
            }
        });
    }

    // Animação de confete para conquistas
    showConfetti() {
        try {
            const progress = this.stateManager.getProgress();
            
            // Mostrar confetti para marcos importantes
            const milestones = [25, 50, 75, 100];
            if (milestones.includes(progress.percentage)) {
                const confettiCount = 100;
                const colors = ['#4A90E2', '#FF8F00', '#9b59b6', '#00C853'];
                
                for (let i = 0; i < confettiCount; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.style.cssText = `
                            position: fixed;
                            width: 10px;
                            height: 10px;
                            background: ${colors[Math.floor(Math.random() * colors.length)]};
                            top: -10px;
                            left: ${Math.random() * 100}vw;
                            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                            z-index: 10000;
                            pointer-events: none;
                        `;
                        
                        document.body.appendChild(confetti);
                        
                        // Remover após animação
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.parentNode.removeChild(confetti);
                            }
                        }, 5000);
                    }, i * 30);
                }
                
                // Adicionar estilo de animação se não existir
                if (!document.querySelector('#confetti-styles')) {
                    const style = document.createElement('style');
                    style.id = 'confetti-styles';
                    style.textContent = `
                        @keyframes confetti-fall {
                            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar confetti:', error);
        }
    }

    // Efeito de pulso para novos conteúdos
    highlightNewContent(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('pulse-highlight');
            setTimeout(() => {
                element.classList.remove('pulse-highlight');
            }, 3000);
        }
    }

    // Importar dados de backup
    importUserData(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const userData = JSON.parse(e.target.result);
                    
                    if (confirm('Deseja restaurar este backup? Isso sobrescreverá seus dados atuais.')) {
                        // Validar estrutura dos dados
                        if (userData.account && userData.progress) {
                            this.stateManager.update(userData);
                            this.toast('✅ Dados restaurados com sucesso!', 'success');
                            setTimeout(() => location.reload(), 1000);
                        } else {
                            this.toast('Arquivo de backup inválido', 'error');
                        }
                    }
                } catch (parseError) {
                    console.error('Erro ao analisar arquivo:', parseError);
                    this.toast('Arquivo de backup corrompido', 'error');
                }
            };
            
            reader.readAsText(file);
            
            // Resetar input
            event.target.value = '';
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            this.toast('Erro ao importar dados', 'error');
        }
    }

    // Gerar relatório de progresso detalhado
    generateProgressReport() {
        try {
            const progress = this.stateManager.getProgress();
            const { account, stats } = this.stateManager.state;
            
            const report = `
RELATÓRIO DE PROGRESSO - UNIVERSIDADE DE PAIS
Data: ${new Date().toLocaleDateString('pt-BR')}
Usuário: ${account.name}

PROGRESSO GERAL:
• Aulas concluídas: ${progress.completedCount}/${progress.totalCount}
• Progresso total: ${progress.percentage}%
• Tempo total gasto: ${Math.round(stats.totalTimeSpent / 60)} horas
• Sequência atual: ${stats.streak} dias

MÓDULOS:
${COURSE.modules.map(mod => {
    const modProgress = this.stateManager.getModuleProgress(mod.id);
    return `• ${mod.title}: ${modProgress.completed}/${modProgress.total} aulas (${Math.round((modProgress.completed / modProgress.total) * 100)}%)`;
}).join('\n')}

AULAS FAVORITAS: ${this.stateManager.state.bookmarkedAulas.length}
NOTAS SALVAS: ${Utils.storage.get('userNotesList', []).length}
            `.trim();

            // Criar e baixar relatório
            const blob = new Blob([report], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `relatorio-progresso-${Utils.formatDate()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.toast('📊 Relatório gerado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            this.toast('Erro ao gerar relatório', 'error');
        }
    }

    // NOVA FUNÇÃO: Handle existing user
    handleExistingUser() {
        const savedState = Utils.storage.get('appState');
        if (savedState && savedState.account.name) {
            this.stateManager.update(savedState);
            this.nav('home');
            this.toast(`Bem-vindo de volta, ${savedState.account.name}!`, 'success');
        } else {
            this.toast('Nenhuma conta encontrada. Crie uma nova conta.', 'warning');
        }
    }
}

/* ===== INITIALIZATION ===== */
// Create global app instance
const app = new UniversidadePaisApp();

// Make essential functions globally available
window.nav = (screen, modIdx, aulaIdx) => app.navWithHistory(screen, modIdx, aulaIdx);
window.navBack = () => app.navBack();
window.toggleMenu = (force) => app.toggleMenu(force);
window.toast = (message, type) => app.toast(message, type);
window.saveInitialAccount = () => app.saveInitialAccount();
window.toggleDarkMode = (checkbox) => app.toggleDarkMode(checkbox);
window.handleNotificationToggle = (checkbox) => app.handleNotificationToggle(checkbox);
window.handleReminderToggle = (checkbox) => app.handleReminderToggle(checkbox);
window.updateProfilePhoto = (event) => app.updateProfilePhoto(event);
window.removeProfilePhoto = () => app.removeProfilePhoto();
window.saveAccountSettings = () => app.saveAccountSettings();
window.sendContactMessage = () => app.sendContactMessage();
window.clearNotes = () => app.clearNotes();
window.shareNotes = () => app.shareNotes();
window.downloadNotes = () => app.downloadNotes();
window.shareApp = () => app.shareApp();
window.shareCurrentAula = () => app.shareCurrentAula();
window.shareProgress = () => app.shareProgress();
window.filterBenefits = (category) => app.filterBenefits(category);
window.filterEmotions = (category) => app.filterEmotions(category);
window.exportUserData = () => app.exportUserData();
window.clearAllData = () => app.clearAllData();
window.importUserData = (event) => app.importUserData(event);
window.generateProgressReport = () => app.generateProgressReport();
window.handleExistingUser = () => app.handleExistingUser();

// Quiz functions
window.startQuiz = (moduleId, aulaId) => app.startQuiz(moduleId, aulaId);
window.submitAnswer = (moduleId, aulaId, selectedIndex) => app.submitAnswer(moduleId, aulaId, selectedIndex);
window.nextQuizStep = (moduleId, aulaId) => app.nextQuizStep(moduleId, aulaId);
window.markAulaComplete = (moduleId, aulaId) => app.markAulaComplete(moduleId, aulaId);

// Notes functions
window.saveNote = () => app.saveNote();
window.toggleNoteFavorite = (noteId) => app.toggleNoteFavorite(noteId);
window.deleteNote = (noteId) => app.deleteNote(noteId);
window.filterNotes = (filterType) => app.filterNotes(filterType);

// FAQ functions
window.toggleFAQ = (element) => app.toggleFAQ(element);

// Social sharing
window.shareOnWhatsApp = () => app.shareOnWhatsApp();
window.shareOnFacebook = () => app.shareOnFacebook();
window.shareOnTwitter = () => app.shareOnTwitter();
window.copyShareLink = () => app.copyShareLink();

// Otimizações
window.debounceButtonClick = (element, callback) => app.debounceButtonClick(element, callback);
window.highlightNewContent = (elementId) => app.highlightNewContent(elementId);
window.updateTimeSpent = (minutes) => app.updateTimeSpent(minutes);

// Adicionar event listeners adicionais
document.addEventListener('DOMContentLoaded', function() {
    // Configurar input de importação
    const importInput = document.getElementById('import-data');
    if (importInput) {
        importInput.addEventListener('change', app.importUserData.bind(app));
    }
    
    // Adicionar elemento de anúncio de acessibilidade
    if (!document.getElementById('a11y-announcement')) {
        const announcement = document.createElement('div');
        announcement.id = 'a11y-announcement';
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.setAttribute('aria-live', 'polite');
        document.body.appendChild(announcement);
    }
    
    // Adicionar elemento de status de conectividade
    if (!document.getElementById('connectivity-status')) {
        const status = document.createElement('div');
        status.id = 'connectivity-status';
        status.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--warning);
            color: white;
            padding: 8px 16px;
            text-align: center;
            z-index: 10001;
            font-size: 14px;
        `;
        document.body.appendChild(status);
    }
});

console.log(`🎓 ${APP_CONFIG.NAME} v${APP_CONFIG.VERSION} initialized successfully!`);