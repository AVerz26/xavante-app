// main.js - Controlador Principal da Aplicação Aprenda Xavante
import './style.css';
import { UNITS, ACHIEVEMENTS } from './data/lessons.js';
import { DICTIONARY, CATEGORIES } from './data/dictionary.js';
import { appState } from './state.js';
import { sounds } from './soundEngine.js';
import { LessonEngine } from './lessonEngine.js';

// DOM Elements
const el = {
  // Top Stats
  streakCount: document.getElementById('streak-count'),
  gemsCount: document.getElementById('gems-count'),
  heartsCount: document.getElementById('hearts-count'),
  heartIcon: document.getElementById('heart-icon'),

  // Views
  viewTrail: document.getElementById('view-trail'),
  viewDictionary: document.getElementById('view-dictionary'),
  viewPractice: document.getElementById('view-practice'),
  viewProfile: document.getElementById('view-profile'),

  // Navigation
  navButtons: document.querySelectorAll('.nav-item'),

  // Dictionary
  dictSearchInput: document.getElementById('dict-search-input'),
  dictCategoryChips: document.getElementById('dict-category-chips'),
  dictCardsList: document.getElementById('dict-cards-list'),

  // Practice
  btnStartPractice: document.getElementById('btn-start-practice'),

  // Profile
  profileXp: document.getElementById('profile-xp-val'),
  profileStreak: document.getElementById('profile-streak-val'),
  profileStars: document.getElementById('profile-stars-val'),
  profileBadges: document.getElementById('profile-badges-val'),
  achievementsList: document.getElementById('achievements-list'),
  btnToggleSound: document.getElementById('btn-toggle-sound'),
  btnResetData: document.getElementById('btn-reset-data'),

  // Lesson Modal
  modal: document.getElementById('lesson-modal'),
  btnExit: document.getElementById('btn-exit-lesson'),
  progressFill: document.getElementById('lesson-progress-fill'),
  heartsVal: document.getElementById('lesson-hearts-val'),
  exerciseArea: document.getElementById('lesson-exercise-area'),
  footer: document.getElementById('lesson-footer'),
  feedbackBanner: document.getElementById('feedback-banner'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackTitle: document.getElementById('feedback-title'),
  feedbackDesc: document.getElementById('feedback-desc'),
  btnCheck: document.getElementById('btn-check-answer'),
  victoryScreen: document.getElementById('victory-screen'),
  victoryXp: document.getElementById('victory-xp-gained'),
  victoryAccuracy: document.getElementById('victory-accuracy'),
  btnVictoryFinish: document.getElementById('btn-victory-finish')
};

// Global App Variables
let activeTab = 'trail';
let activeCategory = 'todas';
let searchTerm = '';
let lessonEngine = null;

// Initialize App
function initApp() {
  // Register Lesson Engine
  lessonEngine = new LessonEngine(el, () => {
    renderTopStats();
    renderTrail();
    renderProfile();
  });

  // State Subscriptions
  appState.subscribe(() => {
    renderTopStats();
  });

  // Setup UI
  setupNavigation();
  setupDictionary();
  setupPractice();
  setupProfile();
  renderTopStats();
  renderTrail();

  // Register PWA Service Worker (Offline Support)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }
}

// Render Top Bar Stats
function renderTopStats() {
  const state = appState.get();
  el.streakCount.textContent = state.streak;
  el.gemsCount.textContent = state.gems;
  el.heartsCount.textContent = state.hearts;

  if (state.hearts <= 1) {
    el.heartIcon.classList.add('heart-beat');
  } else {
    el.heartIcon.classList.remove('heart-beat');
  }
}

// Navigation Handling
function setupNavigation() {
  el.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchTab(view);
    });
  });
}

function switchTab(viewName) {
  sounds.playTap();
  activeTab = viewName;

  // Update nav buttons
  el.navButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });

  // Show/Hide views
  el.viewTrail.style.display = viewName === 'trail' ? 'flex' : 'none';
  el.viewDictionary.style.display = viewName === 'dictionary' ? 'flex' : 'none';
  el.viewPractice.style.display = viewName === 'practice' ? 'flex' : 'none';
  el.viewProfile.style.display = viewName === 'profile' ? 'flex' : 'none';

  if (viewName === 'trail') renderTrail();
  if (viewName === 'dictionary') renderDictionary();
  if (viewName === 'profile') renderProfile();
}

// --- VIEW 1: TRILHA DUOLINGO ---
function renderTrail() {
  const state = appState.get();
  el.viewTrail.innerHTML = '';

  // Mascot Greeting Banner
  const mascotBanner = document.createElement('div');
  mascotBanner.className = 'mascot-banner';
  mascotBanner.innerHTML = `
    <img src="/assets/mascot.jpg" alt="Tsere" class="mascot-thumb" />
    <div class="mascot-speech">
      <strong>Tô ba!</strong> Eu sou o Tsere, seu guia no aprendizado da língua e cultura A'uwẽ Xavante!
    </div>
  `;
  el.viewTrail.appendChild(mascotBanner);

  // Flatten all levels to determine unlock progression
  const allLevelsOrder = [];
  UNITS.forEach(u => {
    u.levels.forEach(l => allLevelsOrder.push(l.id));
  });

  let globalLevelIndex = 0;

  UNITS.forEach(unit => {
    // Unit Header Banner
    const unitEl = document.createElement('div');
    unitEl.style.display = 'flex';
    unitEl.style.flexDirection = 'column';
    unitEl.style.gap = '20px';

    const banner = document.createElement('div');
    banner.className = 'unit-banner';
    banner.style.background = `linear-gradient(135deg, ${unit.color}, ${unit.accentColor || '#333'})`;
    banner.innerHTML = `
      <div class="unit-tag">${unit.icon} Unidade ${unit.number}</div>
      <div class="unit-title">${unit.title}</div>
      <div class="unit-desc">${unit.description}</div>
    `;
    unitEl.appendChild(banner);

    // Nodes Tree
    const nodesContainer = document.createElement('div');
    nodesContainer.className = 'path-nodes';

    // Positions layout: alternating center -> left -> center -> right
    const positions = ['pos-center', 'pos-left', 'pos-center', 'pos-right'];

    unit.levels.forEach(level => {
      const isCompleted = appState.isLevelCompleted(level.id);
      const isUnlocked = appState.isLevelUnlocked(globalLevelIndex, allLevelsOrder);
      const stars = appState.getLevelStars(level.id);
      const posClass = positions[globalLevelIndex % positions.length];

      const nodeWrapper = document.createElement('div');
      nodeWrapper.className = `path-node-wrapper ${posClass}`;

      let nodeClass = 'node-locked';
      let nodeContent = '🔒';

      if (isCompleted) {
        nodeClass = 'node-completed';
        nodeContent = '⭐';
      } else if (isUnlocked) {
        nodeClass = 'node-active';
        nodeContent = unit.icon;
      }

      nodeWrapper.innerHTML = `
        <button class="node-btn ${nodeClass}" id="node-btn-${level.id}">
          ${nodeContent}
          ${isCompleted ? `<div class="node-stars">${'⭐'.repeat(stars)}</div>` : ''}
        </button>
        <div class="node-label">${level.title}</div>
      `;

      const btn = nodeWrapper.querySelector('.node-btn');
      btn.addEventListener('click', () => {
        if (!isUnlocked) {
          sounds.playWrong();
          alert('Complete as lições anteriores para desbloquear esta fase!');
          return;
        }

        if (state.hearts <= 0) {
          sounds.playWrong();
          alert('Seus corações acabaram! Visite a aba "Praticar" para recarregar.');
          switchTab('practice');
          return;
        }

        sounds.playTap();
        lessonEngine.start(level);
      });

      nodesContainer.appendChild(nodeWrapper);
      globalLevelIndex += 1;
    });

    unitEl.appendChild(nodesContainer);
    el.viewTrail.appendChild(unitEl);
  });
}

// --- VIEW 2: DICIONÁRIO & CULTURA ---
function setupDictionary() {
  // Category Chips
  el.dictCategoryChips.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `chip-btn ${cat.id === activeCategory ? 'active' : ''}`;
    chip.innerHTML = `<span>${cat.icon}</span><span>${cat.name}</span>`;
    chip.addEventListener('click', () => {
      sounds.playTap();
      activeCategory = cat.id;
      document.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderDictionary();
    });
    el.dictCategoryChips.appendChild(chip);
  });

  // Search Input
  el.dictSearchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    renderDictionary();
  });
}

function renderDictionary() {
  el.dictCardsList.innerHTML = '';

  const filtered = DICTIONARY.filter(item => {
    const matchCat = activeCategory === 'todas' || item.category === activeCategory;
    const matchSearch = !searchTerm ||
      item.xavante.toLowerCase().includes(searchTerm) ||
      item.portuguese.toLowerCase().includes(searchTerm) ||
      item.note.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    el.dictCardsList.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #6B7280;">
        <div style="font-size: 40px; margin-bottom: 8px;">🔍</div>
        <p style="font-weight: 700;">Nenhuma palavra encontrada.</p>
        <p style="font-size: 13px;">Tente buscar por termos como "pai", "terra", "água" ou "onça".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dict-card';
    card.innerHTML = `
      <div class="dict-card-top">
        <div>
          <div class="dict-xavante">${item.xavante}</div>
          <div class="dict-phonetic">Pronúncia: ${item.phonetic}</div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="dict-audio-btn btn-audio-normal" title="Ouvir pronúncia">🔊</button>
          <button class="dict-audio-btn btn-audio-slow" style="font-size: 14px;" title="Ouvir pronúncia lenta">🐢</button>
        </div>
      </div>
      <div class="dict-portuguese">${item.portuguese}</div>
      <div class="dict-example">${item.example}</div>
      <div style="font-size: 12px; color: #6B7280; line-height: 1.35; margin-top: 2px;">
        💡 <strong>Cultura:</strong> ${item.note}
      </div>
    `;

    const normalBtn = card.querySelector('.btn-audio-normal');
    const slowBtn = card.querySelector('.btn-audio-slow');

    normalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playWord(item.id, item.xavante, item.ttsHint || item.xavante, false);
      appState.incrementDictionaryExplored();
    });

    slowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playWord(item.id, item.xavante, item.ttsHint || item.xavante, true);
      appState.incrementDictionaryExplored();
    });

    card.addEventListener('click', () => {
      sounds.playWord(item.id, item.xavante, item.ttsHint || item.xavante, false);
      appState.incrementDictionaryExplored();
    });

    el.dictCardsList.appendChild(card);
  });
}

// --- VIEW 3: PRÁTICA RÁPIDA (RECARREGAR CORAÇÕES) ---
function setupPractice() {
  el.btnStartPractice.addEventListener('click', () => {
    sounds.playTap();

    // Create a special training level with 3 random questions
    const randomQuestions = [
      {
        type: 'choice',
        prompt: 'Qual é o cumprimento Xavante para "Tudo bem / Como vai?"',
        options: ['Tô ba?', 'Hã', 'Romhö', 'Aibö'],
        correctIndex: 0,
        phonetic: '[tõ ba]'
      },
      {
        type: 'match',
        prompt: 'Treino de fixação: Conecte os pares:',
        pairs: [
          { xavante: 'Hã', portuguese: 'Terra' },
          { xavante: 'Ö', portuguese: 'Água' },
          { xavante: 'Romhö', portuguese: 'Onça' },
          { xavante: 'Tsere', portuguese: 'Pássaro' }
        ]
      },
      {
        type: 'choice',
        prompt: 'Como se diz "Meu pai" em Xavante?',
        options: ['I-mama', 'I-no', 'Aibö', 'Mo'],
        correctIndex: 0,
        phonetic: '[i-ma-ma]'
      }
    ];

    const practiceLevel = {
      id: 'practice_session',
      title: 'Treino de Fixação',
      xpReward: 15,
      questions: randomQuestions
    };

    // Practice immediately restores 1 heart upon completion
    lessonEngine.start(practiceLevel);
    appState.gainHeart();
  });
}

// --- VIEW 4: PERFIL & CONQUISTAS ---
function setupProfile() {
  el.btnToggleSound.addEventListener('click', () => {
    const muted = sounds.toggleMute();
    el.btnToggleSound.textContent = muted ? '🔇 Som: Silenciado' : '🔊 Som: Ligado';
    sounds.playTap();
  });

  el.btnResetData.addEventListener('click', () => {
    if (confirm('Deseja realmente reiniciar todo o progresso do aprendizado?')) {
      appState.resetProgress();
      renderTopStats();
      renderTrail();
      renderProfile();
      alert('Progresso reiniciado com sucesso!');
    }
  });
}

function renderProfile() {
  const state = appState.get();
  el.profileXp.textContent = state.xp;
  el.profileStreak.textContent = state.streak;

  const totalStars = Object.values(state.completedLevels).reduce((acc, l) => acc + (l.stars || 0), 0);
  el.profileStars.textContent = totalStars;
  el.profileBadges.textContent = state.unlockedAchievements.length;

  el.achievementsList.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const item = document.createElement('div');
    item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-details">
        <div class="achievement-title">${ach.title} ${isUnlocked ? '✅' : '🔒'}</div>
        <div class="achievement-desc">${ach.desc} (+${ach.xpBonus} XP)</div>
      </div>
    `;
    el.achievementsList.appendChild(item);
  });
}

// Start Application on Load
document.addEventListener('DOMContentLoaded', initApp);
