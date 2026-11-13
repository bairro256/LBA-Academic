import { Chess } from 'https://esm.sh/chess.js@1.4.0';

const modules = [
 {id:'openings',number:'01',name:'Aberturas',subtitle:'Princípios, repertório e transição',topics:[
  ['Centro','Ocupar e controlar as casas centrais; compreender centros abertos, fechados e móveis.'],
  ['Desenvolvimento','Mobilizar as peças com rapidez, coordenar forças e evitar perdas de tempo.'],
  ['Segurança do Rei','Escolher o momento do roque, reconhecer linhas abertas e prevenir ataques.'],
  ['Estruturas de Peões','Peões isolados, dobrados, atrasados, cadeias e rupturas estruturais.'],
  ['Planos de Abertura','Ligar a disposição das peças a um plano coerente para o meio-jogo.'],
  ['Transposições','Reconhecer ordens de lances e chegar à estrutura desejada por diferentes caminhos.']
 ]},
 {id:'middlegame',number:'02',name:'Meio-Jogo',subtitle:'Estratégia, cálculo e decisão',topics:[
  ['Peças Boas e Más','Avaliar actividade, mobilidade, casas fortes e a pior peça da posição.'],
  ['Casas Fracas','Criar, ocupar e explorar casas que já não podem ser defendidas por peões.'],
  ['Profilaxia','Identificar o plano adversário e limitar os seus recursos antes de agir.'],
  ['Restrição','Reduzir a mobilidade adversária e controlar casas de entrada.'],
  ['Rupturas','Preparar avanços de peões que alteram a estrutura e abrem linhas.'],
  ['Cálculo de Variantes','Encontrar lances candidatos, calcular com precisão e avaliar a posição final.']
 ]},
 {id:'endgames',number:'03',name:'Finais',subtitle:'Técnica, precisão e conversão',topics:[
  ['Oposição','Usar a oposição directa, distante e diagonal para ganhar casas-chave.'],
  ['Casas-Chave','Identificar as casas que garantem a promoção de um peão.'],
  ['Finais de Torres','Aplicar princípios de actividade, corte do rei e posições Lucena e Philidor.'],
  ['Actividade do Rei','Centralizar o rei e transformá-lo numa peça activa.'],
  ['Conversão','Transformar vantagem material ou posicional numa vitória técnica.'],
  ['Defesa','Construir fortaleza, bloquear peões e encontrar recursos de empate.']
 ]}
];

const lessons = {
 'Centro': {
  idea:'O centro não é apenas um conjunto de quatro casas. É a zona que determina o espaço, a mobilidade e a rapidez com que as peças conseguem mudar de ala.',
  points:['Os peões em e4 e d4 ocupam directamente o centro.','Cavalos e bispos podem controlar o centro à distância.','Um centro móvel pode avançar; um centro bloqueado exige rupturas laterais.'],
  plan:'Desenvolve as peças para apoiar os peões centrais. Antes de avançar, verifica se o peão ficará defendido e que casas serão enfraquecidas.',
  mistakes:'Avançar todos os peões centrais sem desenvolvimento; trocar no centro sem avaliar a estrutura resultante.',
  checklist:'Quem controla e4, d4, e5 e d5? O centro está aberto ou fechado? Que ruptura muda a posição?'
 },
 'Desenvolvimento': {
  idea:'Desenvolver é colocar cada peça numa casa útil, com influência sobre o centro e ligação com as restantes forças.',
  points:['Desenvolve cavalos e bispos antes de mover a mesma peça repetidamente.','Evita lances de peões que não ajudam o centro nem libertam peças.','A iniciativa vale quando obriga o adversário a responder a ameaças concretas.'],
  plan:'Ocupa ou controla o centro, desenvolve peças menores, faz o roque e liga as torres. Só depois procura operações laterais.',
  mistakes:'Sair cedo com a dama, capturar peões envenenados e deixar o rei no centro.',
  checklist:'Quantas peças menores desenvolvi? O adversário ganhou tempos sobre a minha dama? Posso rocar?'
 },
 'Segurança do Rei': {
  idea:'A segurança do rei depende do abrigo de peões, das linhas abertas, da actividade das peças adversárias e do momento escolhido para rocar.',
  points:['O roque normalmente retira o rei do centro e activa uma torre.','Peões avançados criam espaço, mas também deixam casas vulneráveis.','Com roques opostos, o tempo e a abertura de linhas tornam-se decisivos.'],
  plan:'Avalia se o centro pode abrir. Se estiver estável, completa o roque; se estiver prestes a abrir, calcula primeiro as consequências.',
  mistakes:'Rocar automaticamente para uma ala já enfraquecida; abrir linhas junto do próprio rei sem necessidade.',
  checklist:'O centro pode abrir? Que diagonais apontam ao meu rei? O roque melhora realmente a segurança?'
 },
 'Peças Boas e Más': {
  idea:'Uma peça boa participa no jogo e encontra casas úteis; uma peça má fica limitada pela estrutura de peões ou pela falta de alvos.',
  points:['Compara actividade e mobilidade, não apenas o valor nominal.','Identifica a tua pior peça e procura melhorá-la.','Trocar uma peça activa por uma passiva pode ajudar o adversário.'],
  plan:'Localiza a peça menos activa, encontra uma rota de melhoria e só depois cria uma segunda fraqueza.',
  mistakes:'Trocar automaticamente peças; atacar sem melhorar a coordenação.',
  checklist:'Qual é a minha pior peça? Que casa melhora a sua actividade? Que troca favorece a minha estrutura?'
 },
 'Casas Fracas': {
  idea:'Uma casa fraca é uma casa que o adversário dificilmente consegue expulsar uma peça, muitas vezes porque os peões já não a podem controlar.',
  points:['Um avanço de peão pode deixar casas atrás dele.','Um cavalo numa casa forte pode tornar-se um posto avançado.','A casa fraca só é útil se houver uma rota para ocupá-la.'],
  plan:'Provoca uma fraqueza, troca o defensor relevante e instala uma peça na casa antes que o adversário reorganize a defesa.',
  mistakes:'Criar uma casa fraca sem conseguir ocupá-la; trocar a peça que deveria explorar essa casa.',
  checklist:'Que peão já não pode controlar esta casa? Qual peça a pode ocupar? Como será expulsa?'
 },
 'Profilaxia': {
  idea:'Profilaxia é pensar no que o adversário pretende fazer e reduzir a força desse plano antes de executar o nosso.',
  points:['Procura ameaças directas e melhorias posicionais do adversário.','Um lance útil pode retirar uma casa, uma ruptura ou uma coluna ao oponente.','A profilaxia não significa jogar passivamente: prepara a iniciativa.'],
  plan:'Pergunta “o que faria o adversário se eu passasse a vez?”. Neutraliza a ideia mais forte e melhora uma peça no mesmo lance, se possível.',
  mistakes:'Jogar apenas o próprio plano; defender ameaças imaginárias e perder tempos.',
  checklist:'Qual é a ameaça? Que ruptura prepara? Posso impedir o plano e melhorar a minha posição?'
 },
 'Oposição': {
  idea:'A oposição é uma relação entre os reis em que o lado que não tem a vez pode impedir a passagem do rei adversário.',
  points:['Na oposição directa, os reis ficam frente a frente com uma casa entre eles.','A oposição distante pode produzir o mesmo efeito com mais casas de separação.','O objectivo é ganhar acesso às casas-chave, não apenas aproximar os reis.'],
  plan:'Conta as casas entre os reis e verifica quem tem a vez. Usa movimentos laterais para conservar a oposição favorável.',
  mistakes:'Aproximar o rei sem calcular a oposição; esquecer que a vez de jogar altera o resultado.',
  checklist:'Quem tem a vez? Os reis estão em oposição? Que casa precisa o meu rei de alcançar?'
 },
 'Casas-Chave': {
  idea:'As casas-chave são casas que, quando alcançadas pelo rei, permitem apoiar a promoção do peão independentemente da defesa correcta do adversário.',
  points:['A posição do peão determina o conjunto de casas-chave.','O rei deve abrir caminho antes de empurrar o peão.','Peões de torre têm regras especiais por causa do canto.'],
  plan:'Identifica as casas-chave, calcula a corrida dos reis e só depois decide quando avançar o peão.',
  mistakes:'Empurrar o peão cedo demais; calcular apenas a distância até à promoção.',
  checklist:'Quais são as casas-chave? O meu rei consegue ocupá-las? O peão de torre muda a avaliação?'
 },
 'Finais de Torres': {
  idea:'Nos finais de torres, a actividade da torre e do rei costuma ser mais importante do que proteger passivamente um peão.',
  points:['Coloca a torre atrás do peão passado, teu ou adversário.','Corta o rei adversário sempre que isso limitar a sua aproximação.','Conhece as posições defensivas de Philidor e vencedoras de Lucena.'],
  plan:'Activa a torre, melhora o rei e só depois decide se deves apoiar o peão ou atacar os peões adversários.',
  mistakes:'Usar a torre passivamente; afastar o rei do centro; avançar o peão sem apoio.',
  checklist:'A minha torre está activa? Posso cortar o rei? O peão passado está suficientemente apoiado?'
 }
};

const puzzles = {
 'Centro':{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',setup:[],answer:'e4',hint:'Joga um peão central para ocupar espaço e abrir linhas.',why:'1.e4 ocupa uma casa central, controla d5 e f5 e liberta o bispo de f1 e a dama.'},
 'Desenvolvimento':{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',setup:[],answer:'Nf3',hint:'Desenvolve uma peça menor e ataca o peão e5.',why:'2.Cf3 desenvolve o cavalo, controla d4 e e5 e prepara o roque.'},
 'Segurança do Rei':{fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',setup:[],answer:'O-O',hint:'O centro ainda não está bloqueado. Põe o rei em segurança e activa a torre.',why:'4.O-O retira o rei do centro e liga a torre de h1 ao jogo.'},
 'Peças Boas e Más':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'d4',hint:'Abre o centro enquanto as tuas peças estão coordenadas.',why:'d4 desafia o centro e procura libertar as peças brancas. Avalia sempre as capturas e a estrutura que fica.'},
 'Casas Fracas':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'d4',hint:'Questiona o centro para ganhar espaço e criar casas de entrada.',why:'d4 desafia a estrutura central. Depois das trocas, procura casas que os peões já não conseguem defender.'},
 'Profilaxia':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'a4',hint:'Antes de avançar no centro, limita a expansão das Pretas na ala da dama.',why:'a4 questiona a cadeia b5 e pode limitar ...b4. É uma ideia profiláctica: reduzir o plano adversário.'},
 'Oposição':{fen:'8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',setup:[],answer:'Kd3',hint:'Aproxima o rei mantendo atenção à oposição e à casa de passagem.',why:'O rei branco procura apoiar o peão e ganhar espaço. Em finais de peões, a vez de jogar e a oposição são decisivas.'},
 'Casas-Chave':{fen:'8/8/8/8/4k3/8/4K3/4P3 w - - 0 1',setup:[],answer:'Kd3',hint:'Não empurres o peão imediatamente. Aproxima o rei.',why:'O rei deve participar na luta pelas casas-chave antes de o peão avançar.'},
 'Finais de Torres':{fen:'8/8/8/8/4k3/8/4K3/4R3 w - - 0 1',setup:[],answer:'Re3+',hint:'Procura um xeque activo que obrigue o rei adversário a reagir.',why:'A actividade da torre é essencial. Usa os xeques para ganhar tempos e melhorar a posição.'}
};

const modelGame = {
 title:'Sequência didáctica LBA · Desenvolvimento e centro',
 note:'Exemplo pedagógico criado para esta aula — não é uma partida histórica.',
 moves:['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d4','exd4','cxd4','Bb4+','Nc3'],
 comments:[
  'As Brancas ocupam o centro e libertam linhas para as peças.',
  'As Pretas disputam o centro de forma simétrica.',
  'O cavalo desenvolve-se com ataque ao peão e5.',
  'As Pretas defendem o peão e desenvolvem uma peça.',
  'O bispo aponta para f7, uma casa sensível na posição inicial.',
  'As Pretas desenvolvem o bispo e contestam a diagonal.',
  'c3 prepara d4 e constrói um centro de peões.',
  'O cavalo desenvolve-se e ataca o peão e4.',
  'd4 desafia o centro e abre linhas.',
  'As Pretas aceitam a troca central.',
  'As Brancas recapturam com o peão, mantendo presença central.',
  'O xeque obriga as Brancas a responder e mostra a importância dos tempos.',
  'Nc3 desenvolve mais uma peça e bloqueia o xeque.'
 ]
};

const levels=[{id:'base',label:'1200–1500',name:'Base'},{id:'intermediate',label:'1500–1800',name:'Intermédio'},{id:'advanced',label:'1800–2000',name:'Avançado'}];
const freeTopics=new Set(['Centro','Desenvolvimento','Segurança do Rei','Peças Boas e Más','Casas Fracas','Profilaxia','Oposição','Casas-Chave','Finais de Torres']);
const state={topic:null,level:'base',tab:'theory',completed:new Set(),fullAccess:false};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function topicId(mid,name){return mid+'-'+name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function findTopic(id){for(const m of modules){const i=m.topics.findIndex(([n])=>topicId(m.id,n)===id);if(i>=0)return {module:m,index:i,name:m.topics[i][0],description:m.topics[i][1],id};}return null}
function renderModules(){
 const root=$('curriculumModules');if(!root)return;
 root.innerHTML=modules.map(m=>'<section class="curriculum-module"><div class="curriculum-module-head"><div><span class="mini-label">MÓDULO '+m.number+'</span><h3>'+m.name+'</h3><p>'+m.subtitle+'</p></div><span class="module-count">03 ABERTAS · 03 COMPLETAS</span></div><div class="curriculum-folder-grid">'+m.topics.map(([name,desc],i)=>{const open=state.fullAccess||freeTopics.has(name);return '<button type="button" class="curriculum-folder '+(open?'is-open':'is-locked')+'" data-topic="'+topicId(m.id,name)+'"><span class="folder-icon">'+(open?'♟':'🔒')+'</span><span class="folder-copy"><b>'+m.number+'.'+(i+1)+' · '+esc(name)+'</b><small>'+esc(desc)+'</small></span><span class="folder-status">'+(open?'ABRIR ↗':'DESBLOQUEIO COMPLETO')+'</span></button>';}).join('')+'</div></section>').join('')+
 '<section class="full-access-card"><div><span class="mini-label">PROGRAMA COMPLETO LBA</span><h3>Desbloqueia os restantes 50%</h3><p>Recebe acesso às 18 aulas completas de Aberturas, Meio-Jogo e Finais.</p><strong>+2.000 Kz</strong> <small>sobre o Premium activo</small></div><button class="btn btn-red" id="requestFullAccess" type="button">Solicitar acesso completo</button><p id="fullAccessMessage" class="full-access-message" role="status">O desbloqueio é confirmado pela administração após validação do pagamento.</p></section>';
 root.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{const t=findTopic(b.dataset.topic);if(!t)return;if(!state.fullAccess&&!freeTopics.has(t.name)){const msg=$('fullAccessMessage');if(msg){msg.textContent='Esta aula faz parte dos 50% adicionais. O acesso completo custa mais 2.000 Kz.';msg.scrollIntoView({behavior:'smooth',block:'center'});}return;}openTopic(t.id);}));
 $('requestFullAccess')?.addEventListener('click',()=>{const msg=$('fullAccessMessage');msg.textContent='Para desbloquear, solicita à administração da LBA a confirmação do pagamento adicional de 2.000 Kz. A área será liberada na tua conta após validação.';});
}
function openTopic(id){const t=findTopic(id);if(!t)return;state.topic=t;state.level='base';state.tab='theory';$('curriculumModules').hidden=true;$('classroomView').hidden=false;$('classroomTitle').textContent=t.name;$('classroomModule').textContent='MÓDULO '+t.module.number+' · '+t.module.name;$('classroomDescription').textContent=t.description;renderClassroom();$('classroomView').scrollIntoView({behavior:'smooth',block:'start'});}
function renderClassroom(){
 const t=state.topic,lesson=lessons[t.name]||{idea:t.description,points:[],plan:'Identifica o elemento estratégico principal e constrói um plano coerente.',mistakes:'Jogar sem avaliar a resposta adversária.',checklist:'Que mudou na posição? Qual é a ameaça?'};const level=levels.find(x=>x.id===state.level);const done=state.completed.has(t.id+'-'+state.level);
 $('classroomLevels').innerHTML=levels.map(l=>'<button type="button" class="level-chip '+(state.level===l.id?'active':'')+'" data-level="'+l.id+'">'+l.label+'<small>'+l.name+'</small></button>').join('');
 $('classroomLevels').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;renderClassroom()});
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.onclick=()=>{state.tab=b.dataset.tab;renderClassroom()}});
 $('classroomProgress').textContent=done?'100% concluído':'Aula em curso';$('classroomProgressFill').style.width=done?'100%':'25%';
 let html='';
 if(state.tab==='theory')html='<article class="classroom-lesson"><span class="mini-label">TEORIA · '+level.label+'</span><h3>'+esc(t.name)+': compreender antes de jogar</h3><p>'+esc(lesson.idea)+'</p><div class="lesson-concept"><h4>Princípios essenciais</h4><ul>'+lesson.points.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="lesson-recipe"><h4>Plano de pensamento</h4><p>'+esc(lesson.plan)+'</p></div><div class="lesson-mistakes"><h4>Erros frequentes</h4><p>'+esc(lesson.mistakes)+'</p></div><div class="gold-rule"><b>CHECKLIST DO TREINADOR</b><p>'+esc(lesson.checklist)+'</p></div><p class="content-note">No nível '+level.name+', explica sempre o motivo do lance e calcula pelo menos uma resposta do adversário.</p></article>';
 if(state.tab==='practice')html='<article class="classroom-lesson"><span class="mini-label">PRÁTICA · TABULEIRO INTERACTIVO</span><h3>Encontra o lance da posição</h3><p>Selecciona uma peça e depois a casa de destino. O tabuleiro verifica se encontraste o lance-chave desta posição.</p><div class="practice-layout"><div id="lessonBoard" class="classroom-board" aria-label="Tabuleiro de xadrez interactivo"></div><div><div class="board-feedback" id="lessonFeedback">Lê a pista e joga no tabuleiro.</div><p id="lessonHint" class="content-note">'+esc(puzzles[t.name]?.hint||'Procura o lance que melhor cumpre o plano.')+'</p><button class="btn btn-outline" id="resetPuzzle" type="button">Recomeçar posição</button></div></div></article>';
 if(state.tab==='games')html='<article class="classroom-lesson"><span class="mini-label">PARTIDA COMENTADA · REPRODUÇÃO LANCE A LANCE</span><h3>'+esc(modelGame.title)+'</h3><p class="content-note">'+esc(modelGame.note)+'</p><div class="game-replay"><div id="gameReplayBoard" class="classroom-board"></div><div class="game-replay-head"><strong id="gameMoveLabel">Posição inicial</strong><span id="gameMoveCount">0 / '+modelGame.moves.length+'</span></div><p id="gameComment" class="board-feedback">Começa por observar o controlo central.</p><div class="practice-controls"><button class="btn btn-outline" id="gamePrev" type="button">← Anterior</button><button class="btn btn-red" id="gameNext" type="button">Próximo lance →</button></div></div></article>';
 if(state.tab==='test')html='<article class="classroom-lesson"><span class="mini-label">VERIFICAÇÃO DE APRENDIZAGEM</span><h3>Explica a tua decisão</h3><p>'+esc(lesson.checklist)+'</p><div class="quiz-question"><h4>Qual é a primeira pergunta que deves fazer nesta aula?</h4><div class="quiz-options"><button class="quiz-option" data-answer="bad">Qual peça posso sacrificar imediatamente?</button><button class="quiz-option" data-answer="good">Que elemento da posição determina o plano?</button><button class="quiz-option" data-answer="bad">Como posso avançar todos os peões?</button></div><div id="quizFeedback" class="board-feedback" hidden></div></div><button class="btn btn-outline" id="markTopicDone" type="button" '+(done?'disabled':'')+'>'+(done?'Aula concluída ✓':'Marcar aula como estudada')+'</button></article>';
 $('classroomPanel').innerHTML=html;
 if(state.tab==='practice')initPuzzle(t.name);
 if(state.tab==='games')initReplay();
 if(state.tab==='test'){$('classroomPanel').querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{const good=b.dataset.answer==='good';$('quizFeedback').hidden=false;$('quizFeedback').className='board-feedback '+(good?'success':'error');$('quizFeedback').textContent=good?'Correcto. Primeiro compreende a posição; depois escolhe o plano.':'Ainda não. Começa por avaliar a posição antes de procurar um lance espectacular.';});}
 $('markTopicDone')?.addEventListener('click',()=>{state.completed.add(t.id+'-'+state.level);renderClassroom()});
}
function boardDraw(root,game,selected,onSquare){
 root.innerHTML='';const glyph={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};const board=game.board();
 for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=board[r][f],sq='abcdefgh'[f]+(8-r),b=document.createElement('button');b.type='button';b.className='classroom-square '+((r+f)%2?'dark':'light')+(selected===sq?' selected':'');b.textContent=p?glyph[p.color][p.type]:'';b.setAttribute('aria-label',sq);b.onclick=()=>onSquare(sq);root.appendChild(b);}
}
function initPuzzle(name){
 const data=puzzles[name],root=$('lessonBoard'),feedback=$('lessonFeedback');if(!data||!root)return;let game=new Chess(data.fen),selected=null,solved=false;
 const draw=()=>boardDraw(root,game,selected,sq=>{if(solved)return;if(selected){const move=game.move({from:selected,to:sq,promotion:'q'});if(move){selected=null;if(move.san===data.answer){solved=true;feedback.className='board-feedback success';feedback.textContent='Muito bem! '+data.why;}else{game.undo();feedback.className='board-feedback error';feedback.textContent='Esse lance é legal, mas não é a solução desta posição. Pista: '+data.hint;}draw();return;}}const p=game.get(sq);selected=p&&p.color===game.turn()?sq:null;draw();});draw();
 $('resetPuzzle').onclick=()=>{game=new Chess(data.fen);selected=null;solved=false;feedback.className='board-feedback';feedback.textContent='Nova tentativa. '+data.hint;draw();};
}
function initReplay(){
 const root=$('gameReplayBoard');let game=new Chess(),index=0;
 const render=()=>{game=new Chess();for(let i=0;i<index;i++)game.move(modelGame.moves[i]);boardDraw(root,game,null,()=>{});$('gameMoveLabel').textContent=index?('Lance '+Math.ceil(index/2)+(index%2?'. Brancas':'... Pretas')):'Posição inicial';$('gameMoveCount').textContent=index+' / '+modelGame.moves.length;$('gameComment').textContent=index?modelGame.comments[index-1]:'Observa a posição inicial: as Brancas começam por disputar o centro.';$('gamePrev').disabled=index===0;$('gameNext').disabled=index===modelGame.moves.length;};
 $('gamePrev').onclick=()=>{index=Math.max(0,index-1);render()};$('gameNext').onclick=()=>{index=Math.min(modelGame.moves.length,index+1);render()};render();
}
export function initCurriculum(){
 $('curriculumModules')?.addEventListener('click',()=>{});
 $('backToModules')?.addEventListener('click',()=>{$('classroomView').hidden=true;$('curriculumModules').hidden=false;$('curriculumModules').scrollIntoView({behavior:'smooth',block:'start'});});
 renderModules();
}
export function setFullCurriculumAccess(value){state.fullAccess=!!value;renderModules();}
