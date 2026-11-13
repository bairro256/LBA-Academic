/**
 * Banco de conteúdos do Livro Vivo Premium LBA.
 * Textos didácticos originais e posições de estudo em formato FEN.
 */
export const BANCO_LIVROS_PREMIUM = [
  {
    livroId: 'meu_primeiro_livro_premium',
    capituloNumero: 1,
    titulo: 'Capítulo 1: O Centro e o Desenvolvimento',
    elementos: [
      { tipo: 'texto', payload: 'Por desenvolvimento entende-se a saída sistemática das peças para casas activas. Na abertura, cada tempo é valioso: evita mover repetidamente a mesma peça sem necessidade e procura desenvolver, disputar o centro e preparar a segurança do rei.' },
      { tipo: 'texto', payload: "Observa a ocupação central. As Brancas iniciam com <span class='chess-move-link' data-index='1'>1.e4</span>, controlando d5 e f5. As Pretas respondem com <span class='chess-move-link' data-index='2'>1...e5</span>, disputando o centro de forma directa." },
      { tipo: 'texto', payload: "O desenvolvimento continua com <span class='chess-move-link' data-index='3'>2.Cf3</span>, atacando o peão e5, e <span class='chess-move-link' data-index='4'>2...Cc6</span>, defendendo-o e reforçando o controlo central." },
      { tipo: 'desafio_interativo', fenBase: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', lancesCorretos: ['Bc4', 'Bb5'], vezDeJogar: 'w', instrucao: 'Desenvolve o bispo para uma casa activa. Joga 3.Bb5 (Espanhola) ou 3.Bc4 (Italiana) directamente no tabuleiro.' }
    ],
    historicoFens: [
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
      'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
      'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
      'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'
    ]
  },
  {
    livroId: 'meu_primeiro_livro_premium',
    capituloNumero: 2,
    titulo: 'Capítulo 2: A Cadeia de Peões e a Profilaxia',
    elementos: [
      { tipo: 'texto', payload: 'Um peão passado pode tornar-se uma ameaça decisiva, mas a sua força depende do apoio das próprias peças e da capacidade de limitar a contra-ofensiva adversária. Antes de avançar, identifica os pontos vulneráveis da estrutura.' },
      { tipo: 'texto', payload: "Na estrutura da Defesa Francesa, as Brancas constroem o centro com <span class='chess-move-link' data-index='1'>1.e4 e6</span> e <span class='chess-move-link' data-index='2'>2.d4 d5</span>. A tensão central define os planos de ambos os lados." },
      { tipo: 'texto', payload: "As Brancas fecham o centro com <span class='chess-move-link' data-index='3'>3.e5</span>. As Pretas atacam a base da cadeia com <span class='chess-move-link' data-index='4'>3...c5</span>. Repara na relação entre a base d4 e a ponta e5." },
      { tipo: 'desafio_interativo', fenBase: 'rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4', lancesCorretos: ['c3'], vezDeJogar: 'w', instrucao: 'A base da cadeia em d4 precisa de apoio. Joga 4.c3 para sustentar o centro e preparar uma estrutura mais sólida.' }
    ],
    historicoFens: [
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      'rnbqkbnr/ppp1pppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
      'rnbqkbnr/ppp2ppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
      'rnbqkbnr/ppp2ppp/8/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
      'rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4'
    ]
  },
  {
    livroId: 'meu_primeiro_livro_premium',
    capituloNumero: 3,
    titulo: 'Capítulo 3: O Elemento do Bloqueio',
    elementos: [
      { tipo: 'texto', payload: 'Bloquear é restringir a mobilidade de um peão passado ou de uma peça inimiga, ocupando uma casa à sua frente. O bloqueador deve permanecer protegido e impedir que o avanço adversário ganhe força.' },
      { tipo: 'texto', payload: 'Nesta posição de estudo, o peão preto em d5 está isolado. O cavalo branco pode procurar uma casa de bloqueio estável. Observa a casa d4: colocada ali, a peça impede o avanço imediato do peão.' },
      { tipo: 'desafio_interativo', fenBase: '4k3/8/8/3p4/8/5N2/8/4K3 w - - 0 1', lancesCorretos: ['Nd4'], vezDeJogar: 'w', instrucao: 'Aplica o princípio do bloqueio: joga 1.Cd4, colocando o cavalo directamente à frente do peão isolado de d5.' }
    ],
    historicoFens: [
      '4k3/8/8/3p4/8/8/8/4K3 w - - 0 1',
      '4k3/8/8/3p4/8/5N2/8/4K3 w - - 0 1'
    ]
  }
];
