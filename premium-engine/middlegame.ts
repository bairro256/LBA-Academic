import { Chess, type Square } from "chess.js";
export interface CandidateMove { from: Square; to: Square; promotion?: string }
export interface LineValidation { valid: boolean; failedAt?: number; canonicalSan: string[]; finalFen: string }

/** Replays the whole blindfold line legally. SAN is generated from each live position. */
export function validateCalculationLine(startFen: string, moves: CandidateMove[], acceptedLines: CandidateMove[][]): LineValidation {
  const replay = (line: CandidateMove[]) => {
    const chess = new Chess(startFen); const san: string[] = [];
    for (let i = 0; i < line.length; i++) {
      try {
        const result = chess.move(line[i]);
        if (!result) return { valid: false, failedAt: i, canonicalSan: san, finalFen: chess.fen() };
        san.push(result.san);
      } catch { return { valid: false, failedAt: i, canonicalSan: san, finalFen: chess.fen() }; }
    }
    return { valid: true, canonicalSan: san, finalFen: chess.fen() };
  };
  const attempt = replay(moves);
  if (!attempt.valid) return attempt;
  const accepted = acceptedLines.some(line => {
    const result = replay(line);
    return result.valid && samePosition(result.finalFen, attempt.finalFen);
  });
  return { ...attempt, valid: accepted, failedAt: accepted ? undefined : moves.length };
}

function samePosition(a: string, b: string): boolean {\n  return a.split(" ").slice(0, 4).join(" ") === b.split(" ").slice(0, 4).join(" ");\n}\n\nexport type PawnStructure = "carlsbad" | "isolated-queen-pawn" | "hanging-pawns" | "pawn-chain" | "minority-attack" | "open-center" | "other";
export interface TaggedPuzzle { id: string; fen: string; themes: string[]; structures: PawnStructure[] }
export function filterPuzzles(puzzles: TaggedPuzzle[], structure?: PawnStructure, theme?: string): TaggedPuzzle[] {
  return puzzles.filter(p => (!structure || p.structures.includes(structure)) && (!theme || p.themes.includes(theme)));
}
