import { Chess } from "chess.js";

export type CategoriaLance =
  | "BRILLIANCY"
  | "GREAT_MOVE"
  | "BOOK"
  | "EXCELLENT"
  | "GOOD"
  | "INACCURACY"
  | "MISTAKE"
  | "BLUNDER";

export interface LanceAnalisado {
  numeroLance: number;
  vezDeJogar: "w" | "b";
  san: string;
  fenAntes: string;
  fenDepois: string;
  /** Avaliações em centipawns, sempre normalizadas para a perspectiva das Brancas. */
  evalAntes: number | null;
  evalDepois: number | null;
  categoria: CategoriaLance | null;
  explicacao: string;
  /** Perda estimada para o jogador que efectuou o lance, em centipawns. */
  perdaCp: number | null;
}

export interface EstadoModoRecomeco {
  ativo: boolean;
  indicePosicaoCritica: number;
  tentativasFalhadas: number;
  fenOriginal: string;
  melhorLinhaSolucao: string[];
}

export interface OpcoesClassificacao {
  /** Verdadeiro apenas quando uma fonte externa confirmou que o lance é teoria. */
  constaNaTeoria?: boolean;
  /** Verdadeiro apenas quando existe uma avaliação explícita de brilhantismo/novidade. */
  brilhanteConfirmado?: boolean;
  /** UCI do melhor lance calculado na posição anterior. */
  melhorLanceUci?: string;
}

const CP_IMPRECISAO = 50;
const CP_ERRO = 100;
const CP_ERRO_GRAVE = 250;

export class MotorDeAnalisePremium {
  private chess: Chess = new Chess();
  private historicoAnalise: LanceAnalisado[] = [];
  private indiceAtual = -1;
  private modoRecomeco: EstadoModoRecomeco = this.reiniciarEstadoRecomeco();

  /**
   * Recebe avaliações pós-lance em centipawns, sempre do ponto de vista das Brancas.
   * A primeira posição usa +30 cp como referência inicial, conforme a especificação LBA.
   * Se faltar uma avaliação, o lance fica sem classificação em vez de receber uma nota fictícia.
   */
  public carregarPartidaComAnalise(
    historicoLances: string[],
    avaliacoesEngine: Array<number | null | undefined>,
    opcoesPorLance: Array<OpcoesClassificacao | undefined> = []
  ): LanceAnalisado[] {
    this.chess = new Chess();
    this.historicoAnalise = [];
    this.modoRecomeco = this.reiniciarEstadoRecomeco();
    let evalAnterior: number | null = 30;

    for (let i = 0; i < historicoLances.length; i++) {
      const fenAntes = this.chess.fen();
      const vezDeJogar = this.chess.turn();
      const numeroLance = Math.floor(i / 2) + 1;
      const lanceRecebido = historicoLances[i];

      let jogada;
      try {
        jogada = this.chess.move(lanceRecebido);
      } catch {
        throw new Error(`Erro de integridade do PGN no lance ${numeroLance}: ${lanceRecebido}`);
      }
      if (!jogada) {
        throw new Error(`Lance inválido no lance ${numeroLance}: ${lanceRecebido}`);
      }

      const fenDepois = this.chess.fen();
      const valor = avaliacoesEngine[i];
      const evalDepois = typeof valor === "number" && Number.isFinite(valor) ? valor : null;
      const avaliacaoAnteriorValida = evalAnterior !== null && evalDepois !== null;
      const perdaCp = avaliacaoAnteriorValida
        ? Math.max(0, vezDeJogar === "w" ? evalAnterior! - evalDepois! : evalDepois! - evalAnterior!)
        : null;
      const opcoes = opcoesPorLance[i] || {};
      const lanceUci = jogada.from + jogada.to + (jogada.promotion || "");
      const categoria = perdaCp === null
        ? null
        : this.calcularCategoria(perdaCp, {
            ...opcoes,
            melhorLanceUci: opcoes.melhorLanceUci
          }, lanceUci);
      const explicacao = categoria
        ? this.gerarTextoPedagogico(categoria, jogada.san, perdaCp!)
        : "Avaliação insuficiente para classificar este lance com rigor. Analisa novamente esta posição com a engine.";

      this.historicoAnalise.push({
        numeroLance,
        vezDeJogar,
        san: jogada.san,
        fenAntes,
        fenDepois,
        evalAntes: evalAnterior,
        evalDepois,
        categoria,
        explicacao,
        perdaCp
      });
      evalAnterior = evalDepois;
    }

    this.indiceAtual = this.historicoAnalise.length - 1;
    return this.obterHistorico();
  }

  /** Perda medida na perspectiva do jogador que acabou de mover. */
  private calcularCategoria(
    perdaCp: number,
    opcoes: OpcoesClassificacao,
    lanceUci: string
  ): CategoriaLance {
    if (opcoes.constaNaTeoria) return "BOOK";
    if (opcoes.brilhanteConfirmado) return "BRILLIANCY";
    if (opcoes.melhorLanceUci && opcoes.melhorLanceUci.toLowerCase() === lanceUci.toLowerCase()) return "GREAT_MOVE";
    if (perdaCp >= CP_ERRO_GRAVE) return "BLUNDER";
    if (perdaCp >= CP_ERRO) return "MISTAKE";
    if (perdaCp >= CP_IMPRECISAO) return "INACCURACY";
    if (perdaCp <= 15) return "GOOD";
    return "EXCELLENT";
  }

  private gerarTextoPedagogico(categoria: CategoriaLance, san: string, perdaCp: number): string {
    const textos: Record<CategoriaLance, string> = {
      BRILLIANCY: `Lance excepcional: ${san}. A engine ou a curadoria confirmou um recurso de elevado valor. Estuda a ideia e as alternativas.`,
      GREAT_MOVE: `Muito bem jogado: ${san}. O lance coincide com a melhor escolha identificada pela análise. Compreende o motivo táctico ou estratégico.`,
      BOOK: `Teoria de abertura confirmada para ${san}. Compara a posição alcançada com os planos típicos da variante.`,
      EXCELLENT: `Boa precisão: ${san}. A perda estimada foi pequena. Procura identificar o plano que mantém a qualidade da posição.`,
      GOOD: `Lance sólido: ${san}. A avaliação manteve-se próxima do valor anterior.`,
      INACCURACY: `Imprecisão: ${san}. A posição perdeu cerca de ${(perdaCp / 100).toFixed(2)} peões na avaliação. Revê ameaças, peças desprotegidas e alternativas.`,
      MISTAKE: `Erro: ${san}. A perda estimada foi de ${(perdaCp / 100).toFixed(2)} peões. Compara o lance jogado com os candidatos da engine.`,
      BLUNDER: `Erro grave: ${san}. A avaliação caiu cerca de ${(perdaCp / 100).toFixed(2)} peões. Volta à posição anterior e procura uma defesa ou continuação melhor.`
    };
    return textos[categoria];
  }

  /**
   * Dispara o modo de recomeço apenas para erros classificados com avaliações válidas.
   * A linha de solução deve ser fornecida pela engine, já na ordem de jogo.
   */
  public verificarEDispararRecomeco(
    indiceLance: number,
    linhasDeSucessoComputador: string[]
  ): EstadoModoRecomeco | null {
    const lance = this.historicoAnalise[indiceLance];
    if (!lance) return null;

    if (lance.categoria === "BLUNDER" || lance.categoria === "MISTAKE") {
      this.modoRecomeco = {
        ativo: true,
        indicePosicaoCritica: indiceLance,
        tentativasFalhadas: 0,
        fenOriginal: lance.fenAntes,
        melhorLinhaSolucao: [...linhasDeSucessoComputador]
      };
      return { ...this.modoRecomeco, melhorLinhaSolucao: [...this.modoRecomeco.melhorLinhaSolucao] };
    }

    this.modoRecomeco = this.reiniciarEstadoRecomeco();
    return null;
  }

  /** Valida SAN ou UCI legal na FEN crítica; não compara apenas texto recebido. */
  public testarPalpiteAluno(lanceSanAluno: string): { resolvido: boolean; feedback: string } {
    if (!this.modoRecomeco.ativo) {
      return { resolvido: false, feedback: "O modo de tentativa não está activo." };
    }
    const esperado = this.modoRecomeco.melhorLinhaSolucao[0];
    if (!esperado) {
      return { resolvido: false, feedback: "A linha de solução ainda não foi carregada pela engine." };
    }

    const sanEsperado = this.normalizarLance(this.modoRecomeco.fenOriginal, esperado);
    const sanAluno = this.normalizarLance(this.modoRecomeco.fenOriginal, lanceSanAluno);
    if (!sanEsperado || !sanAluno) {
      this.modoRecomeco.tentativasFalhadas += 1;
      return {
        resolvido: false,
        feedback: `Lance ilegal ou não reconhecido nesta posição. Tentativas: ${this.modoRecomeco.tentativasFalhadas}.`
      };
    }

    if (sanAluno === sanEsperado) {
      this.modoRecomeco = this.reiniciarEstadoRecomeco();
      return {
        resolvido: true,
        feedback: `Excelente! Encontraste ${sanEsperado}, o primeiro lance da linha principal fornecida pela engine.`
      };
    }

    this.modoRecomeco.tentativasFalhadas += 1;
    return {
      resolvido: false,
      feedback: `Lance legal, mas diferente da primeira jogada da linha principal. Tentativas: ${this.modoRecomeco.tentativasFalhadas}. Investiga ameaças e actividade das peças.`
    };
  }

  private normalizarLance(fen: string, lance: string): string | null {
    const game = new Chess(fen);
    const input = String(lance || "").trim();
    if (!input) return null;
    try {
      const jogada = /^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(input)
        ? game.move({
            from: input.slice(0, 2).toLowerCase(),
            to: input.slice(2, 4).toLowerCase(),
            promotion: input[4]?.toLowerCase()
          })
        : game.move(input);
      return jogada?.san || null;
    } catch {
      return null;
    }
  }

  private reiniciarEstadoRecomeco(): EstadoModoRecomeco {
    return {
      ativo: false,
      indicePosicaoCritica: -1,
      tentativasFalhadas: 0,
      fenOriginal: "",
      melhorLinhaSolucao: []
    };
  }

  public avancarLance(): string | null {
    if (this.indiceAtual < this.historicoAnalise.length - 1) {
      this.indiceAtual++;
      return this.historicoAnalise[this.indiceAtual].fenDepois;
    }
    return null;
  }

  public recuarLance(): string | null {
    if (this.indiceAtual >= 0) {
      const fen = this.historicoAnalise[this.indiceAtual].fenAntes;
      this.indiceAtual--;
      return fen;
    }
    return null;
  }

  public obterLanceAtual(): LanceAnalisado | null {
    const lance = this.historicoAnalise[this.indiceAtual];
    return lance ? { ...lance } : null;
  }

  public obterHistorico(): LanceAnalisado[] {
    return this.historicoAnalise.map(lance => ({ ...lance }));
  }

  public obterEstadoRecomeco(): EstadoModoRecomeco {
    return { ...this.modoRecomeco, melhorLinhaSolucao: [...this.modoRecomeco.melhorLinhaSolucao] };
  }

  public obterPosicaoAtual(): string {
    if (this.indiceAtual < 0) return this.historicoAnalise[0]?.fenAntes || new Chess().fen();
    return this.historicoAnalise[this.indiceAtual]?.fenDepois || new Chess().fen();
  }
}
