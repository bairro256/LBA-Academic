import { Chess } from 'https://esm.sh/chess.js@1.4.0';
import { Chessground } from 'https://esm.sh/chessground@9.2.1';

const GAMES = [
{
 id:'morphy-opera-1858', white:'Paul Morphy', black:'Duke of Brunswick & Count Isouard',
 title:'A Partida da Ópera', event:'Paris · 1858', result:'1-0', opening:'Defesa Philidor',
 theme:'Desenvolvimento, iniciativa e ataque ao rei',
 pgn:`[Event "Paris Opera"]
[Site "Paris, France"]
[Date "1858.11.02"]
[White "Paul Morphy"]
[Black "Duke of Brunswick and Count Isouard"]
[Result "1-0"]

1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8# 1-0`,
 notes:[
 {move:'Bc4',n:6,side:'w',title:'Desenvolvimento com ameaça',why:'Morphy desenvolve o bispo para uma diagonal activa e começa a apontar para f7. A dama em b3 e o bispo em c4 criam pressão sobre o ponto mais sensível do roque que ainda não existe.',lesson:'Desenvolve com tempo e coordena as peças: não ataques com uma peça isolada.'},
 {move:'Qb3',n:7,side:'w',title:'Duas ameaças ao mesmo tempo',why:'A dama pressiona f7 e b7. As Pretas precisam de responder às ameaças concretas; a coordenação entre dama e bispo é mais importante do que contar apenas material.',lesson:'Procura ameaças duplas e peças adversárias pouco defendidas.'},
 {move:'Nxb5',n:10,side:'w',title:'Sacrifício para abrir linhas',why:'Morphy entrega o cavalo em b5 para abrir linhas e manter a iniciativa. O valor da combinação depende do desenvolvimento superior e da exposição do rei adversário.',lesson:'Antes de sacrificar, calcula as respostas forçadas e verifica se consegues manter o ataque.'},
 {move:'O-O-O',n:12,side:'w',title:'O rei fica seguro e a torre entra',why:'O roque grande coloca a torre em d1, precisamente na coluna que será aberta. A segurança do rei e a actividade das torres passam a trabalhar em conjunto.',lesson:'O roque também é um lance de desenvolvimento: liga as torres e prepara a coluna aberta.'},
 {move:'Rd1',n:14,side:'w',title:'A coluna aberta decide',why:'A torre ocupa a coluna d e aumenta a pressão sobre a torre e o rei pretos. Morphy coordena as peças pesadas em vez de procurar um ataque sem apoio.',lesson:'Coloca as torres nas colunas abertas e semi-abertas.'},
 {move:'Rd8#',n:17,side:'w',title:'Xeque-mate',why:'A torre chega a d8 com mate. As peças pretas já não conseguem bloquear, capturar a torre nem dar uma casa de fuga ao rei.',lesson:'O mate surge da coordenação: bispo, torre e dama controlaram as casas essenciais.'}
 ]
},
{
 id:'immortal-1851', white:'Adolf Anderssen', black:'Lionel Kieseritzky',
 title:'A Partida Imortal', event:'Londres · 1851 · partida informal', result:'1-0', opening:'Gambito do Rei Aceite',
 theme:'Iniciativa, sacrifícios e ataque coordenado',
 pgn:`[Event "Casual Game"]
[Site "London"]
[Date "1851.06.21"]
[White "Adolf Anderssen"]
[Black "Lionel Kieseritzky"]
[Result "1-0"]

1.e4 e5 2.f4 exf4 3.Bc4 Qh4+ 4.Kf1 b5 5.Bxb5 Nf6 6.Nf3 Qh6 7.d3 Nh5 8.Nh4 Qg5 9.Nf5 c6 10.g4 Nf6 11.Rg1 cxb5 12.h4 Qg6 13.h5 Qg5 14.Qf3 Ng8 15.Bxf4 Qf6 16.Nc3 Bc5 17.Nd5 Qxb2 18.Bd6 Bxg1 19.e5 Qxa1+ 20.Ke2 Na6 21.Nxg7+ Kd8 22.Qf6+ Nxf6 23.Be7# 1-0`,
 notes:[
 {move:'Kf1',n:4,side:'w',title:'O rei fica no centro',why:'Anderssen aceita afastar o rei para escapar ao xeque e continuar o desenvolvimento. É uma decisão arriscada: só funciona porque as Brancas ganham tempos e abrem linhas contra o rei preto.',lesson:'Um rei exposto exige cálculo concreto; não copies esta decisão sem verificar as variantes.'},
 {move:'g4',n:10,side:'w',title:'Abrir linhas com ganho de tempo',why:'O avanço ataca o cavalo em f6 e acelera a iniciativa. As Brancas aceitam fragilizar a própria ala do rei para ganhar tempos de ataque.',lesson:'Um avanço de peão pode ser forte quando ganha tempo sobre uma peça e abre linhas.'},
 {move:'Rg1',n:11,side:'w',title:'A torre entra no ataque',why:'A torre chega à coluna g e aponta para a dama e para o rei. Anderssen continua a desenvolver forças para o ataque, mesmo tendo entregue material.',lesson:'Conta as peças que participam no ataque, não apenas o material que foi sacrificado.'},
 {move:'Nd5',n:17,side:'w',title:'Centralização com ameaça',why:'O cavalo salta para d5 com ameaças tácticas. A actividade das peças brancas é enorme e o rei preto continua vulnerável.',lesson:'Uma peça centralizada pode criar ameaças em várias direcções.'},
 {move:'e5',n:19,side:'w',title:'Abrir a diagonal decisiva',why:'O peão avança e abre linhas para as peças brancas. A dama e os bispos coordenam-se para manter o rei preto sem abrigo.',lesson:'Procura rupturas que abram diagonais e colunas para as peças activas.'},
 {move:'Be7#',n:23,side:'w',title:'Mate com três peças menores',why:'O bispo dá xeque-mate. Anderssen sacrificou material pesado, mas manteve a iniciativa e a coordenação das peças que restaram.',lesson:'O ataque pode compensar material quando as peças trabalham em conjunto e o rei não tem defesa.'}
 ]
},
{
 id:'fischer-century-1956', white:'Donald Byrne', black:'Robert James Fischer',
 title:'A Partida do Século', event:'Torneio Rosenwald · Nova Iorque · 1956', result:'0-1', opening:'Defesa Grünfeld',
 theme:'Desenvolvimento, cálculo, sacrifício de dama e ataque',
 pgn:`[Event "Third Rosenwald Trophy"]
[Site "New York, USA"]
[Date "1956.10.17"]
[Round "8"]
[White "Donald Byrne"]
[Black "Robert James Fischer"]
[Result "0-1"]

1.Nf3 Nf6 2.c4 g6 3.Nc3 Bg7 4.d4 O-O 5.Bf4 d5 6.Qb3 dxc4 7.Qxc4 c6 8.e4 Nbd7 9.Rd1 Nb6 10.Qc5 Bg4 11.Bg5 Na4 12.Qa3 Nxc3 13.bxc3 Nxe4 14.Bxe7 Qb6 15.Bc4 Nxc3 16.Bc5 Rfe8+ 17.Kf1 Be6 18.Bxb6 Bxc4+ 19.Kg1 Ne2+ 20.Kf1 Nxd4+ 21.Kg1 Ne2+ 22.Kf1 Nc3+ 23.Kg1 axb6 24.Qb4 Ra4 25.Qxb6 Nxd1 26.h3 Rxa2 27.Kh2 Nxf2 28.Re1 Rxe1 29.Qd8+ Bf8 30.Nxe1 Bd5 31.Nf3 Ne4 32.Qb8 b5 33.h4 h5 34.Ne5 Kg7 35.Kg1 Bc5+ 36.Kf1 Ng3+ 37.Ke1 Bb4+ 38.Kd1 Bb3+ 39.Kc1 Ne2+ 40.Kb1 Nc3+ 41.Kc1 Rc2# 0-1`,
 notes:[
 {move:'Na4',n:11,side:'b',title:'O cavalo ataca a dama e cria ameaças',why:'Fischer encontra um salto activo para a4. O cavalo ataca a dama e prepara a captura em c3, alterando a estrutura branca e abrindo caminho para a combinação.',lesson:'Procura lances intermédios com ameaça: um ataque à dama pode ganhar tempos para uma combinação.'},
 {move:'Nxe4',n:13,side:'b',title:'A captura que revela a ideia táctica',why:'Fischer captura em e4 e explora a coordenação das peças. Byrne aceita a continuação que permite a combinação sobre a dama e o rei.',lesson:'Antes de capturar material, verifica as ameaças do adversário e as peças que ficam sobrecarregadas.'},
 {move:'Qb6',n:14,side:'b',title:'A dama entra com tempo',why:'A dama preta cria ameaças concretas e força as Brancas a lidar com a pressão. O ataque não depende de um único golpe, mas da actividade contínua das peças.',lesson:'Quando tens iniciativa, procura lances que obriguem o adversário a responder.'},
 {move:'Be6',n:17,side:'b',title:'A dama pode ser sacrificada?',why:'Fischer oferece a dama em troca de uma rede de actividade, peças coordenadas e ataque decisivo. O valor da combinação está nas variantes calculadas, não no gesto visual do sacrifício.',lesson:'Um sacrifício de dama só é correcto quando a compensação é concreta: mate, ganho decisivo de material ou ataque imparável.'},
 {move:'Ne2+',n:19,side:'b',title:'Xeques para conduzir o rei',why:'Os xeques do cavalo obrigam o rei branco a casas cada vez mais limitadas. Fischer usa xeques com propósito: ganhar tempos, recolher material e manter o rei exposto.',lesson:'Nos finais de ataque, calcula a sequência de xeques e as casas de fuga do rei.'},
 {move:'Rc2#',n:41,side:'b',title:'Mate final',why:'A torre entra em c2 e termina a partida. A combinação iniciada muitos lances antes culmina numa rede de mate com peças coordenadas.',lesson:'Segue a combinação até ao fim: verifica sempre se existe defesa, bloqueio ou casa de fuga.'}
 ]
}
];

const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pt = s => String(s||'').replace(/N/g,'C');

export function renderEstudosInteractivos({root,record=async()=>{}}){
 if(!root)return()=>{};
 let gameIndex=0, game=null, ground=null, history=[], ply=0, free=false, challenge=null, observer=null, dead=false;
 root.innerHTML=`
 <section class="lba-module-intro">
  <span class="mini-label">LBA · LIVRO VIVO · PARTIDAS COMPLETAS</span>
  <h3>Biblioteca de partidas comentadas</h3>
  <p>Partidas históricas completas, do primeiro lance ao xeque-mate. Estuda os planos, toma decisões no tabuleiro e explora as posições.</p>
 </section>
 <div class="lba-livebook-workspace">
  <section class="lba-livebook-board-section">
   <div class="lba-board-frame lba-livebook-board-frame"><div id="lbaFullGameBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro interactivo da partida completa"></div></div>
   <p id="lbaFullGameStatus" class="lba-footnote" role="status" aria-live="polite">Selecciona uma partida para começar.</p>
   <div class="lba-board-tools">
    <button type="button" class="lba-secondary" id="lbaGameStart">Início</button>
    <button type="button" class="lba-secondary" id="lbaGamePrev">← Anterior</button>
    <button type="button" class="lba-primary" id="lbaGameNext">Próximo lance →</button>
    <button type="button" class="lba-secondary" id="lbaGameFree">Explorar posição</button>
   </div>
   <div class="lba-board-tools"><button type="button" class="lba-secondary" id="lbaGameChallenge">Tentar decisão nesta posição</button><button type="button" class="lba-secondary" id="lbaGameExitChallenge" disabled>Sair do desafio</button></div>
  </section>
  <article class="lba-livebook-book">
   <header class="lba-livebook-header">
    <span class="mini-label">ARQUIVO DE PARTIDAS · HISTÓRIA DO XADREZ</span>
    <label for="lbaGameSelect">Escolhe uma partida</label>
    <select id="lbaGameSelect" class="lba-premium-select"></select>
    <h3 id="lbaGameTitle"></h3><p id="lbaGameMeta"></p><p id="lbaGameTheme"></p>
   </header>
   <div class="lba-livebook-content">
    <div class="lba-livebook-challenge"><h4 id="lbaGameMomentTitle">Plano da partida</h4><p id="lbaGameComment">Acompanha os lances e consulta os comentários nos momentos críticos.</p><p class="lba-footnote" id="lbaGameMoveCounter"></p></div>
    <div class="lba-livebook-challenge" id="lbaGameDecision" hidden><h4>É a tua vez de decidir</h4><p id="lbaGameDecisionText"></p><div id="lbaGameDecisionFeedback" class="lba-board-coach" role="status" aria-live="polite"></div></div>
    <div class="lba-livebook-challenge"><h4>Ideias a reter</h4><div id="lbaGameLessons"></div></div>
    <div class="lba-livebook-challenge"><h4>Partida completa · lances</h4><div id="lbaGameMoves" class="lba-move-list"></div></div>
   </div>
  </article>
 </div>`;
 const $=id=>root.querySelector('#'+id);
 const status=$('lbaFullGameStatus');
 const legal=()=>{const m=new Map();game.moves({verbose:true}).forEach(x=>{if(!m.has(x.from))m.set(x.from,[]);m.get(x.from).push(x.to)});return m;};
 const setBoard=(movable=false)=>{
  if(!ground||dead)return;
  const h=game.history({verbose:true});
  ground.set({fen:game.fen(),turnColor:game.turn()==='w'?'white':'black',lastMove:h.length?[h[h.length-1].from,h[h.length-1].to]:undefined,check:game.isCheck()?(game.turn()==='w'?'white':'black'):false,movable:{free:false,color:movable?(game.turn()==='w'?'white':'black'):'both',dests:movable?legal():new Map(),showDests:movable}});
 };
 const buildPosition=target=>{
  game=new Chess();
  for(let i=0;i<target;i++){const m=history[i];game.move(m.san);}
  ply=target;setBoard(free);
  $('lbaGamePrev').disabled=ply===0;$('lbaGameNext').disabled=ply===history.length;
  $('lbaGameMoveCounter').textContent='Meio-lance '+ply+' / '+history.length+' · '+(game.isCheckmate()?'XEQUE-MATE':game.isDraw()?'EMPATE':game.turn()==='w'?'vez das Brancas':'vez das Pretas');
  renderMoves();
  const note=GAMES[gameIndex].notes.find(n=>n.n===Math.ceil((ply)/2)&&n.side===(ply%2?'w':'b')&&n.move===history[ply-1]?.san);
  if(note){$('lbaGameMomentTitle').textContent=note.title;$('lbaGameComment').textContent=note.why;$('lbaGameLessons').innerHTML='<p><strong>'+esc(note.lesson)+'</strong></p>';}
  else if(ply===history.length){$('lbaGameMomentTitle').textContent='Fim da partida · '+GAMES[gameIndex].result;$('lbaGameComment').textContent='A partida terminou. Podes regressar a qualquer posição, rever os momentos críticos ou explorar continuações alternativas.';}
  else if(ply===0){$('lbaGameMomentTitle').textContent='Plano da partida';$('lbaGameComment').textContent=GAMES[gameIndex].theme+'. Observa como os jogadores desenvolvem as peças e transformam a posição.';}
  $('lbaGameDecision').hidden=true;
  status.textContent=game.isCheckmate()?'Xeque-mate! Partida concluída.':free?'Modo de exploração livre. Joga no tabuleiro.':'Acompanha a partida lance a lance ou activa um desafio numa posição crítica.';
 };
 const renderMoves=()=>{
  $('lbaGameMoves').innerHTML=history.map((m,i)=>'<button type="button" class="lba-move-row '+(i<ply?'selected':'')+'" data-ply="'+(i+1)+'"><span class="lba-move-number">'+(Math.floor(i/2)+1)+(i%2?'…':'.')+'</span><span class="lba-move-san">'+pt(m.san)+'</span></button>').join('');
 };
 const loadGame=()=>{
  const data=GAMES[gameIndex];game=new Chess();
  try{game.loadPgn(data.pgn);}catch(e){status.textContent='Não foi possível carregar esta partida: '+e.message;return;}
  history=game.history({verbose:true});game=new Chess();
  $('lbaGameTitle').textContent=data.title;
  $('lbaGameMeta').textContent=data.white+' (Brancas) — '+data.black+' (Pretas) · '+data.event+' · Resultado '+data.result+' · '+data.opening;
  $('lbaGameTheme').textContent='Tema de estudo: '+data.theme;
  const select=$('lbaGameSelect');select.innerHTML=GAMES.map((g,i)=>'<option value="'+i+'">'+esc(g.title)+' — '+esc(g.white)+' vs '+esc(g.black)+'</option>').join('');select.value=String(gameIndex);
  $('lbaGameLessons').innerHTML=data.notes.map(n=>'<div class="lba-list-row"><span><b>'+esc(n.n+'. '+pt(n.move))+' · '+esc(n.title)+'</b><small>'+esc(n.lesson)+'</small></span></div>').join('');
  free=false;challenge=null;buildPosition(0);
 };
 const playNext=()=>{if(ply>=history.length)return;buildPosition(ply+1);};
 const onMove=(from,to)=>{
  if(challenge){
   const attempt=game.move({from,to,promotion:'q'});
   if(!attempt){setBoard(true);return;}
   if(attempt.san===challenge.expected){
    $('lbaGameDecisionFeedback').textContent='Correcto. '+challenge.note.why;
    $('lbaGameDecisionFeedback').classList.add('is-correct');
    ply++;challenge=null;$('lbaGameExitChallenge').disabled=false;$('lbaGameMoveCounter').textContent='Meio-lance '+ply+' / '+history.length+' · decisão correcta';renderMoves();
    Promise.resolve(record('livro-vivo','partidas','attempt',100,0,{game:GAMES[gameIndex].id,move:attempt.san,correct:true})).catch(()=>{});
   }else{
    const played=attempt.san;game=new Chess();for(let i=0;i<ply;i++)game.move(history[i].san);
    $('lbaGameDecisionFeedback').textContent='Esse lance é legal, mas não corresponde à decisão estudada. '+(challenge.note?.why||'Compara a actividade das peças e as ameaças do adversário.')+' Tentaste '+pt(played)+'. Volta a analisar e tenta outra vez.';
    Promise.resolve(record('livro-vivo','partidas','attempt',0,0,{game:GAMES[gameIndex].id,move:played,correct:false})).catch(()=>{});
   }
   setBoard(true);return;
  }
  if(free){
   const move=game.move({from,to,promotion:'q'});
   if(!move){setBoard(true);return;}
   status.textContent='Exploração livre: '+pt(move.san)+' jogado. Podes continuar a partida a partir desta posição.';
   setBoard(true);return;
  }
  setBoard(false);
 };
 ground=Chessground($('lbaFullGameBoard'),{fen:game.fen(),orientation:'white',coordinates:true,animation:{enabled:true,duration:180},movable:{free:false,color:'both',dests:new Map(),showDests:false},events:{move:onMove}});
 $('lbaGameSelect').addEventListener('change',e=>{gameIndex=Number(e.target.value);loadGame();});
 $('lbaGameStart').addEventListener('click',()=>{free=false;challenge=null;buildPosition(0);});
 $('lbaGamePrev').addEventListener('click',()=>{if(ply>0){free=false;buildPosition(ply-1);}});
 $('lbaGameNext').addEventListener('click',()=>{if(ply<history.length){free=false;playNext();}});
 $('lbaGameFree').addEventListener('click',()=>{challenge=null;free=true;setBoard(true);status.textContent='Exploração livre: joga qualquer lance legal e continua a partir desta posição. Para regressar à partida, usa Próximo lance.';});
 $('lbaGameChallenge').addEventListener('click',()=>{
  const data=GAMES[gameIndex],note=data.notes.find(n=>((n.n-1)*2+(n.side==='b'?1:0))===ply);
  if(!note){$('lbaGameDecision').hidden=false;$('lbaGameDecisionText').textContent='Esta posição não tem ainda um comentário de decisão específico. Escolhe um lance e explica mentalmente o teu plano antes de continuar.';challenge={expected:history[ply]?.san||'',note:{why:'Compara o teu lance com a continuação histórica e identifica as diferenças na posição.'}};}
  else{challenge={expected:note.move,note};$('lbaGameDecision').hidden=false;$('lbaGameDecisionText').textContent='Encontra '+(ply%2?'para as Pretas':'para as Brancas')+' o lance que mantém a ideia: '+note.title+'. Joga no tabuleiro.';}
  $('lbaGameDecisionFeedback').textContent='Ainda não foi avaliado. Pensa antes de mover.';$('lbaGameExitChallenge').disabled=false;free=false;setBoard(true);
 });
 $('lbaGameExitChallenge').addEventListener('click',()=>{challenge=null;$('lbaGameDecision').hidden=true;buildPosition(ply);});
 $('lbaGameMoves').addEventListener('click',e=>{const b=e.target.closest('[data-ply]');if(b){free=false;challenge=null;buildPosition(Number(b.dataset.ply));}});
 const resize=()=>{if(ground&&!dead)ground.redrawAll();};window.addEventListener('resize',resize,{passive:true});
 if(window.ResizeObserver){observer=new ResizeObserver(resize);observer.observe($('lbaFullGameBoard').parentElement);}
 loadGame();
 return()=>{dead=true;window.removeEventListener('resize',resize);if(observer)observer.disconnect();if(ground){ground.destroy();ground=null;}};
}
