// state.js - Gerenciador de Estado Offline com LocalStorage
import { ACHIEVEMENTS } from './data/lessons.js';

const STORAGE_KEY = 'xavante_app_state_v1';

export class AppState {
  constructor() {
    this.state = this.loadDefaultState();
    this.listeners = [];
    this.load();
    this.updateHeartsRegen();
    this.updateStreak();
  }

  loadDefaultState() {
    return {
      xp: 0,
      hearts: 5,
      maxHearts: 5,
      gems: 50,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      lastHeartLostTime: null,
      completedLevels: {},
      unlockedAchievements: [],
      dictionaryExploredCount: 0,
      soundMuted: false
    };
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.state = { ...this.loadDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Erro ao carregar estado do localStorage', e);
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.warn('Erro ao salvar estado no localStorage', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  get() {
    return this.state;
  }

  addXP(amount) {
    this.state.xp += amount;
    this.state.gems += Math.floor(amount / 5);
    this.checkAchievements();
    this.save();
  }

  loseHeart() {
    if (this.state.hearts > 0) {
      this.state.hearts -= 1;
      this.state.lastHeartLostTime = Date.now();
      this.save();
    }
    return this.state.hearts;
  }

  gainHeart() {
    if (this.state.hearts < this.state.maxHearts) {
      this.state.hearts += 1;
      this.save();
    }
  }

  refillHearts() {
    this.state.hearts = this.state.maxHearts;
    this.state.lastHeartLostTime = null;
    this.save();
  }

  updateHeartsRegen() {
    // Regenera 1 coração a cada 10 minutos se estiver abaixo de 5
    if (this.state.hearts < this.state.maxHearts && this.state.lastHeartLostTime) {
      const minutesPassed = (Date.now() - this.state.lastHeartLostTime) / (1000 * 60);
      const heartsToRegen = Math.floor(minutesPassed / 10);
      if (heartsToRegen > 0) {
        this.state.hearts = Math.min(this.state.maxHearts, this.state.hearts + heartsToRegen);
        this.state.lastHeartLostTime = this.state.hearts < this.state.maxHearts ? Date.now() : null;
        this.save();
      }
    }
  }

  completeLevel(levelId, stars = 3, xpEarned = 20) {
    const existing = this.state.completedLevels[levelId];
    const bestStars = existing ? Math.max(existing.stars, stars) : stars;

    this.state.completedLevels[levelId] = {
      stars: bestStars,
      completedAt: new Date().toISOString()
    };

    this.addXP(xpEarned);
    this.checkAchievements();
    this.save();
  }

  isLevelCompleted(levelId) {
    return !!this.state.completedLevels[levelId];
  }

  getLevelStars(levelId) {
    return this.state.completedLevels[levelId]?.stars || 0;
  }

  isLevelUnlocked(levelIndexInOrder, allLevelsOrder) {
    if (levelIndexInOrder === 0) return true;
    const prevLevelId = allLevelsOrder[levelIndexInOrder - 1];
    return !!this.state.completedLevels[prevLevelId];
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const last = this.state.lastActiveDate;

    if (last === today) {
      // Já acessou hoje
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (last === yesterday) {
      // Dia consecutivo! Incrementa ofensiva
      this.state.streak += 1;
    } else {
      // Quebrou a sequência
      this.state.streak = 1;
    }
    this.state.lastActiveDate = today;
    this.save();
  }

  incrementDictionaryExplored() {
    this.state.dictionaryExploredCount = (this.state.dictionaryExploredCount || 0) + 1;
    this.checkAchievements();
    this.save();
  }

  checkAchievements() {
    let newlyUnlocked = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!this.state.unlockedAchievements.includes(ach.id)) {
        if (ach.check(this.state)) {
          this.state.unlockedAchievements.push(ach.id);
          this.state.xp += ach.xpBonus;
          newlyUnlocked.push(ach);
        }
      }
    });

    return newlyUnlocked;
  }

  resetProgress() {
    this.state = this.loadDefaultState();
    this.save();
  }
}

export const appState = new AppState();
