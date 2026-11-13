import { Chess } from "https://esm.sh/chess.js@1.4.0";

const CP_IMPRECISAO = 50;
const CP_ERRO = 100;
const CP_ERRO_GRAVE = 250;

/**
 * Versão JavaScript executável no navegador da fonte TypeScript
 * premium-engine/AnalisePartidaMotor.ts.
 * Todas as avaliações recebidas estão na perspectiva das Brancas.
 */
export class MotorDeAnalisePremium {
  chess = new Chess();
  historicoAnalise = [];
  indiceAtual = -1;
  modoRecomeco = this.reiniciarEstadoRecomeco();

  carregarPartidaComAnalise(historicoLances, avaliacoesEngine, opcoesPorLance = [], avaliacaoInicialCp = null) {
    this.chess = new Chess();
    this.historicoAnalise = [];
    this.modoRecomeco = this.reiniciarEstadoRecomeco();
    let evalAnterior = Number.isFinite(avaliacaoInicialCp) ? avaliacaoInicialCp : null;

    for (let i = 0; i < historicoLances.length; i++) {
      const fenAntes = this.chess.fen();
      const vezDeJogar = this.chess.turn();
      const numeroLance = Math.floor(i / 2) + 1;
      let jogada;
      try { jogada = this.chess.move(historicoLances[i]); }
      catch { throw new Error(`Erro de integridade do PGN no lance ${numeroLance}: ${historicoLances[i]}`); }
      if (!jogada) throw new Error(`Lance inválido no lance ${numeroLance}: ${historicoLances[i]}`);

      const fenDepois = this.chess.fen();
      const valor = avaliacoesEngine[i];
      const evalDepois = Number.isFinite(valor) ? valor : null;
      const perdaCp = evalAnterior !== null && evalDepois !== null
        ? Math.max(0, vezDeJogar === "w" ? evalAnterior - evalDepois : evalDepois - evalAnterior)
        : null;
      const opcoes = opcoesPorLance[i] || {};
      const lanceUci = jogada.from + jogada.to + (jogada.promotion || "");
      const categoria = perdaCp === null ? null : this.calcularCategoria(perdaCp, opcoes, lanceUci);
      const explicacao = categoria
        ? this.gerarTextoPedagogico(categoria, jogada.san, perdaCp)
        : "Avaliação insuficiente para classificar este lance com rigor. Analisa novamente esta posição com a engine.";

      this.historicoAnalise.push({
        numeroLance, vezDeJogar, san: jogada.san, fenAntes, fenDepois,
        evalAntes: evalAnterior, evalDepois, categoria, explicacao, perdaCp
      });
      evalAnterior = evalDepois;
    }
    this.indiceAtual = this.historicoAnalise.length - 1;
    return this.obterHistorico();
  }

  calcularCategoria(perdaCp, opcoes, lanceUci) {
    if (opcoes.constaNaTeoria) return "BOOK";
    if (opcoes.brilhanteConfirmado) return "BRILLIANCY";
    if (opcoes.melhorLanceUci && opcoes.melhorLanceUci.toLowerCase() === lanceUci.toLowerCase()) return "GREAT_MOVE";
    if (perdaCp >= CP_ERRO_GRAVE) return "BLUNDER";
    if (perdaCp >= CP_ERRO) return "MISTAKE";
    if (perdaCp >= CP_IMPRECISAO) return "INACCURACY";
    if (perdaCp <= 15) return "GOOD";
    return "EXCELLENT";
  }

  gerarTextoPedagogico(categoria, san, perdaCp) {
    const textos = {
      BRILLIANCY: `Lance excepcional: ${san}. A análise confirmou um recurso de elevado valor. Estuda a ideia e as alternativas.`,
      GREAT_MOVE: `Muito bem jogado: ${san}. Encontraste o melhor lance indicado pela engine nesta posição.`,
      BOOK: `Teoria de abertura confirmada para ${san}. Compara a posição com os planos típicos da variante.`,
      EXCELLENT: `Boa precisão: ${san}. A perda estimada foi pequena; procura identificar o plano que mantém a qualidade da posição.`,
      GOOD: `Lance sólido: ${san}. A avaliação manteve-se próxima do valor anterior.`,
      INACCURACY: `Imprecisão: ${san}. A posição perdeu cerca de ${(perdaCp / 100).toFixed(2)} peões na avaliação. Revê ameaças e alternativas.`,
      MISTAKE: `Erro: ${san}. A perda estimada foi de ${(perdaCp / 100).toFixed(2)} peões. Compara o lance com os candidatos da engine.`,
      BLUNDER: `Erro grave: ${san}. A avaliação caiu cerca de ${(perdaCp / 100).toFixed(2)} peões. Volta à posição anterior e procura uma continuação melhor.`
    };
    return textos[categoria];
  }

  verificarEDispararRecomeco(indiceLance, linhasDeSucessoComputador) {
    const lance = this.historicoAnalise[indiceLance];
    if (!lance) return null;
    if (lance.categoria === "BLUNDER" || lance.categoria === "MISTAKE") {
      this.modoRecomeco = {
        ativo: true, indicePosicaoCritica: indiceLance, tentativasFalhadas: 0,
        fenOriginal: lance.fenAntes, melhorLinhaSolucao: [...(linhasDeSucessoComputador || [])]
      };
      return this.obterEstadoRecomeco();
    }
    this.modoRecomeco = this.reiniciarEstadoRecomeco();
    return null;
  }

  testarPalpiteAluno(lanceSanAluno) {
    if (!this.modoRecomeco.ativo) return { resolvido: false, feedback: "O modo de tentativa não está activo." };
    const esperado = this.modoRecomeco.melhorLinhaSolucao[0];
    if (!esperado) return { resolvido: false, feedback: "A linha de solução ainda não foi carregada pela engine." };
    const sanEsperado = this.normalizarLance(this.modoRecomeco.fenOriginal, esperado);
    const sanAluno = this.normalizarLance(this.modoRecomeco.fenOriginal, lanceSanAluno);
    if (!sanEsperado || !sanAluno) {
      this.modoRecomeco.tentativasFalhadas++;
      return { resolvido: false, feedback: `Lance ilegal ou não reconhecido. Tentativas: ${this.modoRecomeco.tentativasFalhadas}.` };
    }
    if (sanAluno === sanEsperado) {
      this.modoRecomeco = this.reiniciarEstadoRecomeco();
      return { resolvido: true, feedback: `Excelente! Encontraste ${sanEsperado}, o primeiro lance da linha principal da engine.` };
    }
    this.modoRecomeco.tentativasFalhadas++;
    return { resolvido: false, feedback: `Lance legal, mas diferente do primeiro lance da linha principal. Tentativas: ${this.modoRecomeco.tentativasFalhadas}. Revê as ameaças e a actividade das peças.` };
  }

  normalizarLance(fen, lance) {
    const game = new Chess(fen), input = String(lance || "").trim();
    if (!input) return null;
    try {
      const move = /^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(input)
        ? game.move({ from: input.slice(0,2).toLowerCase(), to: input.slice(2,4).toLowerCase(), promotion: input[4]?.toLowerCase() })
        : game.move(input);
      return move?.san || null;
    } catch { return null; }
  }

  reiniciarEstadoRecomeco() {
    return { ativo: false, indicePosicaoCritica: -1, tentativasFalhadas: 0, fenOriginal: "", melhorLinhaSolucao: [] };
  }
  avancarLance() {
    if (this.indiceAtual < this.historicoAnalise.length - 1) {
      this.indiceAtual++;
      return this.historicoAnalise[this.indiceAtual].fenDepois;
    }
    return null;
  }
  recuarLance() {
    if (this.indiceAtual >= 0) {
      const fen = this.historicoAnalise[this.indiceAtual].fenAntes;
      this.indiceAtual--;
      return fen;
    }
    return null;
  }
  obterLanceAtual() {
    const lance = this.historicoAnalise[this.indiceAtual];
    return lance ? { ...lance } : null;
  }
  obterHistorico() { return this.historicoAnalise.map(lance => ({ ...lance })); }
  obterEstadoRecomeco() {
    return { ...this.modoRecomeco, melhorLinhaSolucao: [...this.modoRecomeco.melhorLinhaSolucao] };
  }
  obterPosicaoAtual() {
    if (this.indiceAtual < 0) return this.historicoAnalise[0]?.fenAntes || new Chess().fen();
    return this.historicoAnalise[this.indiceAtual]?.fenDepois || new Chess().fen();
  }
}
