import { Chess } from 'https://esm.sh/chess.js@1.4.0';

const modules = [
 {id:'openings',number:'01',name:'Aberturas',subtitle:'Construção da posição',topics:[
  ['Centro','Ocupar, controlar e transformar o centro: centros abertos, fechados e móveis.'],
  ['Desenvolvimento','Ritmo, iniciativa, mobilização, abertura de linhas e ganho de tempos.'],
  ['Segurança do Rei','Roque, roques opostos, diagonais vulneráveis e defesa da ala do rei.'],
  ['Estruturas de Peões','Peão isolado, peões pendurados, cadeia francesa e estrutura Carlsbad.'],
  ['Planos','Transição da abertura para o meio-jogo e planos de 3 a 5 lances.'],
  ['Transposições','Ordens flexíveis de lances e transposição para o repertório.']
 ]},
 {id:'middlegame',number:'02',name:'Meio-Jogo',subtitle:'Compreensão estratégica',topics:[
  ['Peças Boas e Más','Peças inactivas, melhoria da pior peça, bispos maus e postos avançados.'],
  ['Casas Fracas','Buracos irreversíveis, casas sem defesa por peões e infiltração.'],
  ['Profilaxia','Identificar ameaças e planos adversários antes de agir.'],
  ['Restrição','Domínio espacial e redução da mobilidade adversária.'],
  ['Rupturas','Alavancas de peões, preparação e execução de rupturas.'],
  ['Cálculo de Variantes','Lances candidatos, xeques, capturas, ameaças e visualização.']
 ]},
 {id:'endgames',number:'03',name:'Finais',subtitle:'Técnica e precisão',topics:[
  ['Oposição','Oposição directa, distante e diagonal, flanqueamento e invasão.'],
  ['Casas-Chave','Casas críticas em finais de peões e regra do sexto posto.'],
  ['Finais de Torres','Lucena, Philidor, Vancura, torre atrás do peão e corte do rei.'],
  ['Actividade do Rei','Centralização, rei activo e corridas de reis.'],
  ['Conversão','Simplificação segura e técnica para vencer posições superiores.'],
  ['Defesa','Fortalezas, bloqueios, xeque perpétuo e afogamento.']
 ]}
];
const levels = [
 {id:'base',label:'1200–1500',name:'Base'},
 {id:'intermediate',label:'1500–1800',name:'Intermédio'},
 {id:'advanced',label:'1800–2000',name:'Avançado'}
];
const published = new Set(['Estruturas de Peões']);
const storageKey='lba-lesson-progress-v2';
const state={topic:null,level:'base',tab:'theory',progress:{theory:[],practice:[],quiz:[]},quizIndex:0,quizScore:0,quizAnswers:[],gameIndex:0,gamePly:0};
try{state.progress={...state.progress,...JSON.parse(localStorage.getItem(storageKey)||'{}')};}catch(e){}
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function topicId(mid,name){return mid+'-'+name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state.progress));}catch(e){}}
function ensure(id){for(const k of ['theory','practice','quiz'])if(!Array.isArray(state.progress[k]))state.progress[k]=[];return id}
function completed(id,key){return state.progress[key].includes(id+'|'+state.level)}
function mark(id,key){const value=id+'|'+state.level;if(!state.progress[key].includes(value))state.progress[key].push(value);save()}
function renderModules(){
 const root=$('curriculumModules');if(!root)return;
 root.innerHTML=modules.map(m=>`<section class="curriculum-module" aria-labelledby="module-${m.id}">
 <div class="curriculum-module-head"><div><span class="mini-label">MÓDULO ${m.number}</span><h3 id="module-${m.id}">${m.name}</h3><p>${m.subtitle}</p></div><span class="module-count">06 PASTAS</span></div>
 <div class="curriculum-folder-grid">${m.topics.map(([name,desc],i)=>{const live=published.has(name),id=topicId(m.id,name);return `<button type="button" class="curriculum-folder ${live?'is-open':'is-locked'}" data-topic="${id}" ${live?'':'disabled'} aria-label="${esc(name)} · ${live?'Abrir sala de aula':'Em breve'}"><span class="folder-icon">${live?'▰':'▱'}</span><span class="folder-copy"><b>${m.number}.${i+1} · ${esc(name)}</b><small>${esc(desc)}</small></span><span class="folder-status">${live?'ABRIR ↗':'EM BREVE'}</span></button>`;}).join('')}</div></section>`).join('');
 root.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>openTopic(b.dataset.topic)));
}
function findTopic(id){for(const m of modules){const i=m.topics.findIndex(([n])=>topicId(m.id,n)===id);if(i>=0)return{module:m,index:i,name:m.topics[i][0],description:m.topics[i][1],id};}return null}
function openTopic(id){const t=findTopic(id);if(!t||!published.has(t.name))return;state.topic=t;state.level='base';state.tab='theory';state.quizIndex=0;state.quizScore=0;state.quizAnswers=[];state.gameIndex=0;state.gamePly=0;$('curriculumModules').hidden=true;$('classroomView').hidden=false;$('classroomTitle').textContent=t.name;$('classroomModule').textContent='MÓDULO '+t.module.number+' · '+t.module.name;$('classroomDescription').textContent=t.description;renderClassroom();$('classroomView').scrollIntoView({behavior:'smooth',block:'start'});}
const structureLessons={
 base:{title:'Lê a estrutura antes de escolher o plano',intro:'A estrutura de peões é o mapa estratégico da posição. Ela indica casas fortes e fracas, colunas abertas, rupturas possíveis e o lado do tabuleiro onde cada jogador deve procurar actividade.',sections:[
  ['1. Cadeias de peões','Uma cadeia protege-se pela base. Na Defesa Francesa, os peões brancos d4–e5 formam a cadeia; o peão d4 é a base. As Pretas procuram atacá-la com ...c5 e, quando estiverem preparadas, ...f6. As Brancas devem sustentar a base antes de avançar.'],
  ['2. Peão isolado','Um peão isolado não tem peões amigos nas colunas vizinhas. Pode dar espaço e linhas abertas às peças, mas pode tornar-se alvo no final. Quem o possui procura actividade e rupturas; quem luta contra ele procura bloqueá-lo e trocar peças.'],
  ['3. Peões dobrados e pendurados','Peões dobrados ocupam a mesma coluna e podem ser vulneráveis, mas também controlam casas e abrem colunas. Peões pendurados são dois peões centrais lado a lado sem peões vizinhos que os sustentem: podem ganhar espaço, mas exigem coordenação das peças.'],
  ['4. Estrutura Carlsbad','Na estrutura Carlsbad típica, as Brancas têm maioria de peões na ala de dama e podem preparar o ataque de minoria b4–b5 para criar uma fraqueza em c6. As Pretas procuram contrajogo central, ...e5 ou ...c5, ou actividade de peças. O ataque de minoria não é uma corrida automática: precisa de preparação e de um centro seguro.']
 ],rule:'Não empurres um peão apenas porque podes. Primeiro identifica a base da cadeia, as rupturas do adversário e a fraqueza que queres criar.',recipe:['Identifica as ilhas de peões e os peões isolados, dobrados ou atrasados.','Marca a base da cadeia e as casas que não podem ser defendidas por peões.','Escolhe uma ruptura que melhore a tua posição e calcula a resposta do adversário.'],mistakes:['Atacar a cabeça de uma cadeia quando a base é o alvo correcto.','Lançar b4–b5 na Carlsbad sem controlar o centro e sem apoiar a coluna c.','Trocar peças automaticamente quando tens um peão isolado e precisas de actividade.'],checklist:['Qual é a base da cadeia de peões?','Que ruptura quer o adversário jogar?','Que fraqueza permanente posso criar sem enfraquecer o meu rei?']},
 intermediate:{title:'Transforma a estrutura num plano',intro:'Já não basta reconhecer o desenho. Tens de relacionar estrutura, actividade das peças e momento exacto da ruptura. O mesmo peão pode ser força dinâmica no meio-jogo e fraqueza estática no final.',sections:[
  ['1. Cadeia francesa: duas frentes','As Brancas sustentam d4 com c3 e peças; podem ganhar espaço na ala de rei. As Pretas atacam a base com ...c5 e, mais tarde, a cabeça com ...f6. Se a cadeia ficar imóvel, melhora as peças antes de abrir o centro.'],
  ['2. Carlsbad: ataque de minoria','A sequência b4–b5 pretende trocar o peão b por c6 ou forçar ...bxc6, deixando uma fraqueza para atacar na coluna c. Antes de iniciar, verifica se o centro está estável, se a torre pode chegar a c1 e se o adversário tem ...e5 ou ...c5.'],
  ['3. Peão isolado: actividade contra bloqueio','O lado do peão isolado procura peças activas, casas de apoio e a ruptura d4–d5 (ou ...d5). O adversário deve ocupar a casa à frente do peão, trocar peças activas e evitar libertar o alvo com uma troca favorável.'],
  ['4. Peões pendurados','Mantém a tensão enquanto ela restringir o adversário. Avança um dos peões apenas quando o avanço ganhar espaço, abrir uma coluna ou criar um peão passado — não apenas para evitar uma decisão.']
 ],rule:'Uma ruptura é boa quando a posição resultante favorece as tuas peças, não apenas quando o peão consegue avançar.',recipe:['Calcula a resposta mais crítica à ruptura, incluindo capturas e bloqueios.','Compara a actividade das peças antes e depois da troca de peões.','Decide se a fraqueza criada pode ser atacada com peças pesadas.'],mistakes:['Confundir maioria de peões com vantagem automática.','Abrir o centro com o rei ainda vulnerável.','Criar uma fraqueza sem ter peças capazes de a atacar.'],checklist:['Que peça minha ficará melhor depois da ruptura?','Que coluna ou casa será aberta?','A fraqueza criada pode ser defendida ou é duradoura?']},
 advanced:{title:'Avalia a estrutura dinamicamente',intro:'No nível avançado, a estrutura não é um rótulo. É uma hipótese sobre a posição que deve ser confirmada por cálculo concreto: tempos, actividade, segurança dos reis e recursos tácticos determinam quando a estrutura pode ser transformada.',sections:[
  ['1. Estrutura versus actividade','Um peão isolado não é uma fraqueza se as peças gerarem actividade suficiente. O lado defensor não deve trocar peças sem avaliar se a simplificação transforma uma vantagem dinâmica numa vantagem estática.'],
  ['2. Rupturas preparadas','Na Francesa, ...c5 ataca a base d4; ...f6 ataca e5. A segunda ruptura exige preparação: se abrir linhas contra o próprio rei ou permitir uma peça forte em e5, pode ser prematura. Calcula as recapturas e a nova estrutura após cada troca.'],
  ['3. Carlsbad: escolha do plano','O ataque de minoria é apenas um plano. Se as Pretas neutralizarem b4–b5 ou o centro permitir ...e5, as Brancas podem preferir e3–e4, pressão na coluna c ou manobra de peças. As Pretas devem escolher entre contrajogo central e bloqueio, conforme a coordenação concreta.'],
  ['4. Transição para o final','Antes de trocar, conta as fraquezas fixas, os peões passados possíveis e a actividade dos reis. Uma estrutura ligeiramente inferior pode ser defensável com bispos de cores opostas; uma maioria pode ser inútil se estiver bloqueada.']
 ],rule:'A melhor estrutura é a que as tuas peças conseguem explorar. Não avalies peões isoladamente: calcula a posição que nasce depois da ruptura.',recipe:['Gera pelo menos dois planos candidatos para cada lado.','Calcula a sequência crítica até a estrutura estabilizar.','Avalia a posição final: fraquezas fixas, actividade, rei e finais resultantes.'],mistakes:['Executar o plano temático sem verificar a táctica concreta.','Assumir que uma fraqueza estrutural é sempre explorável.','Ignorar a possibilidade de mudar de plano quando o adversário neutraliza a ruptura.'],checklist:['Qual é a transformação irreversível que pretendo provocar?','Que recurso táctico muda a avaliação dessa transformação?','Se as peças forem trocadas, quem beneficia da estrutura final?']}
};
const practice=[
 {id:'french',title:'A cadeia francesa: atacar a base',side:'Pretas',pgn:'1. e4 e6 2. d4 d5 3. e5',uci:'c7c5',san:'c5',question:'As Brancas avançaram e5 e criaram a cadeia d4–e5. Qual é a ruptura temática que ataca a base da cadeia?',hint:'Não ataques primeiro o peão e5. Procura a base em d4 e a alavanca do peão da coluna c.',why:'...c5 desafia directamente a base d4. Depois de ...Nc6 e, em muitas linhas, ...Qb6, as Pretas aumentam a pressão. A resposta branca típica inclui c3 e Nf3 para sustentar a cadeia.'},
 {id:'carlsbad',title:'Carlsbad: completar o desenvolvimento',side:'Brancas',pgn:'1. d4 d5 2. c4 e6 3. Nf3 Nd7 4. Nc3 Ngf6 5. Bg5 Be7 6. e3 O-O 7. Rc1 c6 8. Qc2 a6 9. a3 h6 10. Bh4 Re8 11. cxd5 exd5',uci:'f1d3',san:'Bd3',question:'A estrutura Carlsbad surgiu. Antes de iniciar o ataque de minoria, qual é a decisão posicional sensata nesta posição modelo?',hint:'O bispo de f1 ainda não está desenvolvido. Melhora a coordenação antes de iniciar a operação de peões.',why:'Bd3 completa o desenvolvimento e aproxima uma peça do centro. O plano de minoria só deve começar quando o centro e a coordenação das peças o permitem.'},
 {id:'doubled',title:'Peões dobrados: actividade e centro',side:'Brancas',pgn:'1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 d5 5. a3 Bxc3+ 6. bxc3 c5 7. cxd5 exd5',uci:'f1d3',san:'Bd3',question:'As Brancas aceitaram peões dobrados na coluna c em troca do par de bispos. Qual é a prioridade antes de decidir se os peões são uma fraqueza?',hint:'Não avalies os peões isoladamente. Desenvolve uma peça e prepara a actividade central.',why:'Bd3 desenvolve com tempo estratégico e aponta para o centro/ala de rei. Peões dobrados podem ser fracos, mas também abrem linhas e dão controlo de casas; a actividade das peças é decisiva.'}
];
const quizzes={
 base:[
  ['Na cadeia francesa d4–e5, qual é a base da cadeia branca?',['e5','d4','c3'],1,'d4 é o peão de trás que sustenta a cadeia; é o alvo típico de ...c5.'],
  ['Qual é a ruptura temática das Pretas contra a base d4?',['...c5','...h5','...a5'],0,'...c5 desafia a base d4 e procura abrir o centro.'],
  ['O que define um peão isolado?',['Está na coluna aberta','Não tem peões amigos nas colunas vizinhas','Está protegido por uma torre'],1,'A ausência de peões amigos nas colunas adjacentes é a definição estrutural.'],
  ['Na Carlsbad, o ataque de minoria procura sobretudo:',['Ganhar a ala de rei','Criar uma fraqueza em c6','Trocar todos os peões centrais'],1,'O objectivo é criar um alvo duradouro na ala de dama, frequentemente em c6.'],
  ['Contra um peão isolado, um plano típico é:',['Bloquear a casa à sua frente e trocar peças','Avançar todos os peões da ala','Evitar ocupar casas centrais'],0,'O bloqueio e as trocas reduzem a actividade dinâmica do peão isolado.']
 ],
 intermediate:[
  ['Antes de jogar b4–b5 na Carlsbad, o que deves verificar?',['Se o centro está seguro e as peças apoiam a operação','Se tens mais peões no tabuleiro','Se o adversário já rocou'],0,'A operação de minoria pode falhar se o adversário abrir o centro ou ganhar tempos contra as peças.'],
  ['Na Francesa, depois de ...c5, a segunda ruptura típica das Pretas é:',['...f6','...h6','...a6'],0,'...f6 ataca a cabeça e5, mas exige preparação para não abrir linhas contra o próprio rei.'],
  ['Com um peão isolado, o lado que o possui deve normalmente procurar:',['Actividade de peças e ruptura oportuna','Trocar todas as peças imediatamente','Bloquear o próprio peão'],0,'A actividade é a compensação dinâmica do peão isolado.'],
  ['Peões pendurados são normalmente:',['Dois peões centrais lado a lado, sem peões vizinhos que os apoiem','Peões na mesma coluna','Peões passados ligados'],0,'Eles podem ganhar espaço, mas tornam-se alvos se avançarem sem coordenação.'],
  ['Uma ruptura é estrategicamente boa quando:',['É possível empurrar o peão','A posição resultante favorece as tuas peças','Obriga sempre a uma troca'],1,'A avaliação deve considerar as casas, colunas e actividade após as trocas.']
 ],
 advanced:[
  ['A ruptura ...f6 na Francesa deve ser jogada quando:',['Sempre que estiver disponível','Depois de preparação e cálculo das linhas abertas','Antes de desenvolver as peças'],1,'...f6 pode destruir a cadeia, mas também abrir linhas e enfraquecer o rei.'],
  ['Na Carlsbad, se o adversário neutraliza b4–b5, o jogador deve:',['Insistir sempre no mesmo plano','Reavaliar e considerar e3–e4 ou actividade de peças','Trocar o rei'],1,'O plano temático não é uma obrigação; a posição pode exigir uma transformação central.'],
  ['Qual é a principal compensação dinâmica do peão isolado?',['Actividade, espaço e linhas abertas','Maioria de peões na ala de dama','Um final sempre ganho'],0,'A compensação depende da actividade e pode desaparecer após trocas.'],
  ['Antes de trocar peões e entrar num final, deves avaliar:',['Apenas a contagem de peões','Fraquezas fixas, peões passados, actividade dos reis e peças','Só a segurança do rei'],1,'A estrutura final pode mudar completamente a avaliação da posição.'],
  ['O erro mais perigoso ao aplicar um plano estrutural é:',['Verificar as respostas do adversário','Ignorar a táctica concreta porque o plano parece correcto','Melhorar a pior peça'],1,'A ideia posicional nunca substitui o cálculo concreto das respostas críticas.']
 ]
};
const modelGames=[
 {title:'Alekhine – Capablanca',meta:'Campeonato do Mundo · Buenos Aires · 1927 · ½–½',theme:'Estrutura Carlsbad e manobras',note:'Após 11.cxd5 exd5, observa a estrutura: as Brancas pressionam a ala de dama e procuram casas centrais; as Pretas organizam as peças e procuram contrajogo. A lição não é executar b4 automaticamente, mas coordenar as peças e avaliar as rupturas.',url:'https://classicchess.com/games/alekhine-alexander-vs-jose-raul-capablanca-19271014/?playlist=event%3Awcc-1927-alekhine-capablanca',pgn:'1. d4 d5 2. c4 e6 3. Nf3 Nd7 4. Nc3 Ngf6 5. Bg5 Be7 6. e3 O-O 7. Rc1 c6 8. Qc2 a6 9. a3 h6 10. Bh4 Re8 11. cxd5 exd5 12. Bd3 Nh5 13. Bxe7 Rxe7 14. O-O Nhf6 15. h3 Ne8 16. Ne2 Nd6 17. Ng3 Nf8 18. Ne5 f6 19. Ng6 Nxg6 20. Bxg6 Be6 21. Ne2 Qd7 22. Nf4 Bf5 23. Bxf5 Qxf5 24. Qxf5 Nxf5 25. Nd3 Nd6'},
 {title:'Botvinnik – Capablanca',meta:'Torneio AVRO · 22 Novembro 1938 · 1–0',theme:'Peões dobrados e transformação do centro',note:'A troca em c3 duplica os peões brancos, mas também dá às Brancas o par de bispos e possibilidades centrais. Segue a sequência 5.a3 Bxc3+ 6.bxc3 c5 7.cxd5 exd5: avalia o que se ganhou e o que se cedeu antes de chamar os peões dobrados de fracos.',url:'https://commons.wikimedia.org/wiki/File:Botvinnik_versus_Capablanca,_AVRO_1938.gif',pgn:'1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 d5 5. a3 Bxc3+ 6. bxc3 c5 7. cxd5 exd5 8. Bd3 O-O 9. Ne2 b6 10. O-O Ba6 11. Bxa6 Nxa6 12. Bb2 Qd7 13. a4 Rfe8 14. Qd3 c4 15. Qc2 Nb8 16. Rae1 Nc6 17. Ng3 Na5 18. f3 Nb3 19. e4 Qxa4 20. e5 Nd7 21. Qf2 g6 22. f4 f5 23. exf6 Nxf6 24. f5 Rxe1 25. Rxe1 Re8 26. Re6 Rxe6 27. fxe6 Kg7 28. Qf4 Qe8 29. Qe5 Qe7 30. Ba3 Qxa3 31. Nh5+ gxh5 32. Qg5+ Kf8 33. Qxf6+ Kg8 34. e7 Qc1+ 35. Kf2 Qc2+ 36. Kg3 Qd3+ 37. Kh4 Qe4+ 38. Kxh5 Qe2+ 39. Kh4 Qe4+ 40. g4 Qe1+ 41. Kh5'},
 {title:'Capablanca – Golombek',meta:'Margate · 19 Abril 1939 · 1–0',theme:'Ataque de minoria na Carlsbad',note:'Estuda como Capablanca usa a estrutura Carlsbad para criar alvos na ala de dama. O foco é perceber a preparação da operação de minoria, a coordenação das torres e a criação de uma fraqueza — não copiar lances sem compreender o contexto.',url:'https://www.chess.com/blog/Illingworth/a-model-capablanca-win-in-the-carlsbad-structure',pgn:null}
];
function progressPercent(t){const id=t.id,th=completed(id,'theory'),pr=completed(id,'practice'),qu=completed(id,'quiz');return (th?25:0)+(pr?35:0)+(qu?40:0)}
function renderClassroom(){
 const t=state.topic;if(!t)return;ensure(t.id);
 $('classroomLevels').innerHTML=levels.map(l=>`<button type="button" class="level-chip ${state.level===l.id?'active':''}" data-level="${l.id}">${l.label}<small>${l.name}</small></button>`).join('');
 $('classroomLevels').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;state.quizIndex=0;state.quizScore=0;state.quizAnswers=[];renderClassroom()});
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.onclick=()=>{state.tab=b.dataset.tab;renderClassroom()}});
 const pct=progressPercent(t);$('classroomProgress').textContent=pct+'% concluído';$('classroomProgressFill').style.width=pct+'%';
 const lesson=structureLessons[state.level];
 let panel='';
 if(state.tab==='theory'){
  panel=`<div class="classroom-lesson"><span class="mini-label">CONCEITO & TEORIA · ${levels.find(x=>x.id===state.level).label}</span><h3>${lesson.title}</h3><p>${lesson.intro}</p>${lesson.sections.map(([h,p])=>`<article class="lesson-concept"><h4>${h}</h4><p>${p}</p></article>`).join('')}<div class="gold-rule"><b>REGRA DE OURO</b><p>${lesson.rule}</p></div><div class="lesson-recipe"><h4>Receita prática para a partida</h4><ol>${lesson.recipe.map(x=>'<li>'+x+'</li>').join('')}</ol></div><div class="lesson-mistakes"><h4>Erros a evitar</h4><ul>${lesson.mistakes.map(x=>'<li>'+x+'</li>').join('')}</ul></div><div class="lesson-checklist"><h4>Checklist mental durante a partida</h4><ol>${lesson.checklist.map(x=>'<li>'+x+'</li>').join('')}</ol></div><button type="button" class="btn btn-red" id="markTheory" ${completed(t.id,'theory')?'disabled':''}>${completed(t.id,'theory')?'Teoria concluída ✓':'Marcar teoria como estudada'}</button></div>`;
 }else if(state.tab==='practice'){
  panel=`<div class="classroom-lesson"><span class="mini-label">PRÁTICA GUIADA · 3 POSIÇÕES</span><h3>Encontra o plano, não apenas o lance</h3><p>Joga a posição no tabuleiro. O sistema valida o lance temático, explica a ideia e avança. Cada nível usa os mesmos três padrões com uma pergunta de maior profundidade.</p><div class="practice-counter" id="practiceCounter">Posição 1 de 3</div><h4 id="practiceTitle"></h4><p id="practiceQuestion"></p><div class="classroom-board" id="classroomBoard" aria-label="Tabuleiro interactivo de treino"></div><div class="board-feedback" id="classroomBoardFeedback" aria-live="polite">A carregar posição…</div><div class="practice-controls"><button type="button" class="btn btn-outline" id="practiceHint">Ver pista</button><button type="button" class="btn btn-red" id="practiceNext" hidden>Próxima posição →</button></div></div>`;
 }else if(state.tab==='games'){
  panel=`<div class="classroom-lesson"><span class="mini-label">PARTIDAS MODELO · ESTUDO COM PROPÓSITO</span><h3>Três partidas, três lições estruturais</h3><p>Não reproduzas os lances mecanicamente. Em cada partida, pára antes da ruptura e pergunta que fraqueza, casa ou coluna será criada.</p><div class="model-games">${modelGames.map((g,i)=>`<article class="model-game"><span class="mini-label">PARTIDA 0${i+1}</span><h4>${g.title}</h4><p class="game-meta">${g.meta}</p><b>${g.theme}</b><p>${g.note}</p>${g.pgn?'<button type="button" class="btn btn-outline" data-replay="'+i+'">Rever partida no tabuleiro</button> ':''}<a href="${g.url}" target="_blank" rel="noopener noreferrer">Abrir fonte / análise ↗</a></article>`).join('')}</div><div id="gameReplay" class="game-replay" hidden><div class="game-replay-head"><b id="gameReplayTitle"></b><span id="gameReplayMove"></span></div><div id="gameReplayBoard" class="classroom-board"></div><div class="practice-controls"><button type="button" class="btn btn-outline" id="gamePrev">← Anterior</button><button type="button" class="btn btn-red" id="gameNext">Próximo lance →</button></div><div class="board-feedback" id="gameReplayFeedback"></div></div></div>`;
 }else{
  const questions=quizzes[state.level];
  panel=`<div class="classroom-lesson"><span class="mini-label">DESAFIO FINAL · 5 QUESTÕES</span><h3>Teste de domínio: ${levels.find(x=>x.id===state.level).label}</h3><p>Responde sem consultar a teoria. Cada resposta inclui explicação. Para concluir esta etapa, precisas de 5/5; podes repetir o teste sempre que quiseres.</p><div id="quizRoot"></div></div>`;
 }
 $('classroomPanel').innerHTML=panel;
 $('markTheory')?.addEventListener('click',()=>{mark(t.id,'theory');renderClassroom()});
 if(state.tab==='practice')initPractice(t);
 if(state.tab==='games')initGames();
 if(state.tab==='test')initQuiz(t);
}

function initDemo(){
 const root=$('demoBoard');if(!root)return;
 const tasks=[
  {pgn:'1. e4 e6 2. d4 d5 3. e5',uci:'c7c5',title:'Desafio 1/2 · Ataca a base da cadeia',question:'As Brancas têm peões em d4 e e5. De que forma as Pretas desafiam a base?',hint:'A base está em d4. Usa a alavanca do peão da coluna c.',why:'...c5 ataca a base d4 e é a ruptura temática da Francesa.'},
  {pgn:'1. d4 d5 2. c4 e6 3. Nf3 Nd7 4. Nc3 Ngf6 5. Bg5 Be7 6. e3 O-O 7. Rc1 c6 8. Qc2 a6 9. a3 h6 10. Bh4 Re8 11. cxd5 exd5',uci:'f1d3',title:'Desafio 2/2 · Coordena antes de atacar',question:'Na estrutura Carlsbad, qual lance desenvolve a última peça menor antes de iniciar o plano de minoria?',hint:'O bispo branco ainda está em f1. Desenvolve-o para uma casa activa.',why:'Bd3 completa o desenvolvimento e prepara a coordenação antes da operação de peões.'}
 ];
 let index=0,game=null,selected=null,score=0,solved=false;
 const feedback=$('demoFeedback'),question=$('demoQuestion'),next=$('demoNext');
 const load=()=>{game=new Chess();game.loadPgn(tasks[index].pgn);selected=null;solved=false;question.textContent=tasks[index].title+' · '+tasks[index].question;feedback.className='board-feedback';feedback.textContent='Selecciona a peça e joga o lance no tabuleiro.';next.hidden=true;draw();};
 const draw=()=>renderBoard(root,game,selected,sq=>{
  if(solved)return;
  if(selected){const mv=game.move({from:selected,to:sq,promotion:'q'});if(mv){selected=null;if(mv.from+mv.to+(mv.promotion||'')===tasks[index].uci){solved=true;score++;feedback.className='board-feedback success';feedback.textContent='Muito bem! '+tasks[index].why;next.hidden=false;next.textContent=index===0?'Próximo desafio →':'Ver resultado';}else{game.undo();feedback.className='board-feedback error';feedback.textContent='Lance legal, mas não é a solução temática. '+tasks[index].hint;}draw();return;}}
  const p=game.get(sq);selected=p&&p.color===game.turn()?sq:null;draw();
 });
 next.onclick=()=>{if(index===0){index=1;load();}else{question.textContent='Resultado da demonstração';feedback.className='board-feedback success';feedback.textContent='Acertaste '+score+'/2. Na Área Premium vais encontrar a mesma metodologia, com níveis, explicações e exercícios completos.';next.textContent='Aceder à Área Premium';next.onclick=()=>$('authPanel')?.scrollIntoView({behavior:'smooth',block:'center'});}};
 load();
}
function renderBoard(root,game,selected,onSquare){
 root.innerHTML='';const glyph={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};
 const board=game.board();
 for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=board[r][f],sq='abcdefgh'[f]+(8-r),b=document.createElement('button');b.type='button';b.className='classroom-square '+((r+f)%2?'dark':'light')+(selected===sq?' selected':'');b.textContent=p?glyph[p.color][p.type]:'';b.setAttribute('aria-label',sq);b.onclick=()=>onSquare(sq);root.appendChild(b);}
}
function initPractice(t){
 let index=0,game=null,selected=null,solved=false,done=0;
 const title=$('practiceTitle'),question=$('practiceQuestion'),feedback=$('classroomBoardFeedback'),next=$('practiceNext'),counter=$('practiceCounter'),board=$('classroomBoard');
 const render=()=>renderBoard(board,game,selected,square=>{
  if(solved)return;
  if(selected){const mv=game.move({from:selected,to:square,promotion:'q'});if(mv){selected=null;const uci=mv.from+mv.to+(mv.promotion||'');if(uci===practice[index].uci){solved=true;done++;feedback.className='board-feedback success';feedback.textContent='Correcto: '+mv.san+'. '+practice[index].why;next.hidden=false;next.textContent=index===practice.length-1?'Concluir prática ✓':'Próxima posição →';}else{game.undo();feedback.className='board-feedback error';feedback.textContent='Esse lance é legal, mas não resolve a pergunta. '+practice[index].hint;}render();return;}}
  const piece=game.get(square);selected=piece&&piece.color===game.turn()?square:null;render();
 });
 const load=()=>{const p=practice[index];game=new Chess();try{game.loadPgn(p.pgn);}catch(e){feedback.textContent='Não foi possível carregar esta posição. Contacta o suporte.';return;}selected=null;solved=false;counter.textContent='Posição '+(index+1)+' de '+practice.length+' · Jogas de '+p.side;title.textContent=p.title;question.textContent=p.question;feedback.className='board-feedback';feedback.textContent='Escolhe a peça e joga o lance. Se precisares, pede uma pista.';next.hidden=true;render();};
 $('practiceHint').onclick=()=>{feedback.textContent=practice[index].hint;};
 next.onclick=()=>{if(index<practice.length-1){index++;load();}else{mark(t.id,'practice');feedback.className='board-feedback success';feedback.textContent='Prática concluída: 3/3 posições resolvidas. O teu progresso foi guardado.';next.hidden=true;$('classroomProgress').textContent=progressPercent(t)+'% concluído';$('classroomProgressFill').style.width=progressPercent(t)+'%';}};
 load();
}
function initQuiz(t){
 const root=$('quizRoot'),qs=quizzes[state.level];state.quizIndex=0;state.quizScore=0;state.quizAnswers=[];
 const draw=()=>{
  const i=state.quizIndex;
  if(i>=qs.length){const passed=state.quizScore===5;if(passed)mark(t.id,'quiz');root.innerHTML=`<div class="quiz-result"><strong>${state.quizScore}/5</strong><h4>${passed?'Nível concluído!':'Ainda há pontos a consolidar'}</h4><p>${passed?'Excelente. Completaste o teste deste nível.': 'Revê as explicações e tenta novamente. O objectivo é acertar 5/5, compreendendo o motivo.'}</p><button type="button" class="btn btn-red" id="retryQuiz">Repetir teste</button></div>`;if(passed){$('classroomProgress').textContent=progressPercent(t)+'% concluído';$('classroomProgressFill').style.width=progressPercent(t)+'%';} $('retryQuiz').onclick=()=>{state.quizIndex=0;state.quizScore=0;state.quizAnswers=[];draw()};return;}
  const [q,opts,correct,explain]=qs[i];
  root.innerHTML=`<div class="quiz-top"><b>Questão ${i+1} de 5</b><span>${state.quizScore} correctas</span></div><div class="quiz-question"><h4>${q}</h4><div class="quiz-options">${opts.map((o,j)=>`<button type="button" class="quiz-option" data-answer="${j}">${String.fromCharCode(65+j)}. ${o}</button>`).join('')}</div><div id="quizFeedback" class="board-feedback" hidden></div><button type="button" class="btn btn-red" id="quizContinue" hidden>${i===4?'Ver resultado':'Próxima questão →'}</button></div>`;
  root.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(state.quizAnswers[i]!==undefined)return;const a=Number(b.dataset.answer),ok=a===correct;state.quizAnswers[i]=a;if(ok)state.quizScore++;root.querySelectorAll('[data-answer]').forEach((x,j)=>{x.disabled=true;if(j===correct)x.classList.add('correct');if(j===a&&!ok)x.classList.add('incorrect')});const f=$('quizFeedback');f.hidden=false;f.className='board-feedback '+(ok?'success':'error');f.textContent=(ok?'Correcto. ':'Não é essa. ')+explain;$('quizContinue').hidden=false;});
  $('quizContinue').onclick=()=>{state.quizIndex++;draw()};
 };
 draw();
}
function initGames(){
 const buttons=document.querySelectorAll('[data-replay]');
 buttons.forEach(b=>b.onclick=()=>{const g=modelGames[Number(b.dataset.replay)];if(!g||!g.pgn)return;const box=$('gameReplay');box.hidden=false;$('gameReplayTitle').textContent=g.title;let game=new Chess();game.loadPgn(g.pgn);const moves=game.history({verbose:true});let ply=0;const draw=()=>{const view=new Chess();for(let i=0;i<ply;i++)view.move(moves[i]);renderBoard($('gameReplayBoard'),view,null,()=>{});$('gameReplayMove').textContent='Lance '+ply+' / '+moves.length;$('gameReplayFeedback').textContent=ply?('Último lance: '+moves[ply-1].san+'. Observa as mudanças na estrutura e nas casas disponíveis.'):'Posição inicial. Avança lance a lance e identifica as transformações de peões.';};$('gamePrev').onclick=()=>{ply=Math.max(0,ply-1);draw()};$('gameNext').onclick=()=>{ply=Math.min(moves.length,ply+1);draw()};draw();box.scrollIntoView({behavior:'smooth',block:'center'});});
}
export function initCurriculum(){
 renderModules();
 $('backToModules')?.addEventListener('click',()=>{$('classroomView').hidden=true;$('curriculumModules').hidden=false;$('curriculumModules').scrollIntoView({behavior:'smooth',block:'start'})});
}
