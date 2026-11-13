import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Chess } from 'https://esm.sh/chess.js@1.4.0';

const DB_URL='https://ksejqypwlmwwayxtievk.supabase.co';
const DB_KEY='sb_publishable_TPeGeLoBdlva7yQqldtbAg_YYi0uHnd';
const db=createClient(DB_URL,DB_KEY);
const $=id=>document.getElementById(id);
let user=null, engine=null, activeTab='dashboard', initialized=false;
const skills=['aberturas','tatica','estrategia','finais','psicologia'];
const skillNames={aberturas:'Aberturas',tatica:'Táctica',estrategia:'Estratégia',finais:'Finais',psicologia:'Psicologia de jogo'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isoDay=d=>{const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
function shell(){
 const root=$('premiumSuite'); if(!root)return;
 root.innerHTML=`
 <div class="lba-suite-head"><div><span class="mini-label">LBA PERFORMANCE SYSTEM</span><h2>Centro de treino <em>inteligente</em></h2><p>Um percurso integrado para desenvolver pensamento, técnica e consistência competitiva.</p></div><div class="lba-suite-status"><span class="lba-live-dot"></span> TREINO PREMIUM</div></div>
 <nav class="lba-suite-nav" aria-label="Centro de treino">
 <button data-suite="dashboard" class="active">Visão geral</button><button data-suite="openings">Aberturas</button><button data-suite="middlegame">Meio-jogo</button><button data-suite="endgames">Finais</button><button data-suite="analysis">Análise</button></nav>
 <div id="lbaSuitePanel" class="lba-suite-panel" aria-live="polite"></div>`;
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
 <article class="lba-suite-card"><span class="mini-label">TREINO DE MEMÓRIA</span><h3>Recordação às cegas</h3><p>Introduz a sequência de lances do teu repertório sem olhar para o tabuleiro.</p><form id="blindForm" class="lba-form"><label>FEN inicial<input id="blindFen" value="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"></label><label>A tua sequência em SAN<input id="blindLine" placeholder="e4 e5 Nf3 Nc6 Bb5"></label><button class="lba-primary">Verificar sequência</button></form><div id="blindFeedback" class="lba-feedback"></div></article>`);
 const {data:reps,error}=await db.from('lba_opening_repertoires').select('id,name,color,created_at').order('created_at');
 const list=$('repList'),target=$('repTarget');
 if(error){list.textContent='Erro ao carregar repertórios: '+error.message;return;}
 const render=()=>{list.innerHTML=(reps||[]).map(r=>`<div class="lba-list-row"><span><b>${esc(r.name)}</b><small>${r.color==='white'?'BRANCAS':'PRETAS'}</small></span><span class="lba-tag">PESSOAL</span></div>`).join('')||'<p class="lba-footnote">Ainda não criaste repertórios.</p>';target.innerHTML=(reps||[]).map(r=>`<option value="${r.id}">${esc(r.name)} · ${r.color==='white'?'Brancas':'Pretas'}</option>`).join('');};
 render();
 $('repForm').onsubmit=async e=>{e.preventDefault();const name=$('repName').value.trim(),color=$('repColor').value;const {data,error}=await db.from('lba_opening_repertoires').insert({user_id:user.id,name,color}).select().single();if(error){status(error.message,'error');return;}reps.push(data);render();$('repName').value='';status('Repertório criado e associado à tua conta.','success');};
 $('pgnForm').onsubmit=async e=>{e.preventDefault();const chess=new Chess();try{chess.loadPgn($('repPgn').value);const parsed=chess.pgn();if(!parsed)throw new Error('Não foi possível interpretar a linha.');const repId=$('repTarget').value;if(!repId)throw new Error('Cria primeiro um repertório.');const {error}=await db.from('lba_opening_lines').insert({user_id:user.id,repertoire_id:repId,name:'Linha importada',pgn:parsed,target_fen:chess.fen()});if(error)throw error;$('pgnFeedback').textContent='Linha legal validada e guardada. Posição final: '+chess.fen();await record('aberturas','aberturas','completed',100,0,{kind:'pgn-import'});}catch(err){$('pgnFeedback').textContent='PGN não guardado: '+err.message;}};
 $('explorerForm').onsubmit=async e=>{e.preventDefault();const out=$('explorerResult');out.textContent='A consultar a base de partidas…';try{const fen=$('explorerFen').value.trim()||new Chess().fen();const url='https://explorer.lichess.ovh/masters?fen='+encodeURIComponent(fen)+'&moves=8&topGames=0';const res=await fetch(url);if(!res.ok)throw new Error('Serviço indisponível ('+res.status+').');const data=await res.json();out.innerHTML='<b>'+esc(data.opening?.name||'Posição sem nome de abertura identificado')+'</b><p>'+Number(data.white||0)+' vitórias brancas · '+Number(data.draws||0)+' empates · '+Number(data.black||0)+' vitórias pretas</p>'+(data.moves||[]).slice(0,5).map(m=>'<div class="lba-list-row"><span>'+esc(m.san)+'</span><b>'+Number(m.white+m.draws+m.black)+' partidas</b></div>').join('');}catch(err){out.textContent=err.message;}};
 $('blindForm').onsubmit=e=>{e.preventDefault();try{const chess=new Chess($('blindFen').value.trim());const san=$('blindLine').value.trim().split(/\s+/).filter(Boolean);san.forEach(m=>{if(!chess.move(m))throw new Error('Lance ilegal: '+m);});$('blindFeedback').textContent='Sequência legal. Posição final: '+chess.fen();record('aberturas','aberturas','attempt',100,0,{kind:'blindfold',plies:san.length});}catch(err){$('blindFeedback').textContent='Revê a sequência: '+err.message;}};
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
  const lines=new Map(),timeout=setTimeout(()=>{eng.busy=false;reject(new Error('A engine demorou demasiado. Tenta novamente.'));},45000);
  const handler=e=>{const line=String(e.data||'');if(line==='uciok'){eng.ready=true;eng.worker.postMessage('isready');return;}if(line==='readyok'){eng.worker.postMessage('setoption name MultiPV value '+multiPv);eng.worker.postMessage('position fen '+fen);eng.worker.postMessage('go depth '+depth);return;}
   if(line.startsWith('info ')&&line.includes(' pv ')){const m=line.match(/multipv (\d+).*?score (cp|mate) (-?\d+).*? pv (.+)$/);if(m)lines.set(Number(m[1]),{multipv:Number(m[1]),scoreType:m[2],score:Number(m[3]),pv:m[4]});}
   if(line.startsWith('bestmove')){clearTimeout(timeout);eng.worker.removeEventListener('message',handler);eng.busy=false;resolve([...lines.values()].sort((a,b)=>a.multipv-b.multipv));}
  };
  eng.busy=true;eng.worker.addEventListener('message',handler);if(eng.ready){eng.worker.postMessage('isready');} 
 });
}
async function middlegame(){
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 02 · CÁLCULO E ESTRATÉGIA</span><h3>Laboratório de Meio-Jogo</h3><p>Valida linhas legais sem depender da memória visual e analisa posições com Stockfish WASM num Web Worker. A engine é carregada apenas quando pedires uma análise.</p></div>
 <div class="lba-two-col"><article class="lba-suite-card"><h3>Cálculo abstracto</h3><form id="calcForm" class="lba-form"><label>FEN da posição<textarea id="calcFen" rows="2">r1bq1rk1/ppp2ppp/2n2n2/2bp4/2B5/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8</textarea></label><label>A tua linha (SAN separado por espaços)<input id="calcLine" placeholder="Nxd5 Nxd5 Nxd5"></label><label>Estrutura de peões<select id="pawnStructure"><option value="other">Geral</option><option value="carlsbad">Carlsbad</option><option value="isolated-queen-pawn">Peão isolado da dama</option><option value="hanging-pawns">Peões pendurados</option><option value="pawn-chain">Cadeia de peões</option><option value="minority-attack">Ataque de minoria</option><option value="open-center">Centro aberto</option></select></label><button class="lba-primary">Validar cálculo</button></form><div id="calcFeedback" class="lba-feedback">A linha será reproduzida lance a lance e validada pelas regras.</div></article>
 <article class="lba-suite-card"><span class="mini-label">ANÁLISE DE POSIÇÃO</span><h3>Stockfish · três candidatos</h3><p>Avaliação local no dispositivo. Em telemóveis, usa profundidade moderada para preservar bateria e fluidez.</p><button id="engineAnalyse" class="lba-primary">Analisar posição</button><div id="engineFeedback" class="lba-feedback">A engine ainda não foi carregada.</div></article></div>
 <article class="lba-suite-card"><span class="mini-label">TEMAS E ESTRUTURAS</span><h3>Biblioteca de estudo</h3><p>Carlsbad · Peão isolado · Peões pendurados · Cadeias de peões · Ataque de minoria · Centro aberto. Os exercícios desta área devem ser curados e associados a cada estrutura antes de serem apresentados como biblioteca completa.</p></article>`);
 $('calcForm').onsubmit=e=>{e.preventDefault();try{const chess=new Chess($('calcFen').value.trim());const moves=$('calcLine').value.trim().split(/\s+/).filter(Boolean);if(!moves.length)throw new Error('Introduz uma linha de cálculo.');moves.forEach(s=>{if(!chess.move(s))throw new Error('Lance ilegal: '+s);});$('calcFeedback').textContent='Linha legal até ao fim ('+moves.length+' meios-lances). Posição final: '+chess.fen()+'. Estrutura seleccionada: '+$('pawnStructure').selectedOptions[0].textContent+'.';record('meio-jogo','estrategia','attempt',100,0,{plies:moves.length,structure:$('pawnStructure').value});}catch(err){$('calcFeedback').textContent='Linha inválida: '+err.message;}};
 $('engineAnalyse').onclick=async()=>{const out=$('engineFeedback');out.textContent='A iniciar Stockfish…';$('engineAnalyse').disabled=true;try{const fen=$('calcFen').value.trim()||new Chess().fen();const lines=await analyseFen(fen,3,12);out.innerHTML=lines.map(l=>'<div class="lba-engine-line"><b>#'+l.multipv+' · '+(l.scoreType==='mate'?'Mate em '+l.score:(l.score/100).toFixed(2))+'</b><p>'+esc(l.pv)+'</p></div>').join('')||'A engine não devolveu variantes.';await record('meio-jogo','estrategia','analysis',null,0,{fen,lines});}catch(err){out.textContent='Não foi possível analisar: '+err.message;}finally{$('engineAnalyse').disabled=false;}};
}
async function endgames(){
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 03 · TÉCNICA DE FINAIS</span><h3>Centro de Finais</h3><p>Consulta Syzygy para posições cobertas e identifica se o resultado teórico é vitória, empate ou derrota para o jogador que tem a vez.</p></div>
 <article class="lba-suite-card"><h3>Verificador de finais · Syzygy</h3><form id="tbForm" class="lba-form"><label>FEN<input id="tbFen" required placeholder="Cola aqui a FEN do final"></label><button class="lba-primary">Consultar Tablebase</button></form><div id="tbFeedback" class="lba-feedback">A base cobre finais até ao limite de peças suportado pelo serviço.</div></article>
 <article class="lba-suite-card"><span class="mini-label">TÉCNICA ESSENCIAL</span><h3>Finais que deves dominar</h3><div class="lba-list-row"><b>Lucena</b><span>Construção da ponte</span></div><div class="lba-list-row"><b>Philidor</b><span>Defesa da posição passiva</span></div><div class="lba-list-row"><b>Rei e peão</b><span>Oposição, casas-chave e triangulação</span></div><div class="lba-list-row"><b>Torres</b><span>Actividade, cortes e peões passados</span></div></article>`);
 $('tbForm').onsubmit=async e=>{e.preventDefault();const out=$('tbFeedback');out.textContent='A consultar Syzygy…';try{const fen=$('tbFen').value.trim(),res=await fetch('https://tablebase.lichess.ovh/standard?fen='+encodeURIComponent(fen));if(!res.ok)throw new Error('A posição não está disponível na base ('+res.status+').');const d=await res.json();const label={win:'Vitória teórica para quem joga',draw:'Empate teórico',loss:'Derrota teórica para quem joga','cursed-win':'Vitória condicionada pela regra dos 50 lances','blessed-loss':'Derrota evitável apenas em condições especiais'}[d.category]||d.category;out.innerHTML='<b>'+esc(label)+'</b><p>DTZ: '+esc(d.dtz??'—')+'</p>'+(d.moves||[]).slice(0,3).map(m=>'<div class="lba-list-row"><b>'+esc(m.san||m.uci)+'</b><span>DTZ '+esc(m.dtz??'—')+'</span></div>').join('');await record('finais','finais','analysis',null,0,{fen,category:d.category,dtz:d.dtz});}catch(err){out.textContent=err.message;}};
}
async function analysis(){
 panel(`<div class="lba-module-intro"><span class="mini-label">MÓDULO 04 · REVISÃO COMPETITIVA</span><h3>Análise de Partidas</h3><p>Importa o PGN, valida a partida, analisa posições com Stockfish Multi-PV e guarda o relatório na tua conta.</p></div>
 <article class="lba-suite-card"><form id="gameForm" class="lba-form"><label>PGN da partida<textarea id="gamePgn" rows="8" required placeholder="[Event \"Training game\"]&#10;1. e4 e5 2. Nf3 Nc6 3. Bb5 a6"></textarea></label><label>Profundidade de análise<select id="analysisDepth"><option value="10">Rápida · 10</option><option value="12" selected>Equilibrada · 12</option><option value="15">Profunda · 15 (mais lenta)</option></select></label><button class="lba-primary">Analisar e guardar relatório</button></form><div id="gameFeedback" class="lba-feedback">O relatório só será guardado depois de a análise terminar.</div><div id="gameReport"></div></article>
 <article class="lba-suite-card"><span class="mini-label">HISTÓRICO PESSOAL</span><h3>As tuas análises anteriores</h3><div id="analysisHistory" class="lba-list">A carregar…</div></article>`);
 $('gameForm').onsubmit=async e=>{e.preventDefault();const out=$('gameFeedback'),report=$('gameReport'),btn=e.submitter;btn.disabled=true;report.innerHTML='';try{const chess=new Chess();chess.loadPgn($('gamePgn').value);const history=chess.history({verbose:true});if(!history.length)throw new Error('O PGN não contém lances.');const replay=new Chess(),depth=Number($('analysisDepth').value),results=[];out.textContent='A validar e analisar '+history.length+' lances. Mantém esta página aberta…';for(let i=0;i<history.length;i++){replay.move(history[i].san);if(i%2===1||i===history.length-1){const lines=await analyseFen(replay.fen(),3,depth);results.push({ply:i+1,fen:replay.fen(),lines});out.textContent='Análise em curso: posição '+results.length+' / '+Math.ceil(history.length/2);}}
 const payload={plies:history.length,positions:results,summary:'Análise Stockfish Multi-PV '+depth};const {error}=await db.from('lba_game_analyses').insert({user_id:user.id,pgn:$('gamePgn').value,engine_name:'Stockfish 19 Lite Single',depth,result:payload});if(error)throw error;
 report.innerHTML='<h3>Relatório da partida</h3>'+results.map(r=>'<div class="lba-engine-line"><b>Após o lance '+r.ply+'</b><p>'+r.lines.map(l=>'Linha '+l.multipv+': '+esc(l.pv)+' ('+(l.scoreType==='mate'?'M'+l.score:(l.score/100).toFixed(2))+')').join('<br>')+'</p></div>').join('');out.textContent='Análise concluída e guardada na tua conta.';await record('analise','tatica','analysis',null,0,{positions:results.length,plies:history.length});await loadHistory();}catch(err){out.textContent='Não foi possível concluir: '+err.message;}finally{btn.disabled=false;}};
 await loadHistory();
}
async function loadHistory(){const box=$('analysisHistory');if(!box)return;const {data,error}=await db.from('lba_game_analyses').select('id,depth,created_at,result').order('created_at',{ascending:false}).limit(8);if(error){box.textContent=error.message;return;}box.innerHTML=(data||[]).map(x=>'<div class="lba-list-row"><span><b>'+new Date(x.created_at).toLocaleString('pt-AO')+'</b><small>'+esc(x.result?.plies||0)+' meios-lances · profundidade '+esc(x.depth||'—')+'</small></span><span class="lba-tag">GUARDADA</span></div>').join('')||'<p class="lba-footnote">Ainda não guardaste análises.</p>';}
async function showTab(tab){activeTab=tab;$('premiumSuite').querySelectorAll('[data-suite]').forEach(b=>b.classList.toggle('active',b.dataset.suite===tab));if(tab==='dashboard')return dashboard();if(tab==='openings')return openings();if(tab==='middlegame')return middlegame();if(tab==='endgames')return endgames();if(tab==='analysis')return analysis();}
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
