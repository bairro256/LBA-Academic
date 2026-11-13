import { Chess } from 'https://esm.sh/chess.js@1.4.0';
import { Chessground } from 'https://esm.sh/chessground@9.2.1';
import { BANCO_LIVROS_PREMIUM } from './CapitulosDados.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fallbackFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function renderLivroVivo({ root, record = async () => {} }) {
  if (!root) return () => {};
  const chapters = [...BANCO_LIVROS_PREMIUM].sort((a,b) => a.capituloNumero - b.capituloNumero);
  if (!chapters.length) return () => {};
  let chapterIndex = 0;
  let chapter = chapters[chapterIndex];
  let positions = [];
  let game = new Chess(fallbackFen);
  let ground = null;
  let selectedPly = 0;
  let freeMode = false;
  let challengeMode = false;
  let challengeSolved = false;
  let destroyed = false;
  let resizeObserver = null;

  root.innerHTML = `
    <div class="lba-module-intro">
      <span class="mini-label">BIBLIOTECA INTERACTIVA · MÉTODO LBA</span>
      <h3>Livro Vivo Interactivo</h3>
      <p>Estuda uma ideia, acompanha os lances no tabuleiro e experimenta as tuas próprias continuações.</p>
    </div>
    <div class="lba-livebook-workspace">
      <section class="lba-livebook-board-section">
        <div class="lba-board-frame lba-livebook-board-frame"><div id="lbaLiveBookBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro do Livro Vivo"></div></div>
        <div class="lba-board-tools lba-livebook-controls">
          <button type="button" class="lba-secondary" id="liveBookSync">Voltar ao texto</button>
          <button type="button" class="lba-secondary" id="liveBookExplore" aria-pressed="false">Exploração livre</button>
        </div>
        <p class="lba-footnote" id="liveBookBoardStatus" role="status" aria-live="polite">Escolhe um lance no texto para acompanhar a posição.</p>
      </section>
      <article class="lba-livebook-book">
        <header class="lba-livebook-header">
          <span class="mini-label">CADERNO DE ESTUDO · POSICIONAL</span>
          <h3 id="liveBookTitle"></h3>
          <p id="liveBookChapter"></p>
          <nav class="lba-livebook-nav" aria-label="Navegação de capítulos">
            <button type="button" class="lba-secondary" id="liveBookPrevious">← Capítulo anterior</button>
            <span id="liveBookChapterCount" aria-live="polite"></span>
            <button type="button" class="lba-secondary" id="liveBookNext">Capítulo seguinte →</button>
          </nav>
        </header>
        <div class="lba-livebook-content" id="liveBookContent"></div>
      </article>
    </div>`;

  const boardEl = root.querySelector('#lbaLiveBookBoard');
  const boardStatus = root.querySelector('#liveBookBoardStatus');
  const exploreButton = root.querySelector('#liveBookExplore');
  const contentEl = root.querySelector('#liveBookContent');
  const titleEl = root.querySelector('#liveBookTitle');
  const chapterEl = root.querySelector('#liveBookChapter');
  const chapterCount = root.querySelector('#liveBookChapterCount');

  const challengeBlock = () => chapter.elementos.find(item => item.tipo === 'desafio_interativo');
  const setExploreButton = () => {
    exploreButton.classList.toggle('btn-active-exploration', freeMode);
    exploreButton.setAttribute('aria-pressed', String(freeMode));
  };
  const legalDests = () => {
    const map = new Map();
    game.moves({ verbose: true }).forEach(move => {
      if (!map.has(move.from)) map.set(move.from, []);
      map.get(move.from).push(move.to);
    });
    return map;
  };
  const renderBoard = () => {
    if (!ground || destroyed) return;
    const history = game.history({ verbose: true });
    ground.set({
      fen: game.fen(),
      turnColor: game.turn() === 'w' ? 'white' : 'black',
      check: game.isCheck() ? (game.turn() === 'w' ? 'white' : 'black') : false,
      lastMove: history.length ? [history[history.length - 1].from, history[history.length - 1].to] : undefined,
      movable: { free: false, color: challengeMode ? (challengeBlock()?.vezDeJogar === 'b' ? 'black' : 'white') : 'both', dests: legalDests(), showDests: true }
    });
  };
  const loadPly = ply => {
    const max = Math.max(0, positions.length - 1);
    selectedPly = Math.max(0, Math.min(max, Number(ply) || 0));
    freeMode = false;
    challengeMode = false;
    setExploreButton();
    game = new Chess(positions[selectedPly] || chapter.historicoFens[0] || fallbackFen);
    renderBoard();
    boardStatus.textContent = selectedPly === 0 ? 'Posição inicial do capítulo.' : 'Posição histórica ' + selectedPly + ' de ' + max + '.';
  };
  const logChallenge = (move, correct) => {
    Promise.resolve(record('meio-jogo', 'estrategia', 'attempt', null, 0, {
      kind: 'live-book-challenge',
      bookId: chapter.livroId || 'meu_primeiro_livro_premium',
      chapter: chapter.capituloNumero,
      move,
      correct
    })).catch(error => console.warn('LBA Livro Vivo: não foi possível registar a tentativa.', error));
  };
  const onMove = (from, to) => {
    try {
      const move = game.move({ from, to, promotion: 'q' });
      if (!move) { renderBoard(); return; }
      if (challengeMode && !challengeSolved) {
        const accepted = (challengeBlock()?.lancesCorretos || []).includes(move.san);
        logChallenge(move.san, accepted);
        if (accepted) {
          challengeSolved = true;
          challengeMode = false;
          freeMode = true;
          setExploreButton();
          renderBoard();
          const status = root.querySelector('#liveBookChallengeStatus');
          if (status) status.textContent = 'Muito bem! ' + move.san + ' cumpre o objectivo posicional. Podes continuar a explorar a posição.';
          Promise.resolve(record('meio-jogo', 'estrategia', 'completed', null, 0, {
            kind: 'live-book-challenge',
            bookId: chapter.livroId || 'meu_primeiro_livro_premium',
            chapter: chapter.capituloNumero,
            move: move.san
          })).catch(error => console.warn('LBA Livro Vivo: não foi possível guardar a conclusão.', error));
          boardStatus.textContent = 'Desafio concluído. Podes continuar a explorar a posição.';
        } else {
          const target = challengeBlock();
          game = new Chess(target.fenBase);
          renderBoard();
          const status = root.querySelector('#liveBookChallengeStatus');
          if (status) status.textContent = move.san + ' é legal, mas não cumpre o objectivo deste exercício. A posição foi reposta; tenta novamente.';
          boardStatus.textContent = 'Tenta outra vez: a posição do desafio foi reposta.';
        }
        return;
      }
      renderBoard();
      boardStatus.textContent = 'Lance ' + move.san + ' jogado. ' + (freeMode ? 'Exploração livre activa.' : 'Podes regressar à posição seleccionada no texto.');
    } catch (error) {
      renderBoard();
      boardStatus.textContent = 'Lance não aceite: ' + error.message;
    }
  };

  const renderChapterText = () => {
    chapter = chapters[chapterIndex];
    titleEl.textContent = 'O Meu Sistema · Aron Nimzowitsch';
    chapterEl.textContent = chapter.titulo;
    chapterCount.textContent = 'Capítulo ' + (chapterIndex + 1) + ' / ' + chapters.length;
    root.querySelector('#liveBookPrevious').disabled = chapterIndex === 0;
    root.querySelector('#liveBookNext').disabled = chapterIndex === chapters.length - 1;
    contentEl.innerHTML = '';
    (chapter.elementos || []).forEach(block => {
      if (block.tipo === 'texto') {
        const p = document.createElement('p');
        p.innerHTML = block.payload;
        contentEl.appendChild(p);
      } else if (block.tipo === 'desafio_interativo') {
        const section = document.createElement('section');
        section.className = 'lba-livebook-challenge';
        section.innerHTML = `
          <span class="mini-label">DESAFIO INTERACTIVO · CAPÍTULO ${esc(chapter.capituloNumero)}</span>
          <h4>Aplica a ideia no tabuleiro</h4>
          <p>${esc(block.instrucao)}</p>
          <div class="lba-board-tools">
            <button type="button" class="lba-primary" id="liveBookStartChallenge">Iniciar desafio</button>
            <button type="button" class="lba-secondary" id="liveBookHint">Ver pista</button>
          </div>
          <div class="lba-board-coach" id="liveBookChallengeStatus" role="status" aria-live="polite">Inicia o desafio e joga directamente no tabuleiro.</div>`;
        contentEl.appendChild(section);
        section.querySelector('#liveBookStartChallenge').addEventListener('click', () => {
          game = new Chess(block.fenBase);
          selectedPly = Math.max(0, positions.length - 1);
          freeMode = false;
          challengeMode = true;
          challengeSolved = false;
          setExploreButton();
          renderBoard();
          boardStatus.textContent = 'Desafio activo: vez de jogar ' + (block.vezDeJogar === 'b' ? 'Pretas' : 'Brancas') + '.';
          section.querySelector('#liveBookChallengeStatus').textContent = 'Joga ' + block.lancesCorretos.join(' ou ') + ' directamente no tabuleiro.';
        });
        section.querySelector('#liveBookHint').addEventListener('click', () => {
          section.querySelector('#liveBookChallengeStatus').textContent = block.dica || 'Observa a casa que precisa de ser controlada e procura um lance que cumpra o tema posicional do capítulo.';
        });
      }
    });
    contentEl.querySelectorAll('[data-index]').forEach(button => {
      button.classList.add('lba-livebook-move');
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      const activate = () => loadPly(button.dataset.index);
      button.addEventListener('click', activate);
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
      });
    });
    positions = [];
    (chapter.historicoFens || []).forEach(fen => {
      try { new Chess(fen); positions.push(fen); }
      catch (error) { console.warn('FEN inválido no capítulo ' + chapter.capituloNumero, fen, error); }
    });
    if (!positions.length) positions = [fallbackFen];
    loadPly(0);
  };

  ground = Chessground(boardEl, {
    fen: game.fen(), orientation: 'white', coordinates: true, autoCastle: true,
    movable: { free: false, color: 'both', dests: legalDests(), showDests: true },
    animation: { enabled: true, duration: 180 },
    events: { move: onMove }
  });

  contentEl.addEventListener('click', event => {
    const move = event.target.closest('[data-index]');
    if (move) loadPly(move.dataset.index);
  });
  root.querySelector('#liveBookSync').addEventListener('click', () => {
    freeMode = false;
    challengeMode = false;
    setExploreButton();
    loadPly(selectedPly);
    boardStatus.textContent = 'Sincronizado com o texto: posição ' + selectedPly + ' de ' + (positions.length - 1) + '.';
  });
  exploreButton.addEventListener('click', () => {
    freeMode = true;
    challengeMode = false;
    setExploreButton();
    renderBoard();
    boardStatus.textContent = 'Exploração livre activa. Podes jogar a partir da posição actual.';
  });
  root.querySelector('#liveBookPrevious').addEventListener('click', () => {
    if (chapterIndex > 0) { chapterIndex--; renderChapterText(); }
  });
  root.querySelector('#liveBookNext').addEventListener('click', () => {
    if (chapterIndex < chapters.length - 1) { chapterIndex++; renderChapterText(); }
  });

  const resize = () => { if (ground && !destroyed) ground.redrawAll(); };
  window.addEventListener('resize', resize, { passive: true });
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(boardEl.parentElement);
  }
  renderChapterText();

  return () => {
    destroyed = true;
    window.removeEventListener('resize', resize);
    if (resizeObserver) resizeObserver.disconnect();
    if (ground) { ground.destroy(); ground = null; }
  };
}
