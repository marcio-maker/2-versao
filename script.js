// script.js

/* Demo app logic: single-file SPA behavior */

/* --- sample data --- */

// SIMULAÇÃO: Links de vídeos e imagens (Para garantir que todos funcionem)
const VIDEO_IDS = ["hB1UNt93FN8", "vehTS91mObM", "2H85Q_UjF5o", "hB1UNt93FN8", "vehTS91mObM"];
function getVideoUrl(index) {
  const videoId = VIDEO_IDS[index % VIDEO_IDS.length];
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
function getAulaImgUrl(moduleId, aulaId) {
    return `https://picsum.photos/seed/aula${moduleId}-${aulaId}/50/50`;
}

const COURSE = {
  title: "Conexão Pais e Filhos",
  modules: [
    {
      id: 0, title: "Módulo 1: Tranquilizando os Pais", description: "Acalmando preocupações comuns dos pais e fortalecendo a base familiar.",
      aulas: [
        { id: 0, title: "Aula 1: Entendendo as Preocupações", video: getVideoUrl(0), quizId: 0 },
        { id: 1, title: "Aula 2: Comunicação Familiar", video: getVideoUrl(1), quizId: 1 },
        { id: 2, title: "Aula 3: Gestão de Conflitos", video: getVideoUrl(2), quizId: 2 },
        { id: 3, title: "Aula 4: Estabelecendo Limites", video: getVideoUrl(3), quizId: 3 },
        { id: 4, title: "Aula 5: O Poder do Exemplo", video: getVideoUrl(4), quizId: 4 },
        { id: 5, title: "Aula 6: A Importância do Tempo Juntos", video: getVideoUrl(0), quizId: 5 },
        { id: 6, title: "Aula 7: Lidando com a Tecnologia", video: getVideoUrl(1), quizId: 6 },
        { id: 7, title: "Aula 8: Respeito Mútuo", video: getVideoUrl(2), quizId: 7 }
      ]
    },
    {
      id: 1, title: "Módulo 2: Conectando com o Adolescente", description: "Técnicas avançadas de escuta, empatia e validação de sentimentos complexos.",
      aulas: [
        { id: 0, title: "Aula 9: A Arte de Ouvir", video: getVideoUrl(3), quizId: 8 },
        { id: 1, title: "Aula 10: Validando Sentimentos", video: getVideoUrl(4), quizId: 9 },
        { id: 2, title: "Aula 11: Conversas Difíceis", video: getVideoUrl(0), quizId: 10 },
        { id: 3, title: "Aula 12: Elogio Efetivo", video: getVideoUrl(1), quizId: 11 },
        { id: 4, title: "Aula 13: O Mundo Deles", video: getVideoUrl(2), quizId: 12 },
        { id: 5, title: "Aula 14: Espaço e Confiança", video: getVideoUrl(3), quizId: 13 },
        { id: 6, title: "Aula 15: Entendendo a Rebeldia", video: getVideoUrl(4), quizId: 14 },
        { id: 7, title: "Aula 16: O Papel do Humor", video: getVideoUrl(0), quizId: 15 }
      ]
    },
    {
      id: 2, title: "Módulo 3: Ferramentas de Impacto", description: "Estratégias práticas e ferramentas validadas para mudança de comportamento imediata.",
      aulas: [
        { id: 0, title: "Aula 17: O Diário da Gratidão", video: getVideoUrl(1), quizId: 16 },
        { id: 1, title: "Aula 18: Contratos Familiares", video: getVideoUrl(2), quizId: 17 },
        { id: 2, title: "Aula 19: A Roda das Emoções", video: getVideoUrl(3), quizId: 18 },
        { id: 3, title: "Aula 20: Reuniões de Família", video: getVideoUrl(4), quizId: 19 },
        { id: 4, title: "Aula 21: Reforço Positivo", video: getVideoUrl(0), quizId: 20 },
        { id: 5, title: "Aula 22: Consequências Naturais", video: getVideoUrl(1), quizId: 21 },
        { id: 6, title: "Aula 23: O Poder da Escolha", video: getVideoUrl(2), quizId: 22 },
        { id: 7, title: "Aula 24: Rotinas Saudáveis", video: getVideoUrl(3), quizId: 23 }
      ]
    },
    {
      id: 3, title: "Módulo 4: Crescendo Juntos", description: "Visão de longo prazo, definindo valores e construindo um legado familiar duradouro.",
      aulas: [
        { id: 0, title: "Aula 25: Definindo Valores", video: getVideoUrl(4), quizId: 24 },
        { id: 1, title: "Aula 26: Sonhos e Metas", video: getVideoUrl(0), quizId: 25 },
        { id: 2, title: "Aula 27: Legado Familiar", video: getVideoUrl(1), quizId: 26 },
        { id: 3, title: "Aula 28: A Jornada Continua", video: getVideoUrl(2), quizId: 27 },
        { id: 4, title: "Aula 29: O Que Fazer Agora", video: getVideoUrl(3), quizId: 28 },
        { id: 5, title: "Aula 30: Celebrando Conquistas", video: getVideoUrl(4), quizId: 29 },
        { id: 6, title: "Aula 31: Mais Recursos", video: getVideoUrl(0), quizId: 30 },
        { id: 7, title: "Aula 32: Mensagem Final", video: getVideoUrl(1), quizId: 31 }
      ]
    }
  ]
};

// --- ESTRUTURA DE QUIZ MULTI-ETAPAS ---
const QUIZ = [
  // Quiz 0: Exemplo Completo para a primeira aula
  {
    id: 0,
    title: "Questionário Essencial",
    steps: [
      {
        question: "1/3: Qual o primeiro passo para tranquilizar as preocupações parentais?",
        options: ["Buscar a causa na criança.", "Entender suas próprias emoções."],
        answer: 1, 
        explanation: "A tranquilidade começa em você. Gerenciar suas emoções é crucial."
      },
      {
        question: "2/3: Qual o pilar mais importante para estabelecer limites eficazes?",
        options: ["Ameaças e gritos.", "Consistência e amor.", "Flexibilidade total."],
        answer: 1, 
        explanation: "Limites funcionam quando são aplicados de forma consistente, com amor e respeito."
      },
      {
        question: "3/3: Quais ações promovem a paz no lar (Escolha uma)?",
        options: ["Gritar quando o filho desobedece.", "Ter reuniões familiares semanais.", "Ignorar conflitos menores."],
        answer: 1,
        explanation: "Ter reuniões familiares semanais aumenta a comunicação e o senso de pertencimento, promovendo a paz e a colaboração."
      }
    ]
  },
  // Quizzes de 1 a 31: Usaremos a mesma estrutura de 3 perguntas para simulação
  ...Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    title: `Revisão da Aula ${i + 2}`,
    steps: [
      { question: `1/3: Questão de Foco da Aula ${i + 2}?`, options: ["Opção A", "Opção B (Correta)"], answer: 1, explanation: `Reforce a ideia central da Aula ${i + 2}: A resposta correta foi a B.` },
      { question: `2/3: O que você aprendeu sobre o tema principal?`, options: ["Ação 1 errada", "Ação 2 (Correta)", "Ação 3 errada"], answer: 1, explanation: `A Ação 2 é a recomendada para esta situação.` },
      { question: `3/3: Como aplicar o aprendizado na prática?`, options: ["Erro 1", "Erro 2", "Prática Correta (Correta)", "Erro 3"], answer: 2, explanation: `A Prática Correta (opção 3) é a chave para o sucesso desta lição.` }
    ]
  }))
];

/* --- App State Management (Persistência com localStorage) --- */
const state = {
  // Se o nome de usuário não existir, força 'signup'
  currentScreen: localStorage.getItem('accountName') ? (localStorage.getItem('lastScreen') || 'home') : 'signup',
  moduleIndex: parseInt(localStorage.getItem('moduleIndex')) || 0,
  aulaIndex: parseInt(localStorage.getItem('aulaIndex')) || 0,
  // 0: intro, 1..N: perguntas, N+1: resultados
  currentQuizStep: parseInt(localStorage.getItem('currentQuizStep')) || 0,
  quizScores: JSON.parse(localStorage.getItem('quizScores')) || {}, 
  completedAulas: JSON.parse(localStorage.getItem('completedAulas')) || {},
  bookmarkedAulas: JSON.parse(localStorage.getItem('bookmarkedAulas')) || [],
  account: {
    name: localStorage.getItem('accountName') || '',
    email: localStorage.getItem('accountEmail') || '',
    notifications: JSON.parse(localStorage.getItem('notifications') ?? 'true'),
    reminders: JSON.parse(localStorage.getItem('reminders') ?? 'false'),
    darkMode: JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  }
};

function saveState() {
  localStorage.setItem('lastScreen', state.currentScreen);
  localStorage.setItem('moduleIndex', state.moduleIndex);
  localStorage.setItem('aulaIndex', state.aulaIndex);
  localStorage.setItem('currentQuizStep', state.currentQuizStep);
  localStorage.setItem('quizScores', JSON.stringify(state.quizScores));
  localStorage.setItem('completedAulas', JSON.stringify(state.completedAulas));
  localStorage.setItem('bookmarkedAulas', JSON.stringify(state.bookmarkedAulas));
  localStorage.setItem('darkMode', JSON.stringify(state.account.darkMode));
  localStorage.setItem('accountName', state.account.name);
  localStorage.setItem('accountEmail', state.account.email);
  localStorage.setItem('notifications', JSON.stringify(state.account.notifications));
  localStorage.setItem('reminders', JSON.stringify(state.account.reminders));
}

// Retorna o progresso de um módulo
function getModuleProgress(moduleId) {
  const moduleData = COURSE.modules[moduleId];
  let completed = 0;
  moduleData.aulas.forEach(aula => {
    if (state.completedAulas[`M${moduleId}-A${aula.id}`]) {
      completed++;
    }
  });
  return { completed, total: moduleData.aulas.length };
}

// Retorna o progresso total do curso em porcentagem
function getTotalProgress() {
  let completedCount = Object.keys(state.completedAulas).filter(key => state.completedAulas[key]).length;
  let totalCount = COURSE.modules.reduce((acc, mod) => acc + mod.aulas.length, 0);
  let percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return { completedCount, totalCount, percentage };
}

// Exibe um toast (notificação)
function toast(message, type = 'default', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = message;
  container.appendChild(t);

  void t.offsetWidth; // Força reflow

  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
    t.classList.add('hide');

    t.addEventListener('transitionend', () => {
      if (t.parentNode === container) {
        container.removeChild(t);
      }
    }, { once: true });
  }, duration);
}

// Verifica se a aula está desbloqueada
function isAulaUnlocked(moduleId, aulaId) {
  if (moduleId === 0 && aulaId === 0) return true;

  if (aulaId > 0) {
    const previousAulaId = aulaId - 1;
    return state.completedAulas[`M${moduleId}-A${previousAulaId}`] === true;
  } else if (moduleId > 0) {
    const prevModuleId = moduleId - 1;
    const prevModuleProgress = getModuleProgress(prevModuleId);
    return prevModuleProgress.completed === prevModuleProgress.total;
  }

  return false;
}

// Alterna o estado de favorito da aula
function toggleBookmark(moduleId, aulaId) {
  const aulaKey = `M${moduleId}-A${aulaId}`;
  const bookmarkBtn = document.getElementById('bookmark-btn');
  const index = state.bookmarkedAulas.indexOf(aulaKey);

  if (index > -1) {
    state.bookmarkedAulas.splice(index, 1);
    bookmarkBtn.textContent = '🔖 Marcar Aula';
    toast('Aula removida dos favoritos.', 'default');
  } else {
    state.bookmarkedAulas.push(aulaKey);
    bookmarkBtn.textContent = '🔖 Aula Marcada';
    toast('Aula marcada como favorita!', 'success');
  }
  saveState();
}

// Marca a aula como concluída e navega
function markAulaComplete(moduleId, aulaId) {
  const aulaKey = `M${moduleId}-A${aulaId}`;
  state.completedAulas[aulaKey] = true;
  state.currentQuizStep = 0;
  saveState();
  nav('complete');
}

// Navegação entre telas
function nav(screen, modIdx = null, aulaIdx = null) {
  toggleMenu(false);

  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  const targetScreen = document.getElementById(`screen-${screen}`);
  if (targetScreen) {
    targetScreen.style.display = 'block';
  } else {
    console.error(`Tela não encontrada: screen-${screen}`);
    return;
  }

  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItem = document.getElementById(`nav-${screen}`);
  if (navItem) {
    navItem.classList.add('active');
  } else if (['aulas', 'aula', 'complete'].includes(screen)) {
    document.getElementById('nav-home').classList.add('active');
  }

  state.currentScreen = screen;
  saveState();

  switch (screen) {
    case 'home':
      renderModules();
      break;
    case 'aulas':
      if (modIdx !== null) { state.moduleIndex = modIdx; saveState(); }
      renderAulas(state.moduleIndex);
      break;
    case 'aula':
      if (modIdx !== null && aulaIdx !== null) {
        state.moduleIndex = modIdx;
        state.aulaIndex = aulaIdx;
        state.currentQuizStep = 0; // Reinicia o quiz ao entrar
        saveState();
      }
      renderAula(state.moduleIndex, state.aulaIndex);
      break;
    case 'complete':
      renderCompleteScreen();
      break;
    case 'profile':
      renderProfile();
      break;
  }
}

// Alterna o menu dropdown
function toggleMenu(force = null) {
  const menu = document.getElementById('menu-dropdown');
  const isActive = menu.classList.contains('active');

  if (force === true || (force === null && !isActive)) {
    menu.classList.add('active');
    menu.style.display = 'block';
  } else if (force === false || (force === null && isActive)) {
    menu.classList.remove('active');
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300);
  }
}

/* --- Renderização de Telas --- */

function renderModules() {
  const modulesContainer = document.getElementById('modules');
  modulesContainer.innerHTML = '';
  const totalProgress = getTotalProgress();

  COURSE.modules.forEach(mod => {
    const progress = getModuleProgress(mod.id);
    const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
    
    // Módulo só desbloqueia se o anterior estiver 100% concluído
    const isLocked = mod.id > 0 && getModuleProgress(mod.id - 1).completed < getModuleProgress(mod.id - 1).total;
    const navFunc = isLocked ? `toast('Conclua o módulo anterior para desbloquear.')` : `nav('aulas', ${mod.id})`;

    modulesContainer.innerHTML += `
      <div class="module ${isLocked ? 'locked' : ''}" onclick="${navFunc}">
        <img class="module-img" src="https://picsum.photos/seed/familia_m${mod.id}/60/60" alt="${mod.title}">
        <div class="module-info">
          <h3>${mod.title}</h3>
          <p>${mod.description}</p>
          <div class="module-progress">
            <progress value="${progress.completed}" max="${progress.total}"></progress>
            <span class="progress-text">${progress.completed} / ${progress.total} Aulas</span>
          </div>
        </div>
        <div class="module-status">${isLocked ? '🔒' : (progressPercent === 100 ? '✅' : '▶️')}</div>
      </div>
    `;
  });

  const totalAulasElement = document.querySelector('.course-head .meta');
  if (totalAulasElement) {
    totalAulasElement.textContent = `${totalProgress.completedCount} / ${totalProgress.totalCount} Aulas (${totalProgress.percentage}%)`;
  }
}

function renderAulas(moduleId) {
  const moduleData = COURSE.modules[moduleId];
  const aulasList = document.getElementById('aulas-list');
  const progress = getModuleProgress(moduleId);

  document.getElementById('module-title').textContent = moduleData.title;
  document.getElementById('module-progress').textContent = `${progress.completed} / ${progress.total}`;

  aulasList.innerHTML = '';

  moduleData.aulas.forEach(aula => {
    const aulaKey = `M${moduleId}-A${aula.id}`;
    const isCompleted = state.completedAulas[aulaKey] === true;
    const isUnlocked = isAulaUnlocked(moduleId, aula.id);

    const aulaClass = isCompleted ? 'completed' : (isUnlocked ? '' : 'locked');
    let iconOverlay = isCompleted ? '✅' : (isUnlocked ? '▶️' : '🔒');

    const navFunc = isUnlocked ? `nav('aula', ${moduleId}, ${aula.id})` : `toast('Conclua a aula anterior para desbloquear.')`;

    aulasList.innerHTML += `
      <div class="aula ${aulaClass}" onclick="${navFunc}">
        <div class="aula-img-wrap">
          <img class="aula-img" src="${getAulaImgUrl(moduleId, aula.id)}" alt="Aula Thumbnail">
          <div class="aula-icon-overlay">${iconOverlay}</div>
        </div>
        <div class="aula-info">
          <h3>${aula.title}</h3>
          <p>Vídeo Aula · 8 min</p>
        </div>
        <div class="aula-status">${isCompleted ? 'Concluída' : ''}</div>
      </div>
    `;
  });
}

// Renderiza a tela da aula (vídeo + quiz)
function renderAula(moduleId, aulaId) {
  const moduleData = COURSE.modules[moduleId];
  const aula = moduleData.aulas.find(a => a.id === aulaId);
  if (!aula) return;

  const aulaKey = `M${moduleId}-A${aulaId}`;
  const isBookmarked = state.bookmarkedAulas.includes(aulaKey);
  const quizData = QUIZ.find(q => q.id === aula.quizId);
  const currentStep = state.currentQuizStep;
  const totalSteps = quizData.steps.length;

  // 1. Atualiza Player e Título
  document.getElementById('aula-video').src = aula.video;
  document.getElementById('aula-title').textContent = aula.title;

  // 2. Atualiza botões de Ação (Favoritar e Concluir)
  const bookmarkBtn = document.getElementById('bookmark-btn');
  bookmarkBtn.textContent = isBookmarked ? '🔖 Aula Marcada' : '🔖 Marcar Aula';
  bookmarkBtn.onclick = () => toggleBookmark(moduleId, aulaId);
  
  const markCompleteBtn = document.getElementById('mark-complete-btn');
  const aulaContent = document.getElementById('aula-content');

  // Lógica de Estado do Quiz
  if (currentStep === 0) { // Fase do Vídeo
    aulaContent.innerHTML = `
      <div class="card">
        <h3>Conteúdo da Aula</h3>
        <p class="muted">Assista ao vídeo e prepare-se para o Questionário de Revisão em seguida.</p>
        <button class="btn" onclick="startQuiz(${moduleId}, ${aulaId})">Iniciar Questionário</button>
      </div>
    `;
    markCompleteBtn.style.display = 'none';
  } else if (currentStep > 0 && currentStep <= totalSteps) { // Fase de Perguntas
    renderQuizStep(moduleId, aulaId);
    markCompleteBtn.style.display = 'none';
  } else if (currentStep > totalSteps) { // Fase de Resultados
    renderQuizResults(moduleId, aulaId);
    markCompleteBtn.style.display = 'block';
    markCompleteBtn.textContent = 'Marcar como Concluída';
    markCompleteBtn.onclick = () => markAulaComplete(moduleId, aulaId);
  }
}

// Inicia o quiz (muda do passo 0 para 1)
function startQuiz(moduleId, aulaId) {
  state.currentQuizStep = 1;
  const aulaKey = `M${moduleId}-A${aulaId}`;
  state.quizScores[aulaKey] = 0;
  saveState();
  renderAula(moduleId, aulaId);
}

// Renderiza o passo atual do quiz
function renderQuizStep(moduleId, aulaId) {
  const aula = COURSE.modules[moduleId].aulas[aulaId];
  const quizData = QUIZ.find(q => q.id === aula.quizId);
  const stepIndex = state.currentQuizStep - 1;
  const currentStep = quizData.steps[stepIndex];
  const aulaContent = document.getElementById('aula-content');

  let optionsHtml = currentStep.options.map((option, index) => `
    <div class="option-card" onclick="submitAnswer(${moduleId}, ${aulaId}, ${index})">
      <span class="option-text">${option}</span>
      <span class="option-icon"></span>
    </div>
  `).join('');

  aulaContent.innerHTML = `
    <div class="card quiz-step" id="current-quiz-step">
      <h3>${quizData.title}</h3>
      <p style="font-weight:600">${currentStep.question}</p>
      <div class="options-container" id="options-container">
        ${optionsHtml}
      </div>
      <div class="quiz-explanation" id="quiz-explanation" style="display:none;">
        <p><strong>Explicação:</strong> ${currentStep.explanation}</p>
        <button id="quiz-action-btn" class="btn" onclick="nextQuizStep(${moduleId}, ${aulaId})">${state.currentQuizStep < quizData.steps.length ? 'Próxima Pergunta' : 'Ver Resultados'}</button>
      </div>
    </div>
  `;
}

// Processa a resposta do usuário
function submitAnswer(moduleId, aulaId, selectedIndex) {
  const options = document.getElementById('options-container').children;
  const quizData = QUIZ.find(q => q.id === COURSE.modules[moduleId].aulas[aulaId].quizId);
  const stepIndex = state.currentQuizStep - 1;
  const currentStep = quizData.steps[stepIndex];
  const correctIndex = currentStep.answer;
  const aulaKey = `M${moduleId}-A${aulaId}`;

  Array.from(options).forEach((opt, index) => {
    opt.classList.add('answered');
    if (index === correctIndex) {
      opt.classList.add('correct');
      opt.querySelector('.option-icon').innerHTML = '✓';
    } else if (index === selectedIndex) {
      opt.classList.add('wrong');
      opt.querySelector('.option-icon').innerHTML = '✕';
    }
  });

  if (selectedIndex === correctIndex) {
    state.quizScores[aulaKey] = (state.quizScores[aulaKey] || 0) + 1;
    toast('Resposta Correta!', 'success');
  } else {
    toast('Resposta Incorreta.', 'error');
  }

  saveState();
  document.getElementById('quiz-explanation').style.display = 'block';
}

// Avança para o próximo passo do quiz ou para os resultados
function nextQuizStep(moduleId, aulaId) {
  state.currentQuizStep++; 
  saveState();
  renderAula(moduleId, aulaId);
}

// Renderiza a tela de resultados do quiz
function renderQuizResults(moduleId, aulaId) {
  const aulaContent = document.getElementById('aula-content');
  const aulaKey = `M${moduleId}-A${aulaId}`;
  const quizData = QUIZ.find(q => q.id === COURSE.modules[moduleId].aulas[aulaId].quizId);
  const score = state.quizScores[aulaKey] || 0;
  const totalQuestions = quizData.steps.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  let resultMessage;
  if (percentage === 100) { resultMessage = "Perfeito! Você dominou o conteúdo e acertou todas as questões. 🎉"; } 
  else if (percentage >= 70) { resultMessage = "Ótimo resultado! Você está no caminho certo."; } 
  else { resultMessage = "Bom esforço! Recomendamos revisar a aula para garantir que os conceitos sejam fixados."; }

  aulaContent.innerHTML = `
    <div class="card">
      <h3>Resultado do Questionário</h3>
      <p class="muted">${resultMessage}</p>
      <div style="text-align:center; margin: 20px 0;">
        <div class="progress-circle" style="border-color: ${percentage >= 70 ? 'var(--success)' : 'var(--warning)'}; color: ${percentage >= 70 ? 'var(--success)' : 'var(--warning)'}; width: 80px; height: 80px;">
          <div style="font-weight:800">${percentage}%</div>
        </div>
        <div class="muted" style="margin-top:8px">Acertos: ${score} de ${totalQuestions}</div>
      </div>
      <button class="btn ghost" onclick="state.currentQuizStep = 0; saveState(); renderAula(${moduleId}, ${aulaId});">Rever Conteúdo da Aula</button>
    </div>
  `;
}

// Renderiza a tela de conclusão (screen-complete)
function renderCompleteScreen() {
  const { percentage } = getTotalProgress();
  const color = percentage < 50 ? '#FFC107' : percentage < 90 ? '#4A90E2' : '#00C853';

  document.getElementById('progress-num').textContent = `${percentage}%`;
  document.getElementById('progress-circle').style.borderColor = color;
  document.getElementById('progress-circle').style.color = color;

  let message = percentage < 100 ? `Seu progresso total` : 'Parabéns! Curso Concluído!';
  document.getElementById('progress-sub').textContent = message;
}

// Renderiza e carrega dados do perfil
function renderProfile() {
  document.getElementById('profile-name').value = state.account.name;
  document.getElementById('profile-email').value = state.account.email;
  document.getElementById('dark-mode-toggle').checked = state.account.darkMode;
  document.getElementById('notifications-toggle').checked = state.account.notifications;
  document.getElementById('reminders-toggle').checked = state.account.reminders;
}

// Salva as configurações do perfil
function saveAccountSettings() {
  const name = document.getElementById('profile-name').value;
  const email = document.getElementById('profile-email').value;

  if (name.trim() && email.match(/^[^s@]+@[^s@]+.[^s@]+$/)) {
    state.account.name = name;
    state.account.email = email;
    saveState();
    toast('Configurações salvas com sucesso!', 'success');
  } else {
    toast('Por favor, insira um nome e email válidos.', 'error');
  }
}

// Lógica de toggle para Dark Mode
function toggleDarkMode(checkbox) {
  state.account.darkMode = checkbox.checked;
  document.body.classList.toggle('dark-mode', state.account.darkMode);
  saveState();
  toast(state.account.darkMode ? 'Modo Escuro Ativado.' : 'Modo Claro Ativado.');
}

// Lógica de toggle para Notificações
function handleNotificationToggle(checkbox) {
  state.account.notifications = checkbox.checked;
  saveState();
  toast(state.account.notifications ? 'Notificações Ativadas.' : 'Notificações Desativadas.');
}

// Lógica de toggle para Lembretes
function handleReminderToggle(checkbox) {
  state.account.reminders = checkbox.checked;
  saveState();
  toast(state.account.reminders ? 'Lembretes Ativados.' : 'Lembretes Desativados.');
}
// Atualiza a foto de perfil com upload
function updateProfilePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const photoElement = document.getElementById('profile-photo');
      photoElement.src = e.target.result;
      localStorage.setItem('profilePhoto', e.target.result);
      toast('Foto atualizada com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
  }
}

// Ao carregar, restaura a foto salva
document.addEventListener('DOMContentLoaded', () => {
  const savedPhoto = localStorage.getItem('profilePhoto');
  if (savedPhoto) {
    const photoElement = document.getElementById('profile-photo');
    if (photoElement) photoElement.src = savedPhoto;
  }
});

/* --- Inicialização --- */
document.addEventListener('DOMContentLoaded', () => {
  // Aplica Dark Mode se estiver ativo no estado
  if (state.account.darkMode) {
    document.body.classList.add('dark-mode');
  }

  // Função para salvar cadastro inicial
  window.saveInitialAccount = function () {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;

    // Feedback visual de erro
    document.getElementById('signup-name').style.borderColor = name.trim() ? 'var(--bg)' : 'var(--danger)';
    document.getElementById('signup-email').style.borderColor = email.match(/^[^s@]+@[^s@]+.[^s@]+$/) ? 'var(--bg)' : 'var(--danger)';

    if (name.trim() && email.match(/^[^s@]+@[^s@]+.[^s@]+$/)) {
      state.account.name = name;
      state.account.email = email;
      saveState();
      toast(`Bem-vindo(a), ${name}!`, 'success');
      nav('home'); 
    } else {
      toast('Por favor, insira um nome e email válidos.', 'error');
    }
  }

  // Define a tela inicial com base no estado e cadastro
  nav(state.currentScreen);
});
