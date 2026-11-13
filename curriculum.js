import { Chess } from 'https://esm.sh/chess.js@1.4.0';

const modules = [
 {id:'openings',number:'01',name:'Aberturas',subtitle:'Construção da posição',topics:[
  ['Centro','Controlo central: ocupação com peões, controlo à distância, centros abertos, fechados e móveis.'],
  ['Desenvolvimento','Ritmo, iniciativa, mobilização, abertura de linhas e ganho de tempos.'],
  ['Segurança do Rei','Momento do roque, roques opostos, diagonais vulneráveis e defesa da ala do rei.'],
  ['Estruturas de Peões','Peão isolado, peões pendurados, cadeia francesa e estrutura Carlsbad.'],
  ['Planos','Transição para o meio-jogo e definição de planos de 3 a 5 lances.'],
  ['Transposições','Ordens flexíveis de lances, prevenção de variantes secundárias e transposição para o repertório.']
 ]},
 {id:'middlegame',number:'02',name:'Meio-Jogo',subtitle:'Compreensão estratégica',topics:[
  ['Peças Boas e Más','Peças inactivas, melhoria da pior peça, troca de bispos maus e postos avançados.'],
  ['Casas Fracas','Buracos irreversíveis, casas que já não podem ser defendidas por peões e infiltração.'],
  ['Profilaxia','Identificar ameaças e planos adversários antes de executar o próprio plano.'],
  ['Restrição','Domínio espacial, limitação de casas de fuga e redução da mobilidade adversária.'],
  ['Rupturas','Alavancas de peões, preparação e execução de rupturas como f4-f5 ou c4-c5.'],
  ['Cálculo de Variantes','Lances candidatos, xeques, capturas, ameaças e visualização sem mover peças.']
 ]},
 {id:'endgames',number:'03',name:'Finais',subtitle:'Técnica e precisão',topics:[
  ['Oposição','Oposição directa, distante e diagonal, flanqueamento e invasão do rei.'],
  ['Casas-Chave','Casas críticas em finais de peões, regra do sexto posto e peões de torre.'],
  ['Finais de Torres','Lucena, Philidor, Vancura, torre atrás do peão passado e corte do rei.'],
  ['Actividade do Rei','Centralização, rei activo no ataque e corridas de reis.'],
  ['Conversão','Simplificação segura, técnica para vencer e princípio de não ter pressa.'],
  ['Defesa','Fortalezas, bloqueios, xeque perpétuo e recursos de afogamento.']
 ]}
];
const levels = [
 {id:'base',label:'1200–1500',name:'Base',color:'green'},
 {id:'intermediate',label:'1500–1800',name:'Intermédio',color:'gold'},
 {id:'advanced',label:'1800–2000',name:'Avançado',color:'red'}
];
const published = new Set(['Centro','Estruturas de Peões','Peças Boas e Más','Finais de Torres']);
const state = {topic:null,level:'base',tab:'theory',completed:new Set()};
try{JSON.parse(localStorage.getItem('lba-classroom-progress')||'[]').forEach(x=>state.completed.add(x));}catch(e){}
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function topicId(moduleId,name){return moduleId+'-'+name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function renderModules(){
 const root=$('curriculumModules'); if(!root)return;
 root.innerHTML=modules.map(m=>`<section class="curriculum-module" aria-labelledby="module-${m.id}">
  <div class="curriculum-module-head"><div><span class="mini-label">MÓDULO ${m.number}</span><h3 id="module-${m.id}">${m.name}</h3><p>${m.subtitle}</p></div><span class="module-count">06 PASTAS</span></div>
  <div class="curriculum-folder-grid">${m.topics.map(([name,desc],i)=>{const live=published.has(name);const id=topicId(m.id,name);return `<button type="button" class="curriculum-folder ${live?'is-open':'is-locked'}" data-topic="${id}" ${live?'':'disabled'} aria-label="${esc(name)} · ${live?'Abrir sala de aula':'Em breve'}">
   <span class="folder-icon">${live?'▰':'▱'}</span><span class="folder-copy"><b>${m.number}.${i+1} · ${esc(name)}</b><small>${esc(desc)}</small></span><span class="folder-status">${live?'ABRIR ↗':'EM BREVE'}</span></button>`;}).join('')}</div>
 </section>`).join('');
 root.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>openTopic(b.dataset.topic)));
}
function findTopic(id){for(const m of modules){const i=m.topics.findIndex(([name])=>topicId(m.id,name)===id);if(i>=0)return {module:m,index:i,name:m.topics[i][0],description:m.topics[i][1],id};}return null}
function openTopic(id){
 const topic=findTopic(id);if(!topic)return;state.topic=topic;state.level='base';state.tab='theory';
 $('curriculumModules').hidden=true;$('classroomView').hidden=false;
 $('classroomTitle').textContent=topic.name;$('classroomModule').textContent='MÓDULO '+topic.module.number+' · '+topic.module.name;
 $('classroomDescription').textContent=topic.description;
 renderClassroom();$('classroomView').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderClassroom(){
 const t=state.topic;if(!t)return;
 $('classroomLevels').innerHTML=levels.map(l=>`<button type="button" class="level-chip ${state.level===l.id?'active':''}" data-level="${l.id}">${l.label}<small>${l.name}</small></button>`).join('');
 $('classroomLevels').querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>{state.level=b.dataset.level;renderClassroom()}));
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.tab));
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;renderClassroom()});
 const level=levels.find(l=>l.id===state.level);
 const done=state.completed.has(t.id+'-'+state.level);
 $('classroomProgress').textContent=done?'100% concluído':'0% concluído';
 $('classroomProgressFill').style.width=done?'100%':'0%';
 const panels={
 theory:`<div class="classroom-lesson"><span class="mini-label">CONCEITO & TEORIA · NÍVEL ${level.label}</span><h3>${esc(t.name)}: o que deves reconhecer</h3><p>${esc(t.description)}</p><div class="gold-rule"><b>REGRA DE OURO</b><p>Antes de escolher um lance, identifica o elemento estratégico dominante desta posição. Compara a actividade das peças, a estrutura de peões e as ameaças concretas.</p></div><div class="level-objective"><b>Objectivo deste nível</b><span>${level.id==='base'?'Reconhecer o padrão e evitar erros típicos.':level.id==='intermediate'?'Construir um plano coerente e melhorar as peças.':'Calcular nuances, antecipar recursos e justificar a decisão.'}</span></div><p class="content-note">A aula detalhada deste tema será publicada nesta sala. O conteúdo de outros tópicos não será misturado aqui.</p></div>`,
 practice:`<div class="classroom-lesson"><span class="mini-label">TABULEIRO INTERACTIVO · PRÁTICA GUIADA</span><h3>Treina o conceito no tabuleiro</h3><p>Selecciona uma peça e uma casa de destino. Nesta primeira versão, o tabuleiro é de demonstração; as posições específicas de cada tema serão adicionadas à respectiva pasta.</p><div class="classroom-board" id="classroomBoard" aria-label="Tabuleiro de treino"></div><div class="board-feedback" id="classroomBoardFeedback">Posição inicial. Explora o tabuleiro.</div></div>`,
 games:`<div class="classroom-lesson"><span class="mini-label">PARTIDAS MODELO · ANÁLISE</span><h3>Partidas seleccionadas para ${esc(t.name)}</h3><p>Esta secção ficará reservada a 2–3 partidas de Grandes Mestres em que o tema aparece de forma clara. Cada partida terá PGN, momentos críticos e comentários.</p><div class="empty-content">Biblioteca temática em preparação · sem partidas adicionadas ainda.</div></div>`,
 test:`<div class="classroom-lesson"><span class="mini-label">DESAFIO FINAL</span><h3>Verifica o que aprendeste</h3><p>O teste final desta pasta terá 5 a 10 exercícios específicos de ${esc(t.name)}. Ao concluir, o teu progresso será actualizado.</p><div class="empty-content">Exercícios deste nível em preparação.</div><button class="btn btn-outline" id="markTopicDone" type="button" ${done?'disabled':''}>${done?'Pasta concluída ✓':'Marcar aula como estudada'}</button></div>`
 };
 $('classroomPanel').innerHTML=panels[state.tab];
 const doneBtn=$('markTopicDone');if(doneBtn)doneBtn.onclick=()=>{state.completed.add(t.id+'-'+state.level);try{localStorage.setItem('lba-classroom-progress',JSON.stringify([...state.completed]));}catch(e){}renderClassroom()};
 if(state.tab==='practice')initPracticeBoard();
}
function initPracticeBoard(){
 const root=$('classroomBoard');if(!root)return;
 const game=new Chess();let selected=null;
 const glyph={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};
 const draw=()=>{root.innerHTML='';const board=game.board();for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=board[r][f],sq='abcdefgh'[f]+(8-r),b=document.createElement('button');b.type='button';b.className='classroom-square '+((r+f)%2?'dark':'light')+(selected===sq?' selected':'');b.textContent=p?glyph[p.color][p.type]:'';b.setAttribute('aria-label',sq);b.onclick=()=>{if(selected){const mv=game.move({from:selected,to:sq,promotion:'q'});if(mv){selected=null;$('classroomBoardFeedback').textContent='Lance registado: '+mv.san+'. Posição actualizada.';draw();return;}}const piece=game.get(sq);selected=piece&&piece.color===game.turn()?sq:null;draw()};root.appendChild(b)}};
 draw();
}
function initDemo(){
 const root=$('demoBoard');if(!root)return;
 const positions=[{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',move:'e4',from:'e2',to:'e4',question:'Desafio 1/2 · Qual é a jogada clássica que ocupa o centro e abre linhas para o bispo e a dama?'},{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',move:'d4',from:'d2',to:'d4',question:'Desafio 2/2 · Escolhe outra forma principal de disputar o centro com um peão.'}];
 let index=0,game=new Chess(positions[0].fen),selected=null,complete=0;
 const glyph={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};
 const feedback=$('demoFeedback'),question=$('demoQuestion'),next=$('demoNext');
 const draw=()=>{root.innerHTML='';const board=game.board();for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=board[r][f],sq='abcdefgh'[f]+(8-r),b=document.createElement('button');b.type='button';b.className='classroom-square '+((r+f)%2?'dark':'light')+(selected===sq?' selected':'');b.textContent=p?glyph[p.color][p.type]:'';b.setAttribute('aria-label',sq);b.onclick=()=>{if(complete>=2)return;if(selected){const mv=game.move({from:selected,to:sq,promotion:'q'});if(mv){selected=null;if(mv.san===positions[index].move){complete++;feedback.textContent='Correcto! '+(complete===1?'Controlas o centro e libertas peças.':'Também podes disputar o centro com d4.') ;feedback.className='board-feedback success';next.hidden=false;next.textContent=complete===2?'Ver resultado':'Próximo desafio →';}else{game.undo();feedback.textContent='Ainda não. Procura um avanço central de peão.';feedback.className='board-feedback error';}draw();return;}}const piece=game.get(sq);selected=piece&&piece.color===game.turn()?sq:null;draw()};root.appendChild(b)}};
 const load=()=>{game=new Chess(positions[index].fen);selected=null;question.textContent=positions[index].question;feedback.textContent='Selecciona o peão e joga a tua resposta no tabuleiro.';feedback.className='board-feedback';next.hidden=true;draw()};
 next.onclick=()=>{if(complete===1){index=1;load()}else if(complete===2){feedback.textContent='Resultado: 2/2. Bom começo! Explora a Área Premium para estudar cada tema em profundidade.';next.textContent='Explorar os módulos Premium';next.onclick=()=>{document.querySelector('#authPanel')?.scrollIntoView({behavior:'smooth',block:'center'})}}};
 load();
}
export function initCurriculum(){renderModules();initDemo();$('backToModules')?.addEventListener('click',()=>{$('classroomView').hidden=true;$('curriculumModules').hidden=false;$('curriculumModules').scrollIntoView({behavior:'smooth',block:'start'})});}
