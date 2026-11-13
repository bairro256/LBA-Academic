export type Side = "w" | "b";
export type MoveLabel = "brilliant" | "good" | "inaccuracy" | "mistake" | "blunder";
export interface EvaluatedMove { ply: number; san: string; evalBeforeCp: number; evalAfterCp: number; side: Side; bestMoveUci?: string; pv?: string[] }
export interface MoveAssessment { label: MoveLabel; lossCp: number; explanation: string; retry: boolean }

/** Scores are always normalized to White's perspective before comparing a player's move. */
export function assessMove(move: EvaluatedMove): MoveAssessment {
  const whiteDelta = move.evalAfterCp - move.evalBeforeCp;
  const playerDelta = move.side === "w" ? whiteDelta : -whiteDelta;
  const lossCp = Math.max(0, -playerDelta);
  if (lossCp >= 250) return { label: "blunder", lossCp, explanation: "Este lance perdeu uma parte decisiva da avaliação. Encontra uma alternativa antes de veres a solução.", retry: true };
  if (lossCp >= 100) return { label: "mistake", lossCp, explanation: "A posição piorou de forma significativa. Compara os lances candidatos.", retry: true };
  if (lossCp >= 50) return { label: "inaccuracy", lossCp, explanation: "Havia uma continuação mais precisa. Revê as ameaças e a actividade das peças.", retry: false };
  if (playerDelta >= 150) return { label: "brilliant", lossCp, explanation: "Encontraste uma solução forte que melhora claramente a tua posição.", retry: false };
  return { label: "good", lossCp, explanation: "Lance consistente com as exigências da posição.", retry: false };
}

export function buildCoachPrompt(input: { side: Side; san: string; label: MoveLabel; lossCp: number; fen: string; bestLine: string[] }): string {
  return [
    "És treinador de xadrez. Explica em português claro, sem inventar ameaças.",
    "Usa apenas os dados fornecidos. Distingue avaliação da engine de explicação estratégica.",
    `Lado do aluno: ${input.side === "w" ? "Brancas" : "Pretas"}`,
    `Lance jogado: ${input.san}`, `Classificação: ${input.label}`,
    `Perda estimada: ${input.lossCp} centipawns`, `FEN: ${input.fen}`,
    `Linha principal da engine: ${input.bestLine.join(" ")}`,
    "Responde com: ideia da posição, problema do lance, melhor plano e uma pergunta pedagógica. Não diagnostiques psicologia ou personalidade."
  ].join("\n");
}
