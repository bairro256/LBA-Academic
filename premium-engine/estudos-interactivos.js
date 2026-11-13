import { Chess } from 'https://esm.sh/chess.js@1.4.0';
import { Chessground } from 'https://esm.sh/chessground@9.2.1';

const START = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3';
const STUDY = {
  title: 'A decisão crítica: escolher um plano na abertura',
  subtitle: 'Estudo demonstrativo · Espanhola e Italiana',
  objective: 'Comparar dois lances candidatos legais, compreender os planos que cada um cria e acompanhar uma sequência comentada no tabuleiro.',
  candidates: {
    Bb5: {
      name: '3.Bb5 — Abertura Espanhola',
      verdict: 'Lance principal e plenamente correcto.',
      explanation: 'O bispo pressiona o cavalo c6, que participa na defesa do peão e5. As Brancas aumentam a pressão sobre o centro sem trocar imediatamente a peça. O plano típico inclui roque, c3 e d4, mas a ordem depende da resposta das Pretas.',
      line: ['Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7'],
      comments: [
        '3.Bb5: as Brancas aumentam a pressão sobre o defensor de e5. Não ameaçam ganhar o cavalo imediatamente; procuram criar uma tensão duradoura.',
        '3...a6: as Pretas perguntam ao bispo o que pretende fazer. O lance ganha espaço na ala da dama e prepara ...b5.',
        '4.Ba4: o bispo conserva a pressão indirecta sobre c6. A retirada mantém a peça activa na diagonal.',
        '4...Nf6: desenvolvimento com ataque ao peão e4. As Pretas disputam o centro e aceleram o desenvolvimento.',
        '5.O-O: o rei sai do centro e a torre entra em jogo. O roque também prepara Re1.',
        '5...Be7: desenvolvimento sólido. As Pretas preparam o roque e mantêm a estrutura central.'
      ],
      alternatives: [
        { move: 'Bc4', name: '3.Bc4 — Italiana', explanation: 'Também é correcto. Aponta para f7 e conduz a estruturas e planos diferentes; não é um erro, mas uma escolha de sistema.' },
        { move: 'd4', name: '3.d4 — Centro imediato', explanation: 'É uma alternativa agressiva que abre o centro cedo. Exige cálculo concreto das capturas e da actividade das peças.' }
      ]
    },
    Bc4: {
      name: '3.Bc4 — Abertura Italiana',
      verdict: 'Lance principal e plenamente correcto.',
      explanation: 'O bispo aponta directamente para f7, o ponto mais sensível do campo preto no início da partida. As Brancas podem preparar c3 e d4 para construir um centro amplo. O plano é diferente da Espanhola: a pressão imediata sobre c6 é menor, mas a ameaça sobre f7 é mais directa.',
      line: ['Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4'],
      comments: [
        '3.Bc4: o bispo ocupa uma diagonal activa e coloca f7 sob observação. O lance desenvolve uma peça com uma função concreta.',
        '3...Bc5: as Pretas desenvolvem simetricamente e também apontam para f2. A posição mantém equilíbrio dinâmico.',
        '4.c3: prepara d4 e constrói um centro de peões. Antes de avançar, as Brancas apoiam a ruptura.',
        '4...Nf6: desenvolvimento com ataque ao peão e4. As Pretas não ficam apenas a observar o plano branco.',
        '5.d4: as Brancas executam a ruptura central preparada. O momento da ruptura é importante porque as peças já apoiam o centro.',
        '5...exd4: as Pretas resolvem a tensão. Agora é necessário calcular a recaptura e avaliar a actividade que resulta.'
      ],
      alternatives: [
        { move: 'Bb5', name: '3.Bb5 — Espanhola', explanation: 'Também é correcto. Pressiona o cavalo c6 e escolhe um plano mais prolongado de pressão sobre o centro.' },
        { move: 'd4', name: '3.d4 — Centro imediato', explanation: 'É possível abrir o centro imediatamente, mas a decisão deve ser acompanhada de cálculo das respostas.' }
      ]
    }
  }
};

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sanPt = value => String(value || '').replace(/N/g, 'C');

export function renderEstudosInteractivos({ root, record = async () => {} }) {
  if (!root) return () => {};
  let game = new Chess(START);
  let ground = null;
  let chosen = null;
  let lineIndex = 0;
  let destroyed = false;
  let resizeObserver = null;

  root.innerHTML = `
    <section class="lba-module-intro">
      <span class="mini-label">LBA · SALA DE ESTUDO INTERACTIVO</span>
      <h3>${esc(STUDY.title)}</h3>
      <p>${esc(STUDY.objective)}</p>
      <p class="lba-footnote">${esc(STUDY.subtitle)}</p>
    </section>
    <div class="lba-livebook-workspace">
      <section class="lba-livebook-board-section">
        <div class="lba-board-frame lba-livebook-board-frame"><div id="lbaInteractiveStudyBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro do estudo interactivo"></div></div>
        <p class="lba-footnote" id="interactiveStudyStatus" role="status" aria-live="polite">É a vez das Brancas. Escolhe um lance candidato e joga-o no tabuleiro.</p>
        <div class="lba-board-tools">
          <button type="button" class="lba-secondary" id="studyReset">Recomeçar decisão</button>
          <button type="button" class="lba-secondary" id="studyBack" disabled>← Lance anterior</button>
          <button type="button" class="lba-primary" id="studyNext" disabled>Ver resposta e comentário →</button>
        </div>
      </section>
      <article class="lba-livebook-book">
        <header class="lba-livebook-header">
          <span class="mini-label">MÉTODO LBA · PENSAR ANTES DE JOGAR</span>
          <h3>1. Escolhe entre os lances candidatos</h3>
          <p>Não procures adivinhar uma única jogada. Compara as ideias, calcula a resposta do adversário e escolhe o plano que preferes.</p>
        </header>
        <div class="lba-livebook-content" id="interactiveStudyContent">
          <div class="lba-livebook-challenge">
            <h4>Posição crítica — depois de 1.e4 e5 2.Cf3 Cc6</h4>
            <p><strong>Pergunta:</strong> qual é a diferença estratégica entre 3.Bb5 e 3.Bc4?</p>
            <p><strong>Antes de jogar:</strong> identifica a peça que cada lance pressiona, o plano de peões que prepara e a resposta mais natural das Pretas.</p>
            <div class="lba-board-coach" id="candidateFeedback">Joga Bb5 ou Bc4 no tabuleiro. A explicação aparece depois da tua escolha.</div>
          </div>
          <div class="lba-livebook-challenge" id="studyLinePanel" hidden>
            <h4 id="studyLineTitle">Sequência comentada</h4>
            <p id="studyLineComment"></p>
            <p class="lba-footnote" id="studyLineCounter"></p>
          </div>
          <div class="lba-livebook-challenge" id="studyAlternatives" hidden>
            <h4>Comparação dos candidatos</h4>
            <div id="studyAlternativeList"></div>
          </div>
        </div>
      </article>
    </div>`;

  const boardEl = root.querySelector('#lbaInteractiveStudyBoard');
  const status = root.querySelector('#interactiveStudyStatus');
  const feedback = root.querySelector('#candidateFeedback');
  const nextButton = root.querySelector('#studyNext');
  const backButton = root.querySelector('#studyBack');
  const linePanel = root.querySelector('#studyLinePanel');
  const altPanel = root.querySelector('#studyAlternatives');
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
      movable: { free: false, color: 'both', dests: legalDests(), showDests: true }
    });
  };
  const reset = () => {
    game = new Chess(START);
    chosen = null;
    lineIndex = 0;
    feedback.textContent = 'Joga Bb5 ou Bc4 no tabuleiro. A explicação aparece depois da tua escolha.';
    nextButton.disabled = true;
    backButton.disabled = true;
    linePanel.hidden = true;
    altPanel.hidden = true;
    status.textContent = 'É a vez das Brancas. Escolhe um lance candidato e joga-o no tabuleiro.';
    renderBoard();
  };
  const showChosen = move => {
    chosen = move;
    const item = STUDY.candidates[move];
    feedback.innerHTML = `<strong>${esc(item.name)}</strong><p>${esc(item.verdict)}</p><p>${esc(item.explanation)}</p><p><strong>Agora calcula:</strong> qual será a resposta mais natural das Pretas?</p>`;
    const list = item.alternatives.map(a => `<div class="lba-board-coach"><strong>${esc(a.name)}</strong><p>${esc(a.explanation)}</p></div>`).join('');
    root.querySelector('#studyAlternativeList').innerHTML = list;
    altPanel.hidden = false;
    nextButton.disabled = false;
    status.textContent = 'Lance candidato registado. Lê a avaliação e acompanha a sequência comentada.';
    Promise.resolve(record('aberturas', 'aberturas', 'attempt', null, 0, {kind:'candidate-move-study', move})).catch(() => {});
  };
  const onMove = (from, to) => {
    if (chosen) { renderBoard(); return; }
    const move = game.move({from, to, promotion:'q'});
    if (!move) { renderBoard(); return; }
    if (move.san === 'Bb5' || move.san === 'Bc4') showChosen(move.san);
    else {
      game = new Chess(START);
      status.textContent = 'Esse lance não é um dos candidatos deste exercício. Compara Bb5 e Bc4 e tenta novamente.';
    }
    renderBoard();
  };
  const playLine = (index) => {
    const item = STUDY.candidates[chosen];
    game = new Chess(START);
    for (let i=0; i<=index; i++) game.move(item.line[i]);
    lineIndex = index;
    root.querySelector('#studyLineTitle').textContent = 'Sequência comentada · ' + item.name;
    root.querySelector('#studyLineComment').textContent = item.comments[index];
    root.querySelector('#studyLineCounter').textContent = 'Lance ' + (index + 3) + ' de ' + (item.line.length + 2) + ' · ' + sanPt(item.line[index]);
    linePanel.hidden = false;
    backButton.disabled = index === 0;
    nextButton.textContent = index === item.line.length - 1 ? 'Sequência concluída' : 'Próximo lance →';
    nextButton.disabled = index === item.line.length - 1;
    status.textContent = 'A acompanhar a variante no tabuleiro. Podes voltar atrás para rever cada decisão.';
    renderBoard();
  };

  ground = Chessground(boardEl, {
    fen: game.fen(), orientation:'white', coordinates:true, autoCastle:true,
    movable:{free:false,color:'both',dests:legalDests(),showDests:true},
    animation:{enabled:true,duration:180}, events:{move:onMove}
  });
  nextButton.addEventListener('click', () => {
    if (!chosen) return;
    const item = STUDY.candidates[chosen];
    if (linePanel.hidden) playLine(0);
    else if (lineIndex < item.line.length - 1) playLine(lineIndex + 1);
  });
  backButton.addEventListener('click', () => { if (chosen && lineIndex > 0) playLine(lineIndex - 1); });
  root.querySelector('#studyReset').addEventListener('click', reset);
  const resize = () => { if (ground && !destroyed) ground.redrawAll(); };
  window.addEventListener('resize', resize, {passive:true});
  if (window.ResizeObserver) { resizeObserver = new ResizeObserver(resize); resizeObserver.observe(boardEl.parentElement); }
  return () => {
    destroyed = true;
    window.removeEventListener('resize', resize);
    if (resizeObserver) resizeObserver.disconnect();
    if (ground) { ground.destroy(); ground = null; }
  };
}
