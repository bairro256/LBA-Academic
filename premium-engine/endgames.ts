export type TablebaseWdl = -2 | -1 | 0 | 1 | 2; // from side-to-move perspective: loss .. win
export interface TablebasePosition { wdl: TablebaseWdl; dtz?: number; dtm?: number; bestMove?: string }
export interface TablebaseClient { probe(fen: string): Promise<TablebasePosition | null> }
export interface EndgameDecision { criticalError: boolean; before: TablebaseWdl; after: TablebaseWdl; message: string }

/** Compare outcomes for the same player, accounting for the fact that side-to-move flips after a move. */
export async function detectLostWin(client: TablebaseClient, fenBefore: string, fenAfter: string): Promise<EndgameDecision> {
  const [before, after] = await Promise.all([client.probe(fenBefore), client.probe(fenAfter)]);
  if (!before || !after) throw new Error("Tablebase indisponível para esta posição (limite de peças ou falha de rede).");
  const beforeMoverOutcome = before.wdl;
  const afterMoverOutcomeForOpponent = after.wdl;
  const afterSamePlayerOutcome = (afterMoverOutcomeForOpponent * -1) as TablebaseWdl;
  const criticalError = beforeMoverOutcome > 0 && afterSamePlayerOutcome <= 0;
  return {
    criticalError, before: beforeMoverOutcome, after: afterSamePlayerOutcome,
    message: criticalError ? "A posição deixou de ser teoricamente ganha. Vamos reconstruir a técnica correcta." : "A vantagem teórica foi preservada."
  };
}
export function tablebaseUrl(fen: string): string {
  return "https://tablebase.lichess.ovh/standard?fen=" + encodeURIComponent(fen);
}
