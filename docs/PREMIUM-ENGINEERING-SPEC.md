# Especificação de Engenharia — LBA ao Vivo Premium
Versão 2.0 · 13 Novembro 2026

## 0. Decisão de arquitectura

A aplicação publicada é HTML/CSS/ES Modules integrada com Supabase e alojada no Wix. A evolução será incremental: manter a página e a autenticação existentes, acrescentar módulos JavaScript compilados e serviços Supabase, sem migração imediata para React/Flutter. O objectivo é obter uma experiência móvel fluida, cálculos fora da thread principal, dados sincronizados por conta e conteúdo pedagógico de autoria LBA. 60 fps é uma meta a medir em dispositivos reais, não uma garantia universal.

## 1. Stack tecnológica

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| UI | HTML semântico, CSS responsivo, ES Modules | Ecrãs, navegação e acessibilidade |
| Tabuleiro | Chessground (licença GPL-3.0 a rever) ou alternativa permissiva | Peças, setas, coordenadas e gestos |
| Regras | chess.js | FEN, SAN, PGN, legalidade e histórico |
| Engine | Stockfish WASM num Web Worker | Análise local, Multi-PV e melhores lances |
| Gráficos | Chart.js ou SVG próprio | Evolução, radar e avaliação |
| Dados | Supabase PostgreSQL + Auth + RLS | Perfis, eventos, progresso e acesso |
| Aberturas | Lichess Opening Explorer | Estatísticas agregadas e popularidade |
| Finais | Lichess Syzygy Tablebase API | WDL/DTZ para posições cobertas |
| Cache | IndexedDB | Cache e progresso pendente |

Performance: Stockfish nunca corre na thread principal; começar com 1 thread e hash conservador em telemóveis; limitar profundidade/tempo; terminar Worker ao sair; evitar redesenhar todo o DOM por lance; usar alvos de toque de 44 px, foco visível e prefers-reduced-motion.

## 2. Arquitectura geral

Aluno/Safari → UI Premium → chess.js + Chessground + Stockfish Worker + IndexedDB.
A UI chama Supabase com JWT → Edge Functions/RPC → PostgreSQL com RLS.
Aberturas e Tablebases são serviços externos com cache e tratamento de falhas.
O frontend nunca concede permissões nem decide validade da subscrição. O backend valida utilizador, validade e acesso. A engine local calcula; o servidor guarda progresso e resultados.

## 3. Modelo de dados PostgreSQL

Modelo alvo:
- student_profiles(user_id, display_name, timezone, created_at)
- training_events(id, user_id, module, skill, event_type, score, duration_seconds, metadata, occurred_at)
- skill_snapshots(user_id, skill, score, sample_count, computed_at)
- daily_activity(user_id, local_date, minutes, xp)
- opening_repertoires(id, user_id, color, name)
- opening_lines(id, repertoire_id, eco, name, pgn, target_fen)
- review_items(id, user_id, source_type, source_id, due_at, interval_days, ease, repetitions, last_grade)
- game_analyses(id, user_id, pgn, engine_version, depth, result, created_at)
- lesson_progress(user_id, lesson_id, state, score, completed_at)

RLS: SELECT/INSERT/UPDATE apenas quando auth.uid() = user_id. Tabelas de códigos e acessos permanecem privadas. Operações administrativas apenas por Edge Function com papel administrativo. Nunca expor service_role.

## 4. Contratos de API

- GET /functions/v1/student-dashboard: competências, streak e recomendação.
- POST /functions/v1/training-event: regista sessão e resultado validados.
- POST /functions/v1/opening-review: actualiza repetição espaçada e cria alerta.
- POST /functions/v1/save-analysis: persiste PGN e resumo.
- GET /functions/v1/premium-status: estado de acesso.

Todas as chamadas exigem JWT. Validar tamanho de PGN, campos permitidos, rate limit e propriedade do recurso. Não colocar chaves externas no cliente.

---

# MÓDULO 1 — PAINEL DO ALUNO

### UX
Cabeçalho com nome, sequência diária, minutos semanais e validade Premium. Cartão central “Continuar a minha jornada” com recomendação de 8–15 minutos. Radar de cinco eixos: Aberturas, Táctica, Estratégia, Finais e Psicologia de jogo. Gráfico de linha semanal/mensal com tooltip. Lista de temas a melhorar baseada em erros recentes. Estados vazios sem métricas fictícias.

### Arquitectura
UI solicita student-dashboard → backend agrega eventos de 30/90 dias e calcula confiança → Chart.js/SVG desenha gráficos → CTA abre o treino e regista evento → conclusão actualiza agregados.

### Algoritmo
Implementado em premium-engine/dashboard.ts. A pontuação ajusta amostras pequenas em direcção a 50 para que um único exercício não domine o radar. O streak usa a data local do aluno e o fuso horário do perfil. A recomendação escolhe a competência com maior margem de melhoria, não simplesmente um valor bruto.

### Diferencial
A recomendação apresenta evidência real (“falhaste 3 de 8 decisões em finais de torres”) e uma sessão curta. Nunca afirmar que o aluno perdeu Elo sem rating medido. Métricas de produto: D7/D30, sessões iniciadas pelo CTA e conclusão do treino.

---

# MÓDULO 2 — ACADEMIA DE ABERTURAS

### UX
Repertórios separados para Brancas/Pretas; criar, editar, duplicar e importar PGN. Árvore de variantes com ECO, posição, plano típico, erros frequentes e partidas-modelo. Treino de recordação com explicação estratégica. Modo Blindfold configurável. Desvio detectado guarda FEN, lance esperado e lance jogado e cria revisão.

### Arquitectura
PGN/FEN → chess.js valida → comparar posição/lance com repertório → gravar resultado → agenda SM-2 → dashboard. ECO JSON versionado localmente. Lichess Opening Explorer consultado por FEN, com cache, limites e fallback. Estatísticas representam amostras, não previsão individual.

### Algoritmo
Implementado em premium-engine/openings.ts. Valida o lance na posição real e compara SAN canónico gerado por chess.js. O SM-2 agenda a revisão. Em produção aceitar múltiplas continuações e transposições por FEN normalizada, não uma sequência rígida única.

### Diferencial
Cada lance importante explica o que fazer depois da abertura: estrutura, pior peça, ruptura, casa forte e plano adversário. O aluno demonstra compreensão ao jogar posições de meio-jogo derivadas do próprio repertório.

---

# MÓDULO 3 — LABORATÓRIO DE MEIO-JOGO

### UX
Biblioteca por motivo táctico e estrutura de peões. Modo cálculo abstracto com tabuleiro estático; aluno introduz SAN/UCI ou selecciona lances legais. Aceitar linhas alternativas equivalentes autorizadas. Após a tentativa, revelar variante com setas e explicação. Stockfish é apoio, não substitui a curadoria pedagógica.

### Arquitectura
UI → chess.js legaliza cada lance → validador compara linhas aceites → Stockfish Worker opcional avalia → evento é gravado no backend. Tags: Carlsbad, peão isolado da dama, peões pendurados, cadeia, ataque de minoria e centro aberto.

### Algoritmo
Implementado em premium-engine/middlegame.ts. Reproduz toda a linha desde a FEN inicial e valida lance a lance. Não compara apenas strings SAN. O filtro cruza tema táctico e estrutura.

### Diferencial
O aluno indica candidatos, resposta crítica do adversário e avaliação da posição final. A correcção ensina o processo de cálculo, não apenas a solução.

---

# MÓDULO 4 — CENTRO DE FINAIS

### UX
Percursos por finais de peões, torres, peças menores e damas. Desafio “Converte contra o motor” com posição curada e objectivo claro. Se a vitória teórica se perde, pausar, voltar à posição anterior, demonstrar a técnica e permitir repetir. Distinguir erro teórico de dificuldade prática.

### Arquitectura
Lance legal → FEN → Syzygy se a posição estiver coberta → normalizar WDL para o mesmo jogador → explicar se win vira draw/loss. Stockfish local serve para posições fora da cobertura. Endpoint: https://tablebase.lichess.ovh/standard?fen={FEN}. Verificar limites, número de peças e disponibilidade; cachear por FEN.

### Algoritmo
Implementado em premium-engine/endgames.ts. WDL é relativo ao lado a jogar; após o lance, a perspectiva inverte. DTZ/DTM são métricas distintas de WDL; não declarar vitória perdida apenas porque DTZ aumentou.

### Diferencial
Explicação geométrica no tabuleiro: oposição, casas-chave, quadrado do peão, Lucena, Philidor, torre activa e rei cortado. O aluno repete a técnica com pequenas alterações da posição.

---

# MÓDULO 5 — ANÁLISE DE PARTIDAS / TREINADOR VIRTUAL

### UX
Importar PGN, colar texto ou abrir partida pessoal. Gráfico de avaliação por lance com perspectiva e escala explícitas. Lista de momentos críticos. Modo “Tenta outra vez” esconde a engine e pede nova tentativa. Relatório pedagógico: pontos fortes, padrões a corrigir e plano de treino.

### Arquitectura
PGN → chess.js reproduz → Stockfish Worker Multi-PV analisa → deltas em centipawns → classificar momentos → explicação determinística → LLM opcional reescreve apenas factos calculados → guardar resumo e PGN. MultiPV 3 em análise pós-partida; reduzir para 1 em telemóveis fracos. Fixar versão/hash da engine.

### Algoritmo
Implementado em premium-engine/analysis.ts. Normaliza avaliação à perspectiva das Brancas e calcula a perda na perspectiva do jogador. O LLM não decide se o lance é erro nem inventa variantes. Recebe SAN, FEN, avaliação, melhor linha e categoria já calculadas.

### Diferencial
O “Modo treinador” pede ao aluno que encontre a melhor jogada antes de mostrar a linha. O relatório deve chamar-se “Padrões de decisão”, não diagnóstico psicológico. Só mencionar gestão do tempo se houver dados de relógio suficientes; nunca inferir ansiedade ou personalidade.

---

## 5. Segurança e conteúdo
Verificação de acesso sempre no servidor. Esconder conteúdo no CSS/JS não protege material curricular. Conteúdos completos devem ser servidos por endpoint autorizado ou segmentados por permissões. RLS por auth.uid(); rate limit em análise, importação e códigos; logs sem passwords/tokens/PGN privado completo; segredos apenas em Supabase Secrets.

## 6. Testes de aceitação
1. iPhone Safari: registo, login, logout, recuperação de sessão e erros visíveis.
2. Offline: módulos locais continuam utilizáveis e APIs mostram estado recuperável.
3. Regras: roque, en passant, promoção, xeque, mate, empate e PGN malformado.
4. Aberturas: correcto, errado, transposição e múltiplas linhas.
5. Cálculo: legal, ilegal, alternativa equivalente e promoção.
6. Finais: win→draw, win→loss, draw→draw e inversão de perspectiva.
7. Análise: Brancas/Pretas, mate, avaliações negativas e Multi-PV.
8. Segurança: aluno A não lê dados do aluno B; conteúdo integral não é entregue a conta básica.
9. Performance: FPS, resposta do tabuleiro, memória e temperatura em iPhones de entrada e médios.

## 7. Plano de entrega
Fase A: estabilizar registo/login e mensagens de erro.
Fase B: eventos, progresso sincronizado, RLS e endpoint dashboard.
Fase C: dashboard com métricas reais, streak e jornada diária.
Fase D: repertório/revisão espaçada, cálculo e finais.
Fase E: Stockfish Worker, Multi-PV, modo nova tentativa e explicações.
Fase F: segurança do conteúdo, acessibilidade, testes e lançamento.

## 8. Estado desta entrega
A branch premium-v2-foundation contém cinco módulos TypeScript de lógica-base e este documento. Os módulos ainda não estão importados pela página estática publicada; precisam de compilação, integração, testes automatizados e validação no Safari. A página Wix publicada e a autenticação de produção não foram alteradas nesta entrega.
