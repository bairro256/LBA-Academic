# LBA Premium — checklist de validação antes da publicação

Este documento regista verificações pendentes. A aprovação do GitHub Actions não substitui os testes reais no Safari/iPhone nem a revisão das licenças.

## 1. Dependências externas observadas no código

| Origem | Utilização | Directiva CSP a confirmar |
|---|---|---|
| `https://esm.sh` | módulos ES: Supabase JS, chess.js e Chessground | `script-src` |
| `https://cdn.jsdelivr.net` | CSS do Chessground e ficheiros JS/WASM do Stockfish | `style-src` e `script-src` |
| `blob:` | criação do Web Worker clássico que carrega Stockfish | `worker-src blob:` |
| URL do projecto Supabase | autenticação e chamadas à base de dados | `connect-src` |
| `https://explorer.lichess.ovh` | estatísticas de aberturas | `connect-src` |
| `https://tablebase.lichess.ovh` | consulta Syzygy | `connect-src` |

A lista é uma leitura estática dos imports e chamadas `fetch` encontrados no código. Não prova quais as directivas efectivamente aplicadas pelo alojamento Wix. Confirmar os cabeçalhos CSP e a consola do navegador no endereço publicado; não adicionar permissões genéricas como `*` sem necessidade.

## 2. Testes obrigatórios em Safari/iPhone

- [ ] Abrir a página Premium publicada e confirmar que o CSS e os módulos carregam sem erros.
- [ ] Confirmar que uma conta sem Premium não consegue ver nem abrir a suite.
- [ ] Confirmar que uma conta Premium abre todos os separadores e que sair de um separador limpa o tabuleiro anterior.
- [ ] No Livro Vivo, tocar nos lances do texto e confirmar que a posição do tabuleiro acompanha o lance seleccionado.
- [ ] Testar navegação entre os três capítulos, pista, desafio correcto, desafio incorrecto e exploração livre.
- [ ] Testar arrastar peças com o dedo, orientação do tabuleiro, rotação e promoções.
- [ ] No treino às cegas, confirmar que as peças se ocultam após cinco meios-lances e que anular/reiniciar/revelar funcionam.
- [ ] Testar Stockfish: carregamento do worker, resposta da engine, timeout e encerramento ao sair do módulo.
- [ ] Testar Opening Explorer e Syzygy; falhas de rede devem apresentar mensagens claras sem bloquear a página.
- [ ] Confirmar que os eventos e relatórios são guardados apenas na conta autenticada correcta.
- [ ] Repetir os testes em ligação móvel e Wi-Fi; registar erros da consola e do separador Network.

## 3. Licenças — decisão necessária antes da distribuição comercial

### Chessground 9.2.1
O projecto oficial declara GPL-3.0-or-later e avisa expressamente que a utilização no website implica que o trabalho combinado seja distribuído sob GPL e que o código-fonte seja disponibilizado aos utilizadores. A implementação actual importa Chessground no Livro Vivo, no treino às cegas e noutros módulos.

**Decisão registada: manter Chessground e preparar a distribuição em conformidade com GPL.** Não substituir a biblioteca. A publicação da suite deve aguardar a disponibilização do código-fonte correspondente aos utilizadores, os avisos/licenças completos e a revisão jurídica da arquitectura. O repositório de trabalho está privado; a disponibilização pública do código combinado ainda exige aprovação explícita e não foi feita. Ver `docs/THIRD-PARTY-NOTICES.md`.

### Stockfish 19 Lite Single
O código carrega `stockfish@19.0.1` através de jsDelivr, executando-o num Web Worker e comunicando por UCI. Stockfish é GPLv3. Antes de distribuir, incluir o aviso e a licença aplicáveis e disponibilizar o código-fonte correspondente exacto (ou instruções inequívocas para o obter e reconstruir a versão distribuída), incluindo a versão Stockfish.js utilizada. A separação por Worker/UCI deve ser avaliada juridicamente; não assumir que elimina obrigações.

### Registo de terceiros
Manter um inventário das versões e licenças de chess.js, Supabase JS, Chessground, Stockfish.js, CSS e conjuntos de peças. Incluir avisos de copyright e licenças exigidos por cada componente.

## 4. Critério de publicação

Só considerar a publicação depois de:
1. CI verde no commit final;
2. testes manuais Safari/iPhone concluídos;
3. CSP/CDN confirmados no alojamento real;
4. política de licenças decidida e avisos/código-fonte preparados;
5. revisão final do acesso Premium, autenticação, preços e validade.

**Estado actual:** decisão de manter Chessground registada; avisos de terceiros preparados em `docs/THIRD-PARTY-NOTICES.md`. Continuam pendentes: disponibilização pública do código-fonte combinado, arquivo exacto do Stockfish.js 19.0.1 e seus binários, inventário final das licenças, testes Safari/iPhone e CSP real. Nenhuma publicação, alteração de visibilidade ou merge é autorizada por este documento.
