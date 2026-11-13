import { Chess } from 'https://esm.sh/chess.js@1.4.0';
import { Chessground } from 'https://esm.sh/chessground@9.2.1';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const CHALLENGE_FEN = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3';

export function renderLivroVivo({ root, record = async () => {} }) {
  if (!root) return () => {};
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
          <h3 id="liveBookTitle">O Meu Sistema · Aron Nimzowitsch</h3>
          <p id="liveBookChapter">Estudo original · Centro e desenvolvimento</p>
        </header>
        <div class="lba-livebook-content">
          <p>Desenvolver significa colocar as peças em casas onde participem no jogo. Na abertura, cada tempo é valioso: em vez de mover repetidamente a mesma peça sem necessidade, procura desenvolver peças diferentes, disputar o centro e preparar a segurança do rei.</p>
          <p>Observa a sequência inicial. Clica nos lances para veres como cada um altera a posição: <button class="lba-livebook-move" data-book-ply="1" type="button">1. e4</button> <button class="lba-livebook-move" data-book-ply="2" type="button">1... e5</button> <button class="lba-livebook-move" data-book-ply="3" type="button">2. Cf3</button> <button class="lba-livebook-move" data-book-ply="4" type="button">2... Cc6</button>.</p>
          <p>O peão branco em e4 ocupa espaço central e controla d5 e f5. A resposta ...e5 disputa o centro de forma directa. O cavalo em f3 desenvolve-se com ganho de tempo potencial sobre e5; ...Cc6 defende o peão e aumenta o controlo central.</p>
          <div class="lba-livebook-callout"><b>Ideia-chave</b><p>Não memorizes apenas a ordem dos lances. Pergunta sempre: que casas controla a peça, que ameaça cria e que peça ainda precisa de desenvolvimento?</p></div>
          <section class="lba-livebook-challenge">
            <span class="mini-label">DESAFIO DO AUTOR · ESCOLHE UM PLANO</span>
            <h4>Como desenvolver o bispo?</h4>
            <p>Na posição depois de 1.e4 e5 2.Cf3 Cc6, escolhe um desenvolvimento activo para as Brancas. Experimenta <b>3.Bb5</b> (Espanhola) ou <b>3.Bc4</b> (Italiana).</p>
            <div class="lba-board-tools"><button type="button" class="lba-primary" id="liveBookStartChallenge">Iniciar desafio</button><button type="button" class="lba-secondary" id="liveBookHint">Ver pista</button></div>
            <div class="lba-board-coach" id="liveBookChallengeStatus" role="status" aria-live="polite">Inicia o desafio e joga directamente no tabuleiro.</div>
          </section>
        </div>
      </article>
    </div>`;

  const boardEl = root.querySelector('#lbaLiveBookBoard');
  const boardStatus = root.querySelector('#liveBookBoardStatus');
  const challengeStatus = root.querySelector('#liveBookChallengeStatus');
  const exploreButton = root.querySelector('#liveBookExplore');
  let game = new Chess(INITIAL_FEN);
  let ground = null;
  let orientation = 'white';
  let selectedPly = 0;
  let freeMode = false;
  let challengeMode = false;
  let challengeSolved = false;
  let destroyed = false;
  let resizeObserver = null;

  const positions = [INITIAL_FEN];
  const sequence = new Chess(INITIAL_FEN);
  ['e4','e5','Nf3','Nc6'].forEach(san => {
    const move = sequence.move(san);
    if (move) positions.push(sequence.fen());
  });

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
      movable: { free: false, color: challengeMode ? 'white' : 'both', dests: legalDests(), showDests: true }
    });
  };
  const loadPly = ply => {
    selectedPly = Math.max(0, Math.min(4, Number(ply) || 0));
    freeMode = false;
    challengeMode = false;
    exploreButton.classList.remove('btn-active-exploration');
    exploreButton.setAttribute('aria-pressed', 'false');
    game = new Chess(positions[selectedPly]);
    renderBoard();
    boardStatus.textContent = selectedPly === 0 ? 'Posição inicial.' : 'Posição depois de ' + ['','1. e4','1... e5','2. Cf3','2... Cc6'][selectedPly] + '.';
  };
  const onMove = (from, to) => {
    try {
      const move = game.move({ from, to, promotion: 'q' });
      if (!move) { renderBoard(); return; }
      renderBoard();
      if (challengeMode && !challengeSolved) {
        if (move.color !== 'w') { game = new Chess(CHALLENGE_FEN); renderBoard(); return; }
        if (move.san === 'Bb5' || move.san === 'Bc4') {
          challengeSolved = true;
          record('meio-jogo', 'estrategia', 'attempt', null, 0, { kind: 'live-book-challenge', move: move.san, correct: true }).catch(() => {});
          challengeStatus.textContent = 'Muito bem! ' + move.san + ' é um desenvolvimento activo: o bispo entra no jogo e as Brancas disputam casas importantes. Podes continuar a explorar a posição.';
          record('meio-jogo', 'estrategia', 'completed', null, 0, { kind: 'live-book-challenge', move: move.san }).catch(() => {});
        } else {
          record('meio-jogo', 'estrategia', 'attempt', null, 0, { kind: 'live-book-challenge', move: move.san, correct: false }).catch(() => {});
          challengeStatus.textContent = move.san + ' é legal, mas não cumpre o objectivo deste exercício. O tabuleiro foi reposto; tenta 3.Bb5 ou 3.Bc4.';
          game = new Chess(CHALLENGE_FEN);
          renderBoard();
        }
      } else {
        boardStatus.textContent = 'Lance ' + move.san + ' jogado. ' + (freeMode ? 'Estás em exploração livre.' : 'Carrega em “Voltar ao texto” para regressar à posição seleccionada no capítulo.');
        record('meio-jogo', 'estrategia', 'attempt', null, 0, { kind: 'live-book-exploration', move: move.san }).catch(() => {});
      }
    } catch (error) {
      renderBoard();
      boardStatus.textContent = 'Lance não aceite: ' + error.message;
    }
  };

  ground = Chessground(boardEl, {
    fen: game.fen(), orientation, coordinates: true, autoCastle: true,
    movable: { free: false, color: 'both', dests: legalDests(), showDests: true },
    animation: { enabled: true, duration: 180 },
    events: { move: onMove }
  });

  root.querySelectorAll('[data-book-ply]').forEach(button => button.addEventListener('click', () => loadPly(button.dataset.bookPly)));
  root.querySelector('#liveBookSync').addEventListener('click', () => {
    challengeMode = false;
    loadPly(selectedPly);
    boardStatus.textContent = 'Sincronizado com o texto: posição ' + selectedPly + ' de 4.';
  });
  exploreButton.addEventListener('click', () => {
    freeMode = true;
    challengeMode = false;
    exploreButton.classList.add('btn-active-exploration');
    exploreButton.setAttribute('aria-pressed', 'true');
    boardStatus.textContent = 'Exploração livre activa. Podes continuar a partida a partir da posição actual.';
  });
  root.querySelector('#liveBookStartChallenge').addEventListener('click', () => {
    game = new Chess(CHALLENGE_FEN);
    selectedPly = 4;
    freeMode = false;
    challengeMode = true;
    challengeSolved = false;
    exploreButton.classList.remove('btn-active-exploration');
    exploreButton.setAttribute('aria-pressed', 'false');
    renderBoard();
    boardStatus.textContent = 'Desafio activo: é a vez das Brancas jogarem o terceiro lance.';
    challengeStatus.textContent = 'Joga 3.Bb5 ou 3.Bc4 directamente no tabuleiro.';
  });
  root.querySelector('#liveBookHint').addEventListener('click', () => {
    challengeStatus.textContent = 'Pista: desenvolve o bispo para uma casa activa. b5 pressiona o cavalo c6; c4 aponta para f7.';
  });

  const resize = () => { if (ground && !destroyed) ground.redrawAll(); };
  window.addEventListener('resize', resize, { passive: true });
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(boardEl.parentElement);
  }
  return () => {
    destroyed = true;
    window.removeEventListener('resize', resize);
    if (resizeObserver) resizeObserver.disconnect();
    if (ground) { ground.destroy(); ground = null; }
  };
}
