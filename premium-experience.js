import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Chess } from 'https://esm.sh/chess.js@1.4.0';
import { Chessground } from 'https://esm.sh/chessground@9.2.1';
import { MotorDeAnalisePremium } from './premium-engine/AnalisePartidaMotor.js';
import { renderLivroVivo } from './premium-engine/livro-vivo.js';

const DB_URL='https://ksejqypwlmwwayxtievk.supabase.co';
const DB_KEY='sb_publishable_TPeGeLoBdlva7yQqldtbAg_YYi0uHnd';
const db=createClient(DB_URL,DB_KEY);
const $=id=>document.getElementById(id);
let user=null, engine=null, activeTab='dashboard', initialized=false, trainingBoardCleanup=null, openingBoardCleanup=null, endgameBoardCleanup=null, analysisBoardCleanup=null, liveBookCleanup=null;
const skills=['aberturas','tatica','estrategia','finais','psicologia'];
const skillNames={aberturas:'Aberturas',tatica:'Táctica',estrategia:'Estratégia',finais:'Finais',psicologia:'Psicologia de jogo'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isoDay=d=>{const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
function shell(){
 const root=$('premiumSuite'); if(!root)return;
 root.innerHTML=`
 <div class="lba-suite-head"><div><span class="mini-label">LBA PERFORMANCE SYSTEM</span><h2>Centro de treino <em>inteligente</em></h2><p>Um percurso integrado para desenvolver pensamento, técnica e consistência competitiva.</p></div><div class="lba-suite-status"><span class="lba-live-dot"></span> TREINO PREMIUM</div></div>
 <nav class="lba-suite-nav" aria-label="Centro de treino">
 <button data-suite="dashboard" class="active">Visão geral</button><button data-suite="openings">Aberturas</button><button data-suite="middlegame">Meio-jogo</button><button data-suite="endgames">Finais</button><button data-suite="analysis">Análise</button><button data-suite="livebook">Livro Vivo</button></nav>
 <div id="lbaSuitePanel" class="lba-suite-panel" aria-live="polite"></div><div id="suiteStatus" class="lba-feedback" role="status" aria-live="polite"></div>`;
 root.querySelectorAll('[data-suite]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.suite)));
}
function panel(html){$('lbaSuitePanel').innerHTML=html;}
function status(msg,kind=''){const el=$('suiteStatus');if(el){el.className='lba-feedback '+kind;el.textContent=msg;}}
async function record(module,skill,event_type,score=null,duration=0,metadata={}) {
 if(!user)return;
 const {error}=await db.from('lba_training_events').insert({user_id:user.id,module,skill,event_type,score,duration_seconds:duration,metadata});
 if(error)console.warn('LBA event not saved',error.message);
}
function dateKey(date){return isoDay(date)}
function consecutive(dates){const set=new Set(dates);let d=new Date();let key=dateKey(d);if(!set.has(key)){d.setDate(d.getDate()-1);key=dateKey(d);if(!set.has(key))return 0;}let n=0;while(set.has(key)){n++;d.setDate(d.getDate()-1);key=dateKey(d);}return n;}
function radarSvg(values){
 const cx=150,cy=130,r=88,points=values.map((v,i)=>{const a=(-Math.PI/2)+(i*2*Math.PI/5),rr=r*v/100;return (cx+Math.cos(a)*rr)+','+(cy+Math.sin(a)*rr)}).join(' ');
 const axes=skills.map((s,i)=>{const a=(-Math.PI/2)+(i*2*Math.PI/5),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r,lx=cx+Math.cos(a)*(r+23),ly=cy+Math.sin(a)*(r+23);return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="radar-axis"/><text x="${lx}" y="${ly}" class="radar-label" text-anchor="middle" dominant-baseline="middle">${['Aberturas','Táctica','Estratégia','Finais','Psicologia'][i]}</text>`}).join('');
 const rings=[25,50,75,100].map(v=>`<polygon points="${skills.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return (cx+Math.cos(a)*r*v/100)+','+(cy+Math.sin(a)*r*v/100)}).join(' ')}" class="radar-ring"/>`).join('');
 return `<svg viewBox="0 0 300 260" role="img" aria-label="Radar das cinco competências">${rings}${axes}<polygon points="${points}" class="radar-data"/>${values.map((v,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return `<circle cx="${cx+Math.cos(a)*r*v/100}" cy="${cy+Math.sin(a)*r*v/100}" r="3.5" class="radar-point"/>`}).join('')}</svg>`;
}
async function dashboard(){
 panel('<div class="lba-loading">A calcular o teu progresso…</div>');
 const since=new Date(Date.now()-90*86400000).toISOString();
 const {data,error}=await db.from('lba_training_events').select('skill,event_type,score,duration_seconds,occurred_at').gte('occurred_at',since).order('occurred_at',{ascending:true}).limit(1500);
 if(error){panel('<div class="lba-empty">Não foi possível carregar as métricas. '+esc(error.message)+'</div>');return;}
 const events=data||[],scores=skills.map(s=>{const rows=events.filter(e=>e.skill===s&&e.score!==null);return rows.length?Math.round(rows.reduce((a,e)=>a+Number(e.score),0)/rows.length):0;});
 const days=[...new Set(events.map(e=>dateKey(e.occurred_at)))],streak=consecutive(days),minutes=Math.round(events.reduce((a,e)=>a+Number(e.duration_seconds||0),0)/60);
 const completed=events.filter(e=>e.event_type==='completed').length;
 const weakest=skills.map((s,i)=>({s,v:scores[i],n:events.filter(e=>e.skill===s&&e.score!==null).length})).sort((a,b)=>(a.n? a.v:50)-(b.n?b.v:50))[0];
 const week=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const key=dateKey(d);return {key,label:['D','S','T','Q','Q','S','S'][d.getDay()],n:events.filter(e=>dateKey(e.occurred_at)===key).length};});
 const max=Math.max(1,...week.map(x=>x.n));
 panel(`
 <div class="lba-metric-grid"><article class="lba-metric"><span>SEQUÊNCIA ACTUAL</span><strong>${streak} <small>dias</small></strong><p>Consistência de treino</p></article><article class="lba-metric"><span>TEMPO REGISTADO</span><strong>${minutes} <small>min</small></strong><p>Últimos 90 dias</p></article><article class="lba-metric"><span>TREINOS CONCLUÍDOS</span><strong>${completed}</strong><p>Resultados registados</p></article></div>
 <div class="lba-dashboard-grid"><article class="lba-suite-card"><div class="lba-card-title"><div><span class="mini-label">PERFIL DE COMPETÊNCIAS</span><h3>O teu radar de evolução</h3></div><span class="lba-period">90 DIAS</span></div>${radarSvg(scores)}<div class="lba-skill-legend">${skills.map((s,i)=>`<span><i></i>${skillNames[s]} <b>${scores[i]?scores[i]+'%':'—'}</b></span>`).join('')}</div><p class="lba-footnote">As pontuações só aparecem quando existem resultados reais registados. Sem dados, não inventamos classificações.</p></article>
 <article class="lba-suite-card"><span class="mini-label">RITMO DE TREINO</span><h3>Actividade dos últimos 7 dias</h3><div class="lba-week-bars">${week.map(d=>`<div><span>${d.n||''}</span><i style="height:${Math.max(5,d.n/max*100)}%"></i><small>${d.label}</small></div>`).join('')}</div><div class="lba-recommend"><span class="mini-label">PRÓXIMO PASSO RECOMENDADO</span><h3>${weakest.n?skillNames[weakest.s]:'Começar a medir o teu jogo'}</h3><p>${weakest.n?'É a competência com menor média entre as áreas que já têm resultados.':'Completa um exercício em cada área para construirmos um perfil baseado no teu desempenho.'}</p><button class="lba-primary" data-go="${weakest.s==='aberturas'?'openings':weakest.s==='finais'?'endgames':weakest.s==='tatica'||weakest.s==='estrategia'?'middlegame':'analysis'}">Continuar a minha jornada</button></div></article></div>`);
 $('lbaSuitePanel').querySelector('[data-go]')?.addEventListener('click',e=>showTab(e.currentTarget.dataset.go));
}
async function openings(){
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 01 · REPERTÓRIO PESSOAL</span><h3>Academia de Aberturas</h3><p>Constrói repertórios para as duas cores, importa partidas em PGN e consulta estatísticas de posições na base pública do Lichess.</p></div>
 <div class="lba-two-col"><article class="lba-suite-card"><h3>Criar repertório</h3><form id="repForm" class="lba-form"><label>Nome do repertório<input id="repName" required maxlength="100" placeholder="Ex.: Defesa Siciliana"></label><label>Cor<select id="repColor"><option value="white">Brancas</option><option value="black">Pretas</option></select></label><button class="lba-primary">Guardar repertório</button></form><div id="repList" class="lba-list"></div></article>
 <article class="lba-suite-card"><h3>Importar e estudar uma linha</h3><form id="pgnForm" class="lba-form"><label>Repertório<select id="repTarget" required></select></label><label>Partida ou linha PGN<textarea id="repPgn" required rows="5" placeholder="1. e4 c5 2. Nf3 d6…"></textarea></label><button class="lba-primary">Validar e guardar linha</button></form><div id="pgnFeedback" class="lba-feedback">O PGN será validado lance a lance antes de ser guardado.</div></article></div>
 <article class="lba-suite-card"><span class="mini-label">EXPLORADOR DE ABERTURAS</span><h3>Estatísticas da posição</h3><form id="explorerForm" class="lba-inline-form"><input id="explorerFen" placeholder="FEN (deixa vazio para posição inicial)"><button class="lba-secondary">Consultar Lichess</button></form><div id="explorerResult" class="lba-feedback">Consulta popularidade e resultados de partidas para uma posição.</div></article>
 <article class="lba-suite-card"><span class="mini-label">TREINO DE MEMÓRIA</span><h3>Tabuleiro às cegas</h3><p>Joga normalmente nos primeiros cinco meios-lances. A partir daí, as peças desaparecem e continuas a jogar de memória, com validação de lances legais.</p><div class="lba-board-frame lba-blindfold-frame" id="blindBoardFrame"><div id="lbaBlindfoldBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro interactivo para treino às cegas"></div></div><div class="lba-board-tools"><label class="lba-promotion-choice">Promoção<select id="blindPromotion"><option value="q">Dama</option><option value="r">Torre</option><option value="b">Bispo</option><option value="n">Cavalo</option></select></label><button type="button" id="blindUndo" class="lba-secondary">Anular lance</button><button type="button" id="blindReset" class="lba-secondary">Reiniciar</button><button type="button" id="blindReveal" class="lba-secondary">Revelar posição</button></div><div id="blindFeedback" class="lba-board-coach" role="status" aria-live="polite">Faz os primeiros cinco meios-lances com o tabuleiro visível.</div><div id="blindMoveCount" class="lba-footnote">0 / 5 meios-lances até activar o modo às cegas.</div></article>`);
 const {data:reps,error}=await db.from('lba_opening_repertoires').select('id,name,color,created_at').order('created_at');
 const list=$('repList'),target=$('repTarget');
 if(error){list.textContent='Erro ao carregar repertórios: '+error.message;return;}
 const render=()=>{list.innerHTML=(reps||[]).map(r=>`<div class="lba-list-row"><span><b>${esc(r.name)}</b><small>${r.color==='white'?'BRANCAS':'PRETAS'}</small></span><span class="lba-tag">PESSOAL</span></div>`).join('')||'<p class="lba-footnote">Ainda não criaste repertórios.</p>';target.innerHTML=(reps||[]).map(r=>`<option value="${r.id}">${esc(r.name)} · ${r.color==='white'?'Brancas':'Pretas'}</option>`).join('');};
 render();
 $('repForm').onsubmit=async e=>{e.preventDefault();const name=$('repName').value.trim(),color=$('repColor').value;const {data,error}=await db.from('lba_opening_repertoires').insert({user_id:user.id,name,color}).select().single();if(error){status(error.message,'error');return;}reps.push(data);render();$('repName').value='';status('Repertório criado e associado à tua conta.','success');};
 $('pgnForm').onsubmit=async e=>{e.preventDefault();const chess=new Chess();try{chess.loadPgn($('repPgn').value);const parsed=chess.pgn();if(!parsed)throw new Error('Não foi possível interpretar a linha.');const repId=$('repTarget').value;if(!repId)throw new Error('Cria primeiro um repertório.');const {error}=await db.from('lba_opening_lines').insert({user_id:user.id,repertoire_id:repId,name:'Linha importada',pgn:parsed,target_fen:chess.fen()});if(error)throw error;$('pgnFeedback').textContent='Linha legal validada e guardada. Posição final: '+chess.fen();await record('aberturas','aberturas','attempt',null,0,{kind:'pgn-import'});}catch(err){$('pgnFeedback').textContent='PGN não guardado: '+err.message;}};
 $('explorerForm').onsubmit=async e=>{e.preventDefault();const out=$('explorerResult');out.textContent='A consultar a base de partidas…';try{const fen=$('explorerFen').value.trim()||new Chess().fen();const url='https://explorer.lichess.ovh/masters?fen='+encodeURIComponent(fen)+'&moves=8&topGames=0';const res=await fetch(url);if(!res.ok)throw new Error('Serviço indisponível ('+res.status+').');const data=await res.json();out.innerHTML='<b>'+esc(data.opening?.name||'Posição sem nome de abertura identificado')+'</b><p>'+Number(data.white||0)+' vitórias brancas · '+Number(data.draws||0)+' empates · '+Number(data.black||0)+' vitórias pretas</p>'+(data.moves||[]).slice(0,5).map(m=>'<div class="lba-list-row"><span>'+esc(m.san)+'</span><b>'+Number(m.white+m.draws+m.black)+' partidas</b></div>').join('');}catch(err){out.textContent=err.message;}};
 if(openingBoardCleanup){openingBoardCleanup();openingBoardCleanup=null;}
 const blindBoardEl=$('lbaBlindfoldBoard'),blindFrame=$('blindBoardFrame'),blindCoach=$('blindFeedback'),blindCount=$('blindMoveCount');
 let blindGame=new Chess(),blindGround=null,blindRevealed=true;
 const blindDestinations=()=>{const map=new Map();blindGame.moves({verbose:true}).forEach(m=>{if(!map.has(m.from))map.set(m.from,[]);map.get(m.from).push(m.to);});return map;};
 const blindRefresh=()=>{
  const history=blindGame.history({verbose:true}),plies=history.length,hidden=plies>=5&&!blindRevealed;
  blindFrame.classList.toggle('is-blindfold',hidden);
  blindGround.set({fen:blindGame.fen(),turnColor:blindGame.turn()==='w'?'white':'black',check:blindGame.isCheck()?(blindGame.turn()==='w'?'white':'black'):false,lastMove:history.slice(-1).map(m=>[m.from,m.to])[0],movable:{free:false,color:'both',dests:blindDestinations(),showDests:true}});
  blindCount.textContent=plies<5?plies+' / 5 meios-lances até activar o modo às cegas':(hidden?'Modo às cegas activo · '+plies+' meios-lances':'Posição revelada · '+plies+' meios-lances');
 };
 const blindMove=(orig,dest)=>{
  try{const move=blindGame.move({from:orig,to:dest,promotion:$('blindPromotion')?.value||'q'});if(!move){blindRefresh();return;}if(blindGame.history().length>=5){blindRevealed=false;blindCoach.textContent='Modo às cegas activado. Continua a jogar de memória; os lances continuam a ser validados.';}else blindCoach.textContent=move.san+' · Lance legal. Faltam '+(5-blindGame.history().length)+' meios-lances para activar o modo às cegas.';blindRefresh();record('aberturas','aberturas','attempt',null,0,{kind:'blindfold-move',san:move.san,plies:blindGame.history().length});if(blindGame.isCheckmate())blindCoach.textContent+=' Xeque-mate.';else if(blindGame.isDraw())blindCoach.textContent+=' Empate.';}catch(err){blindRefresh();blindCoach.textContent='Lance não aceite: '+err.message;}
 };
 blindGround=Chessground(blindBoardEl,{fen:blindGame.fen(),orientation:'white',coordinates:true,autoCastle:true,movable:{free:false,color:'both',dests:blindDestinations(),showDests:true},animation:{enabled:true,duration:180},events:{move:blindMove}});
 $('blindUndo').onclick=()=>{const m=blindGame.undo();if(blindGame.history().length<5)blindRevealed=true;blindRefresh();blindCoach.textContent=m?'Último lance anulado.':'Ainda não há lances para anular.';};
 $('blindReset').onclick=()=>{blindGame.reset();blindRevealed=true;blindRefresh();blindCoach.textContent='Tabuleiro reiniciado. Joga os primeiros cinco meios-lances com as peças visíveis.';};
 $('blindReveal').onclick=()=>{blindRevealed=!blindRevealed;blindRefresh();blindCoach.textContent=blindRevealed?'Posição revelada. Quando quiseres, volta a ocultar as peças.':'Posição escondida. Continua o exercício de memória.';};
 const blindResize=()=>{if(blindGround)blindGround.redrawAll();};window.addEventListener('resize',blindResize,{passive:true});
 let blindRO=null;if(window.ResizeObserver){blindRO=new ResizeObserver(blindResize);blindRO.observe(blindFrame);}
 openingBoardCleanup=()=>{window.removeEventListener('resize',blindResize);if(blindRO)blindRO.disconnect();if(blindGround){blindGround.destroy();blindGround=null;}};
 blindRefresh();
}
function getEngine(){
 if(engine)return engine;
 const base='https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/';
 const wrapper=`self.Module={locateFile:(p)=>'${base}'+p};importScripts('${base}stockfish-19-lite-single.js');`;
 const blob=new Blob([wrapper],{type:'text/javascript'});engine={worker:new Worker(URL.createObjectURL(blob)),ready:false,busy:false};
 engine.worker.postMessage('uci');return engine;
}
function analyseFen(fen,multiPv=3,depth=12){
 return new Promise((resolve,reject)=>{
  let eng;try{eng=getEngine();}catch(e){reject(e);return;}
  if(eng.busy){reject(new Error('A engine já está a analisar outra posição. Aguarda a conclusão.'));return;}
  const lines=new Map(),timeout=setTimeout(()=>{eng.busy=false;eng.worker.terminate();engine=null;reject(new Error('A engine demorou demasiado. Reinicia a análise e tenta novamente.'));},45000);
  const onError=e=>{clearTimeout(timeout);eng.busy=false;engine=null;eng.worker.removeEventListener('message',handler);reject(new Error('Falha ao carregar Stockfish WASM: '+(e.message||'verifica a ligação e tenta novamente.')));};
  const handler=e=>{const line=String(e.data||'');if(line==='uciok'){eng.ready=true;eng.worker.postMessage('isready');return;}if(line==='readyok'){eng.worker.postMessage('setoption name MultiPV value '+multiPv);eng.worker.postMessage('position fen '+fen);eng.worker.postMessage('go depth '+depth);return;}
   if(line.startsWith('info ')&&line.includes(' pv ')){const m=line.match(/multipv (\d+).*?score (cp|mate) (-?\d+).*? pv (.+)$/);if(m)lines.set(Number(m[1]),{multipv:Number(m[1]),scoreType:m[2],score:Number(m[3]),pv:m[4]});}
   if(line.startsWith('bestmove')){clearTimeout(timeout);eng.worker.removeEventListener('message',handler);eng.worker.removeEventListener('error',onError);eng.busy=false;resolve([...lines.values()].sort((a,b)=>a.multipv-b.multipv));}
  };
  eng.busy=true;eng.worker.addEventListener('message',handler);eng.worker.addEventListener('error',onError,{once:true});if(eng.ready){eng.worker.postMessage('isready');} 
 });
}
async function middlegame(){
 if(trainingBoardCleanup){trainingBoardCleanup();trainingBoardCleanup=null;}
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 02 · CÁLCULO E ESTRATÉGIA</span><h3>Laboratório de Meio-Jogo</h3><p>Estuda a posição num tabuleiro interactivo, calcula variantes legais e consulta três candidatos do Stockfish.</p></div>
 <div class="lba-board-layout">
  <article class="lba-suite-card lba-board-card">
   <div class="lba-board-top"><div><span class="mini-label">TABULEIRO DE TREINO</span><h3>Posição de análise</h3></div><span class="lba-tag">1 : 1 · RESPONSIVO</span></div>
   <div class="lba-board-frame"><div id="lbaTrainingBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro interactivo de xadrez"></div></div>
   <div class="lba-board-tools"><label class="lba-promotion-choice">Promoção<select id="promotionChoice"><option value="q">Dama</option><option value="r">Torre</option><option value="b">Bispo</option><option value="n">Cavalo</option></select></label><button type="button" id="boardFlip" class="lba-secondary">Rodar tabuleiro</button><button type="button" id="boardUndo" class="lba-secondary">Anular lance</button><button type="button" id="boardReset" class="lba-secondary">Repor posição</button></div>
   <div id="boardCoach" class="lba-board-coach" role="status" aria-live="polite">Tabuleiro pronto. Selecciona uma peça e escolhe uma casa legal.</div>
  </article>
  <div class="lba-board-side">
   <article class="lba-suite-card"><h3>Posição e cálculo</h3><form id="calcForm" class="lba-form">
    <label>FEN da posição<textarea id="calcFen" rows="3">r1bq1rk1/ppp2ppp/2n2n2/2bp4/2B5/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8</textarea></label>
    <div class="lba-board-tools"><button type="button" id="boardLoadFen" class="lba-primary">Carregar FEN</button><button type="button" id="boardCopyFen" class="lba-secondary">Copiar FEN</button></div>
    <label>A tua linha (SAN separado por espaços)<input id="calcLine" placeholder="Nxd5 Nxd5 Nxd5"></label>
    <label>Estrutura de peões<select id="pawnStructure"><option value="other">Geral</option><option value="carlsbad">Carlsbad</option><option value="isolated-queen-pawn">Peão isolado da dama</option><option value="hanging-pawns">Peões pendurados</option><option value="pawn-chain">Cadeia de peões</option><option value="minority-attack">Ataque de minoria</option><option value="open-center">Centro aberto</option></select></label>
    <button class="lba-primary">Validar linha de cálculo</button>
   </form><div id="calcFeedback" class="lba-feedback">A linha será reproduzida lance a lance e validada pelas regras.</div></article>
   <article class="lba-suite-card"><span class="mini-label">ANÁLISE DE POSIÇÃO</span><h3>Stockfish · três candidatos</h3><p>Avaliação local no dispositivo. Em telemóveis, usa profundidade moderada para preservar bateria e fluidez.</p><button id="engineAnalyse" class="lba-primary">Analisar posição</button><div id="engineFeedback" class="lba-feedback">A engine ainda não foi carregada.</div></article>
  </div>
 </div>
 <article class="lba-suite-card"><span class="mini-label">TEMAS E ESTRUTURAS</span><h3>Biblioteca de estudo</h3><p>Carlsbad · Peão isolado · Peões pendurados · Cadeias de peões · Ataque de minoria · Centro aberto. Os exercícios serão apresentados como biblioteca completa apenas quando o conteúdo estiver curado e validado.</p></article>`);
 const boardEl=$('lbaTrainingBoard'),fenEl=$('calcFen'),coach=$('boardCoach');
 let game=new Chess(),orientation='white',ground=null;
 const destinations=()=>{
  const map=new Map();
  game.moves({verbose:true}).forEach(m=>{if(!map.has(m.from))map.set(m.from,[]);map.get(m.from).push(m.to);});
  return map;
 };
 const refresh=()=>{
  const fen=game.fen(),turn=game.turn();
  fenEl.value=fen;
  ground.set({fen,turnColor:turn==='w'?'white':'black',check:game.isCheck()? (turn==='w'?'white':'black'):false,lastMove:game.history({verbose:true}).slice(-1).map(m=>[m.from,m.to])[0],movable:{free:false,color:'both',dests:destinations(),showDests:true}});
 };
 const sayMove=(orig,dest)=>{
  try{
   const move=game.move({from:orig,to:dest,promotion:$('promotionChoice')?.value||'q'});
   if(!move){refresh();return;}
   refresh();
   const end=game.isCheckmate()?'Xeque-mate.':game.isDraw()?'A partida terminou empatada.':game.isCheck()?'Xeque.':'';
   coach.textContent=move.color==='w'?'Brancas: ':'Pretas: ';coach.textContent+=move.san+'. '+(end||'Lance legal. Podes continuar a análise.');
   record('meio-jogo','estrategia','attempt',null,0,{kind:'board-move',san:move.san,fen:game.fen()});
  }catch(err){refresh();coach.textContent='Lance não aceite: '+err.message;}
 };
 ground=Chessground(boardEl,{fen:game.fen(),orientation,coordinates:true,autoCastle:true,movable:{free:false,color:'both',dests:destinations(),showDests:true},animation:{enabled:true,duration:180},events:{move:sayMove}});
 $('boardFlip').onclick=()=>{orientation=orientation==='white'?'black':'white';ground.set({orientation});};
 $('boardUndo').onclick=()=>{const m=game.undo();refresh();coach.textContent=m?'Último lance anulado.':'Ainda não há lances para anular.';};
 $('boardReset').onclick=()=>{game.reset();refresh();coach.textContent='Posição inicial reposta.';};
 $('boardLoadFen').onclick=()=>{try{const next=new Chess(fenEl.value.trim());game=next;refresh();coach.textContent='FEN carregada. Posição validada.';}catch(err){coach.textContent='FEN inválida: '+err.message;}};
 $('boardCopyFen').onclick=()=>{const fen=game.fen();if(navigator.clipboard?.writeText)navigator.clipboard.writeText(fen).then(()=>{coach.textContent='FEN copiada.';}).catch(()=>{coach.textContent=fen;});else coach.textContent=fen;};
 $('calcForm').onsubmit=e=>{e.preventDefault();try{const chess=new Chess(fenEl.value.trim());const moves=$('calcLine').value.trim().split(/\s+/).filter(Boolean);if(!moves.length)throw new Error('Introduz uma linha de cálculo.');moves.forEach(s=>{if(!chess.move(s))throw new Error('Lance ilegal: '+s);});$('calcFeedback').textContent='Linha legal até ao fim ('+moves.length+' meios-lances). Posição final: '+chess.fen()+'. Estrutura seleccionada: '+$('pawnStructure').selectedOptions[0].textContent+'.';record('meio-jogo','estrategia','attempt',null,0,{plies:moves.length,structure:$('pawnStructure').value});}catch(err){$('calcFeedback').textContent='Linha inválida: '+err.message;}};
 $('engineAnalyse').onclick=async()=>{const out=$('engineFeedback');out.textContent='A iniciar Stockfish…';$('engineAnalyse').disabled=true;try{const fen=game.fen();const lines=await analyseFen(fen,3,12);out.innerHTML=lines.map(l=>'<div class="lba-engine-line"><b>#'+l.multipv+' · '+(l.scoreType==='mate'?'Mate em '+l.score:(l.score/100).toFixed(2))+'</b><p>'+esc(l.pv)+'</p></div>').join('')||'A engine não devolveu variantes.';await record('meio-jogo','estrategia','analysis',null,0,{fen,lines});}catch(err){out.textContent='Não foi possível analisar: '+err.message;}finally{$('engineAnalyse').disabled=false;}};
 const resize=()=>{if(ground)ground.redrawAll();};
 window.addEventListener('resize',resize,{passive:true});
 let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(resize);ro.observe(boardEl.parentElement);}
 trainingBoardCleanup=()=>{window.removeEventListener('resize',resize);if(ro)ro.disconnect();if(ground){ground.destroy();ground=null;}};
}
async function endgames(){
 if(endgameBoardCleanup){endgameBoardCleanup();endgameBoardCleanup=null;}
 const startFen='8/8/8/8/8/2k5/8/2K5 w - - 0 1';
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 03 · TÉCNICA DE FINAIS</span><h3>Centro de Finais</h3><p>Pratica posições legais num tabuleiro interactivo e consulta Syzygy para descobrir o resultado teórico e os melhores lances.</p></div>
 <div class="lba-board-layout"><article class="lba-suite-card lba-board-card"><div class="lba-board-top"><div><span class="mini-label">TABULEIRO DE FINAIS</span><h3>Posição de estudo</h3></div><span class="lba-tag">1 : 1 · RESPONSIVO</span></div><div class="lba-board-frame"><div id="lbaEndgameBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro interactivo de finais"></div></div><div class="lba-board-tools"><button type="button" id="endgameFlip" class="lba-secondary">Rodar tabuleiro</button><button type="button" id="endgameUndo" class="lba-secondary">Anular lance</button><button type="button" id="endgameReset" class="lba-secondary">Repor posição</button></div><div id="endgameCoach" class="lba-board-coach" role="status" aria-live="polite">Carrega uma posição ou começa a explorar o final.</div></article>
 <div class="lba-board-side"><article class="lba-suite-card"><h3>Verificador de finais · Syzygy</h3><label>FEN da posição<input id="tbFen" value="${startFen}" spellcheck="false"></label><div class="lba-board-tools"><button type="button" id="tbLoadFen" class="lba-secondary">Carregar FEN</button><button type="button" id="tbQuery" class="lba-primary">Consultar Syzygy</button></div><div id="tbFeedback" class="lba-feedback">A base cobre posições até ao limite de peças suportado pelo serviço.</div></article>
 <article class="lba-suite-card"><span class="mini-label">TÉCNICA ESSENCIAL</span><h3>Finais que deves dominar</h3><div class="lba-list-row"><b>Lucena</b><span>Construção da ponte</span></div><div class="lba-list-row"><b>Philidor</b><span>Defesa da posição passiva</span></div><div class="lba-list-row"><b>Rei e peão</b><span>Oposição, casas-chave e triangulação</span></div><div class="lba-list-row"><b>Torres</b><span>Actividade, cortes e peões passados</span></div></article></div></div>`);
 const boardEl=$('lbaEndgameBoard'),fenInput=$('tbFen'),coach=$('endgameCoach'),feedback=$('tbFeedback');
 let game=new Chess(startFen),ground=null,orientation='white';
 const dests=()=>{const map=new Map();game.moves({verbose:true}).forEach(m=>{if(!map.has(m.from))map.set(m.from,[]);map.get(m.from).push(m.to);});return map;};
 const refresh=()=>{const history=game.history({verbose:true});fenInput.value=game.fen();ground.set({fen:game.fen(),turnColor:game.turn()==='w'?'white':'black',check:game.isCheck()?(game.turn()==='w'?'white':'black'):false,lastMove:history.slice(-1).map(m=>[m.from,m.to])[0],movable:{free:false,color:'both',dests:dests(),showDests:true}});};
 const onMove=(orig,dest)=>{try{const move=game.move({from:orig,to:dest,promotion:'q'});if(!move){refresh();return;}refresh();coach.textContent=move.san+' · Lance legal. Consulta Syzygy para avaliar a posição.';record('finais','finais','attempt',null,0,{kind:'endgame-move',san:move.san,fen:game.fen()});}catch(err){refresh();coach.textContent='Lance não aceite: '+err.message;}};
 ground=Chessground(boardEl,{fen:game.fen(),orientation,coordinates:true,autoCastle:true,movable:{free:false,color:'both',dests:dests(),showDests:true},animation:{enabled:true,duration:180},events:{move:onMove}});
 $('endgameFlip').onclick=()=>{orientation=orientation==='white'?'black':'white';ground.set({orientation});};
 $('endgameUndo').onclick=()=>{const m=game.undo();refresh();coach.textContent=m?'Último lance anulado.':'Ainda não há lances para anular.';};
 $('endgameReset').onclick=()=>{game=new Chess(startFen);refresh();coach.textContent='Posição de estudo reposta.';feedback.textContent='Consulta Syzygy para avaliar esta posição.';};
 $('tbLoadFen').onclick=()=>{try{game=new Chess(fenInput.value.trim());refresh();coach.textContent='FEN carregada e validada. Agora podes jogar a posição.';}catch(err){coach.textContent='FEN inválida: '+err.message;}};
 $('tbQuery').onclick=async()=>{feedback.textContent='A consultar Syzygy…';$('tbQuery').disabled=true;try{const fen=game.fen(),res=await fetch('https://tablebase.lichess.ovh/standard?fen='+encodeURIComponent(fen));if(!res.ok)throw new Error('A posição não está disponível na base ('+res.status+').');const d=await res.json();const label={win:'Vitória teórica para quem joga',draw:'Empate teórico',loss:'Derrota teórica para quem joga','cursed-win':'Vitória condicionada pela regra dos 50 lances','blessed-loss':'Derrota evitável apenas em condições especiais'}[d.category]||d.category;feedback.innerHTML='<b>'+esc(label)+'</b><p>DTZ: '+esc(d.dtz??'—')+'</p>'+(d.moves||[]).slice(0,4).map(m=>'<div class="lba-list-row"><b>'+esc(m.san||m.uci)+'</b><span>DTZ '+esc(m.dtz??'—')+'</span></div>').join('');await record('finais','finais','analysis',null,0,{fen,category:d.category,dtz:d.dtz});}catch(err){feedback.textContent=err.message;}finally{$('tbQuery').disabled=false;}};
 const resize=()=>{if(ground)ground.redrawAll();};window.addEventListener('resize',resize,{passive:true});let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(resize);ro.observe(boardEl.parentElement);}
 endgameBoardCleanup=()=>{window.removeEventListener('resize',resize);if(ro)ro.disconnect();if(ground){ground.destroy();ground=null;}};
}
function evaluationGraph(results){
 const values=results.map(r=>{const top=r.lines?.[0];if(!top)return 0;const raw=top.scoreType==='mate'?Math.sign(top.score)*1000:top.score;const turn=String(r.fen||'').split(' ')[1]||'w';return turn==='w'?raw:-raw;});
 if(values.length<2)return '<p class="lba-footnote">São necessárias pelo menos duas posições analisadas para desenhar a evolução.</p>';
 const width=640,height=170,pad=18,min=Math.min(-500,...values),max=Math.max(500,...values),range=max-min||1;
 const points=values.map((v,i)=>{const x=pad+i*(width-2*pad)/(values.length-1),y=height-pad-(v-min)*(height-2*pad)/range;return x.toFixed(1)+','+y.toFixed(1)}).join(' ');
 return '<svg viewBox="0 0 '+width+' '+height+'" class="lba-eval-graph" role="img" aria-label="Gráfico de avaliação das posições analisadas"><line x1="'+pad+'" y1="'+(height/2)+'" x2="'+(width-pad)+'" y2="'+(height/2)+'" class="eval-zero"/><polyline points="'+points+'" class="eval-line"/>'+values.map((v,i)=>{const x=pad+i*(width-2*pad)/(values.length-1),y=height-pad-(v-min)*(height-2*pad)/range;return '<circle cx="'+x+'" cy="'+y+'" r="3" class="eval-point"/>'}).join('')+'</svg><div class="lba-footnote">Posições avaliadas: '+values.length+' · Escala convertida para a perspectiva das Brancas.</div>';
}
async function analysis(){
 if(analysisBoardCleanup){analysisBoardCleanup();analysisBoardCleanup=null;}
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 05 · REVISÃO COMPETITIVA</span><h3>Análise de Partidas</h3><p>Importa o PGN, analisa cada posição com Stockfish, recebe uma classificação pedagógica por lance e resolve novamente as posições críticas.</p></div>
 <article class="lba-suite-card"><form id="gameForm" class="lba-form"><label>PGN da partida<textarea id="gamePgn" rows="8" required placeholder="[Event &quot;Training game&quot;]&#10;1. e4 e5 2. Nf3 Nc6 3. Bb5 a6"></textarea></label><label>Profundidade de análise<select id="analysisDepth"><option value="10" selected>Rápida · 10</option><option value="12">Equilibrada · 12</option><option value="15">Profunda · 15 (mais lenta)</option></select></label><button class="lba-primary">Analisar e guardar relatório</button></form><div id="gameFeedback" class="lba-feedback">A engine irá avaliar as posições antes e depois de cada lance. Mantém esta página aberta durante o processamento.</div><div id="gameReport"></div></article>
 <article class="lba-suite-card"><span class="mini-label">HISTÓRICO PESSOAL</span><h3>As tuas análises anteriores</h3><div id="analysisHistory" class="lba-list">A carregar…</div></article>`);
 $('gameForm').onsubmit=async e=>{
  e.preventDefault();
  const out=$('gameFeedback'),report=$('gameReport'),btn=e.submitter;
  btn.disabled=true;report.innerHTML='';
  try{
   const sourcePgn=$('gamePgn').value;
   const chess=new Chess();chess.loadPgn(sourcePgn);
   const history=chess.history({verbose:true});
   if(!history.length)throw new Error('O PGN não contém lances.');
   if(history.length>160)throw new Error('Esta partida tem mais de 160 meios-lances. Divide o PGN em duas partes para garantir uma análise estável no telemóvel.');
   const depth=Number($('analysisDepth').value),replay=new Chess(),positions=[{fen:replay.fen(),ply:0,move:'Posição inicial'}];
   for(let i=0;i<history.length;i++){
    const played=replay.move(history[i].san);
    if(!played)throw new Error('PGN inválido no meio-lance '+(i+1)+'.');
    positions.push({fen:replay.fen(),ply:i+1,move:played.san});
   }
   const scoreAsWhite=(fen,line)=>{
    if(!line)return null;
    const sign=(fen.split(' ')[1]||'w')==='w'?1:-1;
    if(line.scoreType==='mate')return sign*Math.sign(line.score||1)*(100000-Math.min(1000,Math.abs(line.score))*100);
    return sign*line.score;
   };
   const scoreWhite=position=>scoreAsWhite(position.fen,position.lines?.[0]);
   const formatWhiteScore=(fen,line)=>{
    if(!line)return '—';
    if(line.scoreType==='mate'){
     const mateForWhite=(fen.split(' ')[1]||'w')==='w'?line.score:-line.score;
     return (mateForWhite>0?'+':'−')+'M'+Math.abs(line.score);
    }
    const cp=scoreAsWhite(fen,line);
    return (cp>0?'+':'')+(cp/100).toFixed(2);
   };
   const positionAnalyses=[];
   for(let i=0;i<positions.length;i++){
    out.textContent='Stockfish a analisar posição '+(i+1)+' de '+positions.length+' · profundidade '+depth+'. Não feches esta página…';
    const lines=await analyseFen(positions[i].fen,3,depth);
    if(!lines.length)throw new Error('A engine não devolveu uma avaliação para a posição '+(i+1)+'.');
    positionAnalyses.push({...positions[i],lines,evalWhiteCp:scoreWhite({...positions[i],lines})});
   }
   const moveOptions=history.map((_,i)=>{
    const pv=String(positionAnalyses[i].lines?.[0]?.pv||'').trim().split(/\s+/)[0]||'';
    return {melhorLanceUci:/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(pv)?pv:undefined};
   });
   const motor=new MotorDeAnalisePremium();
   const assessments=motor.carregarPartidaComAnalise(
    history.map(m=>m.san),
    positionAnalyses.slice(1).map(p=>p.evalWhiteCp),
    moveOptions,
    positionAnalyses[0].evalWhiteCp
   );
   const graphResults=positionAnalyses.slice(1).map(p=>({fen:p.fen,lines:p.lines}));
   const payload={
    plies:history.length,
    positions:positionAnalyses.map(p=>({ply:p.ply,move:p.move,fen:p.fen,evalWhiteCp:p.evalWhiteCp,lines:p.lines})),
    moveAssessments:assessments,
    engine:'Stockfish 19 Lite Single',
    summary:'Análise por lance · Multi-PV 3 · profundidade '+depth
   };
   const {error:saveError}=await db.from('lba_game_analyses').insert({
    user_id:user.id,pgn:sourcePgn,engine_name:'Stockfish 19 Lite Single',depth,result:payload
   });
   if(saveError)throw saveError;

   const pvSan=(fen,pv)=>{
    try{
     const g=new Chess(fen),moves=[];
     for(const u of String(pv||'').split(/\s+/).slice(0,12)){
      if(!/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(u))break;
      const m=g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});
      if(!m)break;moves.push(m.san);
     }
     return moves.join(' ');
    }catch{return '';}
   };
   const categoryLabels={
    BRILLIANCY:'Brilhante',GREAT_MOVE:'Melhor lance',BOOK:'Teoria',EXCELLENT:'Excelente',
    GOOD:'Bom',INACCURACY:'Imprecisão',MISTAKE:'Erro',BLUNDER:'Erro grave'
   };
   const categoryClass={
    BRILLIANCY:'brilliant',GREAT_MOVE:'great',BOOK:'book',EXCELLENT:'excellent',
    GOOD:'good',INACCURACY:'inaccuracy',MISTAKE:'mistake',BLUNDER:'blunder'
   };
   const reviewIndices=assessments.map((a,i)=>({a,i})).filter(x=>x.a.categoria==='MISTAKE'||x.a.categoria==='BLUNDER');
   report.innerHTML=
    '<h3>Relatório da partida</h3>'+
    '<div class="lba-analysis-summary"><span><b>'+history.length+'</b><small>meios-lances</small></span><span><b>'+reviewIndices.length+'</b><small>posições críticas</small></span><span><b>'+depth+'</b><small>profundidade</small></span></div>'+
    '<section class="lba-eval-card"><span class="mini-label">EVOLUÇÃO DA AVALIAÇÃO · PERSPECTIVA DAS BRANCAS</span>'+evaluationGraph(graphResults)+'</section>'+
    '<section class="lba-suite-card"><span class="mini-label">REVISÃO PEDAGÓGICA</span><h3>Lances classificados pelo motor</h3><p class="lba-footnote">A classificação baseia-se na variação da avaliação Stockfish entre a posição anterior e posterior, sempre na perspectiva das Brancas. “Brilhante” e “Teoria” só são atribuídos quando confirmados por dados próprios; não são presumidos.</p><div id="analysisMoveList" class="lba-move-list">'+assessments.map((a,i)=>{
      const label=a.categoria?categoryLabels[a.categoria]:'Sem avaliação';
      const klass=a.categoria?categoryClass[a.categoria]:'unrated';
      const evalText=a.perdaCp===null?'—':(a.perdaCp/100).toFixed(2)+' peões';
      return '<button type="button" class="lba-move-row" data-move-index="'+i+'"><span class="lba-move-number">'+(a.numeroLance)+(a.vezDeJogar==='w'?'.':'…')+'</span><span class="lba-move-san">'+esc(a.san)+'</span><span class="lba-category '+klass+'">'+label+'</span><small>'+evalText+'</small></button>';
    }).join('')+'</div></section>'+
    '<section class="lba-suite-card"><span class="mini-label">POSIÇÕES PARA REVER</span><h3>Desafios de recuperação</h3><p class="lba-footnote">O desafio aparece quando a análise encontra uma perda significativa. A solução é validada pela legalidade do lance e comparada com a primeira escolha da linha principal do motor.</p><div id="analysisReviewFlags"></div></section>'+
    '<section class="lba-suite-card lba-analysis-replay"><div class="lba-board-top"><div><span class="mini-label">TREINO INTERACTIVO</span><h3 id="analysisPositionTitle">Posição antes do lance</h3></div><span class="lba-tag">REPLAY + RETRY</span></div><div class="lba-board-frame"><div id="lbaAnalysisBoard" class="cg-wrap brown cburnett" aria-label="Tabuleiro de revisão e tentativa de novo"></div></div><div class="lba-board-tools"><label class="lba-promotion-choice">Promoção<select id="analysisPromotion"><option value="q">Dama</option><option value="r">Torre</option><option value="b">Bispo</option><option value="n">Cavalo</option></select></label><button type="button" id="analysisPrev" class="lba-secondary">Anterior</button><button type="button" id="analysisNext" class="lba-secondary">Seguinte</button><button type="button" id="analysisRetry" class="lba-primary">Tentar novamente</button></div><div id="analysisCoach" class="lba-board-coach" role="status" aria-live="polite">Selecciona um lance na lista para rever a posição anterior.</div><div id="analysisLines" class="lba-analysis-lines"></div></section>';
   let index=0,retryGame=null,retryActive=false,ground=null,orientation='white';
   const board=$('lbaAnalysisBoard'),coach=$('analysisCoach'),linesBox=$('analysisLines'),title=$('analysisPositionTitle');
   const destinations=()=>{
    const map=new Map();
    retryGame.moves({verbose:true}).forEach(m=>{if(!map.has(m.from))map.set(m.from,[]);map.get(m.from).push(m.to);});
    return map;
   };
   const renderPosition=()=>{
    retryActive=false;retryGame=null;
    const a=assessments[index],before=positionAnalyses[index],after=positionAnalyses[index+1];
    title.textContent='Lance '+a.numeroLance+(a.vezDeJogar==='w'?'.':'…')+' '+a.san+' · posição anterior';
    ground.set({fen:a.fenAntes,orientation,turnColor:a.vezDeJogar==='w'?'white':'black',lastMove:undefined,movable:{free:false,color:'both',dests:new Map(),showDests:false},events:{move:undefined}});
    const cat=a.categoria?categoryLabels[a.categoria]:'Sem avaliação';
    coach.textContent=cat+' · '+a.explicacao;
    linesBox.innerHTML='<div class="lba-list-row"><span><b>Antes do lance</b><small>'+(before.evalWhiteCp===null?'Sem avaliação':(before.evalWhiteCp/100).toFixed(2)+' na perspectiva das Brancas')+'</small></span><span class="lba-tag">STOCKFISH</span></div>'+
      '<div class="lba-list-row"><span><b>Depois do lance</b><small>'+(after.evalWhiteCp===null?'Sem avaliação':(after.evalWhiteCp/100).toFixed(2)+' na perspectiva das Brancas')+'</small></span><span class="lba-tag">STOCKFISH</span></div>'+
      before.lines.map(l=>'<div class="lba-list-row"><span><b>Linha candidata '+l.multipv+'</b><small>'+esc(pvSan(before.fen,l.pv))+'</small></span><span class="lba-tag">'+formatWhiteScore(before.fen,l)+'</span></div>').join('');
    $('analysisPrev').disabled=index===0;$('analysisNext').disabled=index===assessments.length-1;
    $('analysisRetry').disabled=!(a.categoria==='MISTAKE'||a.categoria==='BLUNDER');
   };
   const onRetryMove=(from,to)=>{
    if(!retryActive||!retryGame)return;
    try{
     const move=retryGame.move({from,to,promotion:$('analysisPromotion')?.value||'q'});
     if(!move){ground.set({fen:retryGame.fen(),movable:{free:false,color:retryGame.turn()==='w'?'white':'black',dests:destinations(),showDests:true}});return;}
     const result=motor.testarPalpiteAluno(from+to+(move.promotion||''));
     if(result.resolvido){
      retryActive=false;
      ground.set({fen:retryGame.fen(),movable:{free:false,color:'both',dests:new Map(),showDests:false}});
      coach.textContent=result.feedback+' A posição foi resolvida.';
      record('analise','tatica','attempt',100,0,{kind:'premium-retry',position:index+1,san:move.san,resolved:true});
     }else{
      const attempts=motor.obterEstadoRecomeco().tentativasFalhadas;
      retryGame=new Chess(assessments[index].fenAntes);
      ground.set({fen:retryGame.fen(),turnColor:retryGame.turn()==='w'?'white':'black',movable:{free:false,color:retryGame.turn()==='w'?'white':'black',dests:destinations(),showDests:true},events:{move:onRetryMove}});
      coach.textContent=result.feedback+' A posição foi reposta para tentares outra vez.';
      record('analise','tatica','attempt',0,0,{kind:'premium-retry',position:index+1,attempts,resolved:false});
     }
    }catch(err){
     retryGame=new Chess(assessments[index].fenAntes);
     ground.set({fen:retryGame.fen(),movable:{free:false,color:retryGame.turn()==='w'?'white':'black',dests:destinations(),showDests:true},events:{move:onRetryMove}});
     coach.textContent='Não foi possível validar esse lance: '+err.message;
    }
   };
   ground=Chessground(board,{fen:assessments[0].fenAntes,orientation,coordinates:true,animation:{enabled:true,duration:180},movable:{free:false,color:'both',dests:new Map(),showDests:false}});
   $('analysisPrev').onclick=()=>{if(index>0){index--;renderPosition();}};
   $('analysisNext').onclick=()=>{if(index<assessments.length-1){index++;renderPosition();}};
   $('analysisRetry').onclick=()=>{
    const a=assessments[index];
    if(a.categoria!=='MISTAKE'&&a.categoria!=='BLUNDER')return;
    const pv=String(positionAnalyses[index].lines?.[0]?.pv||'').trim().split(/\s+/).filter(Boolean);
    const state=motor.verificarEDispararRecomeco(index,pv);
    if(!state?.melhorLinhaSolucao?.length){coach.textContent='A engine não forneceu uma linha de solução utilizável. Executa novamente a análise.';return;}
    retryGame=new Chess(a.fenAntes);retryActive=true;
    ground.set({fen:retryGame.fen(),turnColor:retryGame.turn()==='w'?'white':'black',movable:{free:false,color:retryGame.turn()==='w'?'white':'black',dests:destinations(),showDests:true},events:{move:onRetryMove}});
    coach.textContent='Desafio activo. Encontra o primeiro lance da linha principal. A posição será reposta se a tentativa não corresponder à solução.';
   };
   const moveList=$('analysisMoveList');
   moveList.querySelectorAll('[data-move-index]').forEach(b=>b.addEventListener('click',()=>{
    index=Number(b.dataset.moveIndex);moveList.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');renderPosition();
   }));
   const flagsBox=$('analysisReviewFlags');
   flagsBox.innerHTML=reviewIndices.length?reviewIndices.map(({a,i})=>'<div class="lba-list-row"><span><b>Lance '+a.numeroLance+(a.vezDeJogar==='w'?'.':'…')+' '+esc(a.san)+'</b><small>'+(a.categoria==='BLUNDER'?'Erro grave':'Erro')+' · '+(a.perdaCp/100).toFixed(2)+' peões estimados</small></span><button type="button" class="lba-secondary" data-review-index="'+i+'">Resolver</button></div>').join(''):'<p class="lba-footnote">Não foram identificados erros graves ou erros pelos limites definidos. Podes rever qualquer lance na lista acima.</p>';
   flagsBox.querySelectorAll('[data-review-index]').forEach(b=>b.addEventListener('click',()=>{
    index=Number(b.dataset.reviewIndex);moveList.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));moveList.querySelector('[data-move-index="'+index+'"]')?.classList.add('selected');renderPosition();
    $('analysisRetry').click();
   }));
   moveList.querySelector('[data-move-index="0"]')?.classList.add('selected');renderPosition();
   const resize=()=>{if(ground)ground.redrawAll();};
   window.addEventListener('resize',resize,{passive:true});
   let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(resize);ro.observe(board.parentElement);}
   analysisBoardCleanup=()=>{window.removeEventListener('resize',resize);if(ro)ro.disconnect();if(ground){ground.destroy();ground=null;}};
   out.textContent='Análise concluída. '+history.length+' meios-lances classificados, '+reviewIndices.length+' posições críticas identificadas. Relatório guardado na tua conta.';
   await record('analise','tatica','analysis',null,0,{positions:positions.length,plies:history.length,critical:reviewIndices.length});
   await loadHistory();
  }catch(err){out.textContent='Não foi possível concluir: '+(err?.message||String(err));}
  finally{btn.disabled=false;}
 };
 await loadHistory();
}
async function loadHistory(){const box=$('analysisHistory');if(!box)return;const {data,error}=await db.from('lba_game_analyses').select('id,depth,created_at,result').order('created_at',{ascending:false}).limit(8);if(error){box.textContent=error.message;return;}box.innerHTML=(data||[]).map(x=>'<div class="lba-list-row"><span><b>'+new Date(x.created_at).toLocaleString('pt-AO')+'</b><small>'+esc(x.result?.plies||0)+' meios-lances · profundidade '+esc(x.depth||'—')+'</small></span><span class="lba-tag">GUARDADA</span></div>').join('')||'<p class="lba-footnote">Ainda não guardaste análises.</p>';}
async function showTab(tab){if(tab!=='livebook'&&liveBookCleanup){liveBookCleanup();liveBookCleanup=null;}if(tab!=='middlegame'&&trainingBoardCleanup){trainingBoardCleanup();trainingBoardCleanup=null;}if(tab!=='openings'&&openingBoardCleanup){openingBoardCleanup();openingBoardCleanup=null;}if(tab!=='endgames'&&endgameBoardCleanup){endgameBoardCleanup();endgameBoardCleanup=null;}if(tab!=='analysis'&&analysisBoardCleanup){analysisBoardCleanup();analysisBoardCleanup=null;}activeTab=tab;$('premiumSuite').querySelectorAll('[data-suite]').forEach(b=>b.classList.toggle('active',b.dataset.suite===tab));if(tab==='dashboard')return dashboard();if(tab==='openings')return openings();if(tab==='middlegame')return middlegame();if(tab==='endgames')return endgames();if(tab==='analysis')return analysis();if(tab==='livebook'){liveBookCleanup=renderLivroVivo({root:$('lbaSuitePanel'),record});return;}}
export async function initPremiumExperience(){
 if(initialized)return;initialized=true;
 const {data:{session}}=await db.auth.getSession();if(!session){initialized=false;return;}user=session.user;
 window.addEventListener('lba:lesson-completed',async event=>{
  const d=event.detail||{}, lessonId=String(d.lessonId||''); if(!lessonId||!user)return;
  const {error}=await db.from('lba_lesson_progress').upsert({user_id:user.id,lesson_id:lessonId,state:'completed',completed_at:new Date().toISOString(),updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});
  if(error)console.warn('LBA lesson progress not saved',error.message);
  const prefix=lessonId.split('-')[0],module=prefix==='openings'?'aberturas':prefix==='middlegame'?'meio-jogo':'finais';
  const skill=prefix==='openings'?'aberturas':prefix==='endgames'?'finais':'estrategia';
  await record(module,skill,'completed',null,0,{lessonId,topic:d.topic,level:d.level});
 });
 shell();await showTab(activeTab);
}
