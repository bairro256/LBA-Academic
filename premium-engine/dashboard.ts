export type SkillKey = "aberturas" | "tatica" | "estrategia" | "finais" | "psicologia";
export interface SkillMetric { score: number; attempts: number; updatedAt: string }
export type SkillProfile = Record<SkillKey, SkillMetric>;
export interface TrainingRecommendation { skill: SkillKey; route: string; title: string; reason: string; minutes: number }

/** Shrinks small samples toward 50 so one lucky puzzle cannot dominate the radar. */
export function confidenceAdjustedScore(metric: SkillMetric): number {
  const n = Math.max(0, metric.attempts);
  const raw = Math.max(0, Math.min(100, metric.score));
  const confidence = n / (n + 8);
  return Math.round(50 + (raw - 50) * confidence);
}

export function recommendTraining(profile: SkillProfile): TrainingRecommendation {
  const routes: Record<SkillKey, Omit<TrainingRecommendation, "skill">> = {
    aberturas: { route: "/premium/aberturas", title: "Rever o teu repertório", reason: "Há desvios teóricos recentes a consolidar.", minutes: 12 },
    tatica: { route: "/premium/meio-jogo?mode=tactics", title: "Treinar visão táctica", reason: "A tua precisão táctica é a área com maior margem de melhoria.", minutes: 10 },
    estrategia: { route: "/premium/meio-jogo?mode=strategy", title: "Pensar planos posicionais", reason: "Vamos melhorar a avaliação e a escolha de planos.", minutes: 15 },
    finais: { route: "/premium/finais", title: "Converter finais", reason: "Precisamos de consolidar a técnica nos finais.", minutes: 12 },
    psicologia: { route: "/premium/jornada?mode=reflection", title: "Treinar decisões sob pressão", reason: "Vamos trabalhar rotina de decisão e gestão do tempo.", minutes: 8 }
  };
  const weakest = (Object.keys(profile) as SkillKey[])
    .map(skill => ({ skill, score: confidenceAdjustedScore(profile[skill]) }))
    .sort((a, b) => a.score - b.score)[0];
  return { skill: weakest.skill, ...routes[weakest.skill] };
}

export function updateStreak(previousDays: string[], today: string): { days: number; activeToday: boolean } {
  const unique = [...new Set(previousDays)].sort();
  if (unique.includes(today)) return { days: countConsecutive(unique, today), activeToday: true };
  const yesterday = new Date(`${today}T12:00:00`);
  yesterday.setDate(yesterday.getDate() - 1);
  const y = localDateKey(yesterday);
  return { days: unique.includes(y) ? countConsecutive(unique, y) + 1 : 1, activeToday: true };
}
function countConsecutive(days: string[], from: string): number {
  const set = new Set(days); let count = 0; const d = new Date(`${from}T12:00:00`);
  while (set.has(localDateKey(d))) { count++; d.setDate(d.getDate() - 1); }
  return count;
}
function localDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
