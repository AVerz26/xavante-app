// lessonEngine.js - Motor Interativo de Lições Gamificadas Estilo Duolingo
import { sounds } from './soundEngine.js';
import { appState } from './state.js';
import confetti from 'canvas-confetti';

export class LessonEngine {
  constructor(elements, onCompleteCallback) {
    this.el = elements;
    this.onComplete = onCompleteCallback;
    this.currentLevel = null;
    this.questions = [];
    this.currentIndex = 0;
    this.mistakesCount = 0;
    this.currentState = 'answering'; // 'answering' | 'checked' | 'finished'
    this.userSelection = null;
    this.sentencePlaced = [];
    this.matchState = { selected: null, matchedCount: 0, totalPairs: 0 };

    this.bindEvents();
  }

  bindEvents() {
    this.el.btnCheck.addEventListener('click', () => {
      if (this.currentState === 'answering') {
        this.checkAnswer();
      } else if (this.currentState === 'checked') {
        this.nextQuestion();
      }
    });

    this.el.btnExit.addEventListener('click', () => {
      this.exitLesson();
    });

    this.el.btnVictoryFinish.addEventListener('click', () => {
      this.exitLesson();
    });
  }

  start(level) {
    this.currentLevel = level;
    this.questions = [...level.questions];
    this.currentIndex = 0;
    this.mistakesCount = 0;
    this.currentState = 'answering';

    // Show modal
    this.el.modal.classList.add('active');
    this.el.victoryScreen.classList.remove('show');
    this.el.exerciseArea.style.display = 'flex';
    this.el.footer.style.display = 'flex';

    this.updateHeartsDisplay();
    this.loadQuestion();
  }

  updateHeartsDisplay() {
    const hearts = appState.get().hearts;
    this.el.heartsVal.textContent = hearts;
  }

  loadQuestion() {
    this.currentState = 'answering';
    this.userSelection = null;
    this.sentencePlaced = [];
    this.matchState = { selected: null, matchedCount: 0, totalPairs: 0 };

    // Reset Footer & Feedback
    this.el.footer.className = 'lesson-footer';
    this.el.feedbackBanner.classList.remove('show');
    this.el.btnCheck.textContent = 'Verificar';
    this.el.btnCheck.className = 'btn-action-3d btn-primary-check';
    this.el.btnCheck.disabled = true;

    // Update Progress
    const progressPercent = (this.currentIndex / this.questions.length) * 100;
    this.el.progressFill.style.width = `${progressPercent}%`;

    const q = this.questions[this.currentIndex];
    this.el.exerciseArea.innerHTML = '';

    switch (q.type) {
      case 'choice':
        this.renderChoiceQuestion(q);
        break;
      case 'sentence':
        this.renderSentenceQuestion(q);
        break;
      case 'match':
        this.renderMatchQuestion(q);
        break;
      case 'phonetic':
        this.renderPhoneticQuestion(q);
        break;
      default:
        this.renderChoiceQuestion(q);
    }
  }

  // --- QUESTION TYPE: CHOICE ---
  renderChoiceQuestion(q) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const promptTitle = document.createElement('h3');
    promptTitle.className = 'question-prompt';
    promptTitle.textContent = q.prompt;
    container.appendChild(promptTitle);

    if (q.phonetic) {
      const helper = document.createElement('div');
      helper.className = 'lesson-mascot-helper';
      const promptWord = q.targetWord || q.options[q.correctIndex] || '';
      helper.innerHTML = `
        <img src="/assets/mascot.jpg" class="lesson-mascot-img" alt="Mascote" />
        <div class="lesson-speech-bubble">
          <div class="speech-word-highlight">
            <span>Dica de Pronúncia:</span>
            <div style="display: flex; gap: 6px;">
              <button class="dict-audio-btn" id="btn-play-prompt-audio" title="Ouvir pronúncia normal">🔊</button>
              <button class="dict-audio-btn" id="btn-play-prompt-slow" style="font-size: 14px;" title="Ouvir em velocidade lenta">🐢</button>
            </div>
          </div>
          <div class="speech-phonetic">${q.phonetic}</div>
        </div>
      `;
      container.appendChild(helper);

      setTimeout(() => {
        const audioBtn = document.getElementById('btn-play-prompt-audio');
        const slowBtn = document.getElementById('btn-play-prompt-slow');
        if (audioBtn) {
          audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sounds.playWord(promptWord.toLowerCase().replace(/[^a-z0-9]/g, '_'), promptWord, q.ttsHint || promptWord, false);
          });
        }
        if (slowBtn) {
          slowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sounds.playWord(promptWord.toLowerCase().replace(/[^a-z0-9]/g, '_'), promptWord, q.ttsHint || promptWord, true);
          });
        }
      }, 0);
    }

    const grid = document.createElement('div');
    grid.className = 'choice-options-grid';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span>${opt}</span><span style="opacity: 0.4;">${idx + 1}</span>`;
      btn.addEventListener('click', () => {
        sounds.playTilePop(450 + idx * 30);
        grid.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.userSelection = idx;
        this.el.btnCheck.disabled = false;
      });
      grid.appendChild(btn);
    });

    container.appendChild(grid);
    this.el.exerciseArea.appendChild(container);
  }

  // --- QUESTION TYPE: SENTENCE BUILDER ---
  renderSentenceQuestion(q) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const promptTitle = document.createElement('h3');
    promptTitle.className = 'question-prompt';
    promptTitle.textContent = q.prompt;
    container.appendChild(promptTitle);

    // Target translation box
    const targetBox = document.createElement('div');
    targetBox.className = 'lesson-mascot-helper';
    targetBox.innerHTML = `
      <img src="/assets/mascot.jpg" class="lesson-mascot-img" alt="Mascote" />
      <div class="lesson-speech-bubble">
        <div style="font-size: 17px; font-weight: 800; color: #1F2937;">"${q.targetTranslation}"</div>
        <div style="font-size: 12px; color: #6B7280; margin-top: 4px;">Toque nas palavras abaixo na ordem correta:</div>
      </div>
    `;
    container.appendChild(targetBox);

    // Assembly slot
    const assemblyArea = document.createElement('div');
    assemblyArea.className = 'sentence-assembly-area';
    container.appendChild(assemblyArea);

    // Word Bank
    const bank = document.createElement('div');
    bank.className = 'word-bank';

    q.options.forEach((word) => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      chip.textContent = word;

      chip.addEventListener('click', () => {
        sounds.playTilePop(500);
        chip.classList.add('placed');
        this.sentencePlaced.push(word);

        // Add to assembly area
        const placedChip = document.createElement('button');
        placedChip.className = 'word-chip';
        placedChip.textContent = word;
        placedChip.addEventListener('click', () => {
          sounds.playTilePop(420);
          assemblyArea.removeChild(placedChip);
          chip.classList.remove('placed');
          const index = this.sentencePlaced.lastIndexOf(word);
          if (index !== -1) this.sentencePlaced.splice(index, 1);
          this.el.btnCheck.disabled = this.sentencePlaced.length === 0;
        });

        assemblyArea.appendChild(placedChip);
        this.el.btnCheck.disabled = false;
      });

      bank.appendChild(chip);
    });

    container.appendChild(bank);
    this.el.exerciseArea.appendChild(container);
  }

  // --- QUESTION TYPE: MATCH PAIRS ---
  renderMatchQuestion(q) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const promptTitle = document.createElement('h3');
    promptTitle.className = 'question-prompt';
    promptTitle.textContent = q.prompt;
    container.appendChild(promptTitle);

    this.matchState.totalPairs = q.pairs.length;
    this.matchState.matchedCount = 0;

    // Create cards list
    const cards = [];
    q.pairs.forEach((pair, pairIdx) => {
      cards.push({ text: pair.xavante, pairId: pairIdx, type: 'x' });
      cards.push({ text: pair.portuguese, pairId: pairIdx, type: 'p' });
    });

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    const grid = document.createElement('div');
    grid.className = 'match-pairs-container';

    cards.forEach((card) => {
      const btn = document.createElement('button');
      btn.className = 'pair-card';
      btn.textContent = card.text;

      btn.addEventListener('click', () => {
        if (btn.classList.contains('pair-matched')) return;

        if (!this.matchState.selected) {
          // First card selected
          sounds.playTilePop(520);
          this.matchState.selected = { card, btn };
          btn.classList.add('pair-selected');
        } else {
          // Second card clicked
          const first = this.matchState.selected;
          if (first.btn === btn) {
            // Deselect
            first.btn.classList.remove('pair-selected');
            this.matchState.selected = null;
            return;
          }

          if (first.card.pairId === card.pairId && first.card.type !== card.type) {
            // MATCH SUCCESS!
            sounds.playPairMatch();
            first.btn.classList.remove('pair-selected');
            first.btn.classList.add('pair-matched');
            btn.classList.add('pair-matched');
            this.matchState.matchedCount += 1;
            this.matchState.selected = null;

            if (this.matchState.matchedCount === this.matchState.totalPairs) {
              // All pairs matched!
              this.el.btnCheck.disabled = false;
              this.checkAnswer();
            }
          } else {
            // Mismatch
            sounds.playWrong();
            btn.classList.add('pair-selected');
            setTimeout(() => {
              first.btn.classList.remove('pair-selected');
              btn.classList.remove('pair-selected');
              this.matchState.selected = null;
            }, 400);
          }
        }
      });

      grid.appendChild(btn);
    });

    container.appendChild(grid);
    this.el.exerciseArea.appendChild(container);
  }

  // --- QUESTION TYPE: PHONETIC ---
  renderPhoneticQuestion(q) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const promptTitle = document.createElement('h3');
    promptTitle.className = 'question-prompt';
    promptTitle.textContent = q.prompt;
    container.appendChild(promptTitle);

    const helper = document.createElement('div');
    helper.className = 'lesson-mascot-helper';
    helper.innerHTML = `
      <img src="/assets/mascot.jpg" class="lesson-mascot-img" alt="Mascote" />
      <div class="lesson-speech-bubble">
        <div class="speech-word-highlight">
          <span>${q.word}</span>
          <div style="display: flex; gap: 6px;">
            <button class="dict-audio-btn" id="btn-play-phonetic" title="Ouvir voz normal">🔊</button>
            <button class="dict-audio-btn" id="btn-play-phonetic-slow" style="font-size: 14px;" title="Ouvir voz lenta">🐢</button>
          </div>
        </div>
        <div class="speech-phonetic">${q.phonetic} - "${q.meaning}"</div>
      </div>
    `;
    container.appendChild(helper);

    setTimeout(() => {
      const audioBtn = document.getElementById('btn-play-phonetic');
      const slowBtn = document.getElementById('btn-play-phonetic-slow');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          sounds.playWord(q.word.toLowerCase().replace(/[^a-z0-9]/g, '_'), q.word, q.ttsHint || q.word, false);
        });
      }
      if (slowBtn) {
        slowBtn.addEventListener('click', () => {
          sounds.playWord(q.word.toLowerCase().replace(/[^a-z0-9]/g, '_'), q.word, q.ttsHint || q.word, true);
        });
      }
    }, 0);

    const grid = document.createElement('div');
    grid.className = 'choice-options-grid';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span>${opt}</span><span style="opacity: 0.4;">${idx + 1}</span>`;
      btn.addEventListener('click', () => {
        sounds.playTilePop(480 + idx * 30);
        grid.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.userSelection = idx;
        this.el.btnCheck.disabled = false;
      });
      grid.appendChild(btn);
    });

    container.appendChild(grid);
    this.el.exerciseArea.appendChild(container);
  }

  // --- CHECK ANSWER LOGIC ---
  checkAnswer() {
    const q = this.questions[this.currentIndex];
    let isCorrect = false;
    let explanation = '';

    if (q.type === 'choice' || q.type === 'phonetic') {
      isCorrect = this.userSelection === q.correctIndex;
      explanation = q.options[q.correctIndex];
    } else if (q.type === 'sentence') {
      isCorrect = JSON.stringify(this.sentencePlaced) === JSON.stringify(q.correctOrder);
      explanation = q.correctOrder.join(' ');
    } else if (q.type === 'match') {
      isCorrect = this.matchState.matchedCount === this.matchState.totalPairs;
      explanation = 'Todos os pares conectados corretamente!';
    }

    this.currentState = 'checked';
    this.el.feedbackBanner.classList.add('show');

    if (isCorrect) {
      sounds.playCorrect();
      this.el.footer.className = 'lesson-footer state-correct';
      this.el.feedbackIcon.textContent = '🎉';
      this.el.feedbackTitle.textContent = 'Tô uptabi! Muito bem!';
      this.el.feedbackDesc.textContent = q.culturalTip || 'Você acertou em cheio!';
      this.el.btnCheck.className = 'btn-action-3d btn-continue-success';
      this.el.btnCheck.textContent = 'Continuar';
      this.el.btnCheck.disabled = false;
    } else {
      sounds.playWrong();
      this.mistakesCount += 1;
      const remainingHearts = appState.loseHeart();
      this.updateHeartsDisplay();

      this.el.footer.className = 'lesson-footer state-wrong';
      this.el.feedbackIcon.textContent = '⚠️';
      this.el.feedbackTitle.textContent = 'A resposta correta é:';
      this.el.feedbackDesc.textContent = `${explanation} ${q.culturalTip ? `(${q.culturalTip})` : ''}`;
      this.el.btnCheck.className = 'btn-action-3d btn-continue-wrong';
      this.el.btnCheck.textContent = 'Continuar';
      this.el.btnCheck.disabled = false;

      if (remainingHearts <= 0) {
        // No hearts left
        this.el.feedbackDesc.textContent += ' Seus corações acabaram! Vá na aba Praticar para recarregar.';
      }
    }
  }

  nextQuestion() {
    this.currentIndex += 1;

    if (this.currentIndex >= this.questions.length) {
      this.showVictory();
    } else {
      this.loadQuestion();
    }
  }

  showVictory() {
    sounds.playVictory();
    this.currentState = 'finished';

    // Calculate stars and XP
    const stars = this.mistakesCount === 0 ? 3 : (this.mistakesCount === 1 ? 2 : 1);
    const xp = this.currentLevel.xpReward || 20;

    appState.completeLevel(this.currentLevel.id, stars, xp);

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    this.el.progressFill.style.width = '100%';
    this.el.exerciseArea.style.display = 'none';
    this.el.footer.style.display = 'none';

    this.el.victoryXp.textContent = `+${xp}`;
    const accuracy = Math.max(0, Math.round(((this.questions.length - this.mistakesCount) / this.questions.length) * 100));
    this.el.victoryAccuracy.textContent = `${accuracy}%`;

    this.el.victoryScreen.classList.add('show');
  }

  exitLesson() {
    this.el.modal.classList.remove('active');
    if (this.onComplete) {
      this.onComplete();
    }
  }
}
