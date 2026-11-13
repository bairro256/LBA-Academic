import { Chess, type Square } from "chess.js";
export interface RepertoireLine { id: string; name: string; color: "white" | "black"; san: string[] }
export interface MoveCheck { correct: boolean; expectedSan?: string; replySan?: string; resultingFen?: string }

/** Validate a move by playing it on the exact current position, not by comparing raw SAN strings. */
export function checkRepertoireMove(fen: string, move: { from: Square; to: Square; promotion?: string }, line: RepertoireLine, ply: number): MoveCheck {
  const chess = new Chess(fen);
  const expected = line.san[ply];
  if (!expected) return { correct: true };
  let played;
  try { played = chess.move(move); } catch { return { correct: false, expectedSan: expected }; }
  if (!played) return { correct: false, expectedSan: expected };
  const correct = played.san === expected;
  if (!correct) return { correct: false, expectedSan: expected };
  const replyChess = new Chess(chess.fen());
  const replySan = line.san[ply + 1];
  if (replySan) {
    const legalReply = replyChess.moves({ verbose: true }).find(m => m.san === replySan);
    if (legalReply) replyChess.move({ from: legalReply.from, to: legalReply.to, promotion: legalReply.promotion });
  }
  return { correct: true, replySan, resultingFen: chess.fen() };
}

export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5;
export interface ReviewState { repetitions: number; intervalDays: number; ease: number; dueAt: string }
/** SM-2 spaced repetition, with bounded ease factor and deterministic UTC due date. */
export function scheduleOpeningReview(state: ReviewState, grade: ReviewGrade, now = new Date()): ReviewState {
  const q = grade;
  const ease = Math.max(1.3, state.ease + (0.1 - (5-q)*(0.08 + (5-q)*0.02)));
  const repetitions = q < 3 ? 0 : state.repetitions + 1;
  const intervalDays = q < 3 ? 1 : repetitions === 1 ? 1 : repetitions === 2 ? 3 : Math.round(state.intervalDays * ease);
  const due = new Date(now); due.setUTCDate(due.getUTCDate() + intervalDays);
  return { repetitions, intervalDays, ease, dueAt: due.toISOString() };
}
