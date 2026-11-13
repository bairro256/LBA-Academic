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
  ['Avaliação por Desequilíbrios','Comparar material, actividade, estrutura, espaço, segurança dos reis e iniciativa.'],
  ['Estruturas de Peões','Compreender peões isolados, dobrados, atrasados, pendurados, cadeias e maiorias.'],
  ['Peças Boas e Más','Avaliar actividade, mobilidade, casas fortes e a pior peça da posição.'],
  ['Casas Fracas e Postos Avançados','Criar e ocupar casas que já não podem ser defendidas por peões.'],
  ['Colunas Abertas e Diagonais','Dominar linhas, casas de entrada e pontos de invasão com torres e bispos.'],
  ['Profilaxia','Identificar o plano adversário e limitar os seus recursos antes de agir.'],
  ['Restrição e Bloqueio','Reduzir a mobilidade adversária, bloquear peões e controlar casas de entrada.'],
  ['Rupturas de Peões','Preparar avanços e trocas que alteram a estrutura e abrem linhas.'],
  ['Iniciativa e Tempos','Manter ameaças úteis, ganhar tempos e impedir a reorganização adversária.'],
  ['Ataque ao Rei','Concentrar forças, abrir linhas e reconhecer condições para atacar com segurança.'],
  ['Sacrifício Posicional','Entregar material por actividade, casas fortes, estrutura ou iniciativa duradoura.'],
  ['Cálculo e Lances Candidatos','Gerar opções, calcular respostas críticas e avaliar as posições resultantes.'],
  ['Conversão da Vantagem','Reduzir o contra-jogo, criar um segundo alvo e transformar a vantagem.']
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


Object.assign(lessons, {
 'Estruturas de Peões':{idea:'A estrutura de peões define as casas fortes, as colunas abertas e os planos típicos de cada lado.',points:['Reconhece peões isolados, dobrados, atrasados e pendurados.','Uma cadeia deve ser atacada pela sua base.','As rupturas devem ser preparadas com peças e cálculo.'],plan:'Identifica a estrutura, localiza a base da cadeia e prepara a ruptura que melhora as tuas peças.',mistakes:'Avançar peões sem apoio; criar fraquezas permanentes sem compensação.',checklist:'Qual é a estrutura? Onde está a base? Que ruptura altera a posição?'},
 'Planos de Abertura':{idea:'O plano de abertura nasce da estrutura de peões, da colocação das peças e das fraquezas que cada lado pode explorar.',points:['Liga o desenvolvimento a um objectivo concreto.','Distingue planos de curto prazo e planos estratégicos.','Adapta o plano quando a estrutura muda.'],plan:'Resume a posição em duas ideias: a melhor peça e a ruptura ou casa que queres preparar.',mistakes:'Memorizar lances sem compreender as ideias; insistir num plano que a posição já não permite.',checklist:'Que estrutura surgiu? Qual é a minha pior peça? Qual é o plano adversário?'},
 'Transposições':{idea:'Uma transposição acontece quando diferentes ordens de lances conduzem à mesma posição ou a estruturas muito semelhantes.',points:['Compara a posição no tabuleiro, não apenas o nome da abertura.','A ordem dos lances pode evitar variantes ou permitir uma escolha mais favorável.','Verifica se a transposição altera o direito de rocar ou outros detalhes.'],plan:'Antes de seguir uma sequência automática, confirma a posição exacta e escolhe a ordem que evita concessões.',mistakes:'Jogar por memória sem verificar a ordem; confundir posições parecidas com posições idênticas.',checklist:'A posição é realmente igual? Que lance foi omitido? A ordem favorece quem?'},
 'Restrição':{idea:'A restrição limita as casas e rupturas disponíveis ao adversário, reduzindo a actividade das suas peças.',points:['Controla casas de entrada antes de ocupar espaço.','Evita rupturas libertadoras do adversário.','Melhora as peças enquanto restringes a posição contrária.'],plan:'Identifica a ruptura libertadora, coloca controlo nas casas críticas e aumenta a pressão sem permitir contra-jogo.',mistakes:'Restringir sem criar uma segunda fraqueza; permitir uma ruptura no momento errado.',checklist:'Que peça adversária está limitada? Qual ruptura quer jogar? Que casa devo controlar?'},
 'Rupturas':{idea:'Uma ruptura é um avanço ou troca de peões que altera a estrutura e abre linhas para as peças.',points:['Prepara a ruptura com apoio suficiente.','Calcula as capturas e recapturas antes de avançar.','Avalia as casas que ficam fracas depois da troca.'],plan:'Conta os defensores e atacantes, calcula a sequência de trocas e escolhe o momento em que as tuas peças ficam mais activas.',mistakes:'Executar a ruptura cedo demais; abrir uma coluna que o adversário controla.',checklist:'Que linha será aberta? Quem ganha actividade? Que fraqueza fica para trás?'},
 'Cálculo de Variantes':{idea:'Calcular é comparar sequências concretas e avaliar a posição final, não apenas imaginar um lance atractivo.',points:['Começa por xeques, capturas e ameaças.','Considera as respostas mais fortes do adversário.','Termina cada variante com uma avaliação material e posicional.'],plan:'Escolhe dois ou três lances candidatos, calcula a resposta crítica e compara as posições finais.',mistakes:'Parar o cálculo depois do primeiro lance; considerar apenas a resposta desejada.',checklist:'Quais são os lances candidatos? Qual é a resposta mais forte? O que resta no final?'},
 'Actividade do Rei':{idea:'No final, o rei deixa de ser apenas uma peça a proteger e passa a ser uma força central de ataque e defesa.',points:['Centraliza o rei quando não há perigo de mate.','Usa o rei para apoiar peões passados e atacar peões fracos.','Não o afastes da zona crítica sem razão concreta.'],plan:'Activa o rei, aproxima-o dos alvos e coordena-o com as restantes peças.',mistakes:'Manter o rei passivo; avançá-lo para uma casa onde pode sofrer xeques ou perder tempos.',checklist:'O rei está activo? Que peões pode atacar? Há xeques que o afastam?'},
 'Conversão':{idea:'Converter uma vantagem exige reduzir o contra-jogo adversário e melhorar a posição antes de forçar decisões.',points:['Simplifica quando a troca mantém ou aumenta a vantagem.','Cria um segundo alvo para dividir a defesa.','Mantém as peças activas e evita precipitação.'],plan:'Neutraliza o contra-jogo, melhora o rei e as peças, cria uma fraqueza adicional e só então converte.',mistakes:'Trocar para um final empatado; acelerar a promoção sem apoio; permitir actividade adversária.',checklist:'Qual é a vantagem concreta? Que contra-jogo existe? Qual troca favorece a conversão?'},
 'Defesa':{idea:'Defender bem é encontrar recursos activos, construir uma fortaleza ou simplificar para uma posição sustentável.',points:['Procura trocas que reduzam o perigo.','Bloqueia peões passados e limita o rei adversário.','Reconhece fortaleza, afogamento e xeque perpétuo.'],plan:'Identifica a ameaça principal, encontra a peça defensora essencial e procura uma solução activa que reduza as opções adversárias.',mistakes:'Defender passivamente sem contra-jogo; abandonar uma fortaleza; trocar a peça que sustenta a defesa.',checklist:'Qual é a ameaça real? Que troca ajuda? Existe recurso de empate?'}
});

Object.assign(lessons, {
 'Avaliação por Desequilíbrios':{idea:'Um plano forte nasce de uma avaliação concreta. Compara os factores que tornam cada lado diferente: material, actividade, estrutura de peões, espaço, segurança dos reis e iniciativa.',points:['Conta o material, mas considera compensações dinâmicas.','Compara a peça mais activa e a pior peça de cada lado.','Localiza fraquezas fixas, maiorias, casas de entrada e rupturas.','Hierarquiza os factores: nem todos têm a mesma importância em cada posição.'],plan:'Faz um balanço em seis pontos: material, actividade, estrutura, espaço, rei e iniciativa. Identifica o desequilíbrio mais estável, formula um plano e verifica o melhor recurso adversário.',mistakes:'Listar factores sem os hierarquizar; copiar um plano típico sem verificar se a posição o permite; confundir espaço com vantagem decisiva.',checklist:'Que lado tem a melhor peça? Qual é a fraqueza mais duradoura? Que troca altera a avaliação? Qual seria o plano adversário?'},
 'Estruturas de Peões':{idea:'A estrutura de peões determina as casas fortes, as colunas abertas e os planos típicos. Os peões definem o mapa estratégico da posição.',points:['Peão isolado: pode dar espaço e linhas, mas exige apoio.','Peões dobrados: podem controlar casas e abrir colunas, mas também ser alvos.','Cadeia de peões: identifica a base e prepara a ruptura contra ela.','Maioria numa ala pode criar um peão passado, se o rei e as peças apoiarem.'],plan:'Classifica a estrutura, encontra a base das cadeias, identifica a maioria e escolhe a ruptura que melhora a actividade das tuas peças.',mistakes:'Avançar peões sem apoio; atacar a ponta da cadeia em vez da base; criar fraquezas sem conseguir explorá-las.',checklist:'Qual é a estrutura? Onde está a base? Que coluna pode abrir? Qual lado tem maioria?'},
 'Casas Fracas e Postos Avançados':{idea:'Uma casa fraca é um ponto que os peões adversários já não conseguem controlar. Um posto avançado é uma casa forte ocupada por uma peça, frequentemente um cavalo.',points:['Um avanço de peão pode deixar casas atrás dele.','A casa só é uma fraqueza útil se conseguires ocupá-la.','Troca ou desvia o defensor antes de instalar a peça.','Um cavalo em posto avançado precisa de apoio e não deve ser facilmente expulso.'],plan:'Provoca ou identifica a fraqueza, prepara uma rota de acesso, elimina o defensor relevante e instala uma peça na casa.',mistakes:'Criar uma casa fraca sem rota de acesso; trocar a peça que deveria ocupar o posto; permitir uma ruptura libertadora.',checklist:'Que peão já não controla esta casa? Qual peça a pode ocupar? Como será expulsa?'},
 'Colunas Abertas e Diagonais':{idea:'Linhas abertas são vias de acesso. Uma torre só domina uma coluna quando consegue pressionar um alvo ou entrar numa fila; um bispo precisa de diagonais activas.',points:['Coloca torres em colunas abertas ou semi-abertas.','Dobra torres quando a coluna pode ser disputada ou invadida.','Controla a casa de entrada antes de ocupar a coluna.','Avalia se o bispo encontra alvos na diagonal ou está bloqueado pelos próprios peões.'],plan:'Escolhe a linha mais importante, disputa-a, controla a casa de entrada e prepara a invasão com uma ameaça concreta.',mistakes:'Ocupar uma coluna sem ponto de entrada; deixar o adversário dobrar primeiro; trocar o bispo activo sem razão.',checklist:'Que linha está aberta? Qual é a casa de invasão? Quem a controla?'},
 'Restrição e Bloqueio':{idea:'Restringir é reduzir as opções úteis do adversário; bloquear é colocar uma peça à frente de um peão passado ou de uma cadeia para impedir o seu avanço.',points:['Controla as casas de ruptura e as casas de entrada.','Um bloqueador deve ser apoiado e difícil de expulsar.','Evita permitir uma libertação que transforme a posição passiva em activa.'],plan:'Identifica a peça ou ruptura que dá liberdade ao adversário, controla a casa crítica e instala um bloqueador apoiado. Depois melhora as restantes peças.',mistakes:'Restringir sem criar um alvo; bloquear com uma peça mal apoiada; permitir uma troca que liberta o peão ou as peças adversárias.',checklist:'Que peça adversária está limitada? Qual é a ruptura libertadora? O bloqueador está protegido?'},
 'Rupturas de Peões':{idea:'A ruptura é o momento em que um avanço ou troca de peões transforma a estrutura. Pode abrir uma coluna, libertar um bispo ou criar uma casa forte, mas também deixar casas vulneráveis.',points:['Prepara a ruptura com peças e apoio suficiente.','Calcula capturas, recapturas e lances intermédios.','Avalia quem beneficia da coluna ou diagonal que será aberta.','Considera a estrutura que fica depois das trocas.'],plan:'Conta atacantes e defensores, calcula a sequência crítica e compara a actividade das peças antes e depois da ruptura.',mistakes:'Executar a ruptura cedo demais; abrir uma coluna controlada pelo adversário; esquecer uma recaptura intermédia.',checklist:'Que linha será aberta? Quem ganha actividade? Que casa fica fraca? Qual é a resposta mais forte?'},
 'Iniciativa e Tempos':{idea:'A iniciativa é a capacidade de colocar problemas ao adversário e obrigá-lo a responder. Cada ameaça deve melhorar a posição ou criar uma concessão.',points:['Um lance com tempo pode desenvolver uma peça e atacar um alvo.','Ameaças sucessivas podem impedir a coordenação adversária.','A iniciativa perde valor se não houver continuação ou compensação.'],plan:'Procura lances que combinem desenvolvimento, ataque a um alvo e melhoria da posição. Calcula se o adversário consegue neutralizar a ameaça.',mistakes:'Confundir actividade com ataque decisivo; criar ameaças sem fundamento; continuar a atacar depois de a iniciativa terminar.',checklist:'Que ameaça concreta criei? Qual é a melhor defesa? O meu próximo lance mantém a iniciativa?'},
 'Ataque ao Rei':{idea:'Um ataque eficaz depende de superioridade local, linhas abertas e coordenação. A proximidade do rei adversário não justifica, por si só, um sacrifício.',points:['Conta as peças atacantes e defensoras na zona do rei.','Procura linhas, diagonais e casas de entrada.','Identifica os defensores essenciais e calcula se podem ser eliminados ou desviados.','Verifica se há peças suficientes para continuar o ataque.'],plan:'Reúne forças, enfraquece o abrigo do rei, abre uma linha favorável e calcula a sequência crítica incluindo a melhor defesa.',mistakes:'Atacar com poucas peças; abrir linhas junto do próprio rei; sacrificar sem continuação; ignorar a troca de damas.',checklist:'Quantas peças participam? Que linha pode abrir? Qual é o defensor-chave? O ataque continua após a melhor defesa?'},
 'Sacrifício Posicional':{idea:'Um sacrifício posicional entrega material em troca de actividade, casas fortes, estrutura favorável ou iniciativa duradoura, não necessariamente de mate imediato.',points:['Define a compensação antes de sacrificar.','Compara a duração da compensação com a vantagem material adversária.','Calcula as respostas que tentam devolver o material ou trocar peças.'],plan:'Escreve o que recebes pelo material, identifica como vais manter a compensação e verifica se o adversário pode simplificar.',mistakes:'Chamar posicional a um sacrifício sem compensação; ignorar a defesa mais simples; avaliar apenas a actividade momentânea.',checklist:'O que recebo pelo material? A compensação é duradoura? O adversário pode simplificar?'},
 'Cálculo e Lances Candidatos':{idea:'O cálculo começa antes da primeira variante: gera lances candidatos relevantes e testa cada um contra a resposta mais resistente.',points:['Procura xeques, capturas e ameaças, mas inclui lances posicionais.','Calcula a resposta crítica de cada candidato.','Termina cada variante numa posição que consigas avaliar.','Compara as posições finais sem misturar variantes.'],plan:'Escolhe dois ou três candidatos. Para cada um, calcula a melhor resposta adversária, continua até a posição estabilizar e avalia material, rei e actividade.',mistakes:'Calcular apenas o lance preferido; parar depois da primeira resposta; construir variantes longas sem avaliar posições intermédias.',checklist:'Quais são os candidatos? Qual é a resposta mais forte? Onde termina a variante? Que posição prefiro e porquê?'},
 'Conversão da Vantagem':{idea:'Converter uma vantagem exige reduzir o contra-jogo. Consolida, restringe, cria um segundo alvo e só depois força uma transformação favorável.',points:['Identifica a vantagem concreta: material, estrutura, espaço, rei ou actividade.','Neutraliza a principal fonte de contra-jogo.','Cria uma segunda fraqueza para dividir os defensores.','Troca peças apenas quando a posição resultante continua favorável.'],plan:'Melhora a pior peça, reduz a actividade adversária, fixa uma fraqueza, cria um segundo alvo e escolhe a troca ou ruptura favorável.',mistakes:'Acelerar sem necessidade; trocar para um final empatado; permitir actividade adversária enquanto proteges passivamente a vantagem.',checklist:'Qual é a minha vantagem? Que contra-jogo devo impedir? Como crio um segundo alvo? Que troca mantém a vantagem?'}
});

Object.assign(puzzles, {
 'Estruturas de Peões':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',answer:'d4',hint:'Questiona a cadeia central com uma ruptura preparada.',why:'d4 altera a estrutura e abre linhas para as peças. Calcula sempre as recapturas.'},
 'Planos de Abertura':{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',answer:'e4',hint:'Começa por disputar o centro e libertar as peças.',why:'e4 cria uma estrutura central e determina os planos de desenvolvimento.'},
 'Transposições':{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',answer:'d4',hint:'Escolhe uma estrutura central clássica e compara as ordens de lances.',why:'d4 conduz a famílias de posições que também podem surgir por outras ordens de lances.'},
 'Restrição':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',answer:'a4',hint:'Limita a expansão do peão b5 e reduz o espaço adversário.',why:'a4 questiona a cadeia de peões e pode impedir ...b4.'},
 'Rupturas':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',answer:'d4',hint:'Calcula a abertura do centro antes de executar a ruptura.',why:'d4 desafia os peões centrais e abre linhas para as peças.'},
 'Cálculo de Variantes':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',answer:'d4',hint:'Calcula as capturas centrais e avalia a posição depois das trocas.',why:'A ruptura central deve ser calculada até à posição resultante, não apenas até à primeira captura.'},
 'Actividade do Rei':{fen:'8/8/8/8/4k3/4P3/4K3/8 w - - 0 1',answer:'Kd2',hint:'Procura uma casa activa para o rei sem permitir que seja capturado.',why:'O rei deve aproximar-se da zona de luta e apoiar o peão.'},
 'Conversão':{fen:'8/8/8/8/5k2/8/3K4/4R3 w - - 0 1',answer:'Re4+',hint:'Usa a actividade da torre para ganhar um tempo com xeque.',why:'Um xeque activo pode melhorar a coordenação e afastar o rei adversário.'},
 'Defesa':{fen:'8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',answer:'Kd3',hint:'Procura a oposição e mantém o rei perto do peão.',why:'A defesa em finais de peões depende de oposição, casas de bloqueio e actividade do rei.'}
});

const puzzles = {
 'Centro':{fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',setup:[],answer:'e4',hint:'Joga um peão central para ocupar espaço e abrir linhas.',why:'1.e4 ocupa uma casa central, controla d5 e f5 e liberta o bispo de f1 e a dama.'},
 'Desenvolvimento':{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',setup:[],answer:'Nf3',hint:'Desenvolve uma peça menor e ataca o peão e5.',why:'2.Cf3 desenvolve o cavalo, controla d4 e e5 e prepara o roque.'},
 'Segurança do Rei':{fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',setup:[],answer:'O-O',hint:'O centro ainda não está bloqueado. Põe o rei em segurança e activa a torre.',why:'4.O-O retira o rei do centro e liga a torre de h1 ao jogo.'},
 'Peças Boas e Más':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'d4',hint:'Abre o centro enquanto as tuas peças estão coordenadas.',why:'d4 desafia o centro e procura libertar as peças brancas. Avalia sempre as capturas e a estrutura que fica.'},
 'Casas Fracas':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'d4',hint:'Questiona o centro para ganhar espaço e criar casas de entrada.',why:'d4 desafia a estrutura central. Depois das trocas, procura casas que os peões já não conseguem defender.'},
 'Profilaxia':{fen:'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10',setup:[],answer:'a4',hint:'Antes de avançar no centro, limita a expansão das Pretas na ala da dama.',why:'a4 questiona a cadeia b5 e pode limitar ...b4. É uma ideia profiláctica: reduzir o plano adversário.'},
 'Oposição':{fen:'8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',setup:[],answer:'Kd3',hint:'Aproxima o rei mantendo atenção à oposição e à casa de passagem.',why:'O rei branco procura apoiar o peão e ganhar espaço. Em finais de peões, a vez de jogar e a oposição são decisivas.'},
 'Casas-Chave':{fen:'8/8/8/8/4k3/4P3/4K3/8 w - - 0 1',setup:[],answer:'Kd2',hint:'Não empurres o peão imediatamente. Aproxima o rei.',why:'O rei deve participar na luta pelas casas-chave antes de o peão avançar.'},
 'Finais de Torres':{fen:'8/8/8/8/5k2/8/3K4/4R3 w - - 0 1',setup:[],answer:'Re4+',hint:'Procura um xeque activo que obrigue o rei adversário a reagir.',why:'A actividade da torre é essencial. Usa os xeques para ganhar tempos e melhorar a posição.'}
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

const readingRefs={
 'Avaliação por Desequilíbrios':['Jeremy Silman — How to Reassess Your Chess','Max Euwe e H. Kramer — The Middlegame'],
 'Estruturas de Peões':['Luděk Pachman — Complete Chess Strategy, vol. 2','Andrew Soltis — Pawn Structure Chess'],
 'Peças Boas e Más':['Aron Nimzowitsch — My System','Luděk Pachman — Complete Chess Strategy, vol. 1'],
 'Casas Fracas e Postos Avançados':['Aron Nimzowitsch — My System','Aron Nimzowitsch — Chess Praxis'],
 'Colunas Abertas e Diagonais':['Luděk Pachman — Complete Chess Strategy, vol. 1','Max Euwe e H. Kramer — The Middlegame'],
 'Profilaxia':['Aron Nimzowitsch — My System','Aron Nimzowitsch — Chess Praxis'],
 'Restrição e Bloqueio':['Aron Nimzowitsch — My System','John Watson — Secrets of Modern Chess Strategy'],
 'Rupturas de Peões':['Luděk Pachman — Complete Chess Strategy, vols. 2 e 3','Andrew Soltis — Pawn Structure Chess'],
 'Iniciativa e Tempos':['Paul Keres e Alexander Kotov — The Art of the Middle Game','David Bronstein — Zurich International Chess Tournament 1953'],
 'Ataque ao Rei':['Vladimir Vuković — The Art of Attack in Chess','Paul Keres e Alexander Kotov — The Art of the Middle Game'],
 'Sacrifício Posicional':['Aron Nimzowitsch — My System','John Watson — Secrets of Modern Chess Strategy'],
 'Cálculo e Lances Candidatos':['Alexander Kotov — Think Like a Grandmaster','John Nunn — Secrets of Practical Chess'],
 'Conversão da Vantagem':['Max Euwe e H. Kramer — The Middlegame','David Bronstein — Zurich International Chess Tournament 1953']
};
Object.values(readingRefs).forEach(refs=>{if(!refs.some(ref=>ref.includes('Understanding Chess Middlegames')))refs.unshift('John Nunn — Understanding Chess Middlegames (leitura complementar; conceitos aplicados em conteúdo original LBA)');if(!refs.some(ref=>ref.includes('Zurich International Chess Tournament 1953')))refs.push('David Bronstein — Zurich International Chess Tournament 1953 (estudo de partidas clássicas anotadas; análise estratégica original LBA)');});
const deepLessons={
'Avaliação por Desequilíbrios':{
intro:'A avaliação estratégica não é uma votação de factores nem uma impressão estética. É um diagnóstico que identifica qual característica da posição tem maior peso e como ela pode ser transformada numa vantagem concreta. Uma posição pode ter material igual, mas actividade desigual; pode ter um peão a menos, mas compensação em desenvolvimento, rei exposto e iniciativa. O jogador forte não pergunta apenas “quem está melhor?”, pergunta “porquê, durante quanto tempo e qual é o plano que torna essa vantagem mais relevante?”.',
chapters:[
['1. Os seis factores de avaliação','Material: conta peões e peças, mas não concluas automaticamente que a vantagem material é decisiva. Actividade: compara alcance, mobilidade, coordenação e acesso a casas úteis. Estrutura: identifica peões isolados, dobrados, atrasados, maiorias e alvos fixos. Espaço: mede a liberdade de manobra e a facilidade de transferir peças. Segurança dos reis: verifica linhas abertas, escudos de peões e peças atacantes. Iniciativa: avalia quem cria ameaças e obriga o outro a responder.'],
['2. Factores estáticos e dinâmicos','Uma fraqueza estrutural pode durar muitas jogadas; a iniciativa pode desaparecer em poucos lances. Chamamos estáticos aos elementos relativamente duradouros, como peões fracos, casas de entrada e estrutura. Os dinâmicos incluem desenvolvimento, actividade momentânea, rei exposto e iniciativa. Quando tens vantagem estática, evita precipitar-te: melhora as peças e fixa alvos. Quando tens vantagem dinâmica, procura agir antes que o adversário complete o desenvolvimento ou consolide.'],
['3. Transformar avaliação em plano','Escolhe o desequilíbrio principal, identifica o alvo, determina a peça que precisa de melhorar e procura a ruptura ou troca que favorece a tua avaliação. Formula o plano em linguagem concreta: “vou dobrar as torres na coluna c, fixar o peão c6 e pressioná-lo com três peças”. “Vou atacar” não é um plano suficiente. Antes de executar, pergunta qual é o melhor recurso do adversário e se o teu plano continua válido depois dessa resposta.'],
['4. Exemplo de raciocínio','Imagina uma posição sem vantagem material: tens bispo activo e cavalo adversário limitado por peões da mesma cor. O plano não é trocar peças indiscriminadamente. Mantém o bispo, fixa os peões nas casas da cor do bispo, cria um segundo alvo e só troca quando a posição resultante favorecer o teu bispo ou um final vantajoso. Se o adversário conseguir libertar o cavalo com uma ruptura, essa ruptura passa a ser prioridade profiláctica.']
],
drills:[
{q:'Tens um peão a menos, mas todas as tuas peças estão activas e o rei adversário está no centro. Qual factor deve orientar primeiro a decisão?',opts:['Apenas a contagem material','Os factores dinâmicos: actividade, rei e iniciativa','Trocar todas as peças'],a:1,why:'A vantagem material é estática, mas a actividade e a exposição do rei podem criar uma oportunidade temporária. É preciso calcular antes de consolidar.'},
{q:'Tens uma fraqueza fixa no peão adversário e nenhuma táctica imediata. Qual é o método mais sólido?',opts:['Melhorar as peças e aumentar a pressão','Sacrificar imediatamente','Avançar peões em todas as alas'],a:0,why:'Uma vantagem duradoura permite manobra. Primeiro melhora as peças, fixa o alvo e evita dar contra-jogo.'}
]},
'Estruturas de Peões':{
intro:'A estrutura de peões é o mapa estratégico da posição. Ela determina que casas podem tornar-se fortes ou fracas, quais colunas se podem abrir, onde existe espaço e que rupturas são possíveis. As peças adaptam-se à estrutura: um cavalo procura casas protegidas por peões; um bispo precisa de diagonais livres; as torres precisam de colunas e pontos de entrada. Não existe um plano universal para “peões dobrados” ou “peão isolado”: o valor depende da actividade das peças e da possibilidade de criar alvos.',
chapters:[
['1. Peão isolado','O peão isolado não tem peões vizinhos nas colunas adjacentes que o possam apoiar. Pode conceder espaço, controlar casas centrais e abrir linhas para as peças, mas torna-se alvo se as peças forem trocadas. Com peças activas, procura iniciativa e rupturas; se estiveres contra ele, bloqueia a casa à sua frente, pressiona-o e troca peças quando isso reduzir a actividade do adversário. Não bloqueies sem avaliar se o bloqueador ficará exposto a trocas desfavoráveis.'],
['2. Peões dobrados e atrasados','Peões dobrados podem ser alvos, mas também controlam casas e abrem colunas. Avalia se são móveis, se podem avançar e se existe uma coluna semi-aberta para as torres. Um peão atrasado numa coluna aberta é especialmente vulnerável quando a casa à sua frente pode ser ocupada por uma peça. A pressão só é real se conseguires aumentar o número de atacantes ou obrigar o defensor a posições passivas.'],
['3. Cadeias de peões e rupturas','Numa cadeia, identifica a base: é frequentemente o ponto que sustenta os restantes peões. Atacar a ponta pode ser inútil se a base continuar firme. Prepara a ruptura com peças, calcula capturas e recapturas e pergunta que linhas se abrem. Uma ruptura favorável liberta uma peça, abre uma coluna ou cria uma fraqueza; uma ruptura prematura pode deixar casas fracas e peões isolados.'],
['4. Maiorias e peão passado','Uma maioria numa ala pode criar um peão passado através de avanços e trocas. Conta os peões, mas inclui a posição dos reis e a actividade das peças. Uma maioria distante é valiosa em finais, enquanto no meio-jogo pode ser mais importante abrir uma coluna para as torres. O peão passado não é um objectivo automático: precisa de apoio, e a sua criação não pode permitir que o adversário conquiste actividade decisiva noutra ala.']
],
drills:[
{q:'Tens um peão isolado em d4, mas peças activas e possibilidade de d5. Qual é a prioridade?',opts:['Trocar todas as peças','Usar a actividade e avaliar a ruptura d5','Defender d4 passivamente para sempre'],a:1,why:'O peão isolado pode ser força dinâmica. A ruptura deve ser calculada para libertar peças ou criar iniciativa antes das trocas.'},
{q:'Numa cadeia de peões, qual ponto costuma ser o alvo estrutural mais importante?',opts:['A base que sustenta a cadeia','Sempre o peão mais avançado','O rei adversário, independentemente da posição'],a:0,why:'A base sustenta a cadeia. Se for enfraquecida, os peões avançados podem perder apoio.'}
]},
'Peças Boas e Más':{
intro:'O valor prático de uma peça depende da sua função na estrutura concreta. Um bispo pode ser teoricamente forte, mas ficar bloqueado pelos próprios peões; um cavalo pode parecer lento, mas dominar uma casa central inexpugnável. A comparação correcta não é “bispo contra cavalo” em abstracto. É comparar actividade, mobilidade, alvos, casas disponíveis e facilidade de melhorar cada peça. O plano clássico consiste em melhorar a pior peça própria enquanto se limita a melhor peça adversária.',
chapters:[
['1. Diagnóstico da peça','Pergunta onde a peça pode chegar, que casas controla, que alvos ataca e se pode ser expulsa por peões. Uma peça activa participa em mais de uma função: defende, ataca, controla casas de entrada e apoia rupturas. Uma peça má pode estar bloqueada pela própria estrutura, sem rota ou sem alvo. Não a declares má apenas porque está atrás da cadeia de peões: procura uma rota concreta.'],
['2. Bispo bom e bispo mau','A cor dos peões centrais influencia o bispo. Se os teus peões bloqueiam as casas da mesma cor do teu bispo, a peça pode perder diagonais e mobilidade. Mas a classificação muda se conseguires abrir a posição, trocar peões centrais ou colocar o bispo fora da cadeia. O bispo mau pode ser útil na defesa de uma fraqueza; não o troques automaticamente se a troca entregar casas ou finais favoráveis ao adversário.'],
['3. Cavalo e posto avançado','O cavalo é forte quando ocupa uma casa central protegida por peão e não pode ser expulso por outro peão. Avalia a rota: um cavalo pode precisar de três lances para chegar a uma casa dominante. Antes de iniciar a manobra, verifica se o adversário consegue abrir o centro ou trocar o cavalo no destino. A casa forte só tem valor se a peça puder permanecer e criar ameaças.'],
['4. Melhorar a pior peça','Identifica a peça menos activa e constrói uma rota com casas intermédias seguras. Por vezes, o melhor lance não cria ameaça imediata: melhora a coordenação e prepara uma operação futura. Compara a posição antes e depois da manobra. Se a peça melhorou, mas outra ficou passiva ou o adversário ganhou uma ruptura, o plano falhou.']
],
drills:[
{q:'O teu cavalo está sem casas e o adversário não tem ameaça imediata. O que deves procurar?',opts:['Uma rota de melhoria para a pior peça','Um sacrifício para criar confusão','Uma troca automática de damas'],a:0,why:'A melhoria da pior peça aumenta a coordenação sem criar fraquezas desnecessárias.'},
{q:'Quando é que um cavalo num posto avançado é realmente forte?',opts:['Quando está avançado, mesmo sem apoio','Quando ocupa uma casa protegida e difícil de expulsar','Sempre que está mais perto do rei'],a:1,why:'A estabilidade da casa e a impossibilidade de expulsão são essenciais.'}
]},
'Casas Fracas e Postos Avançados':{
intro:'Uma casa fraca é uma casa que já não pode ser controlada eficazmente pelos peões adversários. O enfraquecimento costuma surgir depois de um avanço de peão, de uma troca ou de uma estrutura fixa. Contudo, reconhecer uma casa fraca não basta: é necessário conseguir ocupá-la, apoiar a peça e impedir que o adversário a expulse ou troque em condições favoráveis.',
chapters:[
['1. Como nasce uma casa fraca','Quando um peão avança, deixa de controlar algumas casas que antes defendia. Uma troca de peões pode deixar uma casa sem peão capaz de a contestar. As casas fracas podem estar no centro, numa ala ou junto do rei. Distingue fraqueza permanente de fraqueza temporária: uma casa só é estratégica se o adversário não puder resolver o problema com uma ruptura ou troca.'],
['2. Criar acesso','A peça precisa de uma rota. Um cavalo pode fazer uma manobra pela retaguarda; um bispo pode precisar de abrir uma diagonal; uma torre pode entrar numa coluna. Remove o defensor da casa ou desvia-o para outra tarefa. Se a peça chegar à casa mas ficar sem apoio, o adversário pode expulsá-la ou trocá-la. O acesso é parte do plano, não um detalhe.'],
['3. Posto avançado','Um posto avançado é uma casa avançada, normalmente na metade adversária, protegida por peão e difícil de contestar com peões. Cavalos são particularmente eficazes porque atacam casas de cores diferentes e podem pressionar vários alvos. A peça deve apoiar operações concretas: atacar peões, controlar rupturas ou apoiar a entrada de torres.'],
['4. Trocas e manutenção','O adversário pode procurar trocar a peça que ocupa a casa. Decide se deves evitar a troca, recapturar com outra peça ou aceitar uma transformação estrutural favorável. Não confundas “manter a peça” com “manter a vantagem”: por vezes a troca cria um final superior.']
],
drills:[
{q:'Um avanço de peão adversário deixou a casa d5 sem controlo por peões. O que falta antes de instalar um cavalo?',opts:['Uma rota segura, apoio e avaliação da expulsão','Avançar todos os peões','Trocar a tua peça mais activa'],a:0,why:'A casa só se torna um posto real quando a peça chega com apoio e não pode ser expulsa facilmente.'},
{q:'O adversário consegue trocar o teu cavalo do posto avançado, mas a recaptura deixa-lhe um peão isolado. Como decides?',opts:['Recusar sempre a troca','Avaliar a estrutura resultante e aceitar se for favorável','Mover o cavalo sem calcular'],a:1,why:'A troca pode transformar uma vantagem de casa numa fraqueza estrutural duradoura.'}
]},
'Colunas Abertas e Diagonais':{
intro:'As linhas abertas são corredores de actividade. Uma coluna aberta não vale por si mesma: o seu valor depende de uma casa de entrada, de alvos e da possibilidade de invadir. As diagonais funcionam de modo semelhante para os bispos. O domínio de uma linha deve ser convertido em pressão, penetração ou concessão estrutural.',
chapters:[
['1. Coluna aberta e semi-aberta','Uma coluna aberta não contém peões; uma semi-aberta não contém peões próprios, mas pode conter peão adversário. Coloca a torre atrás de um peão passado ou numa coluna onde possa pressionar um alvo. Se o adversário contestar a coluna, calcula se a troca de torres te favorece. O controlo da coluna só é útil se a torre conseguir chegar a uma casa de entrada.'],
['2. Duplicação e invasão','Duas torres na mesma coluna podem aumentar a pressão, mas a duplicação deve ter objectivo: entrar na sétima fila, atacar uma fraqueza ou forçar uma concessão. Controla primeiro a casa de entrada. Uma torre que chega à sétima fila pode atacar peões e restringir o rei, mas a invasão deve ser segura e não permitir que a torre fique presa.'],
['3. Diagonais e bispos','O bispo precisa de diagonais abertas, alvos e casas de apoio. Um bispo pode ser forte mesmo sem atacar material, se controlar uma diagonal que limita o rei ou impede uma ruptura. Procura abrir a diagonal com uma troca de peões e evita bloquear o teu próprio bispo sem compensação.'],
['4. Coordenação das linhas','A torre na coluna e o bispo na diagonal podem actuar sobre o mesmo alvo. A coordenação multiplica a pressão. Antes de entrar, verifica se o adversário pode trocar a peça invasora, bloquear a linha ou criar uma ameaça mais forte noutra ala.']
],
drills:[
{q:'Controlas uma coluna aberta, mas não existe casa de entrada nem alvo. Qual é o passo seguinte?',opts:['Procurar criar ou controlar uma casa de entrada','Duplicar torres sem objectivo','Trocar todas as peças'],a:0,why:'O controlo da coluna precisa de ser convertido em invasão ou pressão concreta.'},
{q:'Uma diagonal do teu bispo está bloqueada pelos teus peões. Que plano merece estudo?',opts:['Abrir a diagonal com ruptura calculada','Avançar peões sem calcular','Trocar o bispo automaticamente'],a:0,why:'A ruptura pode libertar o bispo, desde que a estrutura resultante e as linhas abertas sejam favoráveis.'}
]},
'Profilaxia':{
intro:'Profilaxia é antecipar o plano adversário e reduzir a sua eficácia antes de executar o nosso. Não significa jogar com medo nem defender tudo. É escolher um lance que responde a uma ideia concreta do oponente e, idealmente, melhora simultaneamente a nossa posição. A pergunta central é: “Se eu pudesse passar a vez, o que faria o adversário?”.',
chapters:[
['1. Identificar o plano adversário','Procura rupturas, casas de entrada, peças mal colocadas, avanços de peões e trocas que libertem o jogo adversário. Distingue ameaça imediata de plano a longo prazo. Uma ameaça imediata exige cálculo; um plano distante pode ser limitado por uma manobra ou por controlo de casas.'],
['2. Neutralizar sem passividade','Um lance profiláctico forte retira uma possibilidade útil e mantém actividade. Pode controlar uma casa de ruptura, retirar uma peça de uma cravada, proteger um peão que seria alvo ou impedir uma expansão. Se o lance apenas espera e não melhora nada, verifica se não estás a perder tempos.'],
['3. Profilaxia e cálculo','Não basta imaginar o plano adversário: calcula se ele é realmente possível. Um avanço pode parecer ameaçador, mas deixar uma casa fraca ou perder um peão. Por vezes a melhor profilaxia é permitir a ideia e responder tacticamente. A prevenção nunca substitui o cálculo concreto.'],
['4. Exemplo de decisão','Se o adversário prepara ...b5-b4 para expulsar o teu cavalo, considera a4 para limitar a expansão, mas verifica se a casa b4 fica fraca e se o teu próprio flanco não se enfraquece. O valor do lance depende da posição inteira, não do rótulo “profiláctico”.']
],
drills:[
{q:'Antes de executar o teu plano, qual pergunta deve orientar a profilaxia?',opts:['O que faria o adversário se eu passasse a vez?','Como posso jogar o lance mais agressivo?','Qual peça vale mais pontos?'],a:0,why:'A pergunta revela a ideia adversária mais forte e ajuda a escolher uma prevenção concreta.'},
{q:'Um lance impede a ruptura adversária, mas deixa a tua pior peça ainda mais passiva e cria uma fraqueza. É profilaxia boa?',opts:['Sim, porque impede qualquer plano','Não necessariamente; é preciso comparar os custos e benefícios','Sim, porque jogar profilacticamente é sempre correcto'],a:1,why:'Profilaxia não é prevenção a qualquer preço. O lance deve ser avaliado pelos efeitos de toda a posição.'}
]},
'Restrição e Bloqueio':{
intro:'A restrição limita as opções úteis do adversário: reduz mobilidade, controla rupturas e retira casas de entrada. O bloqueio é uma forma concreta de restrição, frequentemente colocando uma peça à frente de um peão passado ou de uma cadeia. O objectivo não é apenas parar um avanço; é transformar a imobilidade adversária em alvos e melhorar as próprias peças.',
chapters:[
['1. Restringir o espaço','Controla casas de avanço, impede rupturas libertadoras e limita as peças adversárias. A restrição é mais eficaz quando as peças do adversário ficam sem casas úteis e os seus peões se tornam alvos fixos. Evita empurrar o adversário para uma posição passiva sem ter um plano de exploração.'],
['2. Bloqueador ideal','Uma peça bloqueadora deve estar protegida, ser difícil de expulsar e manter funções activas. O cavalo costuma ser excelente à frente de peões porque controla casas em redor; uma torre pode bloquear um peão passado e atacar lateralmente. A escolha depende da estrutura e das trocas possíveis.'],
['3. Evitar a libertação','O adversário procurará uma ruptura para libertar as peças. Identifica essa ruptura, aumenta o controlo da casa crítica e calcula as trocas. Se permitires a ruptura no momento certo, a posição pode mudar radicalmente. O bloqueio exige vigilância constante, não é uma tarefa concluída com a primeira peça colocada.'],
['4. Converter a restrição','Quando o adversário está limitado, cria um segundo alvo ou melhora a peça menos activa. Não forces uma ruptura sem preparação. A vantagem estratégica aparece quando o adversário não consegue defender todos os pontos e precisa de conceder uma fraqueza.']
],
drills:[
{q:'Tens um peão passado adversário em d4. O teu cavalo pode bloquear em d5, protegido por peão. Qual é a ideia?',opts:['Impedir o avanço e limitar as peças adversárias','Atacar o rei sem relação com a posição','Trocar o cavalo imediatamente'],a:0,why:'O bloqueio interrompe o avanço e pode transformar o peão passado num alvo fixo.'},
{q:'O adversário prepara uma ruptura que libertará as peças. O que deves fazer?',opts:['Ignorar a ruptura e atacar noutro lado','Controlar a casa crítica e calcular a sequência','Avançar um peão qualquer'],a:1,why:'A restrição só se mantém se a ruptura libertadora for controlada.'}
]},
'Rupturas de Peões':{
intro:'Uma ruptura é um avanço ou troca de peões que altera a estrutura e abre linhas. É um dos momentos mais importantes do meio-jogo: pode libertar um bispo, abrir uma coluna, criar um peão passado ou destruir a base de uma cadeia. A ruptura deve ser preparada e calculada, porque depois das trocas as casas e linhas disponíveis podem mudar para ambos os lados.',
chapters:[
['1. Preparar a ruptura','Conta quantas peças apoiam o avanço e quantas o adversário pode usar para contestá-lo. Melhora as peças que participarão, coloca torres na coluna que pode abrir e verifica se a casa de avanço está protegida. Uma ruptura preparada pode ser forte mesmo que não seja executada imediatamente: a ameaça obriga o adversário a gastar tempos.'],
['2. Calcular as trocas','Calcula capturas, recapturas, lances intermédios e respostas que recusam a troca. Não avalies apenas a estrutura final: considera que peça ganha actividade e que rei fica mais exposto. Uma coluna aberta pode favorecer o adversário se ele já controlar a entrada.'],
['3. Ruptura central e lateral','Rupturas centrais tendem a abrir linhas para várias peças e podem expor os reis. Rupturas laterais procuram espaço, casas fracas ou abertura de uma coluna específica. A escolha depende da localização dos reis, da mobilidade das peças e da estrutura.'],
['4. O momento correcto','Uma ruptura prematura pode deixar peões fracos; uma ruptura tardia pode permitir que o adversário consolide. Procura o momento em que as tuas peças estão preparadas e o adversário tem menos recursos. Depois da ruptura, reavalia a posição: não continues automaticamente com o plano antigo.']
],
drills:[
{q:'A tua ruptura abre a coluna c, mas as torres adversárias já a controlam. O que falta?',opts:['Preparar a disputa da coluna antes da ruptura','Jogar a ruptura porque é sempre boa','Ignorar a actividade adversária'],a:0,why:'A ruptura deve ser avaliada pela posição que cria, incluindo quem controla as linhas abertas.'},
{q:'Depois de uma troca central, o teu bispo ganha uma diagonal e o rei adversário fica no centro. Qual factor pesa?',opts:['A actividade e a abertura de linhas','Apenas o número de peões','A cor do tabuleiro'],a:0,why:'A abertura pode criar vantagem dinâmica. Calcula se a iniciativa compensa qualquer concessão material.'}
]},
'Iniciativa e Tempos':{
intro:'A iniciativa pertence ao lado que consegue impor problemas e obrigar o adversário a responder. Um tempo é uma unidade de desenvolvimento ou de actividade; ganhar um tempo significa melhorar a posição enquanto se cria uma ameaça útil. A iniciativa não é sinónimo de ataque ao rei: pode consistir em pressionar um peão, ocupar uma coluna ou impedir a coordenação adversária.',
chapters:[
['1. Ameaça útil','Uma ameaça útil cria uma concessão: obriga a defender, desloca uma peça, enfraquece uma casa ou permite desenvolver com ganho de tempo. Ameaças sem consequência podem ajudar o adversário a melhorar a posição. Antes de jogar, identifica o que esperas que o adversário faça e o que ganhas com essa resposta.'],
['2. Desenvolvimento com tempo','Lances que desenvolvem uma peça e atacam a dama ou uma fraqueza podem acelerar a mobilização. Mas não persigas a dama sem razão: se a peça desenvolvida ficar mal colocada, o tempo ganho é ilusório. Compara a actividade real depois da sequência.'],
['3. Manter ou abandonar a iniciativa','A iniciativa é muitas vezes temporária. Se não existe continuação concreta, transforma-a numa vantagem duradoura: melhor estrutura, casa forte, actividade ou final favorável. Não sacrifiques material só para manter a aparência de ataque.'],
['4. Defesa activa','O defensor deve procurar lances que respondam à ameaça e melhorem a própria posição. Uma defesa activa pode devolver a iniciativa, trocar a peça atacante ou criar uma ameaça mais forte. Ao calcular, procura a resposta mais resistente, não a mais passiva.']
],
drills:[
{q:'O teu lance cria uma ameaça, mas também desenvolve uma peça para uma casa excelente. Que tipo de ganho procuras?',opts:['Ganho de tempo com melhoria real','Ameaça vazia','Perda de tempo obrigatória'],a:0,why:'A ameaça obriga a resposta enquanto a peça melhora; isso é ganho de tempo efectivo.'},
{q:'A tua iniciativa terminou e não há continuação forçada. Qual decisão é madura?',opts:['Continuar a sacrificar','Converter a actividade numa vantagem estável ou consolidar','Jogar ameaças aleatórias'],a:1,why:'A iniciativa é temporária. Quando termina, é necessário preservar a compensação ou transformar a posição.'}
]},
'Ataque ao Rei':{
intro:'O ataque ao rei exige concentração de forças, linhas abertas e coordenação. A presença de peões avançados junto do rei não basta para justificar um ataque. É preciso comparar atacantes e defensores, identificar os pontos de entrada, eliminar ou desviar defensores e calcular a sequência depois da melhor defesa. Um ataque correcto nasce de condições posicionais e é confirmado pelo cálculo.',
chapters:[
['1. Condições para atacar','Procura superioridade local, peças apontadas ao rei, linhas abertas ou que possam abrir e debilidades no abrigo. Verifica também a segurança do teu próprio rei. Se o centro puder abrir contra ti, um ataque lateral pode ser demasiado lento.'],
['2. Concentração e transferência','Traz peças para a zona crítica por rotas eficientes. A dama sozinha raramente ataca com sucesso. Cavalos, bispos e torres precisam de colaborar. Uma manobra pode parecer lenta, mas ser decisiva se acrescentar um atacante sem permitir contra-jogo.'],
['3. Defensores e pontos de ruptura','Identifica o defensor-chave, a casa de entrada e o peão cuja troca abre uma linha. Às vezes é melhor eliminar um defensor do que avançar mais peões. Calcula sacrifícios apenas quando a continuação é concreta ou quando a compensação posicional é suficiente.'],
['4. Ataque e defesa','A defesa procura trocar damas, fechar linhas, devolver material ou criar contra-ataque. Ao atacar, inclui estas possibilidades no cálculo. Se o ataque não for decisivo, pergunta se a posição resultante ainda é favorável; não confundas uma combinação bonita com uma decisão correcta.']
],
drills:[
{q:'Tens apenas dama e um cavalo perto do rei, enquanto as restantes peças estão longe. O que falta?',opts:['Concentrar mais forças e abrir linhas com preparação','Sacrificar imediatamente','Avançar todos os peões'],a:0,why:'O ataque precisa de coordenação e superioridade local; poucas peças não conseguem manter ameaças.'},
{q:'O adversário pode trocar damas e neutralizar o ataque. O que tens de avaliar?',opts:['A posição resultante após a troca','Apenas a primeira ameaça','Se o sacrifício parece bonito'],a:0,why:'A melhor defesa deve ser incluída no cálculo. Se a troca de damas deixa uma posição inferior, o ataque não está justificado.'}
]},
'Sacrifício Posicional':{
intro:'Um sacrifício posicional entrega material em troca de compensação que pode ser duradoura: actividade, casas fortes, estrutura favorável, iniciativa, controlo de linhas ou rei adversário vulnerável. Diferente de uma combinação forçada de mate, a compensação pode não ser imediata. Por isso, exige avaliação profunda e plano concreto para impedir que o adversário consolide o material extra.',
chapters:[
['1. Identificar a compensação','Antes de sacrificar, nomeia o que recebes. Um peão pode comprar uma coluna aberta, um cavalo dominante, um atraso de desenvolvimento ou uma estrutura de peões muito fraca. “Tenho actividade” é demasiado vago: indica que peças estão activas, que alvos existem e como vais manter essa actividade.'],
['2. Compensação dinâmica e estática','A compensação dinâmica depende de iniciativa, desenvolvimento e rei exposto; pode desaparecer se o adversário trocar peças. A compensação estática pode consistir em peões fracos, casas fortes ou estrutura danificada. Se a compensação é dinâmica, age com precisão e evita simplificações. Se é estática, mantém pressão e prepara alvos.'],
['3. Testar a defesa','O adversário pode devolver material, trocar a peça atacante, fechar linhas ou consolidar. Calcula estas opções. Um sacrifício é duvidoso se o adversário consegue devolver uma parte do material e chegar a um final sem fraquezas. Procura a defesa mais simples, não apenas a resposta que mantém o ataque.'],
['4. Gestão depois do sacrifício','Depois de entregar material, evita lances sem propósito. Mantém a coordenação, cria ameaças concretas e decide quando a compensação deve ser convertida em recuperação material ou ataque. Se a iniciativa se esgota, reavalia com honestidade: não persistas por orgulho no sacrifício.']
],
drills:[
{q:'Queres sacrificar um peão por actividade. Qual pergunta deve ter resposta antes de jogar?',opts:['Que compensação concreta recebo e como a mantenho?','O sacrifício parece espectacular?','Posso recuperar o peão em qualquer momento?'],a:0,why:'O sacrifício precisa de compensação identificável e de um plano para a preservar.'},
{q:'O adversário pode trocar as peças activas e ficar com o peão extra. O que fazer?',opts:['Calcular se existe alternativa que mantenha a compensação','Ignorar a troca','Sacrificar mais material automaticamente'],a:0,why:'A simplificação pode eliminar a compensação dinâmica. É uma defesa crítica que deve ser calculada.'}
]},
'Cálculo e Lances Candidatos':{
intro:'O cálculo de variantes é um processo disciplinado: primeiro compreende a posição, depois gera candidatos, calcula respostas críticas e avalia posições finais. Calcular sem seleccionar candidatos gera árvores enormes e confusas. Seleccionar sem calcular leva a planos superficiais. O objectivo é encontrar a decisão mais forte contra a melhor defesa do adversário.',
chapters:[
['1. Leitura antes do cálculo','Verifica xeques, capturas e ameaças para ambos os lados. Identifica peças penduradas, ameaças de mate, cravadas, alinhamentos e rupturas. Depois avalia o contexto estratégico: que peça está mal colocada, que estrutura pode mudar e que lado tem iniciativa. Esta leitura reduz o número de candidatos relevantes.'],
['2. Gerar candidatos','Escolhe dois ou três lances que tenham uma justificação. Inclui lances tácticos quando existem motivos concretos e lances posicionais quando a posição exige melhoria ou prevenção. Não incluas dez lances só porque são legais. Para cada candidato, pergunta qual é a resposta mais forte do adversário.'],
['3. Calcular com rigor','Calcula a variante forçada até uma posição relativamente estável. Em cada ramo, alterna a perspectiva: depois do teu lance, procura a melhor defesa; depois da defesa, procura a continuação mais forte. Evita parar porque encontraste uma linha agradável. Verifica xeques intermédios, recapturas e recursos silenciosos.'],
['4. Avaliar a posição final','Quando termina a sequência, avalia material, segurança dos reis, actividade, estrutura e iniciativa. Não declares uma variante boa só porque ganhaste um peão se ficaste com rei exposto e peças passivas. Compara as posições finais dos candidatos e escolhe a que oferece melhor equilíbrio entre resultado e risco.'],
['5. Gestão do tempo','Em partida prática, não podes calcular tudo. Investe mais tempo em posições críticas: quando a estrutura muda, há sacrifícios, o rei fica exposto ou existe uma decisão irreversível. Usa uma verificação final: o que ameaça o adversário, que peça fica sem defesa e existe um lance intermédio?']
],
drills:[
{q:'Encontraste um candidato atractivo. Qual é o passo seguinte?',opts:['Procurar a resposta mais forte do adversário','Assumir que o adversário fará a resposta natural','Jogar sem calcular'],a:0,why:'A qualidade de uma variante depende de resistir à melhor defesa, não à resposta mais cómoda.'},
{q:'Uma variante ganha um peão mas termina com o teu rei exposto e peças descoordenadas. Como avalias?',opts:['Como vantagem automática por ganhar peão','Comparando todos os factores da posição final','Sem considerar o rei'],a:1,why:'A avaliação final inclui material, segurança do rei, actividade, estrutura e iniciativa.'}
]},
'Conversão da Vantagem':{
intro:'Converter uma vantagem é transformar um elemento favorável numa posição ganha ou tecnicamente superior sem oferecer contra-jogo desnecessário. O processo costuma ser gradual: identifica a vantagem, neutraliza a actividade adversária, melhora as peças, fixa uma fraqueza, cria um segundo alvo e escolhe a transformação favorável. A pressa é um dos maiores aliados do defensor.',
chapters:[
['1. Reconhecer o tipo de vantagem','Vantagem material pede segurança e simplificação selectiva; vantagem de espaço pede manobras e restrição; vantagem estrutural pede pressão sobre alvos; vantagem de actividade pede acção antes que o adversário consolide. O plano correcto depende do tipo de vantagem e da possibilidade de o adversário criar contra-jogo.'],
['2. Neutralizar contra-jogo','Antes de atacar o alvo, identifica a única ruptura ou linha que pode dar actividade ao adversário. Controla essa possibilidade. Uma vantagem grande pode desaparecer se permitires um peão passado, um ataque ao rei ou a entrada de uma torre. A prevenção torna a conversão muito mais simples.'],
['3. Criar um segundo alvo','Se atacas uma fraqueza com três peças e o adversário a defende com três, não há progresso. Cria um segundo alvo noutra ala ou força uma concessão. O defensor terá de dividir as forças. A manobra e a mudança de frente são frequentemente mais fortes do que aumentar a pressão no mesmo ponto.'],
['4. Trocas e finais','Troca peças quando a posição resultante é favorável, não por reflexo. Com vantagem material, trocar peças mantendo peões pode ser bom; com vantagem de espaço, trocar peças pode aliviar o adversário. Calcula finais básicos e considera a actividade do rei, peões passados e estrutura.'],
['5. Técnica e paciência','Não permitas contrajogo por querer ganhar imediatamente. Melhora a pior peça, fixa alvos, restringe o rei adversário e avança apenas quando as consequências são favoráveis. Se a posição muda, reavalia: converter vantagem é um processo contínuo, não uma sequência automática.']
],
drills:[
{q:'Tens vantagem material, mas o adversário tem uma ruptura que pode activar as torres. Qual é a prioridade?',opts:['Neutralizar o contra-jogo antes de simplificar','Atacar um peão qualquer','Trocar todas as peças sem calcular'],a:0,why:'A vantagem só é convertida se o adversário não conseguir actividade suficiente para criar problemas.'},
{q:'O adversário defende um peão fraco com todas as peças. Como criar progresso?',opts:['Criar um segundo alvo noutra ala','Atacar o mesmo peão com uma peça a mais sem plano','Permitir uma ruptura libertadora'],a:0,why:'O segundo alvo divide os defensores e pode obrigar a concessões.'}
]}
};

const exercisePrinciples = {
'Avaliação por Desequilíbrios':[
['As Brancas têm um peão isolado em d4, mas as peças estão activas e o adversário ainda não rocou.','Priorizar actividade e iniciativa enquanto o rei adversário permanece no centro.','A fraqueza estrutural é duradoura, mas a actividade pode ser decisiva no curto prazo.'],
['Um lado tem bispo mau bloqueado pelos próprios peões e o outro tem um cavalo forte.','Abrir a estrutura ou trocar o bloqueador para activar o bispo, se o cálculo permitir.','A qualidade da peça depende da estrutura; a transformação dos peões pode alterar o valor do bispo.'],
['Há igualdade material, mas uma torre adversária domina a única coluna aberta.','Disputar a coluna e impedir a entrada na sétima fila antes de criar um ataque lateral.','A actividade das torres e as casas de invasão podem pesar mais do que uma igualdade material.'],
['O adversário tem peões dobrados fixos numa ala e não possui ruptura libertadora.','Fixar os peões como alvos e melhorar as peças antes de os atacar.','Uma fraqueza fixa pode ser explorada com paciência e coordenação.'],
['Tens espaço, mas o adversário prepara uma ruptura central que libertará as suas peças.','Neutralizar ou controlar a ruptura antes de expandir ainda mais.','O espaço só é vantagem se não permitir ao adversário libertar-se com tempo.']],
'Estruturas de Peões':[
['A cadeia adversária aponta para a ala de rei e a sua base está em d6.','Pressionar a base com peças e preparar a ruptura adequada, em vez de atacar apenas a ponta.','A base sustenta a cadeia; pressioná-la pode obrigar concessões.'],
['Tens um peão isolado em d4 com desenvolvimento rápido e linhas abertas.','Usar a actividade e as casas centrais antes que o adversário bloqueie e ataque o peão.','O peão isolado pode ser fraqueza estática e, ao mesmo tempo, fonte de espaço e actividade.'],
['O adversário possui peões dobrados na coluna c, mas controla a casa c4.','Avaliar se a troca abre uma coluna útil ou entrega uma casa forte antes de atacar os peões.','Peões dobrados não são automaticamente fracos; as casas e linhas resultantes importam.'],
['Tens maioria de peões na ala de dama num final com reis activos.','Criar um peão passado com apoio do rei e impedir o contra-jogo na outra ala.','A maioria só se transforma se o rei e as peças apoiarem o avanço.'],
['Um avanço de peão criou um peão atrasado em coluna semi-aberta.','Fixar o peão e ocupar a coluna com torres, sem permitir a ruptura libertadora.','O peão atrasado torna-se alvo quando não pode avançar com segurança.']],
'Peças Boas e Más':[
['O teu bispo está preso atrás de peões da mesma cor e o cavalo adversário ocupa uma casa central.','Melhorar o bispo através de uma ruptura ou trocar a peça que o bloqueia.','A estrutura limita a peça; mudar a estrutura ou trocar o bloqueador é a solução temática.'],
['A tua pior peça não participa e tens um alvo que ainda pode esperar.','Reencaminhar a pior peça para uma casa activa antes de iniciar a operação.','A melhoria da peça menos activa aumenta a coordenação global.'],
['O adversário oferece trocar o teu cavalo activo pelo seu bispo mau.','Recusar ou calcular a troca, preservando a peça que domina casas importantes.','Trocas devem ser avaliadas pelo papel concreto das peças, não pelo valor nominal.'],
['Uma torre está activa na sétima fila, mas a outra permanece passiva.','Coordenar as torres e criar uma segunda via de entrada.','Uma peça activa isolada pode perder força se não houver coordenação.'],
['O cavalo não tem casas de entrada porque os peões adversários controlam os postos avançados.','Preparar uma troca ou ruptura que retire o controlo dessas casas.','A mobilidade depende das casas disponíveis e do controlo de peões.']],
'Casas Fracas e Postos Avançados':[
['O avanço ...f5 deixou a casa e5 sem controlo de peões.','Preparar a ocupação de e5 por uma peça apoiada, sobretudo um cavalo.','A casa só é explorável se houver rota de acesso e estabilidade.'],
['Um cavalo chegou a d6, mas não tem apoio e pode ser trocado imediatamente.','Consolidar o posto avançado com apoio ou preparar uma recaptura favorável.','Uma casa forte ocupada não basta: a peça precisa de permanecer útil.'],
['O defensor da casa fraca é a única peça activa do adversário.','Considerar a troca ou desvio desse defensor antes de ocupar a casa.','Eliminar o defensor torna a ocupação mais duradoura.'],
['A casa fraca existe, mas uma coluna fechada impede a entrada das tuas peças.','Criar uma ruptura ou manobra que abra uma rota de acesso.','A fraqueza potencial só se converte em vantagem com acesso concreto.'],
['O adversário prepara uma troca de cavalos que eliminaria o teu ocupante do posto.','Calcular a recaptura e preservar a peça apenas se a troca não resolver a fraqueza adversária.','O valor do posto depende da peça, da recaptura e da posição resultante.']],
'Colunas Abertas e Diagonais':[
['A tua torre ocupa uma coluna aberta, mas não existe casa de entrada.','Controlar uma casa de invasão e aumentar a pressão sobre um alvo concreto.','A coluna é um meio de acesso; sem entrada ou alvo, a ocupação pode ser inútil.'],
['As duas torres podem dobrar numa coluna semi-aberta contra um peão atrasado.','Dobrar as torres e aumentar a pressão até obrigar uma concessão.','A concentração de forças transforma controlo de coluna em ameaça real.'],
['O bispo aponta para o rei, mas a diagonal está bloqueada por um peão próprio.','Preparar a libertação da diagonal com uma ruptura calculada.','A actividade do bispo depende da abertura da sua diagonal.'],
['O adversário controla a única coluna aberta e ameaça entrar na sétima fila.','Disputar a coluna ou bloquear a casa de entrada antes de procurar contrajogo.','A prevenção da invasão é prioritária quando a entrada cria ameaças concretas.'],
['Uma troca de peões abrirá uma diagonal para o teu bispo, mas também para a dama adversária.','Calcular quem beneficia mais da abertura antes de executar a troca.','Abrir linhas favorece as peças que já estão melhor colocadas e coordenadas.']],
'Profilaxia':[
['O adversário prepara ...c5 para libertar o seu bispo e activar a torre.','Controlar ou tornar desfavorável a ruptura antes de iniciar o teu plano.','A profilaxia identifica o recurso libertador mais importante.'],
['O teu adversário ameaça instalar um cavalo numa casa forte.','Impedir a ocupação ou preparar a troca do cavalo antes que se consolide.','Retirar uma casa útil pode ser mais forte do que uma ameaça imediata.'],
['Tens um ataque na ala de rei, mas o adversário ameaça abrir o centro contra o teu rei.','Resolver a segurança do centro antes de avançar os peões do roque.','Um ataque lateral perde força se o centro abrir contra o próprio rei.'],
['O adversário não tem ameaça táctica, mas pretende dobrar torres numa coluna.','Antecipar a ocupação da coluna e disputar a casa de entrada.','A profilaxia também neutraliza melhorias posicionais, não apenas ameaças directas.'],
['Um lance defensivo impede a ruptura adversária e melhora simultaneamente a tua peça pior colocada.','Preferir esse lance útil de dupla função.','Os melhores lances profilácticos limitam o plano contrário e melhoram a própria posição.']],
'Restrição e Bloqueio':[
['Um peão passado adversário está prestes a avançar e a tua peça pode bloquear à frente dele.','Colocar um bloqueador estável, apoiado por peões ou peças.','O bloqueio impede o avanço e transforma o peão passado num alvo.'],
['O adversário depende da ruptura ...f5 para libertar as peças.','Controlar f5 e retirar apoio à ruptura.','A restrição eficaz limita a principal fonte de actividade adversária.'],
['Uma peça adversária está sem casas úteis, mas não existe alvo para atacar.','Criar uma segunda fraqueza ou melhorar a tua pior peça antes de forçar.','A restrição precisa de um objectivo concreto para se converter em progresso.'],
['O teu bloqueador pode ser trocado pelo bispo adversário, libertando o peão passado.','Evitar a troca ou garantir que a recaptura mantém o bloqueio.','A peça bloqueadora tem uma função estratégica que deve ser preservada.'],
['O adversário tem pouco espaço e procura trocas para aliviar a posição.','Manter peças quando a superioridade de espaço permite restringir e manobrar.','Trocas podem aliviar a falta de espaço; a decisão depende da estrutura.']],
'Rupturas de Peões':[
['A ruptura ...c5 abre a coluna c, onde o adversário já tem uma torre activa.','Calcular se a abertura beneficia o adversário antes de avançar.','Uma ruptura deve ser avaliada pelas linhas e casas que oferece aos dois lados.'],
['A tua cadeia está bloqueada e a ruptura na base exige preparação.','Aumentar a pressão sobre a base e coordenar peças antes de executar.','A ruptura prematura pode deixar peões fracos ou perder material.'],
['Depois de uma troca central, o teu bispo ganha uma diagonal e o rei adversário fica no centro.','Considerar a ruptura se a abertura favorecer o desenvolvimento e a iniciativa.','A abertura de linhas é especialmente valiosa quando as peças estão prontas.'],
['Uma ruptura cria um peão passado, mas deixa a tua retaguarda com casas fracas.','Comparar o valor do peão passado com as fraquezas permanentes que ficam.','A transformação estrutural tem custos e benefícios que devem ser pesados.'],
['Tens atacantes e defensores iguais no ponto de ruptura.','Adicionar apoio ou criar uma sobrecarga antes de trocar.','A ruptura deve funcionar tacticamente e deixar uma estrutura favorável.']],
'Iniciativa e Tempos':[
['O adversário precisa de dois lances para completar o desenvolvimento e o teu rei está seguro.','Abrir o centro ou criar ameaças enquanto a vantagem de desenvolvimento existe.','A iniciativa é temporária; deve ser usada antes de desaparecer.'],
['Tens uma sequência de xeques que não melhora a posição e permite ao rei fugir.','Interromper os xeques improdutivos e escolher uma ameaça que ganhe tempo ou melhore peças.','Nem todo o xeque mantém a iniciativa; a ameaça deve produzir progresso.'],
['A tua dama é atacada, mas podes responder com uma ameaça mais forte ao rei.','Calcular a ameaça intermédia e comparar com a retirada simples da dama.','Um lance intermédio pode preservar a iniciativa se for forçado e correcto.'],
['O adversário está a consolidar uma peça extra e oferece troca de damas.','Avaliar se a troca elimina a compensação dinâmica antes de aceitar.','A simplificação pode extinguir a iniciativa e tornar a vantagem material decisiva.'],
['Uma ameaça obriga o adversário a defender, mas deixa a tua peça sem apoio.','Verificar a resposta mais forte e a segurança da peça antes de manter a pressão.','A iniciativa não justifica deixar material pendurado sem compensação concreta.']],
'Ataque ao Rei':[
['O rei adversário está no centro e tu tens vantagem de desenvolvimento.','Abrir linhas com cálculo concreto antes que o adversário consiga rocar.','O rei no centro é vulnerável sobretudo quando as linhas podem abrir rapidamente.'],
['Tens três peças perto do rei, mas a tua dama ainda está longe.','Trazer a dama ou outra peça atacante e coordenar forças antes de sacrificar.','Um ataque precisa de número suficiente de peças e linhas de acesso.'],
['O teu peão de g avançou e deixou casas fracas junto do teu próprio rei.','Verificar se o ataque compensa o enfraquecimento e manter uma defesa contra contra-ataque.','Atacar não pode ignorar a segurança do próprio rei.'],
['O adversário tem uma peça defensora essencial na casa f8.','Considerar desviar, trocar ou sobrecarregar essa peça antes de abrir linhas.','Eliminar o defensor crítico aumenta a eficácia do ataque.'],
['A combinação parece ganhar material, mas permite uma troca de damas que neutraliza o ataque.','Calcular a troca de damas como recurso defensivo prioritário.','A defesa mais forte pode ser simplificar e retirar as peças atacantes.']],
'Sacrifício Posicional':[
['Podes entregar um peão para instalar um cavalo permanente numa casa forte.','Calcular se o posto é estável e se a actividade compensa o peão.','A compensação posicional deve ser duradoura e demonstrável.'],
['O sacrifício abre uma coluna para as tuas torres, mas o adversário pode trocar uma torre.','Verificar se a actividade restante continua suficiente após a troca.','A compensação deve sobreviver às melhores tentativas de simplificação.'],
['Entregas qualidade para eliminar o bispo defensor e dominar casas escuras.','Avaliar as casas, a segurança dos reis e a coordenação após a captura.','O valor posicional depende da estrutura resultante e não apenas do material entregue.'],
['O sacrifício dá iniciativa por dois lances, mas não há continuação clara.','Não sacrificar sem uma sequência concreta ou compensação estável identificável.','A actividade momentânea pode desaparecer e deixar apenas o défice material.'],
['O adversário pode devolver material para neutralizar a tua pressão.','Calcular a devolução e avaliar se a vantagem posicional permanece.','O adversário não é obrigado a conservar o material ganho; a compensação precisa de resistir.']],
'Cálculo e Lances Candidatos':[
['Encontras um xeque atractivo, mas o rei adversário tem uma casa de fuga e ganha tempo sobre a tua dama.','Calcular todas as respostas legais e verificar a posição final, não apenas o xeque.','A sequência forçada deve ser analisada até uma posição estável.'],
['Tens três candidatos: captura, xeque e melhoria de peça.','Ordenar os candidatos por força concreta e calcular primeiro as respostas críticas.','A selecção reduz a árvore de cálculo sem ignorar recursos tácticos.'],
['A tua variante ganha um peão, mas deixa uma peça pendurada no lance seguinte.','Continuar o cálculo até verificar ameaças, recapturas e lances intermédios.','Uma variante não termina quando se ganha material; termina quando a posição está avaliada.'],
['O adversário tem uma resposta silenciosa que ameaça mate e ataca a tua dama.','Procurar recursos não forçados do adversário em cada posição intermédia.','O cálculo correcto inclui defesas silenciosas, não apenas xeques e capturas.'],
['Tens pouco tempo e a posição contém uma decisão irreversível sobre o rei.','Concentrar o tempo nos lances críticos e fazer uma verificação final de ameaças.','A gestão do tempo deve acompanhar o grau de risco e irreversibilidade.']],
'Conversão da Vantagem':[
['Tens peça a mais, mas o adversário tem um peão passado perigoso.','Bloquear o peão e neutralizar o contra-jogo antes de simplificar.','A vantagem material não se converte enquanto existir ameaça concreta de promoção.'],
['O adversário defende o único peão fraco com todas as peças.','Criar um segundo alvo noutra ala para dividir os defensores.','A mudança de frente força concessões quando um alvo está bem defendido.'],
['Tens vantagem de espaço e o adversário propõe trocar dois pares de peças.','Avaliar se as trocas aliviam a posição e preservam a tua vantagem.','Trocar peças nem sempre é bom; a vantagem de espaço pode depender de manter opções.'],
['A tua posição é superior, mas não existe ganho táctico imediato.','Melhorar a pior peça, restringir o adversário e aumentar a pressão gradualmente.','A técnica exige progresso sem permitir contra-jogo.'],
['Podes entrar num final com peões a mais, mas o rei adversário está muito activo.','Calcular o final e a actividade dos reis antes de aceitar a transição.','A conversão depende da posição final, não da troca em si.']]
};
const exerciseTasks = [
'Diagnóstico: identifica o factor estratégico que deve orientar a decisão.',
'Escolha do plano: selecciona a continuação mais coerente com a posição descrita.',
'Resposta adversária: determina o recurso que deves antecipar antes de agir.',
'Decisão de troca: avalia a transformação da posição antes de simplificar.',
'Momento crítico: decide se deves agir imediatamente ou preparar melhor a operação.',
'Detecção do erro: identifica a tentação estratégica que deve ser evitada.',
'Comparação: escolhe a opção que melhora a coordenação das tuas peças.',
'Plano alternativo: encontra a solução quando o plano principal é neutralizado.',
'Verificação concreta: indica o elemento que precisa de ser calculado antes do lance.',
'Justificação: selecciona o princípio que explica a decisão correcta.'
];
const exerciseWrong = [
'Executar o plano automaticamente, sem verificar a resposta mais forte do adversário.',
'Fazer um avanço ou uma troca apenas porque parece activo, ignorando a posição resultante.'
];
function buildExerciseBank(name){
 const principles=exercisePrinciples[name]||[];
 const bank=[];
 principles.forEach((p,pi)=>exerciseTasks.forEach((task,ti)=>{
  const q=task+' Situação '+(pi+1)+': '+p[0];
  const opts=ti%3===0?[p[1],exerciseWrong[0],exerciseWrong[1]]:ti%3===1?[exerciseWrong[1],p[1],exerciseWrong[0]]:[exerciseWrong[0],exerciseWrong[1],p[1]];
  bank.push({q,opts,a:ti%3===0?0:ti%3===1?1:2,why:p[2]+' '+p[1]});
 }));
 return bank;
}
Object.keys(exercisePrinciples).forEach(name=>{deepLessons[name].exerciseBank=buildExerciseBank(name);});

const levels=[{id:'base',label:'1200–1500',name:'Base'},{id:'intermediate',label:'1500–1800',name:'Intermédio'},{id:'advanced',label:'1800–2000',name:'Avançado'}];
const freeTopics=new Set(['Centro','Desenvolvimento','Segurança do Rei','Peças Boas e Más','Casas Fracas e Postos Avançados','Profilaxia','Oposição','Casas-Chave','Finais de Torres']);
const state={topic:null,level:'base',tab:'theory',completed:new Set(),fullAccess:false,exercisePage:0};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function topicId(mid,name){return mid+'-'+name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function findTopic(id){for(const m of modules){const i=m.topics.findIndex(([n])=>topicId(m.id,n)===id);if(i>=0)return {module:m,index:i,name:m.topics[i][0],description:m.topics[i][1],id};}return null}
function renderModules(){
 const root=$('curriculumModules');if(!root)return;
 const lockedTopics=modules.reduce((n,m)=>n+m.topics.filter(([name])=>!freeTopics.has(name)).length,0);
 root.innerHTML=modules.map(m=>'<section class="curriculum-module"><div class="curriculum-module-head"><div><span class="mini-label">MÓDULO '+m.number+'</span><h3>'+m.name+'</h3><p>'+m.subtitle+'</p></div><span class="module-count">'+m.topics.filter(([name])=>freeTopics.has(name)||state.fullAccess).length+' ABERTAS · '+m.topics.filter(([name])=>!freeTopics.has(name)&&!state.fullAccess).length+' EXCLUSIVAS</span></div><div class="curriculum-folder-grid">'+m.topics.map(([name,desc],i)=>{const open=state.fullAccess||freeTopics.has(name);return '<button type="button" class="curriculum-folder '+(open?'is-open':'is-locked')+'" data-topic="'+topicId(m.id,name)+'"><span class="folder-icon">'+(open?'♟':'🔒')+'</span><span class="folder-copy"><b>'+m.number+'.'+(i+1)+' · '+esc(name)+'</b><small>'+esc(desc)+'</small></span><span class="folder-status">'+(open?'ABRIR ↗':'DESBLOQUEIO COMPLETO')+'</span></button>';}).join('')+'</div></section>').join('')+
 '<section class="full-access-card"><div><span class="mini-label">PROGRAMA COMPLETO LBA</span><h3>Desbloqueia todas as aulas exclusivas</h3><p>Recebe acesso às '+lockedTopics+' aulas exclusivas dos módulos de Aberturas, Meio-Jogo e Finais.</p><strong>+2.000 Kz</strong> <small>sobre o Premium activo</small></div><button class="btn btn-red" id="requestFullAccess" type="button">Solicitar acesso completo</button><p id="fullAccessMessage" class="full-access-message" role="status">O desbloqueio é confirmado pela administração após validação do pagamento.</p></section>';
 root.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{const t=findTopic(b.dataset.topic);if(!t)return;if(!state.fullAccess&&!freeTopics.has(t.name)){const msg=$('fullAccessMessage');if(msg){msg.textContent='Esta aula é exclusiva do Programa Completo. O desbloqueio custa mais 2.000 Kz.';msg.scrollIntoView({behavior:'smooth',block:'center'});}return;}openTopic(t.id);}));
 $('requestFullAccess')?.addEventListener('click',()=>{const msg=$('fullAccessMessage');msg.textContent='Para desbloquear, solicita à administração da LBA a confirmação do pagamento adicional de 2.000 Kz. A área será liberada na tua conta após validação.';});
}
function openTopic(id){const t=findTopic(id);if(!t)return;state.topic=t;state.level='base';state.tab='theory';state.exercisePage=0;$('curriculumModules').hidden=true;$('classroomView').hidden=false;$('classroomTitle').textContent=t.name;$('classroomModule').textContent='MÓDULO '+t.module.number+' · '+t.module.name;$('classroomDescription').textContent=t.description;renderClassroom();$('classroomView').scrollIntoView({behavior:'smooth',block:'start'});}
function renderClassroom(){
 const t=state.topic,lesson=lessons[t.name]||{idea:t.description,points:[],plan:'Identifica o elemento estratégico principal e constrói um plano coerente.',mistakes:'Jogar sem avaliar a resposta adversária.',checklist:'Que mudou na posição? Qual é a ameaça?'};const level=levels.find(x=>x.id===state.level);const done=state.completed.has(t.id+'-'+state.level);
 $('classroomLevels').innerHTML=levels.map(l=>'<button type="button" class="level-chip '+(state.level===l.id?'active':'')+'" data-level="'+l.id+'">'+l.label+'<small>'+l.name+'</small></button>').join('');
 $('classroomLevels').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;renderClassroom()});
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.onclick=()=>{state.tab=b.dataset.tab;renderClassroom()}});
 $('classroomProgress').textContent=done?'100% concluído':'Aula em curso';$('classroomProgressFill').style.width=done?'100%':'25%';
 let html='';
 if(state.tab==='theory'){const deep=deepLessons[t.name];html='<article class="classroom-lesson"><span class="mini-label">AULA COMPLETA · TEORIA + APLICAÇÃO · '+level.label+'</span><h3>'+esc(t.name)+': estudo aprofundado</h3><p class="lesson-lead">'+esc(deep?.intro||lesson.idea)+'</p>'+(deep?.chapters||[]).map(ch=>'<section class="lesson-chapter"><h4>'+esc(ch[0])+'</h4><p>'+esc(ch[1])+'</p></section>').join('')+'<section class="lesson-concept"><h4>Método prático do treinador LBA</h4><p>'+esc(lesson.plan)+'</p><ul>'+lesson.points.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section><section class="lesson-mistakes"><h4>Erros que deves evitar</h4><p>'+esc(lesson.mistakes)+'</p></section><section class="gold-rule"><b>CHECKLIST ANTES DE JOGAR</b><p>'+esc(lesson.checklist)+'</p></section><section class="lesson-drills"><span class="mini-label">TREINO IMEDIATO · RESPONDE E RECEBE EXPLICAÇÃO</span><h4>Testa a tua compreensão</h4>'+(deep?.exerciseBank||deep?.drills||[]).slice(state.exercisePage*10,state.exercisePage*10+10).map((d,i)=>'<div class="lesson-drill" data-drill="'+i+'"><p><b>Exercício '+(state.exercisePage*10+i+1)+' / '+(deep?.exerciseBank?.length||deep?.drills?.length||0)+'.</b> '+esc(d.q)+'</p><div class="quiz-options">'+d.opts.map((o,j)=>'<button type="button" class="quiz-option" data-drill-answer="'+j+'">'+esc(o)+'</button>').join('')+'</div><div class="board-feedback" data-drill-feedback hidden></div></div>').join('')+'<div class="exercise-pagination"><span>Página '+(state.exercisePage+1)+' de '+Math.ceil((deep?.exerciseBank?.length||deep?.drills?.length||0)/10)+' · 10 exercícios por página</span><button type="button" class="btn btn-outline" id="exercisePrev" '+(state.exercisePage===0?'disabled':'')+'>Anterior</button><button type="button" class="btn btn-red" id="exerciseNext" '+(state.exercisePage>=Math.ceil((deep?.exerciseBank?.length||deep?.drills?.length||0)/10)-1?'disabled':'')+'>Próximos 10</button></div></section><section class="lesson-recipe"><h4>Bibliografia de estudo</h4><ul>'+(readingRefs[t.name]||['Max Euwe e H. Kramer — The Middlegame']).map(book=>'<li>'+esc(book)+'</li>').join('')+'</ul><p class="content-note">Aula original da Academia LBA, construída a partir de conceitos estratégicos estudados nestas obras. Não reproduz texto ou exercícios protegidos.</p></section></article>';}
 if(state.tab==='practice'){const puzzle=puzzles[t.name];html=puzzle?'<article class="classroom-lesson"><span class="mini-label">PRÁTICA · TABULEIRO INTERACTIVO</span><h3>Encontra o lance da posição</h3><p>Selecciona uma peça e depois a casa de destino. O tabuleiro verifica se encontraste o lance-chave desta posição.</p><div class="practice-layout"><div id="lessonBoard" class="classroom-board" aria-label="Tabuleiro de xadrez interactivo"></div><div><div class="board-feedback" id="lessonFeedback">Lê a pista e joga no tabuleiro.</div><p id="lessonHint" class="content-note">'+esc(puzzle.hint)+'</p><button class="btn btn-outline" id="resetPuzzle" type="button">Recomeçar posição</button></div></div></article>':'<article class="classroom-lesson"><span class="mini-label">PRÁTICA · DECISÃO ESTRATÉGICA</span><h3>Treino de pensamento</h3><p>Aplica o método da aula a uma posição de uma das tuas partidas recentes.</p><div class="lesson-concept"><h4>Exercício</h4><ol><li>Regista os factores relevantes da posição.</li><li>Escreve dois ou três lances candidatos.</li><li>Indica a melhor resposta adversária para cada candidato.</li><li>Compara as posições finais e justifica a tua escolha.</li></ol></div><div class="gold-rule"><b>REGRA LBA</b><p>Uma resposta só está completa quando explicas o plano e a principal ideia defensiva do adversário.</p></div></article>';}
 if(state.tab==='games')html='<article class="classroom-lesson"><span class="mini-label">PARTIDA COMENTADA · REPRODUÇÃO LANCE A LANCE</span><h3>'+esc(modelGame.title)+'</h3><p class="content-note">'+esc(modelGame.note)+'</p><div class="game-replay"><div id="gameReplayBoard" class="classroom-board"></div><div class="game-replay-head"><strong id="gameMoveLabel">Posição inicial</strong><span id="gameMoveCount">0 / '+modelGame.moves.length+'</span></div><p id="gameComment" class="board-feedback">Começa por observar o controlo central.</p><div class="practice-controls"><button class="btn btn-outline" id="gamePrev" type="button">← Anterior</button><button class="btn btn-red" id="gameNext" type="button">Próximo lance →</button></div></div></article>';
 if(state.tab==='test'){const bank=deepLessons[t.name]?.exerciseBank||deepLessons[t.name]?.drills||[];const page=bank.slice(state.exercisePage*10,state.exercisePage*10+10);html='<article class="classroom-lesson"><span class="mini-label">AVALIAÇÃO · BANCO DE EXERCÍCIOS</span><h3>Verifica o teu domínio de '+esc(t.name)+'</h3><p>Responde às questões e lê a explicação de cada solução. Esta avaliação usa o mesmo banco de exercícios, sem perguntas genéricas.</p><div class="lesson-drills">'+page.map((d,i)=>'<div class="lesson-drill" data-test-drill="'+i+'"><p><b>Questão '+(state.exercisePage*10+i+1)+' / '+bank.length+'.</b> '+esc(d.q)+'</p><div class="quiz-options">'+d.opts.map((o,j)=>'<button type="button" class="quiz-option" data-test-answer="'+j+'">'+esc(o)+'</button>').join('')+'</div><div class="board-feedback" data-test-feedback hidden></div></div>').join('')+'</div><div class="exercise-pagination"><span>Avaliação · Página '+(state.exercisePage+1)+' de '+Math.ceil(bank.length/10)+'</span><button type="button" class="btn btn-outline" id="testPrev" '+(state.exercisePage===0?'disabled':'')+'>Anterior</button><button type="button" class="btn btn-red" id="testNext" '+(state.exercisePage>=Math.ceil(bank.length/10)-1?'disabled':'')+'>Próximas 10</button></div><button class="btn btn-outline" id="markTopicDone" type="button" '+(done?'disabled':'')+'>'+(done?'Aula concluída ✓':'Marcar aula como estudada')+'</button></article>';}
 $('classroomPanel').innerHTML=html;
 if(state.tab==='theory'){const bank=deepLessons[t.name]?.exerciseBank||deepLessons[t.name]?.drills||[];$('classroomPanel').querySelectorAll('[data-drill]').forEach(card=>{const index=state.exercisePage*10+Number(card.dataset.drill),drill=bank[index];card.querySelectorAll('[data-drill-answer]').forEach(btn=>btn.onclick=()=>{const chosen=Number(btn.dataset.drillAnswer),feedback=card.querySelector('[data-drill-feedback]'),correct=chosen===drill.a;feedback.hidden=false;feedback.className='board-feedback '+(correct?'success':'error');feedback.textContent=(correct?'Correcto. ':'Ainda não. ')+drill.why;card.querySelectorAll('[data-drill-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.drillAnswer)===drill.a)b.classList.add('correct-answer');});});});$('exercisePrev')?.addEventListener('click',()=>{state.exercisePage=Math.max(0,state.exercisePage-1);renderClassroom()});$('exerciseNext')?.addEventListener('click',()=>{state.exercisePage=Math.min(Math.ceil(bank.length/10)-1,state.exercisePage+1);renderClassroom()});}
 if(state.tab==='practice'&&puzzles[t.name])initPuzzle(t.name);
 if(state.tab==='games')initReplay();
 if(state.tab==='test'){const bank=deepLessons[t.name]?.exerciseBank||deepLessons[t.name]?.drills||[];$('classroomPanel').querySelectorAll('[data-test-drill]').forEach(card=>{const index=state.exercisePage*10+Number(card.dataset.testDrill),drill=bank[index];card.querySelectorAll('[data-test-answer]').forEach(btn=>btn.onclick=()=>{const chosen=Number(btn.dataset.testAnswer),feedback=card.querySelector('[data-test-feedback]'),correct=chosen===drill.a;feedback.hidden=false;feedback.className='board-feedback '+(correct?'success':'error');feedback.textContent=(correct?'Correcto. ':'Resposta incorrecta. ')+drill.why;card.querySelectorAll('[data-test-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.testAnswer)===drill.a)b.classList.add('correct-answer');});});});$('testPrev')?.addEventListener('click',()=>{state.exercisePage=Math.max(0,state.exercisePage-1);renderClassroom()});$('testNext')?.addEventListener('click',()=>{state.exercisePage=Math.min(Math.ceil(bank.length/10)-1,state.exercisePage+1);renderClassroom()});}
 $('markTopicDone')?.addEventListener('click',()=>{state.completed.add(t.id+'-'+state.level);window.dispatchEvent(new CustomEvent('lba:lesson-completed',{detail:{lessonId:t.id+'-'+state.level,topic:t.name,level:state.level}}));renderClassroom()});
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
