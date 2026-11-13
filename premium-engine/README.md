# LBA ao Vivo — Premium Engine Foundation

Este directório contém os contratos e algoritmos-base TypeScript para evoluir a área Premium sem substituir a publicação HTML/JS existente.

## Módulos
- `dashboard.ts`: competências com ajuste por confiança, recomendação diária e streak.
- `openings.ts`: validação legal do repertório em cada posição e repetição espaçada SM-2.
- `middlegame.ts`: replay legal de variantes de cálculo e filtros por estruturas.
- `endgames.ts`: contrato de Tablebase e detecção de perda de resultado teórico, com perspectiva do lado a jogar.
- `analysis.ts`: avaliação normalizada à perspectiva do aluno e prompt pedagógico limitado a dados verificáveis.

## Stack de produção recomendada
- UI actual: HTML/CSS/ES Modules, com migração incremental; não introduzir React/Flutter sem necessidade.
- Regras: `chess.js` para validação FEN/PGN/SAN.
- Tabuleiro: Chessground (GPL-3.0; avaliar compatibilidade de licença antes de distribuir código fechado). Alternativa: biblioteca de tabuleiro com licença permissiva.
- Engine: Stockfish WASM num Web Worker dedicado; limitar threads/hash em telemóveis e terminar workers quando o módulo fecha.
- Gráficos: Chart.js (canvas) ou SVG leve; reduzir animações e respeitar `prefers-reduced-motion`.
- Dados: Supabase Auth + Postgres + RLS; guardar eventos e métricas no servidor, não confiar em pontuações enviadas pelo cliente.
- Tablebases: Syzygy/Lichess Tablebase API como serviço opcional com cache; não assumir cobertura universal ou disponibilidade garantida.
- Aberturas: ECO JSON versionado localmente + Lichess Opening Explorer com cache, limites e atribuição.

## Fluxo de dados
1. UI envia acções autenticadas para endpoints Supabase/RPC.
2. Validação de regras e treino interactivo correm no dispositivo.
3. Stockfish corre localmente no Worker; apenas resumos de análise são persistidos.
4. Backend valida permissões, datas, pontuações e progresso; RLS isola cada aluno.
5. Dashboard lê agregados persistidos; não usa localStorage como fonte oficial.

## Regras críticas
- Avaliações de engine têm perspectiva explícita (sempre Brancas ou sempre jogador); nunca comparar números sem normalizar.
- Syzygy WDL é relativo ao lado a jogar. Depois de um lance, a perspectiva inverte; a função de finais trata essa inversão.
- Não interromper o aluno por uma simples queda de DTZ: comparar o resultado teórico WDL para o mesmo jogador e explicar a diferença entre vitória teórica e dificuldade prática.
- O modo de cálculo deve aceitar linhas alternativas equivalentes e validar legalidade lance a lance; não comparar SAN em texto.
- O relatório psicológico não deve inferir estados mentais. Pode descrever padrões observáveis (ex.: queda de precisão em posições com pouco tempo) apenas se houver dados de relógio suficientes.
- “60 fps” é objectivo de interface, não garantia: medir em dispositivos reais, manter a engine fora da thread principal e limitar animações/cálculos.

## Integração
Os ficheiros são TypeScript-fonte e requerem compilação para JavaScript antes de serem carregados por uma página estática. A área publicada actual não os importa directamente. A integração deve ser feita por etapas, com testes automatizados e validação em navegador móvel, sem substituir a página actualmente publicada.
