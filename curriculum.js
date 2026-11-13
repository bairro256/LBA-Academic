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

const levels=[{id:'base',label:'1200–1500',name:'Base'},{id:'intermediate',label:'1500–1800',name:'Intermédio'},{id:'advanced',label:'1800–2000',name:'Avançado'}];
const freeTopics=new Set(['Centro','Desenvolvimento','Segurança do Rei','Peças Boas e Más','Casas Fracas e Postos Avançados','Profilaxia','Oposição','Casas-Chave','Finais de Torres']);
const state={topic:null,level:'base',tab:'theory',completed:new Set(),fullAccess:false};
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
function openTopic(id){const t=findTopic(id);if(!t)return;state.topic=t;state.level='base';state.tab='theory';$('curriculumModules').hidden=true;$('classroomView').hidden=false;$('classroomTitle').textContent=t.name;$('classroomModule').textContent='MÓDULO '+t.module.number+' · '+t.module.name;$('classroomDescription').textContent=t.description;renderClassroom();$('classroomView').scrollIntoView({behavior:'smooth',block:'start'});}
function renderClassroom(){
 const t=state.topic,lesson=lessons[t.name]||{idea:t.description,points:[],plan:'Identifica o elemento estratégico principal e constrói um plano coerente.',mistakes:'Jogar sem avaliar a resposta adversária.',checklist:'Que mudou na posição? Qual é a ameaça?'};const level=levels.find(x=>x.id===state.level);const done=state.completed.has(t.id+'-'+state.level);
 $('classroomLevels').innerHTML=levels.map(l=>'<button type="button" class="level-chip '+(state.level===l.id?'active':'')+'" data-level="'+l.id+'">'+l.label+'<small>'+l.name+'</small></button>').join('');
 $('classroomLevels').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;renderClassroom()});
 $('classroomTabs').querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.onclick=()=>{state.tab=b.dataset.tab;renderClassroom()}});
 $('classroomProgress').textContent=done?'100% concluído':'Aula em curso';$('classroomProgressFill').style.width=done?'100%':'25%';
 let html='';
 if(state.tab==='theory')html='<article class="classroom-lesson"><span class="mini-label">TEORIA · '+level.label+'</span><h3>'+esc(t.name)+': compreender antes de jogar</h3><p>'+esc(lesson.idea)+'</p><div class="lesson-concept"><h4>Princípios essenciais</h4><ul>'+lesson.points.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="lesson-recipe"><h4>Plano de pensamento</h4><p>'+esc(lesson.plan)+'</p></div><div class="lesson-mistakes"><h4>Erros frequentes</h4><p>'+esc(lesson.mistakes)+'</p></div><div class="gold-rule"><b>CHECKLIST DO TREINADOR</b><p>'+esc(lesson.checklist)+'</p></div><p class="content-note">No nível '+level.name+', explica sempre o motivo do lance e calcula pelo menos uma resposta do adversário.</p></article>';
 if(state.tab==='practice'){const puzzle=puzzles[t.name];html=puzzle?'<article class="classroom-lesson"><span class="mini-label">PRÁTICA · TABULEIRO INTERACTIVO</span><h3>Encontra o lance da posição</h3><p>Selecciona uma peça e depois a casa de destino. O tabuleiro verifica se encontraste o lance-chave desta posição.</p><div class="practice-layout"><div id="lessonBoard" class="classroom-board" aria-label="Tabuleiro de xadrez interactivo"></div><div><div class="board-feedback" id="lessonFeedback">Lê a pista e joga no tabuleiro.</div><p id="lessonHint" class="content-note">'+esc(puzzle.hint)+'</p><button class="btn btn-outline" id="resetPuzzle" type="button">Recomeçar posição</button></div></div></article>':'<article class="classroom-lesson"><span class="mini-label">PRÁTICA · DECISÃO ESTRATÉGICA</span><h3>Treino de pensamento</h3><p>Aplica o método da aula a uma posição de uma das tuas partidas recentes.</p><div class="lesson-concept"><h4>Exercício</h4><ol><li>Regista os factores relevantes da posição.</li><li>Escreve dois ou três lances candidatos.</li><li>Indica a melhor resposta adversária para cada candidato.</li><li>Compara as posições finais e justifica a tua escolha.</li></ol></div><div class="gold-rule"><b>REGRA LBA</b><p>Uma resposta só está completa quando explicas o plano e a principal ideia defensiva do adversário.</p></div></article>';}
 if(state.tab==='games')html='<article class="classroom-lesson"><span class="mini-label">PARTIDA COMENTADA · REPRODUÇÃO LANCE A LANCE</span><h3>'+esc(modelGame.title)+'</h3><p class="content-note">'+esc(modelGame.note)+'</p><div class="game-replay"><div id="gameReplayBoard" class="classroom-board"></div><div class="game-replay-head"><strong id="gameMoveLabel">Posição inicial</strong><span id="gameMoveCount">0 / '+modelGame.moves.length+'</span></div><p id="gameComment" class="board-feedback">Começa por observar o controlo central.</p><div class="practice-controls"><button class="btn btn-outline" id="gamePrev" type="button">← Anterior</button><button class="btn btn-red" id="gameNext" type="button">Próximo lance →</button></div></div></article>';
 if(state.tab==='test')html='<article class="classroom-lesson"><span class="mini-label">VERIFICAÇÃO DE APRENDIZAGEM</span><h3>Explica a tua decisão</h3><p>'+esc(lesson.checklist)+'</p><div class="quiz-question"><h4>Qual é a primeira pergunta que deves fazer nesta aula?</h4><div class="quiz-options"><button class="quiz-option" data-answer="bad">Qual peça posso sacrificar imediatamente?</button><button class="quiz-option" data-answer="good">Que elemento da posição determina o plano?</button><button class="quiz-option" data-answer="bad">Como posso avançar todos os peões?</button></div><div id="quizFeedback" class="board-feedback" hidden></div></div><button class="btn btn-outline" id="markTopicDone" type="button" '+(done?'disabled':'')+'>'+(done?'Aula concluída ✓':'Marcar aula como estudada')+'</button></article>';
 $('classroomPanel').innerHTML=html;
 if(state.tab==='practice'&&puzzles[t.name])initPuzzle(t.name);
 if(state.tab==='games')initReplay();
 if(state.tab==='test'){$('classroomPanel').querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{const good=b.dataset.answer==='good';$('quizFeedback').hidden=false;$('quizFeedback').className='board-feedback '+(good?'success':'error');$('quizFeedback').textContent=good?'Correcto. Primeiro compreende a posição; depois escolhe o plano.':'Ainda não. Começa por avaliar a posição antes de procurar um lance espectacular.';});}
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
