import { Chess } from 'chess.js';
import { BANCO_LIVROS_PREMIUM } from './CapitulosDados.js';

const errors = [];
for (const chapter of BANCO_LIVROS_PREMIUM) {
  for (const [index, fen] of (chapter.historicoFens || []).entries()) {
    try { new Chess(fen); }
    catch (error) { errors.push('Capítulo ' + chapter.capituloNumero + ', FEN histórico ' + index + ': ' + error.message); }
  }
  for (const block of (chapter.elementos || []).filter(item => item.tipo === 'desafio_interativo')) {
    try {
      const game = new Chess(block.fenBase);
      if (game.turn() !== block.vezDeJogar) errors.push('Capítulo ' + chapter.capituloNumero + ': vez de jogar não corresponde ao FEN.');
      for (const san of block.lancesCorretos || []) {
        const attempt = new Chess(block.fenBase);
        try { attempt.move(san); }
        catch (error) { errors.push('Capítulo ' + chapter.capituloNumero + ': lance correcto ' + san + ' é ilegal (' + error.message + ').'); }
      }
    } catch (error) {
      errors.push('Capítulo ' + chapter.capituloNumero + ', FEN do desafio: ' + error.message);
    }
  }
}
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log('Livro Vivo validado: ' + BANCO_LIVROS_PREMIUM.length + ' capítulos, FENs válidos e soluções legais.');
}
